
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import PageHeader from "@/components/PageHeader";

interface Course {
  id: number;
  title: string;
  description: string;
  lessons: number;
  progress: number;
  category: string;
  image: string;
}

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const courses: Course[] = [
    {
      id: 1,
      title: "Fundamentos de Chatbots",
      description: "Aprenda os conceitos básicos para criar chatbots eficientes.",
      lessons: 12,
      progress: 80,
      category: "Chatbots",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Atendimento Humanizado com Chatbots",
      description: "Torne seu atendimento automatizado mais humano e eficaz.",
      lessons: 8,
      progress: 50,
      category: "Atendimento",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Marketing Conversacional",
      description: "Estratégias para usar chatbots no seu funil de marketing.",
      lessons: 10,
      progress: 30,
      category: "Marketing",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      title: "Integrando IA em Chatbots",
      description: "Aprenda a usar IA para criar chatbots mais inteligentes.",
      lessons: 15,
      progress: 0,
      category: "IA",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      title: "WhatsApp Business API Avançado",
      description: "Explore recursos avançados da API do WhatsApp Business.",
      lessons: 8,
      progress: 10,
      category: "Chatbots",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
  ];
  
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Meus Cursos" 
        description="Aprenda sobre chatbots, atendimento e marketing"
      >
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar cursos..."
            className="pl-8 w-full md:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </PageHeader>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Link key={course.id} to={`/member/courses/${course.id}`} className="block">
            <Card className="h-full card-hover overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                />
              </div>
              <CardHeader className="px-4 pb-0 pt-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {course.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {course.lessons} aulas
                  </span>
                </div>
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <CardDescription className="line-clamp-2">{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="px-4 pt-4">
                <div className="flex items-center gap-4">
                  <Progress value={course.progress} className="h-2" />
                  <span className="text-sm font-medium whitespace-nowrap">
                    {course.progress}%
                  </span>
                </div>
              </CardContent>
              <CardFooter className="px-4 pt-2 pb-4">
                <Button variant="outline" className="w-full">
                  {course.progress === 0 ? "Começar curso" : "Continuar curso"}
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Courses;
