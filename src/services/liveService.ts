
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Live {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  image: string;
  link: string;
  is_past: boolean;
  created_at: string;
}

export const liveService = {
  async getLives() {
    try {
      const { data, error } = await supabase
        .from('lives')
        .select('*')
        .order('date', { ascending: true });

      if (error) {
        toast.error("Erro ao carregar lives", {
          description: error.message
        });
        return [];
      }

      return data || [];
    } catch (error) {
      console.error("Error in getLives:", error);
      return [];
    }
  },

  async createLive(liveData: Omit<Live, 'id' | 'created_at'>) {
    try {
      const { data, error } = await supabase
        .from('lives')
        .insert([{
          title: liveData.title,
          description: liveData.description,
          date: liveData.date,
          time: liveData.time,
          image: liveData.image,
          link: liveData.link,
          is_past: liveData.is_past
        }])
        .select()
        .single();

      if (error) {
        toast.error("Erro ao criar live", {
          description: error.message
        });
        return null;
      }

      toast.success("Live criada com sucesso!");
      return data;
    } catch (error) {
      console.error("Error in createLive:", error);
      return null;
    }
  }
};
