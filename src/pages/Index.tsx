
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Phone, Mail, MapPin, Image, Send } from 'lucide-react';

const services = [
  { name: "Химчистка дивана", price: "от 2000₽", time: "2-3 часа" },
  { name: "Химчистка кресла", price: "от 1000₽", time: "1-2 часа" },
  { name: "Химчистка матраса", price: "от 2000₽", time: "2-3 часа" },
  { name: "Химчистка ковра", price: "от 150₽/м²", time: "2-4 часа" },
];

const Index = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Сообщение отправлено",
      description: "Мы свяжемся с вами в ближайшее время",
    });
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center text-center px-4">
        <div className="animate-fade-up">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-mint-600 to-mint-800">
            Профессиональная Химчистка
          </h1>
          <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Вернем чистоту и свежесть вашей мебели с помощью современных технологий и безопасных средств
          </p>
          <Button
            size="lg"
            className="bg-mint-500 hover:bg-mint-600 text-white transition-all duration-300"
          >
            Заказать химчистку
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">
            Наши услуги
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <h3 className="font-display text-xl font-semibold mb-3">{service.name}</h3>
                <div className="text-gray-600">
                  <p className="mb-2">Стоимость: {service.price}</p>
                  <p>Время работы: {service.time}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Work Examples Section */}
      <section className="py-20 px-4">
        <div className="container max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">
            Примеры работ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, index) => (
              <Card key={index} className="overflow-hidden group">
                <div className="relative aspect-square bg-gray-100 flex items-center justify-center">
                  <Image className="w-12 h-12 text-gray-400" />
                  <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">
            Связаться с нами
          </h2>
          <Card className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Имя</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Телефон</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Сообщение</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                />
              </div>
              <Button type="submit" className="w-full bg-mint-500 hover:bg-mint-600">
                <Send className="w-4 h-4 mr-2" />
                Отправить сообщение
              </Button>
            </form>
          </Card>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Phone className="w-6 h-6 text-mint-500 mb-3" />
              <p className="text-gray-600">+7 (XXX) XXX-XX-XX</p>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="w-6 h-6 text-mint-500 mb-3" />
              <p className="text-gray-600">info@example.com</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-6 h-6 text-mint-500 mb-3" />
              <p className="text-gray-600">Ваш город</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
