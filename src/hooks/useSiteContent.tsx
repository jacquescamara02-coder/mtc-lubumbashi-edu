import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type TextRow = { key: string; value: string };
type ImageRow = { key: string; image_url: string | null };

export const useAllSiteTexts = () =>
  useQuery({
    queryKey: ["site_texts_all"],
    staleTime: 60_000,
    queryFn: async (): Promise<Record<string, string>> => {
      const { data, error } = await supabase
        .from("site_texts")
        .select("key,value");
      if (error) throw error;
      const map: Record<string, string> = {};
      (data as TextRow[] | null)?.forEach((r) => {
        if (r.value != null) map[r.key] = r.value;
      });
      return map;
    },
  });

export const useAllSiteImages = () =>
  useQuery({
    queryKey: ["site_images_all"],
    staleTime: 60_000,
    queryFn: async (): Promise<Record<string, string>> => {
      const { data, error } = await supabase
        .from("site_images")
        .select("key,image_url");
      if (error) throw error;
      const map: Record<string, string> = {};
      (data as ImageRow[] | null)?.forEach((r) => {
        if (r.image_url) map[r.key] = r.image_url;
      });
      return map;
    },
  });

export const useSiteText = (key: string, fallback: string): string => {
  const { data } = useAllSiteTexts();
  return data?.[key] ?? fallback;
};

export const useSiteImage = (key: string, fallback: string): string => {
  const { data } = useAllSiteImages();
  return data?.[key] || fallback;
};