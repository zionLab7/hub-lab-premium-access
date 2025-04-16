
import { ExternalLink, MessageSquare, FileCode, Share, Zap, Globe, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/PageHeader";

const ChatbotBuilder = () => {
  return (
    <div className="animate-fade-in space-y-8">
      <PageHeader 
        title="Construtor de Chatbots" 
        description="Crie chatbots sem código para WhatsApp e sites"
      >
        <Button asChild className="gap-2 bg-hublab-blue hover:bg-hublab-blue/90">
          <a href="https://chatlab.com/builder" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
            Acessar Construtor
          </a>
        </Button>
      </PageHeader>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">Crie chatbots sem código</h2>
            <p className="text-muted-foreground mb-6">
              Nosso construtor de chatbots permite que você crie experiências de atendimento automatizado sem precisar escrever uma linha de código. É intuitivo, flexível e poderoso.
            </p>
            
            <h3 className="text-lg font-semibold mb-3">Principais recursos:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hublab-purple/10 text-hublab-purple mt-0.5">
                  <FileCode className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="font-medium">Interface visual de arrastar e soltar</p>
                  <p className="text-sm text-muted-foreground">Crie fluxos complexos sem nenhuma programação</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hublab-purple/10 text-hublab-purple mt-0.5">
                  <Share className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="font-medium">Integrações prontas</p>
                  <p className="text-sm text-muted-foreground">Conecte com CRMs, e-commerce e outras ferramentas</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hublab-purple/10 text-hublab-purple mt-0.5">
                  <MessageSquare className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="font-medium">Templates pré-construídos</p>
                  <p className="text-sm text-muted-foreground">Comece rapidamente com modelos para diversos segmentos</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-r from-hublab-purple/30 to-hublab-blue/30 rounded-lg transform rotate-3 scale-105"></div>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Construtor de Chatbots" 
                className="relative z-10 rounded-lg shadow-lg w-full" 
              />
            </div>
          </div>
        </div>
      </div>
      
      <h2 className="text-xl font-bold mt-4">Plataformas suportadas</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-hover border-none shadow bg-gradient-to-br from-green-500/20 to-green-500/5">
          <CardHeader>
            <Zap className="h-8 w-8 text-green-500 mb-2" />
            <CardTitle>WhatsApp</CardTitle>
            <CardDescription>Crie chatbots para a plataforma de mensagens mais popular do Brasil.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                <span>Atendimento 24/7</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                <span>Respostas automáticas</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                <span>Transferência para humano</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Saiba mais</Button>
          </CardFooter>
        </Card>
        
        <Card className="card-hover border-none shadow bg-gradient-to-br from-blue-500/20 to-blue-500/5">
          <CardHeader>
            <Globe className="h-8 w-8 text-blue-500 mb-2" />
            <CardTitle>Sites</CardTitle>
            <CardDescription>Adicione chatbots interativos em seu site ou loja virtual.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                <span>Widget personalizado</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                <span>Captura de leads</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                <span>Integração com e-commerce</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Saiba mais</Button>
          </CardFooter>
        </Card>
        
        <Card className="card-hover border-none shadow bg-gradient-to-br from-purple-500/20 to-purple-500/5">
          <CardHeader>
            <Instagram className="h-8 w-8 text-purple-500 mb-2" />
            <CardTitle>Redes Sociais</CardTitle>
            <CardDescription>Conecte seus chatbots com Instagram, Facebook e outras redes.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                <span>Respostas a comentários</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                <span>Mensagens diretas</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                <span>Campanhas automatizadas</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Saiba mais</Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="bg-hublab-purple/10 p-6 rounded-lg border border-hublab-purple/20 mt-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Pronto para começar?</h3>
            <p className="text-muted-foreground">Acesse agora o construtor de chatbots e crie sua primeira automação.</p>
          </div>
          <Button asChild className="whitespace-nowrap gap-2 bg-hublab-purple hover:bg-hublab-purple/90">
            <a href="https://chatlab.com/builder" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              Acessar Construtor
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotBuilder;
