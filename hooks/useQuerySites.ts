import { useQuery } from "react-query";
import { supabase } from "@/utils/supabase";
import { Site } from "@/types";


export const useQuerySites = () => {
  
  const getSites =async () => {
    const { data, error } = await supabase
      .from('sites')
      .select('*')
      .order('created_at', { ascending: true })
    
    if (error) {
      throw new Error(error.message)
    }
    return data
  } 
  
  return useQuery<Site[], Error>({
    queryKey: ['sites'],
    queryFn: getSites,
    staleTime: Infinity,
    })
}
