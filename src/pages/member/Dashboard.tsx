
import { ArrowRight, Presentation, Calendar, FileText, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const MemberDashboard = () => {
  const dashboardCards = [
    {
      title: "Cursos",
      description: "Aprenda sobre chatbots, atendimento e marketing",
      icon: <Presentation className="w-6 h-6 text-hublab-purple" />,
      linkTo: "/member/courses",
      color: "from-hublab-purple/20 to-hublab-purple/5",
    },
    {
      title: "Lives",
      description: "Participe de sessões ao vivo e assista a gravações",
      icon: <Calendar className="w-6 h-6 text-hublab-blue" />,
      linkTo: "/member/lives",
      color: "from-hublab-blue/20 to-hublab-blue/5",
    },
    {
      title: "Materiais de Apoio",
      description: "Baixe PDFs e documentos organizados por assunto",
      icon: <FileText className="w-6 h-6 text-emerald-500" />,
      linkTo: "/member/materials",
      color: "from-emerald-500/20 to-emerald-500/5",
    },
    {
      title: "Construtor de Chatbots",
      description: "Crie chatbots sem código para WhatsApp e sites",
      icon: <MessageSquare className="w-6 h-6 text-amber-500" />,
      linkTo: "/member/chatbot-builder",
      color: "from-amber-500/20 to-amber-500/5",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gradient-to-r from-hublab-purple to-hublab-blue p-8 rounded-lg text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Bem-vindo(a) ao HubLab!
        </h1>
        <p className="text-white/80 text-lg max-w-2xl">
          Acesse recursos exclusivos sobre chatbots, atendimento e marketing para potencializar seus resultados.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Recursos disponíveis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardCards.map((card, index) => (
          <Card key={index} className={`card-hover overflow-hidden bg-gradient-to-br ${card.color} border-none`}>
            <CardHeader className="pb-2">
              <div className="mb-2">{card.icon}</div>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription className="text-foreground/70">{card.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild variant="ghost" className="p-0 h-auto hover:bg-transparent">
                <Link to={card.linkTo} className="flex items-center gap-1 text-sm font-medium">
                  Acessar <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border mt-6">
        <h2 className="text-xl font-semibold mb-4">Últimas atualizações</h2>
        <ul className="space-y-4">
          <li className="flex gap-4 items-start pb-4 border-b">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-hublab-purple/10 text-hublab-purple">
              <Presentation className="h-5 w-5" />
            </span>
            <div>
              <p className="font-medium">Novo curso adicionado</p>
              <p className="text-sm text-muted-foreground">Estratégias Avançadas para Chatbots no WhatsApp</p>
            </div>
          </li>
          <li className="flex gap-4 items-start pb-4 border-b">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-hublab-blue/10 text-hublab-blue">
              <Calendar className="h-5 w-5" />
            </span>
            <div>
              <p className="font-medium">Nova live agendada</p>
              <p className="text-sm text-muted-foreground">Como Integrar IA nos Seus Chatbots - 25/04 às 19h</p>
            </div>
          </li>
          <li className="flex gap-4 items-start">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
              <FileText className="h-5 w-5" />
            </span>
            <div>
              <p className="font-medium">Novo material disponível</p>
              <p className="text-sm text-muted-foreground">Guia Completo de Métricas para Chatbots</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MemberDashboard;
