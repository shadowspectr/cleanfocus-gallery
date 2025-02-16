
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Edit, Plus, Save, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Service {
  id: string;
  name: string;
  price: string;
  time: string;
}

interface Contact {
  id: string;
  phone: string;
  email: string;
  address: string;
}

interface Work {
  id: string;
  image_url: string;
  description: string;
}

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [newService, setNewService] = useState<Omit<Service, 'id'>>({ name: "", price: "", time: "" });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error || !session) {
          const email = prompt('Введите email для доступа в панель администратора:');
          const password = prompt('Введите пароль для доступа в панель администратора:');
          if (password === '012345') {
            const { error: signInError } = await supabase.auth.signInWithPassword({
              email: 'admin@example.com',
              password: '012345'
            });
            if (signInError) throw signInError;
            localStorage.setItem('adminAuth', 'true');
          } else {
            navigate('/');
          }
        }
      } catch (error) {
        console.error('Auth error:', error);
        navigate('/');
      }
    };
    checkAuth();
  }, [navigate]);

  const { data: services = [] } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  const { data: contactsData } = useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  const { data: works = [] } = useQuery({
    queryKey: ['portfolio'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const updateService = useMutation({
    mutationFn: async (service: Service) => {
      const { error } = await supabase
        .from('services')
        .update({ name: service.name, price: service.price, time: service.time })
        .eq('id', service.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({
        title: "Услуга обновлена",
        description: "Изменения успешно сохранены",
      });
    }
  });

  const deleteService = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({
        title: "Услуга удалена",
        description: "Услуга успешно удалена из списка",
      });
    }
  });

  const addService = useMutation({
    mutationFn: async (service: Omit<Service, 'id'>) => {
      const { error } = await supabase
        .from('services')
        .insert([service]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      setNewService({ name: "", price: "", time: "" });
      toast({
        title: "Услуга добавлена",
        description: "Новая услуга успешно добавлена",
      });
    }
  });

  const updateContacts = useMutation({
    mutationFn: async (contacts: Omit<Contact, 'id' | 'created_at'>) => {
      const { error } = await supabase
        .from('contacts')
        .update(contacts)
        .eq('id', contactsData?.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast({
        title: "Контакты обновлены",
        description: "Изменения успешно сохранены",
      });
    }
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.split('.').pop()?.toLowerCase();
    if (!['jpg', 'jpeg', 'png', 'svg'].includes(fileExt || '')) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, загрузите изображение в формате JPG, PNG или SVG",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Ошибка",
          description: "Необходимо авторизоваться",
          variant: "destructive"
        });
        return;
      }

      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio')
        .getPublicUrl(fileName);

      const { error: dbError } = await supabase
        .from('portfolio')
        .insert([{
          image_url: publicUrl,
          description: ''
        }]);

      if (dbError) throw dbError;

      queryClient.invalidateQueries({ queryKey: ['portfolio'] });

      toast({
        title: "Успешно",
        description: "Изображение добавлено в портфолио",
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить изображение",
        variant: "destructive"
      });
    }
  };

  const handleDeleteWork = async (id: string, image_url: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Ошибка",
          description: "Необходимо авторизоваться",
          variant: "destructive"
        });
        return;
      }

      const fileName = image_url.split('/').pop();
      
      if (fileName) {
        const { error: storageError } = await supabase.storage
          .from('portfolio')
          .remove([fileName]);

        if (storageError) throw storageError;
      }

      const { error: dbError } = await supabase
        .from('portfolio')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;

      queryClient.invalidateQueries({ queryKey: ['portfolio'] });

      toast({
        title: "Успешно",
        description: "Работа удалена из портфолио",
      });
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить работу",
        variant: "destructive"
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('adminAuth');
    navigate('/');
  };

  const handleSaveService = (service: Service) => {
    updateService.mutate(service);
    setEditingService(null);
  };

  const handleAddService = () => {
    if (newService.name && newService.price && newService.time) {
      addService.mutate(newService);
    }
  };

  const handleDeleteService = (id: string) => {
    deleteService.mutate(id);
  };

  const handleSaveContacts = () => {
    if (contactsData) {
      updateContacts.mutate({
        phone: contactsData.phone,
        email: contactsData.email,
        address: contactsData.address
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C] p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-white">Панель администратора</h1>
          <Button onClick={handleLogout} variant="ghost" className="text-[#D4B996] hover:text-white">
            <LogOut className="w-4 h-4 mr-2" />
            Выйти
          </Button>
        </div>

        <Tabs defaultValue="services" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="services" className="text-[#D4B996]">Услуги</TabsTrigger>
            <TabsTrigger value="contacts" className="text-[#D4B996]">Контакты</TabsTrigger>
            <TabsTrigger value="portfolio" className="text-[#D4B996]">Портфолио</TabsTrigger>
          </TabsList>

          <TabsContent value="services">
            <Card className="p-6 bg-[#2A2F3C] border-[#8B7355]/20">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white mb-4">Управление услугами</h2>
                
                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service.id} className="flex items-center gap-4 p-4 bg-[#1A1F2C] rounded-lg">
                      {editingService?.id === service.id ? (
                        <>
                          <div className="flex-1 grid grid-cols-3 gap-4">
                            <Input
                              value={editingService.name}
                              onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                              className="bg-[#2A2F3C] text-white"
                              placeholder="Название услуги"
                            />
                            <Input
                              value={editingService.price}
                              onChange={(e) => setEditingService({ ...editingService, price: e.target.value })}
                              className="bg-[#2A2F3C] text-white"
                              placeholder="Стоимость"
                            />
                            <Input
                              value={editingService.time}
                              onChange={(e) => setEditingService({ ...editingService, time: e.target.value })}
                              className="bg-[#2A2F3C] text-white"
                              placeholder="Время выполнения"
                            />
                          </div>
                          <Button onClick={() => handleSaveService(editingService)} className="bg-[#8B7355] hover:bg-[#A08B6C]">
                            <Save className="w-4 h-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <div className="flex-1 grid grid-cols-3 gap-4 text-[#D4B996]">
                            <span>{service.name}</span>
                            <span>{service.price}</span>
                            <span>{service.time}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={() => setEditingService(service)} variant="ghost" className="text-[#D4B996] hover:text-white">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button onClick={() => handleDeleteService(service.id)} variant="ghost" className="text-[#D4B996] hover:text-white">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-[#1A1F2C] rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">Добавить новую услугу</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <Input
                      value={newService.name}
                      onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                      className="bg-[#2A2F3C] text-white"
                      placeholder="Название услуги"
                    />
                    <Input
                      value={newService.price}
                      onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                      className="bg-[#2A2F3C] text-white"
                      placeholder="Стоимость"
                    />
                    <Input
                      value={newService.time}
                      onChange={(e) => setNewService({ ...newService, time: e.target.value })}
                      className="bg-[#2A2F3C] text-white"
                      placeholder="Время выполнения"
                    />
                  </div>
                  <Button onClick={handleAddService} className="mt-4 bg-[#8B7355] hover:bg-[#A08B6C]">
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить услугу
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="contacts">
            <Card className="p-6 bg-[#2A2F3C] border-[#8B7355]/20">
              <h2 className="text-xl font-semibold text-white mb-4">Управление контактами</h2>
              {contactsData && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#D4B996] mb-2">Телефон</label>
                    <Input
                      value={contactsData.phone}
                      onChange={(e) => {
                        if (contactsData) {
                          queryClient.setQueryData(['contacts'], {
                            ...contactsData,
                            phone: e.target.value
                          });
                        }
                      }}
                      className="bg-[#1A1F2C] text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#D4B996] mb-2">Email</label>
                    <Input
                      value={contactsData.email}
                      onChange={(e) => {
                        if (contactsData) {
                          queryClient.setQueryData(['contacts'], {
                            ...contactsData,
                            email: e.target.value
                          });
                        }
                      }}
                      className="bg-[#1A1F2C] text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#D4B996] mb-2">Адрес</label>
                    <Input
                      value={contactsData.address}
                      onChange={(e) => {
                        if (contactsData) {
                          queryClient.setQueryData(['contacts'], {
                            ...contactsData,
                            address: e.target.value
                          });
                        }
                      }}
                      className="bg-[#1A1F2C] text-white"
                    />
                  </div>
                  <Button onClick={handleSaveContacts} className="bg-[#8B7355] hover:bg-[#A08B6C]">
                    <Save className="w-4 h-4 mr-2" />
                    Сохранить изменения
                  </Button>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="portfolio">
            <Card className="p-6 bg-[#2A2F3C] border-[#8B7355]/20">
              <h2 className="text-xl font-semibold text-white mb-4">Управление портфолио</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {works.map((work) => (
                  <div key={work.id} className="relative group">
                    <div className="aspect-square bg-[#1A1F2C] rounded-lg overflow-hidden">
                      <img src={work.image_url} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        onClick={() => handleDeleteWork(work.id, work.image_url)}
                        variant="ghost"
                        className="text-white hover:bg-red-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <label className="aspect-square bg-[#1A1F2C] rounded-lg flex items-center justify-center border-2 border-dashed border-[#8B7355]/20 cursor-pointer hover:border-[#D4B996]/40 transition-colors">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.svg"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <Plus className="w-8 h-8 text-[#D4B996]" />
                </label>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
