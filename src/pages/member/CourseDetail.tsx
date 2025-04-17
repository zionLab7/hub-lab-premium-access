
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Play, CheckCircle, Circle, Download, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { courseService } from "@/services/courseService";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed?: boolean;
  locked?: boolean;
  video_url: string;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface Material {
  id: number;
  title: string;
  description: string;
  downloadUrl: string;
}

interface CourseDetailsType {
  id: string;
  title: string;
  description: string;
  progress: number;
  instructor: string;
  category: string;
  image: string;
  modules: Module[];
  materials: Material[];
}

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeVideo, setActiveVideo] = useState<string>("");
  const [courseDetails, setCourseDetails] = useState<CourseDetailsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState(0);
  const [totalLessons, setTotalLessons] = useState(0);
  
  useEffect(() => {
    if (!id) return;
    fetchCourseDetails(id);
  }, [id]);
  
  const fetchCourseDetails = async (courseId: string) => {
    setIsLoading(true);
    try {
      // Fetch course details
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();
      
      if (courseError) throw courseError;
      
      // Fetch modules and lessons
      const modules = await courseService.getModules(courseId);
      
      // Calculate total lessons
      const lessonsCount = modules.reduce((total, module) => {
        return total + module.lessons.length;
      }, 0);
      
      // Fetch user progress
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('progress')
        .eq('course_id', courseId)
        .maybeSingle();
      
      // Mark lessons as completed or locked based on progress
      let completedCount = 0;
      const processedModules = modules.map((module, moduleIndex) => {
        return {
          ...module,
          lessons: module.lessons.map((lesson, lessonIndex) => {
            // Calculate overall lesson index
            let overallIndex = 0;
            for (let i = 0; i < moduleIndex; i++) {
              overallIndex += modules[i].lessons.length;
            }
            overallIndex += lessonIndex;
            
            // Calculate if lesson should be completed based on progress
            const lessonThreshold = Math.floor((progressData?.progress || 0) / 100 * lessonsCount);
            const isCompleted = overallIndex < lessonThreshold;
            
            // Mark lessons as locked if previous lesson is not completed
            // First lesson is never locked
            const isLocked = overallIndex > 0 && 
              overallIndex > lessonThreshold &&
              !modules[moduleIndex].lessons[lessonIndex - 1]?.completed;
            
            if (isCompleted) completedCount++;
            
            return {
              ...lesson,
              completed: isCompleted,
              locked: isLocked,
              videoUrl: lesson.video_url, // Map from backend field to frontend field
            };
          })
        };
      });
      
      // Mock materials data for now
      const materials = [
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
      ];
      
      // Construct course details object
      const courseDetails: CourseDetailsType = {
        id: courseData.id,
        title: courseData.title,
        description: courseData.description,
        progress: progressData?.progress || 0,
        instructor: "Alex Silva", // Hardcoded for now
        category: courseData.category,
        image: courseData.image,
        modules: processedModules,
        materials: materials,
      };
      
      setCourseDetails(courseDetails);
      setTotalLessons(lessonsCount);
      setCompletedLessons(completedCount);
      
      // Set active video to first unlocked lesson if none is selected
      if (!activeVideo && processedModules.length > 0 && processedModules[0].lessons.length > 0) {
        const firstLesson = processedModules[0].lessons[0];
        if (!firstLesson.locked) {
          setActiveVideo(firstLesson.videoUrl);
        }
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
      toast.error("Erro ao carregar detalhes do curso", {
        description: "Ocorreu um erro ao buscar os detalhes do curso. Tente novamente mais tarde."
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLessonClick = (lesson: Lesson) => {
    if (!lesson.locked) {
      setActiveVideo(lesson.videoUrl);
    }
  };
  
  if (isLoading) {
    return (
      <div className="animate-fade-in flex items-center justify-center min-h-[50vh]">
        <p className="text-muted-foreground">Carregando curso...</p>
      </div>
    );
  }
  
  if (!courseDetails) {
    return (
      <div className="animate-fade-in space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <Button asChild variant="ghost" size="sm" className="gap-1">
            <Link to="/member/courses">
              <ChevronLeft className="h-4 w-4" /> Voltar aos cursos
            </Link>
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-xl font-semibold mb-2">Curso não encontrado</h2>
          <p className="text-muted-foreground mb-4">O curso que você está procurando não existe ou foi removido.</p>
          <Button asChild>
            <Link to="/member/courses">Ver todos os cursos</Link>
          </Button>
        </div>
      </div>
    );
  }
  
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
