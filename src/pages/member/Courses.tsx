
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import PageHeader from "@/components/PageHeader";
import { courseService, type Course } from "@/services/courseService";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface MemberCourse extends Course {
  progress: number;
  lessons: number;
}

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState<MemberCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetchCourses();
  }, []);
  
  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      // Fetch courses from the database
      const coursesData = await courseService.getCourses();
      
      // Fetch modules and lessons count for each course
      const coursesWithModules = await Promise.all(
        coursesData.map(async (course) => {
          const modules = await courseService.getModules(course.id);
          
          // Calculate total lessons
          const lessonsCount = modules.reduce((total, module) => {
            return total + module.lessons.length;
          }, 0);
          
          // Fetch user progress for this course (if any)
          const { data: progressData } = await supabase
            .from('user_progress')
            .select('progress')
            .eq('course_id', course.id)
            .maybeSingle();
          
          return {
            ...course,
            lessons: lessonsCount,
            progress: progressData?.progress || 0,
          };
        })
      );
      
      setCourses(coursesWithModules);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Erro ao carregar cursos", {
        description: "Ocorreu um erro ao buscar os cursos. Tente novamente mais tarde."
      });
    } finally {
      setIsLoading(false);
    }
  };
  
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
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <p className="text-muted-foreground">Carregando cursos...</p>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Nenhum curso encontrado</h3>
          <p className="text-muted-foreground">
            {searchQuery ? "Tente uma busca diferente" : "Novos cursos serão adicionados em breve"}
          </p>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Courses;
