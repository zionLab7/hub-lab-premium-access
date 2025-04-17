
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Material {
  id: string;
  title: string;
  description: string;
  category: string;
  download_url: string;
  type: string;
  created_at: string;
}

export const materialService = {
  async getMaterials() {
    try {
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

      return data || [];
    } catch (error) {
      console.error("Error in getMaterials:", error);
      return [];
    }
  },

  async createMaterial(materialData: Omit<Material, 'id' | 'created_at'>) {
    try {
      const { data, error } = await supabase
        .from('materials')
        .insert({
          title: materialData.title,
          description: materialData.description,
          category: materialData.category,
          download_url: materialData.download_url,
          type: materialData.type
        })
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
    } catch (error) {
      console.error("Error in createMaterial:", error);
      return null;
    }
  }
};
