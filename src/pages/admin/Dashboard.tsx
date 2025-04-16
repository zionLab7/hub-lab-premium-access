
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/PageHeader";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Presentation, Users, Calendar, FileText, ArrowUpRight, ArrowDownRight } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total de Cursos",
      value: "8",
      change: "+2",
      changeType: "increase",
      icon: <Presentation className="h-5 w-5" />,
    },
    {
      title: "Usuários Ativos",
      value: "2,457",
      change: "+12%",
      changeType: "increase",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Lives Realizadas",
      value: "18",
      change: "+3",
      changeType: "increase",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Downloads de Materiais",
      value: "3,892",
      change: "-5%",
      changeType: "decrease",
      icon: <FileText className="h-5 w-5" />,
    },
  ];

  const chartData = [
    { name: "Jan", cursos: 5, lives: 3, materiais: 10 },
    { name: "Fev", cursos: 5, lives: 4, materiais: 12 },
    { name: "Mar", cursos: 6, lives: 2, materiais: 15 },
    { name: "Abr", cursos: 6, lives: 3, materiais: 13 },
    { name: "Mai", cursos: 7, lives: 5, materiais: 18 },
    { name: "Jun", cursos: 8, lives: 4, materiais: 20 },
  ];

  const recentActions = [
    {
      id: 1,
      action: "Curso adicionado",
      item: "Fundamentos de Chatbots",
      date: "Hoje, 14:30",
    },
    {
      id: 2,
      action: "Live agendada",
      item: "Estratégias Avançadas para WhatsApp",
      date: "Hoje, 10:15",
    },
    {
      id: 3,
      action: "Material atualizado",
      item: "Guia Completo de Chatbots",
      date: "Ontem, 16:40",
    },
    {
      id: 4,
      action: "Curso atualizado",
      item: "Marketing Conversacional",
      date: "Ontem, 09:20",
    },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader 
        title="Dashboard" 
        description="Visão geral do sistema"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium text-muted-foreground">{stat.title}</span>
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
                <div className={`p-2 rounded-full ${
                  stat.changeType === 'increase' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                }`}>
                  {stat.icon}
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {stat.changeType === 'increase' ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={`text-xs font-medium ${
                  stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.change} desde o último mês
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Conteúdo adicionado</CardTitle>
            <CardDescription>Novos cursos, lives e materiais nos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="cursos" fill="#7E69AB" name="Cursos" />
                  <Bar dataKey="lives" fill="#1EAEDB" name="Lives" />
                  <Bar dataKey="materiais" fill="#10B981" name="Materiais" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Ações Recentes</CardTitle>
            <CardDescription>Últimas alterações no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentActions.map((action) => (
                <div key={action.id} className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    {action.action.includes('Curso') ? (
                      <Presentation className="h-4 w-4 text-primary" />
                    ) : action.action.includes('Live') ? (
                      <Calendar className="h-4 w-4 text-primary" />
                    ) : (
                      <FileText className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{action.action}</p>
                    <p className="text-sm text-muted-foreground">{action.item}</p>
                    <p className="text-xs text-muted-foreground">{action.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
