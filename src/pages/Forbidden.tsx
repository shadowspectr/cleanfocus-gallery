
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import SEO from "@/components/SEO";

const Forbidden = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "403 Error: User attempted to access forbidden route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <SEO 
        title="Доступ запрещен | Clean Pro"
        description="У вас нет доступа к запрашиваемой странице. Вернитесь на главную страницу Clean Pro."
        canonicalUrl={`https://cleanpro-example.com${location.pathname}`}
      />
      <div className="text-center max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center">
            <span className="text-6xl font-bold text-orange-500">403</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Доступ запрещен</h1>
        <p className="text-gray-600 mb-6">
          Извините, но у вас нет разрешения для доступа к этой странице.
        </p>
        <Button className="w-full" asChild>
          <a href="/">
            <Home className="mr-2 h-4 w-4" />
            Вернуться на главную
          </a>
        </Button>
      </div>
    </div>
  );
};

export default Forbidden;
