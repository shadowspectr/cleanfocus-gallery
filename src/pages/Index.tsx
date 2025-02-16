
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Phone, Mail, MapPin, Image, Send, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen bg-[#1A1F2C]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-[#1A1F2C]/80 backdrop-blur-md z-50 border-b border-[#8B7355]/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-[#D4B996]" />
              <span className="font-display text-xl font-semibold text-white">Clean Pro</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#services" className="text-[#D4B996] hover:text-[#E5CAA7] transition-colors">Услуги</a>
              <a href="#portfolio" className="text-[#D4B996] hover:text-[#E5CAA7] transition-colors">Портфолио</a>
              <a href="#contact" className="text-[#D4B996] hover:text-[#E5CAA7] transition-colors">Контакты</a>
            </nav>
            <Button className="bg-[#8B7355] hover:bg-[#A08B6C] text-white">
              Заказать
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section with Background */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-4 pt-16">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1F2C]/90 to-[#1A1F2C] mix-blend-multiply" />
        </div>
        <div className="relative z-10 animate-fade-up">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 text-white">
            Профессиональная Химчистка
          </h1>
          <p className="text-[#D4B996] text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Вернем чистоту и свежесть вашей мебели с помощью современных технологий и безопасных средств
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#A08B6C] text-white hover:bg-[#B89D7D] transition-all duration-300"
            >
              Заказать химчистку
            </Button>
            <Button
              size="lg"
              className="bg-transparent text-white hover:bg-white/10 border-2 border-[#D4B996]/20 shadow-lg transition-all duration-300"
            >
              Узнать цены
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-[#222222]">
        <div className="container max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Наши услуги
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300 bg-[#2A2F3C] border-[#8B7355]/20">
                <h3 className="font-display text-xl font-semibold mb-3 text-white">{service.name}</h3>
                <div className="text-[#D4B996]">
                  <p className="mb-2">Стоимость: {service.price}</p>
                  <p>Время работы: {service.time}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Work Examples Section */}
      <section id="portfolio" className="py-20 px-4 bg-[#1A1F2C]">
        <div className="container max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Примеры работ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, index) => (
              <Card key={index} className="overflow-hidden group border-[#8B7355]/20 bg-[#2A2F3C]">
                <div className="relative aspect-square bg-[#2A2F3C] flex items-center justify-center">
                  <Image className="w-12 h-12 text-[#D4B996]" />
                  <span className="absolute inset-0 bg-[#8B7355]/0 group-hover:bg-[#8B7355]/10 transition-colors duration-300" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 px-4 bg-[#222222]">
        <div className="container max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Связаться с нами
          </h2>
          <Card className="p-6 md:p-8 bg-[#2A2F3C] border-[#8B7355]/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#D4B996]">Имя</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-[#1A1F2C] border-[#8B7355]/20 text-white focus:border-[#D4B996]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#D4B996]">Телефон</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="bg-[#1A1F2C] border-[#8B7355]/20 text-white focus:border-[#D4B996]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-[#D4B996]">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-[#1A1F2C] border-[#8B7355]/20 text-white focus:border-[#D4B996]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-[#D4B996]">Сообщение</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="bg-[#1A1F2C] border-[#8B7355]/20 text-white focus:border-[#D4B996]"
                />
              </div>
              <Button type="submit" className="w-full bg-[#8B7355] hover:bg-[#A08B6C] text-white">
                <Send className="w-4 h-4 mr-2" />
                Отправить сообщение
              </Button>
            </form>
          </Card>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Phone className="w-6 h-6 text-[#D4B996] mb-3" />
              <p className="text-[#D4B996]">+7 (XXX) XXX-XX-XX</p>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="w-6 h-6 text-[#D4B996] mb-3" />
              <p className="text-[#D4B996]">info@example.com</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-6 h-6 text-[#D4B996] mb-3" />
              <p className="text-[#D4B996]">Ваш город</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
