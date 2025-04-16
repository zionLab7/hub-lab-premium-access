
import { useState } from "react";
import { Search, Plus, MoreHorizontal, Edit, Trash, FileText, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DropdownMenuTrigger,
  DropdownMenuSeparator
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

interface Material {
  id: number;
  title: string;
  description: string;
  category: string;
  downloadUrl: string;
  type: string;
}

const AdminMaterials = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [isAddMaterialOpen, setIsAddMaterialOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  
  // Mock data for materials
  const [materials, setMaterials] = useState<Material[]>([
    {
      id: 1,
      title: "Guia Completo de Chatbots",
      description: "Um guia abrangente sobre chatbots, desde conceitos básicos até técnicas avançadas.",
      category: "Chatbots",
      downloadUrl: "https://example.com/guia-chatbots.pdf",
      type: "PDF",
    },
    {
      id: 2,
      title: "Templates de Fluxos para WhatsApp",
      description: "Templates prontos para diferentes cenários de atendimento no WhatsApp.",
      category: "WhatsApp",
      downloadUrl: "https://example.com/templates-whatsapp.zip",
      type: "ZIP",
    },
    {
      id: 3,
      title: "Planilha de Métricas para Chatbots",
      description: "Planilha para acompanhar e analisar as métricas do seu chatbot.",
      category: "Métricas",
      downloadUrl: "https://example.com/metricas-chatbots.xlsx",
      type: "XLSX",
    },
    {
      id: 4,
      title: "Manual de Marketing Conversacional",
      description: "Estratégias e táticas para usar chatbots em marketing conversacional.",
      category: "Marketing",
      downloadUrl: "https://example.com/marketing-conversacional.pdf",
      type: "PDF",
    },
    {
      id: 5,
      title: "Checklist para Lançamento de Chatbot",
      description: "Lista de verificação para garantir o sucesso do lançamento do seu chatbot.",
      category: "Chatbots",
      downloadUrl: "https://example.com/checklist-lancamento.pdf",
      type: "PDF",
    },
    {
      id: 6,
      title: "Guia de Integração com APIs",
      description: "Guia técnico sobre como integrar seu chatbot com diferentes APIs.",
      category: "Técnico",
      downloadUrl: "https://example.com/integracao-apis.pdf",
      type: "PDF",
    },
  ]);
  
  // Get unique categories
  const [categories, setCategories] = useState<string[]>(
    Array.from(new Set(materials.map(material => material.category)))
  );
  
  const filteredMaterials = materials.filter(material => {
    const matchesSearch = 
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = categoryFilter === null || material.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const categoryValue = formData.get("category") as string;
    if (!categories.includes(categoryValue) && categoryValue.trim() !== "") {
      setCategories([...categories, categoryValue]);
    }
    
    const newMaterial: Material = {
      id: Math.floor(Math.random() * 1000) + 10,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: categoryValue,
      downloadUrl: formData.get("downloadUrl") as string,
      type: formData.get("type") as string,
    };
    
    setMaterials([...materials, newMaterial]);
    
    toast({
      title: "Material adicionado",
      description: `"${newMaterial.title}" foi adicionado com sucesso.`,
    });
    
    setIsAddMaterialOpen(false);
    form.reset();
  };
  
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newCategory.trim() !== "" && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      
      toast({
        title: "Categoria adicionada",
        description: `A categoria "${newCategory}" foi adicionada com sucesso.`,
      });
      
      setNewCategory("");
      setIsAddCategoryOpen(false);
    } else if (categories.includes(newCategory)) {
      toast({
        title: "Categoria já existe",
        description: "Esta categoria já existe na lista.",
        variant: "destructive",
      });
    }
  };
  
  const handleDeleteMaterial = (materialId: number) => {
    setMaterials(materials.filter(material => material.id !== materialId));
    
    toast({
      title: "Material removido",
      description: "O material foi removido com sucesso.",
    });
  };
  
  const handleDeleteCategory = (category: string) => {
    // Check if category is being used
    const isUsed = materials.some(material => material.category === category);
    
    if (isUsed) {
      toast({
        title: "Não foi possível remover",
        description: "Esta categoria está sendo usada por um ou mais materiais.",
        variant: "destructive",
      });
      return;
    }
    
    setCategories(categories.filter(c => c !== category));
    
    toast({
      title: "Categoria removida",
      description: `A categoria "${category}" foi removida com sucesso.`,
    });
  };
  
  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader 
        title="Gerenciar Materiais" 
        description="Adicione, edite e remova materiais de apoio"
      >
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar materiais..."
              className="pl-8 w-full md:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                {categoryFilter ? categoryFilter : "Categorias"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem 
                onClick={() => setCategoryFilter(null)}
                className={categoryFilter === null ? "bg-accent text-accent-foreground" : ""}
              >
                Todas as categorias
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {categories.map((category) => (
                <DropdownMenuItem 
                  key={category} 
                  onClick={() => setCategoryFilter(category)}
                  className={categoryFilter === category ? "bg-accent text-accent-foreground" : ""}
                >
                  <div className="flex justify-between items-center w-full">
                    <span>{category}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 ml-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCategory(category);
                      }}
                    >
                      <Trash className="h-3 w-3" />
                    </Button>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsAddCategoryOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Nova Categoria
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Dialog open={isAddMaterialOpen} onOpenChange={setIsAddMaterialOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Novo Material
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Material</DialogTitle>
                <DialogDescription>
                  Preencha as informações para adicionar um novo material de apoio.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleAddMaterial} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input id="title" name="title" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea id="description" name="description" rows={3} required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <select 
                    id="category" 
                    name="category"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de Arquivo</Label>
                  <select 
                    id="type" 
                    name="type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    required
                  >
                    <option value="">Selecione um tipo</option>
                    <option value="PDF">PDF</option>
                    <option value="XLSX">Excel (XLSX)</option>
                    <option value="DOCX">Word (DOCX)</option>
                    <option value="ZIP">ZIP</option>
                    <option value="PPT">PowerPoint</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="downloadUrl">URL de Download</Label>
                  <Input id="downloadUrl" name="downloadUrl" required />
                </div>
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddMaterialOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Adicionar Material</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </PageHeader>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="hidden md:table-cell">Descrição</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="hidden md:table-cell">URL de Download</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMaterials.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Nenhum material encontrado
                </TableCell>
              </TableRow>
            ) : (
              filteredMaterials.map((material) => (
                <TableRow key={material.id}>
                  <TableCell className="font-medium">{material.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{material.category}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell max-w-xs truncate">
                    {material.description}
                  </TableCell>
                  <TableCell>
                    <Badge className={`
                      ${material.type === 'PDF' ? 'bg-red-500' : 
                        material.type === 'XLSX' ? 'bg-green-500' : 
                        material.type === 'DOCX' ? 'bg-blue-500' :
                        material.type === 'ZIP' ? 'bg-yellow-500' :
                        material.type === 'PPT' ? 'bg-orange-500' : 'bg-gray-500'}
                    `}>
                      {material.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell truncate max-w-xs">
                    <a 
                      href={material.downloadUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {material.downloadUrl}
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
                          onClick={() => handleDeleteMaterial(material.id)}
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
      
      {/* Dialog for adding category */}
      <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Adicionar Nova Categoria</DialogTitle>
            <DialogDescription>
              Digite o nome da nova categoria para materiais.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleAddCategory} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="categoryName">Nome da Categoria</Label>
              <Input 
                id="categoryName" 
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                required 
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddCategoryOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Adicionar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminMaterials;
