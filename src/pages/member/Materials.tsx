import { useState, useEffect } from "react";
import { Search, FileText, Download, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";
import { materialService, type Material as MaterialType } from "@/services/materialService";
import { toast } from "sonner";

const Materials = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [materials, setMaterials] = useState<MaterialType[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetchMaterials();
  }, []);
  
  const fetchMaterials = async () => {
    setIsLoading(true);
    try {
      const materialsData = await materialService.getMaterials();
      
      if (materialsData && materialsData.length > 0) {
        setMaterials(materialsData);
        // Extract unique categories
        const uniqueCategories = Array.from(new Set(materialsData.map(material => material.category)));
        setCategories(uniqueCategories);
      } else {
        // Use mock data if no materials in the database
        useMockData();
      }
    } catch (error) {
      console.error("Error fetching materials:", error);
      toast.error("Erro ao carregar materiais", {
        description: "Ocorreu um erro ao buscar os materiais. Tente novamente mais tarde."
      });
      // Use mock data on error
      useMockData();
    } finally {
      setIsLoading(false);
    }
  };
  
  const useMockData = () => {
    const mockMaterials: MaterialType[] = [
      {
        id: "1",
        title: "Guia Completo de Chatbots",
        description: "Um guia abrangente sobre chatbots, desde conceitos básicos até técnicas avançadas.",
        category: "Chatbots",
        download_url: "#",
        type: "PDF",
        created_at: new Date().toISOString(),
      },
      {
        id: "2",
        title: "Templates de Fluxos para WhatsApp",
        description: "Templates prontos para diferentes cenários de atendimento no WhatsApp.",
        category: "WhatsApp",
        download_url: "#",
        type: "ZIP",
        created_at: new Date().toISOString(),
      },
      {
        id: "3",
        title: "Planilha de Métricas para Chatbots",
        description: "Planilha para acompanhar e analisar as métricas do seu chatbot.",
        category: "Métricas",
        download_url: "#",
        type: "XLSX",
        created_at: new Date().toISOString(),
      },
      {
        id: "4",
        title: "Manual de Marketing Conversacional",
        description: "Estratégias e táticas para usar chatbots em marketing conversacional.",
        category: "Marketing",
        download_url: "#",
        type: "PDF",
        created_at: new Date().toISOString(),
      },
      {
        id: "5",
        title: "Checklist para Lançamento de Chatbot",
        description: "Lista de verificação para garantir o sucesso do lançamento do seu chatbot.",
        category: "Chatbots",
        download_url: "#",
        type: "PDF",
        created_at: new Date().toISOString(),
      },
      {
        id: "6",
        title: "Guia de Integração com APIs",
        description: "Guia técnico sobre como integrar seu chatbot com diferentes APIs.",
        category: "Técnico",
        download_url: "#",
        type: "PDF",
        created_at: new Date().toISOString(),
      },
    ];
    
    setMaterials(mockMaterials);
    const mockCategories = Array.from(new Set(mockMaterials.map(material => material.category)));
    setCategories(mockCategories);
  };
  
  const filteredMaterials = materials.filter(material => {
    const matchesSearch = 
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = categoryFilter === null || material.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Materiais de Apoio" 
        description="Baixe PDFs e documentos organizados por assunto"
      >
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
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
              {categories.map((category) => (
                <DropdownMenuItem 
                  key={category} 
                  onClick={() => setCategoryFilter(category)}
                  className={categoryFilter === category ? "bg-accent text-accent-foreground" : ""}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </PageHeader>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <p className="text-muted-foreground">Carregando materiais...</p>
        </div>
      ) : filteredMaterials.length === 0 ? (
        <EmptyState 
          icon={<FileText className="h-8 w-8 text-muted-foreground" />}
          title="Nenhum material encontrado"
          description="Tente alterar os filtros ou o termo de busca para encontrar o que procura."
          buttonText="Limpar filtros"
          onClick={() => {
            setSearchQuery("");
            setCategoryFilter(null);
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material) => (
            <Card key={material.id} className="h-full card-hover">
              <CardHeader className="px-4 pb-0 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{material.category}</Badge>
                  <Badge className={`
                    ${material.type === 'PDF' ? 'bg-red-500' : 
                      material.type === 'XLSX' ? 'bg-green-500' : 
                      material.type === 'ZIP' ? 'bg-blue-500' : 'bg-gray-500'}
                  `}>
                    {material.type}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{material.title}</CardTitle>
                <CardDescription className="line-clamp-2">{material.description}</CardDescription>
              </CardHeader>
              <CardFooter className="px-4 pt-4 pb-4">
                <Button asChild className="w-full gap-2">
                  <a href={material.download_url} download>
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Materials;
