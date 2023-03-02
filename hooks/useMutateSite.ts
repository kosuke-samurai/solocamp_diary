import { useMutation } from "react-query"
import useStore from "@/Store"
import { supabase } from "@/utils/supabase"
import { Site, EditedSite } from '../types'

export const useMutateSite = () => {
    const reset = useStore((state) => state.resetEditedSite)
    
    const createSiteMutation = useMutation(
        async (site: Omit<Site, 'id' | 'created_at'>) => {
            const { data, error } = await supabase
                .from('sites')
                .insert(site)
            if (error) throw new Error(error.message)
            return data
        },
        {
            onSuccess: () => {
                reset()
            },
            onError: (err: any) => {
                alert(err.message)
                reset()
        },
    }
    )

    const updateSiteMutation = useMutation(
        async (site: EditedSite) => {
            const { data, error } = await supabase
                .from('sites')
                .update({
                    // user_id: string | undefined
                    title: site.title,
                    main_url: site.main_url,
                    hitokoto: site.hitokoto,
                    pros: site.pros,
                    cons: site.cons,
                    jikabi: site.jikabi,
                    view: site.view,
                    pegs: site.pegs,
                    rubbish: site.rubbish,
                    sumi: site.sumi,
                    baggage: site.baggage,
                    style: site.style,
                    food: site.food,
                    onsen: site.onsen,
                    water: site.water,
                    other: site.other,
                    reserve: site.reserve,
                    adress: site.adress,
                    price: site.price
                })
                .eq('id', site.id)
            
            if (error) throw new Error(error.message)
            return data
        },
        {
            onSuccess: () => {
                reset()
            },
            onError: (err: any) => {
                alert(err.message)
                reset()
            },
        }
    )

    const deleteSiteMutation = useMutation(
        async (id: string) => {
            const { data, error } = await supabase
                .from('sites')
                .delete()
                .eq('id', id)
            if (error) throw new Error(error.message)
            return data  
        },
        {
            onSuccess: () => {
                reset()
            },
            onError: (err: any) => {
                alert(err.message)
                reset()
            },
        }
    )
    return {
      createSiteMutation,updateSiteMutation,deleteSiteMutation
  }
}
