
import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash, MoreHorizontal, FolderPlus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { courseService, type Course, type Module, type Lesson } from "@/services/courseService";
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
  DropdownMenuTrigger 
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import PageHeader from "@/components/PageHeader";
import { useToast } from "@/hooks/use-toast";

const AdminCourses = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);
  const [isAddLessonOpen, setIsAddLessonOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setIsLoading(true);
    const coursesData = await courseService.getCourses();
    setCourses(coursesData);
    setIsLoading(false);
  };

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newCourse = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d", // Default image for now
    };
    
    const course = await courseService.createCourse(newCourse);
    if (course) {
      setCourses([...courses, course]);
      setIsAddCourseOpen(false);
      form.reset();
    }
  };

  const handleAddModule = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newModule = {
      course_id: selectedCourseId as string,
      title: formData.get("title") as string,
    };
    
    const module = await courseService.createModule(newModule);
    if (module) {
      setModules([...modules, module]);
      setIsAddModuleOpen(false);
      form.reset();
    }
  };

  const handleAddLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newLesson = {
      module_id: selectedModuleId as string,
      title: formData.get("title") as string,
      duration: formData.get("duration") as string,
      video_url: formData.get("videoUrl") as string,
    };
    
    const lesson = await courseService.createLesson(newLesson);
    if (lesson) {
      const updatedModules = modules.map(module => {
        if (module.id === selectedModuleId) {
          return {
            ...module,
            lessons: [...module.lessons, lesson],
          };
        }
        return module;
      });
      
      setModules(updatedModules);
      setIsAddLessonOpen(false);
      form.reset();
    }
  };
  
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleDeleteCourse = (courseId: string) => {
    setCourses(courses.filter(course => course.id !== courseId));
    setModules(modules.filter(module => module.course_id !== courseId));
    
    toast({
      title: "Curso removido",
      description: "O curso foi removido com sucesso.",
    });
  };
  
  const handleDeleteModule = (moduleId: string) => {
    // Find course to update lesson count
    const moduleToDelete = modules.find(m => m.id === moduleId);
    
    setModules(modules.filter(module => module.id !== moduleId));
    
    toast({
      title: "Módulo removido",
      description: "O módulo foi removido com sucesso.",
    });
  };
  
  const handleDeleteLesson = (moduleId: string, lessonId: string) => {
    // Update module lessons
    const updatedModules = modules.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          lessons: module.lessons.filter(lesson => lesson.id !== lessonId),
        };
      }
      return module;
    });
    
    setModules(updatedModules);
    
    toast({
      title: "Aula removida",
      description: "A aula foi removida com sucesso.",
    });
  };
  
  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader 
        title="Gerenciar Cursos" 
        description="Adicione, edite e remova cursos, módulos e aulas"
      >
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar cursos..."
              className="pl-8 w-full md:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Novo Curso
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Curso</DialogTitle>
                <DialogDescription>
                  Preencha as informações para criar um novo curso.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleAddCourse} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título do Curso</Label>
                  <Input id="title" name="title" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Input id="category" name="category" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea id="description" name="description" rows={3} required />
                </div>
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddCourseOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Adicionar Curso</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </PageHeader>
      
      <Tabs defaultValue="courses" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
          <TabsTrigger value="courses">Cursos</TabsTrigger>
          <TabsTrigger value="modules">Módulos</TabsTrigger>
          <TabsTrigger value="lessons">Aulas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="courses">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="hidden md:table-cell">Descrição</TableHead>
                  <TableHead>Aulas</TableHead>
                  <TableHead className="w-[100px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      Nenhum curso encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.title}</TableCell>
                      <TableCell>{course.category}</TableCell>
                      <TableCell className="hidden md:table-cell max-w-md truncate">
                        {course.description}
                      </TableCell>
                      <TableCell>{course.lessons || 0}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <Dialog>
                              <DialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => {
                                  e.preventDefault();
                                  setSelectedCourseId(course.id);
                                  setIsAddModuleOpen(true);
                                }}>
                                  <FolderPlus className="mr-2 h-4 w-4" /> Adicionar Módulo
                                </DropdownMenuItem>
                              </DialogTrigger>
                            </Dialog>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" /> Editar Curso
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDeleteCourse(course.id)}
                            >
                              <Trash className="mr-2 h-4 w-4" /> Remover Curso
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
        </TabsContent>
        
        <TabsContent value="modules">
          <div className="flex justify-end mb-4">
            <Dialog open={isAddModuleOpen} onOpenChange={setIsAddModuleOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <FolderPlus className="h-4 w-4" />
                  Novo Módulo
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Módulo</DialogTitle>
                  <DialogDescription>
                    Preencha as informações para criar um novo módulo.
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleAddModule} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="courseId">Curso</Label>
                    <select 
                      id="courseId" 
                      name="courseId"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      onChange={(e) => setSelectedCourseId(e.target.value)}
                      required
                    >
                      <option value="">Selecione um curso</option>
                      {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="title">Título do Módulo</Label>
                    <Input id="title" name="title" required />
                  </div>
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsAddModuleOpen(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit">Adicionar Módulo</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Curso</TableHead>
                  <TableHead>Aulas</TableHead>
                  <TableHead className="w-[100px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {modules.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      Nenhum módulo encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  modules.map((module) => {
                    const course = courses.find(c => c.id === module.course_id);
                    return (
                      <TableRow key={module.id}>
                        <TableCell className="font-medium">{module.title}</TableCell>
                        <TableCell>{course?.title || "Curso não encontrado"}</TableCell>
                        <TableCell>{module.lessons.length}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem 
                                onClick={() => {
                                  setSelectedModuleId(module.id);
                                  setIsAddLessonOpen(true);
                                }}
                              >
                                <FileText className="mr-2 h-4 w-4" /> Adicionar Aula
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" /> Editar Módulo
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => handleDeleteModule(module.id)}
                              >
                                <Trash className="mr-2 h-4 w-4" /> Remover Módulo
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
          
          <Dialog open={isAddLessonOpen} onOpenChange={setIsAddLessonOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Nova Aula</DialogTitle>
                <DialogDescription>
                  Preencha as informações para criar uma nova aula.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleAddLesson} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título da Aula</Label>
                  <Input id="title" name="title" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Duração (ex: 15:30)</Label>
                  <Input id="duration" name="duration" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="videoUrl">URL do Vídeo</Label>
                  <Input id="videoUrl" name="videoUrl" required />
                </div>
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddLessonOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Adicionar Aula</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        <TabsContent value="lessons">
          {modules.map((module) => {
            const course = courses.find(c => c.id === module.course_id);
            
            return (
              <div key={module.id} className="mb-8">
                <h3 className="text-lg font-semibold mb-2">
                  {module.title} 
                  <span className="text-sm font-normal text-muted-foreground ml-2">
                    ({course?.title || "Curso não encontrado"})
                  </span>
                </h3>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Título</TableHead>
                        <TableHead>Duração</TableHead>
                        <TableHead className="hidden md:table-cell">URL do Vídeo</TableHead>
                        <TableHead className="w-[100px]">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {module.lessons.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                            Nenhuma aula neste módulo
                          </TableCell>
                        </TableRow>
                      ) : (
                        module.lessons.map((lesson) => (
                          <TableRow key={lesson.id}>
                            <TableCell className="font-medium">{lesson.title}</TableCell>
                            <TableCell>{lesson.duration}</TableCell>
                            <TableCell className="hidden md:table-cell truncate max-w-md">
                              <a 
                                href={lesson.video_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                              >
                                {lesson.video_url}
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
                                    <Edit className="mr-2 h-4 w-4" /> Editar Aula
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-destructive"
                                    onClick={() => handleDeleteLesson(module.id, lesson.id)}
                                  >
                                    <Trash className="mr-2 h-4 w-4" /> Remover Aula
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
              </div>
            );
          })}
          
          {modules.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum módulo encontrado para exibir aulas
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminCourses;
