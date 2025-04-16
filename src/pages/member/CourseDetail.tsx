
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Play, CheckCircle, Circle, Download, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  videoUrl: string;
}

interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

interface Material {
  id: number;
  title: string;
  description: string;
  downloadUrl: string;
}

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeVideo, setActiveVideo] = useState<string>("");
  
  // Mock data - this would come from an API in a real application
  const courseDetails = {
    id: Number(id),
    title: "Fundamentos de Chatbots",
    description: "Aprenda os conceitos básicos para criar chatbots eficientes e como aplicá-los em diferentes plataformas. Este curso cobre desde a teoria básica até implementações práticas.",
    progress: 80,
    instructor: "Alex Silva",
    category: "Chatbots",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    modules: [
      {
        id: 1,
        title: "Introdução aos Chatbots",
        lessons: [
          {
            id: 101,
            title: "O que são chatbots e como funcionam",
            duration: "15:30",
            completed: true,
            locked: false,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          },
          {
            id: 102,
            title: "História e evolução dos chatbots",
            duration: "12:45",
            completed: true,
            locked: false,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          },
          {
            id: 103,
            title: "Tipos de chatbots no mercado",
            duration: "18:20",
            completed: true,
            locked: false,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          },
        ],
      },
      {
        id: 2,
        title: "Construindo seu Primeiro Chatbot",
        lessons: [
          {
            id: 201,
            title: "Planejamento e estratégia",
            duration: "22:15",
            completed: true,
            locked: false,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          },
          {
            id: 202,
            title: "Fluxos de conversação básicos",
            duration: "25:40",
            completed: true,
            locked: false,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          },
          {
            id: 203,
            title: "Implementação prática",
            duration: "30:10",
            completed: false,
            locked: false,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          },
          {
            id: 204,
            title: "Testes e otimização",
            duration: "20:30",
            completed: false,
            locked: true,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          },
        ],
      },
    ],
    materials: [
      {
        id: 1,
        title: "Guia de Boas Práticas",
        description: "Manual com as melhores práticas para chatbots eficientes",
        downloadUrl: "#",
      },
      {
        id: 2,
        title: "Templates de Fluxos",
        description: "Templates prontos para diferentes tipos de chatbots",
        downloadUrl: "#",
      },
      {
        id: 3,
        title: "Checklist de Implementação",
        description: "Lista de verificação para garantir a qualidade do seu chatbot",
        downloadUrl: "#",
      },
    ],
  };
  
  // Calculate total lessons and completed lessons
  const totalLessons = courseDetails.modules.reduce(
    (total, module) => total + module.lessons.length, 
    0
  );
  
  const completedLessons = courseDetails.modules.reduce(
    (total, module) => 
      total + module.lessons.filter(lesson => lesson.completed).length, 
    0
  );
  
  const handleLessonClick = (lesson: Lesson) => {
    if (!lesson.locked) {
      setActiveVideo(lesson.videoUrl);
    }
  };
  
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Button asChild variant="ghost" size="sm" className="gap-1">
          <Link to="/member/courses">
            <ChevronLeft className="h-4 w-4" /> Voltar aos cursos
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            {activeVideo ? (
              <iframe
                className="w-full h-full"
                src={activeVideo}
                title="Course video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <div className="text-center px-4">
                  <Play className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">Selecione uma aula para começar</p>
                  <p className="text-muted-foreground">Clique em uma aula no menu ao lado para assistir</p>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <h1 className="text-2xl font-bold mb-2">{courseDetails.title}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <span>Instrutor: {courseDetails.instructor}</span>
              <span>•</span>
              <span>Categoria: {courseDetails.category}</span>
            </div>
            <p className="text-muted-foreground">{courseDetails.description}</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-medium">Seu progresso</h3>
                <p className="text-sm text-muted-foreground">
                  {completedLessons} de {totalLessons} aulas concluídas
                </p>
              </div>
              <span className="text-lg font-semibold">{Math.round((completedLessons / totalLessons) * 100)}%</span>
            </div>
            <Progress value={(completedLessons / totalLessons) * 100} className="h-2" />
          </div>
          
          <Tabs defaultValue="content">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="content">Conteúdo do Curso</TabsTrigger>
              <TabsTrigger value="materials">Materiais de Apoio</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="pt-4">
              <Accordion type="single" collapsible className="bg-white rounded-lg border">
                {courseDetails.modules.map((module) => (
                  <AccordionItem key={module.id} value={module.id.toString()}>
                    <AccordionTrigger className="px-4 hover:no-underline">
                      <div className="text-left">
                        <h3 className="font-medium">{module.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {module.lessons.length} aulas
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <ul className="space-y-2">
                        {module.lessons.map((lesson) => (
                          <li 
                            key={lesson.id}
                            onClick={() => handleLessonClick(lesson)}
                            className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                              lesson.locked ? "opacity-70" : "hover:bg-muted"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {lesson.completed ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : lesson.locked ? (
                                <Lock className="h-5 w-5 text-muted-foreground" />
                              ) : (
                                <Circle className="h-5 w-5 text-muted-foreground" />
                              )}
                              <div>
                                <p className={`font-medium ${lesson.locked ? "text-muted-foreground" : ""}`}>
                                  {lesson.title}
                                </p>
                                {lesson.locked && (
                                  <p className="text-xs text-muted-foreground">
                                    Complete as aulas anteriores para desbloquear
                                  </p>
                                )}
                              </div>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {lesson.duration}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
            
            <TabsContent value="materials" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courseDetails.materials.map((material) => (
                  <Card key={material.id} className="card-hover">
                    <CardContent className="p-4 flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Download className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{material.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {material.description}
                        </p>
                        <Button size="sm" variant="outline" asChild className="w-full sm:w-auto">
                          <a href={material.downloadUrl} download>
                            Download
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold text-lg">Módulos do curso</h3>
              <div className="space-y-2">
                {courseDetails.modules.map((module) => (
                  <div key={module.id} className="p-3 rounded-md bg-muted">
                    <h4 className="font-medium">{module.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {module.lessons.length} aulas
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold text-lg">Compartilhar curso</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">Twitter</Button>
                <Button variant="outline" size="sm" className="flex-1">Facebook</Button>
                <Button variant="outline" size="sm" className="flex-1">LinkedIn</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
