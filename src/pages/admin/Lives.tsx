
import { useState } from "react";
import { Search, Plus, MoreHorizontal, Edit, Trash, Calendar, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import PageHeader from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Live {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  link: string;
  imageUrl: string;
  isPast: boolean;
}

const AdminLives = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddLiveOpen, setIsAddLiveOpen] = useState(false);
  const [liveType, setLiveType] = useState<"upcoming" | "past">("upcoming");
  
  // Mock data for lives
  const [lives, setLives] = useState<Live[]>([
    {
      id: 1,
      title: "Estratégias Avançadas para WhatsApp",
      description: "Descubra como implementar estratégias avançadas para o WhatsApp Business e aumentar suas conversões.",
      date: "25/04/2025",
      time: "19:00",
      link: "https://meet.google.com/xyz-abcd-123",
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      isPast: false,
    },
    {
      id: 2,
      title: "Integrando IA nos Seus Chatbots",
      description: "Aprenda a usar inteligência artificial para tornar seus chatbots mais inteligentes e eficientes.",
      date: "10/05/2025",
      time: "20:00",
      link: "https://meet.google.com/abc-wxyz-789",
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      isPast: false,
    },
    {
      id: 3,
      title: "Personalizando a Experiência do Cliente",
      description: "Técnicas para personalizar a experiência do cliente em chatbots e aumentar a satisfação.",
      date: "15/03/2025",
      time: "19:00",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      isPast: true,
    },
    {
      id: 4,
      title: "Métricas e Analytics para Chatbots",
      description: "Como medir e analisar o desempenho do seu chatbot para otimizar resultados.",
      date: "02/04/2025",
      time: "18:30",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      isPast: true,
    },
  ]);
  
  const filteredLives = lives
    .filter(live => live.isPast === (liveType === "past"))
    .filter(live => 
      live.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      live.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  const handleAddLive = (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const isPastLive = formData.get("liveType") === "past";
    
    const newLive: Live = {
      id: Math.floor(Math.random() * 1000) + 10,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      date: formData.get("date") as string,
      time: isPastLive ? "" : (formData.get("time") as string),
      link: formData.get("link") as string,
      imageUrl: formData.get("imageUrl") as string,
      isPast: isPastLive,
    };
    
    setLives([...lives, newLive]);
    
    toast({
      title: isPastLive ? "Gravação adicionada" : "Live agendada",
      description: `"${newLive.title}" foi ${isPastLive ? "adicionada" : "agendada"} com sucesso.`,
    });
    
    setIsAddLiveOpen(false);
    form.reset();
  };
  
  const handleDeleteLive = (liveId: number) => {
    setLives(lives.filter(live => live.id !== liveId));
    
    toast({
      title: "Item removido",
      description: "O item foi removido com sucesso.",
    });
  };
  
  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader 
        title="Gerenciar Lives" 
        description="Adicione, edite e remova lives e gravações"
      >
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar..."
              className="pl-8 w-full md:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Dialog open={isAddLiveOpen} onOpenChange={setIsAddLiveOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Novo Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Item</DialogTitle>
                <DialogDescription>
                  Preencha as informações para adicionar uma live ou gravação.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleAddLive} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Tipo</Label>
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="upcoming" 
                        name="liveType" 
                        value="upcoming"
                        defaultChecked
                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                      />
                      <Label htmlFor="upcoming" className="cursor-pointer">Live Futura</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="past" 
                        name="liveType" 
                        value="past"
                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                      />
                      <Label htmlFor="past" className="cursor-pointer">Gravação</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input id="title" name="title" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea id="description" name="description" rows={3} required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date">Data</Label>
                  <Input id="date" name="date" placeholder="DD/MM/AAAA" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time">Horário (para lives futuras)</Label>
                  <Input id="time" name="time" placeholder="HH:MM" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="link">Link</Label>
                  <Input id="link" name="link" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">URL da Imagem</Label>
                  <Input id="imageUrl" name="imageUrl" required />
                </div>
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddLiveOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Adicionar</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </PageHeader>
      
      <Tabs defaultValue="upcoming" className="w-full space-y-6" onValueChange={(v) => setLiveType(v as "upcoming" | "past")}>
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
        
        <TabsContent value="upcoming">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead className="hidden md:table-cell">Descrição</TableHead>
                  <TableHead>Data e Hora</TableHead>
                  <TableHead className="hidden md:table-cell">Link</TableHead>
                  <TableHead className="w-[100px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLives.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      Nenhuma live agendada encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLives.map((live) => (
                    <TableRow key={live.id}>
                      <TableCell className="font-medium">{live.title}</TableCell>
                      <TableCell className="hidden md:table-cell max-w-xs truncate">
                        {live.description}
                      </TableCell>
                      <TableCell>
                        {live.date} às {live.time}
                      </TableCell>
                      <TableCell className="hidden md:table-cell truncate max-w-xs">
                        <a 
                          href={live.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {live.link}
                        </a>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" /> Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDeleteLive(live.id)}
                            >
                              <Trash className="mr-2 h-4 w-4" /> Remover
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="past">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead className="hidden md:table-cell">Descrição</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="hidden md:table-cell">Link da Gravação</TableHead>
                  <TableHead className="w-[100px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLives.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      Nenhuma gravação encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLives.map((live) => (
                    <TableRow key={live.id}>
                      <TableCell className="font-medium">{live.title}</TableCell>
                      <TableCell className="hidden md:table-cell max-w-xs truncate">
                        {live.description}
                      </TableCell>
                      <TableCell>
                        {live.date}
                      </TableCell>
                      <TableCell className="hidden md:table-cell truncate max-w-xs">
                        <a 
                          href={live.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {live.link}
                        </a>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" /> Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDeleteLive(live.id)}
                            >
                              <Trash className="mr-2 h-4 w-4" /> Remover
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminLives;
