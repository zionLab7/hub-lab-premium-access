
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
}

export interface Module {
  id: string;
  course_id: string;
  title: string;
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  duration: string;
  video_url: string;
}

export const courseService = {
  async getCourses() {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error("Erro ao carregar cursos", {
        description: error.message
      });
      return [];
    }

    return data;
  },

  async createCourse(course: Omit<Course, 'id'>) {
    const { data, error } = await supabase
      .from('courses')
      .insert(course)
      .select()
      .single();

    if (error) {
      toast.error("Erro ao criar curso", {
        description: error.message
      });
      return null;
    }

    toast.success("Curso criado com sucesso!");
    return data;
  },

  async getModules(courseId: string) {
    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .eq('course_id', courseId)
      .order('created_at', { ascending: true });

    if (error) {
      toast.error("Erro ao carregar módulos", {
        description: error.message
      });
      return [];
    }

    return data;
  },

  async createModule(module: Omit<Module, 'id'>) {
    const { data, error } = await supabase
      .from('modules')
      .insert(module)
      .select()
      .single();

    if (error) {
      toast.error("Erro ao criar módulo", {
        description: error.message
      });
      return null;
    }

    toast.success("Módulo criado com sucesso!");
    return data;
  },

  async getLessons(moduleId: string) {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('module_id', moduleId)
      .order('created_at', { ascending: true });

    if (error) {
      toast.error("Erro ao carregar aulas", {
        description: error.message
      });
      return [];
    }

    return data;
  },

  async createLesson(lesson: Omit<Lesson, 'id'>) {
    const { data, error } = await supabase
      .from('lessons')
      .insert(lesson)
      .select()
      .single();

    if (error) {
      toast.error("Erro ao criar aula", {
        description: error.message
      });
      return null;
    }

    toast.success("Aula criada com sucesso!");
    return data;
  }
};
