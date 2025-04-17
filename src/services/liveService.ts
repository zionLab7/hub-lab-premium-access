
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
  },

  async createLive(live: Omit<Live, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('lives')
      .insert(live)
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
  }
};
