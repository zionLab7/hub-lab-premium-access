
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Material {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  download_url: string;
}

export const materialService = {
  async getMaterials() {
    const { data, error } = await supabase
      .from('materials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error("Erro ao carregar materiais", {
        description: error.message
      });
      return [];
    }

    return data;
  },

  async createMaterial(material: Omit<Material, 'id'>) {
    const { data, error } = await supabase
      .from('materials')
      .insert(material)
      .select()
      .single();

    if (error) {
      toast.error("Erro ao criar material", {
        description: error.message
      });
      return null;
    }

    toast.success("Material criado com sucesso!");
    return data;
  },

  async deleteMaterial(id: string) {
    const { error } = await supabase
      .from('materials')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error("Erro ao remover material", {
        description: error.message
      });
      return false;
    }

    toast.success("Material removido com sucesso!");
    return true;
  }
};
