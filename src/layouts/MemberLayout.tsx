
import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Presentation, 
  Calendar, 
  FileText, 
  MessageSquare, 
  LogOut, 
  Menu, 
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

const MemberLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navigationItems = [
    { 
      name: "Dashboard", 
      path: "/member", 
      icon: <LayoutDashboard size={20} /> 
    },
    { 
      name: "Cursos", 
      path: "/member/courses", 
      icon: <Presentation size={20} /> 
    },
    { 
      name: "Lives", 
      path: "/member/lives", 
      icon: <Calendar size={20} /> 
    },
    { 
      name: "Materiais", 
      path: "/member/materials", 
      icon: <FileText size={20} /> 
    },
    { 
      name: "Construtor de Chatbots", 
      path: "/member/chatbot-builder", 
      icon: <MessageSquare size={20} /> 
    }
  ];
  
  const handleLogout = () => {
    toast({
      title: "Saindo...",
      description: "Você foi desconectado com sucesso.",
    });
    navigate("/login");
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };
  
  return (
    <div className="flex min-h-screen bg-hublab-lightGray">
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white z-50 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu size={24} />
          </Button>
          <div className="flex items-center">
            <span className="font-heading text-xl font-bold text-hublab-purple">Hub</span>
            <span className="font-heading text-xl font-bold text-hublab-blue">Lab</span>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleLogout}
        >
          <LogOut size={20} />
        </Button>
      </div>
      
      {/* Sidebar */}
      <aside 
        className={`fixed md:relative z-40 md:z-0 h-full transition-all duration-300 ${
          sidebarOpen ? "left-0" : "-left-72 md:left-0"
        } bg-white shadow-md w-64 min-w-64 pt-6 flex flex-col`}
      >
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-2"
            onClick={toggleSidebar}
          >
            <X size={20} />
          </Button>
        )}
        
        <div className="px-6 mb-8">
          <div className="flex items-center">
            <span className="font-heading text-2xl font-bold text-hublab-purple">Hub</span>
            <span className="font-heading text-2xl font-bold text-hublab-blue">Lab</span>
          </div>
          <p className="text-sm text-muted-foreground">Área de Membros Premium</p>
        </div>
        
        <nav className="flex-1 px-3">
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link ${isActive(item.path) ? "active" : ""}`}
                  onClick={isMobile ? toggleSidebar : undefined}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="mt-auto p-4 border-t">
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2 justify-center"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>Sair</span>
          </Button>
        </div>
      </aside>
      
      {/* Main content */}
      <main className={`flex-1 overflow-auto transition-all duration-300 ${
        isMobile ? "pt-16" : "pt-0"
      }`}>
        <div className="container py-8 mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MemberLayout;
