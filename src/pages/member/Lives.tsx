import { useState, useEffect } from "react";
import { Search, Calendar, Play, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";
import { liveService, type Live } from "@/services/liveService";
import { toast } from "sonner";

const Lives = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [lives, setLives] = useState<Live[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetchLives();
  }, []);
  
  const fetchLives = async () => {
    setIsLoading(true);
    try {
      const livesData = await liveService.getLives();
      if (livesData && livesData.length > 0) {
        setLives(livesData as Live[]);
      } else {
        // If no lives data from backend, use mock data
        setLives(mockLives);
      }
    } catch (error) {
      console.error("Error fetching lives:", error);
      toast.error("Erro ao carregar lives", {
        description: "Ocorreu um erro ao buscar as lives. Tente novamente mais tarde."
      });
      // Use mock data on error
      setLives(mockLives);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Mock data for lives
  const mockLives: Live[] = [
    {
      id: "1",
      title: "Estratégias Avançadas para WhatsApp",
      description: "Descubra como implementar estratégias avançadas para o WhatsApp Business e aumentar suas conversões.",
      date: "25/04/2025",
      time: "19:00",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "#",
      is_past: false,
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Integrando IA nos Seus Chatbots",
      description: "Aprenda a usar inteligência artificial para tornar seus chatbots mais inteligentes e eficientes.",
      date: "10/05/2025",
      time: "20:00",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "#",
      is_past: false,
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Personalizando a Experiência do Cliente",
      description: "Técnicas para personalizar a experiência do cliente em chatbots e aumentar a satisfação.",
      date: "15/03/2025",
      time: "19:00",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "#",
      is_past: true,
      created_at: new Date().toISOString(),
    },
    {
      id: "4",
      title: "Métricas e Analytics para Chatbots",
      description: "Como medir e analisar o desempenho do seu chatbot para otimizar resultados.",
      date: "02/04/2025",
      time: "18:30",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "#",
      is_past: true,
      created_at: new Date().toISOString(),
    },
  ];
  
  // Use data from backend if available, otherwise already set in useEffect
  const filteredLives = (isPast: boolean) => lives
    .filter(live => live.is_past === isPast)
    .filter(live => 
      live.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      live.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  const futureLives = filteredLives(false);
  const pastLives = filteredLives(true);
  
  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Lives" 
        description="Participe de sessões ao vivo e assista a gravações"
      >
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar lives..."
            className="pl-8 w-full md:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </PageHeader>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <p className="text-muted-foreground">Carregando lives...</p>
        </div>
      ) : (
        <Tabs defaultValue="upcoming" className="w-full space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Próximas Lives
            </TabsTrigger>
            <TabsTrigger value="past" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Gravações
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-8">
            {futureLives.length === 0 ? (
              <EmptyState 
                icon={<Calendar className="h-8 w-8 text-muted-foreground" />}
                title="Nenhuma live agendada"
                description="No momento não temos nenhuma live agendada. Verifique novamente em breve."
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {futureLives.map((live) => (
                  <Card key={live.id} className="h-full card-hover overflow-hidden">
                    <div className="aspect-video overflow-hidden relative">
                      <img 
                        src={live.image} 
                        alt={live.title} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                      />
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-hublab-blue hover:bg-hublab-blue/90">Próxima</Badge>
                      </div>
                    </div>
                    <CardHeader className="px-4 pb-0 pt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {live.date} às {live.time}
                        </span>
                      </div>
                      <CardTitle className="text-xl">{live.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{live.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="px-4 pt-4 pb-4">
                      <Button asChild className="w-full gap-2 bg-hublab-blue hover:bg-hublab-blue/90">
                        <a href={live.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          Acessar Link da Live
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-8">
            {pastLives.length === 0 ? (
              <EmptyState 
                icon={<Play className="h-8 w-8 text-muted-foreground" />}
                title="Nenhuma gravação disponível"
                description="Não encontramos gravações de lives passadas para exibir."
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastLives.map((live) => (
                  <Card key={live.id} className="h-full card-hover overflow-hidden">
                    <div className="aspect-video overflow-hidden relative">
                      <img 
                        src={live.image} 
                        alt={live.title} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                      />
                      <div className="absolute top-3 right-3">
                        <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">Gravação</Badge>
                      </div>
                    </div>
                    <CardHeader className="px-4 pb-0 pt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Realizada em {live.date}
                        </span>
                      </div>
                      <CardTitle className="text-xl">{live.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{live.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="px-4 pt-4 pb-4">
                      <Button asChild variant="outline" className="w-full gap-2">
                        <a href={live.link} target="_blank" rel="noopener noreferrer">
                          <Play className="h-4 w-4" />
                          Assistir Gravação
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Lives;
