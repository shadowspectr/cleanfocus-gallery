
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Edit, Plus, Save, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Service {
  name: string;
  price: string;
  time: string;
}

interface Contact {
  phone: string;
  email: string;
  address: string;
}

interface Work {
  id: number;
  imageUrl: string;
  description: string;
}

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([
    { name: "Химчистка дивана", price: "от 2000₽", time: "2-3 часа" },
    { name: "Химчистка кресла", price: "от 1000₽", time: "1-2 часа" },
    { name: "Химчистка матраса", price: "от 2000₽", time: "2-3 часа" },
    { name: "Химчистка ковра", price: "от 150₽/м²", time: "2-4 часа" },
  ]);
  const [contacts, setContacts] = useState<Contact>({
    phone: "+7 (XXX) XXX-XX-XX",
    email: "info@example.com",
    address: "Ваш город",
  });
  const [works, setWorks] = useState<Work[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [newService, setNewService] = useState<Service>({ name: "", price: "", time: "" });

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = localStorage.getItem('adminAuth');
      if (!isAuth) {
        const password = prompt('Введите пароль для доступа в панель администратора:');
        if (password === '012345') {
          localStorage.setItem('adminAuth', 'true');
        } else {
          navigate('/');
        }
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/');
  };

  const handleSaveService = (service: Service, index: number) => {
    const newServices = [...services];
    newServices[index] = service;
    setServices(newServices);
    setEditingService(null);
    toast({
      title: "Услуга обновлена",
      description: "Изменения успешно сохранены",
    });
  };

  const handleAddService = () => {
    if (newService.name && newService.price && newService.time) {
      setServices([...services, newService]);
      setNewService({ name: "", price: "", time: "" });
      toast({
        title: "Услуга добавлена",
        description: "Новая услуга успешно добавлена",
      });
    }
  };

  const handleDeleteService = (index: number) => {
    const newServices = services.filter((_, i) => i !== index);
    setServices(newServices);
    toast({
      title: "Услуга удалена",
      description: "Услуга успешно удалена из списка",
    });
  };

  const handleSaveContacts = () => {
    setContacts({ ...contacts });
    toast({
      title: "Контакты обновлены",
      description: "Изменения успешно сохранены",
    });
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
                
                {/* Список существующих услуг */}
                <div className="space-y-4">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-[#1A1F2C] rounded-lg">
                      {editingService === service ? (
                        <>
                          <div className="flex-1 grid grid-cols-3 gap-4">
                            <Input
                              value={service.name}
                              onChange={(e) => setEditingService({ ...service, name: e.target.value })}
                              className="bg-[#2A2F3C] text-white"
                              placeholder="Название услуги"
                            />
                            <Input
                              value={service.price}
                              onChange={(e) => setEditingService({ ...service, price: e.target.value })}
                              className="bg-[#2A2F3C] text-white"
                              placeholder="Стоимость"
                            />
                            <Input
                              value={service.time}
                              onChange={(e) => setEditingService({ ...service, time: e.target.value })}
                              className="bg-[#2A2F3C] text-white"
                              placeholder="Время выполнения"
                            />
                          </div>
                          <Button onClick={() => handleSaveService(service, index)} className="bg-[#8B7355] hover:bg-[#A08B6C]">
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
                            <Button onClick={() => handleDeleteService(index)} variant="ghost" className="text-[#D4B996] hover:text-white">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {/* Форма добавления новой услуги */}
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
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#D4B996] mb-2">Телефон</label>
                  <Input
                    value={contacts.phone}
                    onChange={(e) => setContacts({ ...contacts, phone: e.target.value })}
                    className="bg-[#1A1F2C] text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#D4B996] mb-2">Email</label>
                  <Input
                    value={contacts.email}
                    onChange={(e) => setContacts({ ...contacts, email: e.target.value })}
                    className="bg-[#1A1F2C] text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#D4B996] mb-2">Адрес</label>
                  <Input
                    value={contacts.address}
                    onChange={(e) => setContacts({ ...contacts, address: e.target.value })}
                    className="bg-[#1A1F2C] text-white"
                  />
                </div>
                <Button onClick={handleSaveContacts} className="bg-[#8B7355] hover:bg-[#A08B6C]">
                  <Save className="w-4 h-4 mr-2" />
                  Сохранить изменения
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio">
            <Card className="p-6 bg-[#2A2F3C] border-[#8B7355]/20">
              <h2 className="text-xl font-semibold text-white mb-4">Управление портфолио</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {works.map((work, index) => (
                  <div key={work.id} className="relative group">
                    <div className="aspect-square bg-[#1A1F2C] rounded-lg overflow-hidden">
                      <img src={work.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button variant="ghost" className="text-white">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" className="text-white">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="aspect-square bg-[#1A1F2C] rounded-lg flex items-center justify-center border-2 border-dashed border-[#8B7355]/20 cursor-pointer hover:border-[#D4B996]/40 transition-colors">
                  <Plus className="w-8 h-8 text-[#D4B996]" />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
