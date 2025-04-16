
import { useState } from "react";
import { MessageSquare, Save, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/PageHeader";
import { useToast } from "@/hooks/use-toast";

const AdminChatbotBuilder = () => {
  const { toast } = useToast();
  const [builderLink, setBuilderLink] = useState("https://chatlab.com/builder");
  const [builderDescription, setBuilderDescription] = useState(
    "Nosso construtor de chatbots permite que você crie experiências de atendimento automatizado sem precisar escrever uma linha de código. É intuitivo, flexível e poderoso."
  );
  
  const handleSaveChanges = () => {
    // In a real application this would save to backend
    toast({
      title: "Configurações salvas",
      description: "As configurações do construtor de chatbots foram atualizadas com sucesso.",
    });
  };
  
  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader 
        title="Construtor de Chatbots" 
        description="Configure o link e as informações do construtor"
      >
        <Button onClick={handleSaveChanges} className="gap-2">
          <Save className="h-4 w-4" />
          Salvar Alterações
        </Button>
      </PageHeader>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Configurações</CardTitle>
            <CardDescription>
              Defina o link e a descrição do construtor de chatbots que serão exibidos para os membros premium.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="builderLink">Link do Construtor</Label>
              <div className="flex items-center space-x-2">
                <LinkIcon className="h-4 w-4 text-muted-foreground" />
                <Input 
                  id="builderLink" 
                  value={builderLink}
                  onChange={(e) => setBuilderLink(e.target.value)}
                  placeholder="https://exemplo.com/construtor"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Os membros serão redirecionados para este link ao clicar em "Acessar Construtor".
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="builderDescription">Descrição</Label>
              <Textarea 
                id="builderDescription" 
                value={builderDescription}
                onChange={(e) => setBuilderDescription(e.target.value)}
                rows={5}
              />
              <p className="text-sm text-muted-foreground">
                Esta descrição será exibida na página do construtor de chatbots para os membros.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveChanges} className="w-full gap-2">
              <Save className="h-4 w-4" />
              Salvar Alterações
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Prévia</CardTitle>
            <CardDescription>
              Como os membros verão o botão de acesso ao construtor.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg border p-4 bg-muted/50">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="h-8 w-8 text-hublab-purple" />
                <div>
                  <h3 className="font-semibold text-lg">Construtor de Chatbots</h3>
                  <p className="text-sm text-muted-foreground">Acesse o construtor para criar chatbots sem código</p>
                </div>
              </div>
              
              <p className="text-sm mb-4 line-clamp-3">{builderDescription}</p>
              
              <div className="flex justify-center">
                <Button asChild className="gap-2 bg-hublab-blue hover:bg-hublab-blue/90 w-full md:w-auto">
                  <a href={builderLink} target="_blank" rel="noopener noreferrer">
                    <LinkIcon className="h-4 w-4" />
                    Acessar Construtor
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="rounded-lg bg-muted/30 p-4 border border-dashed">
              <h4 className="font-medium mb-2">Informações importantes</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5"></div>
                  <span>Certifique-se de que o link está funcionando corretamente.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5"></div>
                  <span>Os membros precisarão estar logados no construtor para acessar suas funcionalidades.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5"></div>
                  <span>Recomendamos usar um sistema de Single Sign-On para melhor experiência do usuário.</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Estatísticas de Uso</CardTitle>
          <CardDescription>
            Dados sobre a utilização do construtor de chatbots pelos membros premium.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col bg-primary/10 p-6 rounded-lg space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Total de Acessos</p>
              <p className="text-3xl font-bold">1,287</p>
              <p className="text-sm text-muted-foreground">Nos últimos 30 dias</p>
            </div>
            
            <div className="flex flex-col bg-primary/10 p-6 rounded-lg space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Chatbots Criados</p>
              <p className="text-3xl font-bold">432</p>
              <p className="text-sm text-muted-foreground">Pelos membros premium</p>
            </div>
            
            <div className="flex flex-col bg-primary/10 p-6 rounded-lg space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Taxa de Conversão</p>
              <p className="text-3xl font-bold">33.5%</p>
              <p className="text-sm text-muted-foreground">Visitantes → Chatbots criados</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminChatbotBuilder;
