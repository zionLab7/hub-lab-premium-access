import { useState, useEffect } from "react";
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
import { materialService, type Material } from "@/services/materialService";

const AdminMaterials = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [isAddMaterialOpen, setIsAddMaterialOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [materials, setMaterials] = useState<Material[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMaterials();
  }, []);

  const loadMaterials = async () => {
    setIsLoading(true);
    const materialsData = await materialService.getMaterials();
    setMaterials(materialsData);
    setIsLoading(false);
  };

  const handleAddMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newMaterial = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      type: formData.get("type") as string,
      download_url: formData.get("downloadUrl") as string,
    };
    
    const material = await materialService.createMaterial(newMaterial);
    if (material) {
      setMaterials([...materials, material]);
      setIsAddMaterialOpen(false);
      form.reset();
    }
  };

  const handleDeleteMaterial = async (id: string) => {
    const success = await materialService.deleteMaterial(id);
    if (success) {
      setMaterials(materials.filter(material => material.id !== id));
    }
  };
  
  const filteredMaterials = materials.filter(material => {
    const matchesSearch = 
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = categoryFilter === null || material.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
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
                      href={material.download_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {material.download_url}
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
