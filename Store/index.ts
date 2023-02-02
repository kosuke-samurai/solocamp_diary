import create from 'zustand'
import { Session } from '@supabase/supabase-js'
import { EditedSite } from '@/types'

type State = {
    session: Session | null
    setSession: (payload: Session | null) => void

    editedSite: EditedSite
    updatedEditedSite: (payload: EditedSite) => void
    resetEditedSite: () => void
    
}

const useStore = create<State>((set) => ({
    session: null,
    setSession: (payload) => set({ session: payload }),
    
    editedSite: {
    id: '',
    // created_at: 
    user_id: '',
    title: '',
    main_url: '',
    hitokoto: '',
    pros: '',
    cons: '',
    jikabi: '',
    view: '',
    pegs: '',
    rubbish: '',
    sumi: '',
    baggage: '',
    style: '',
    food: '',
    onsen: '',
    water: '',
    other: '',
    reserve: '',
    adress: ''
    },

    updatedEditedSite: (payload) =>
        set({
            editedSite: {
                id: payload.id,
                // created_at: 
                // user_id: payload.user_id,
                title: payload.title,
                main_url: payload.main_url,
                hitokoto: payload.hitokoto,
                pros: payload.pros,
                cons: payload.cons,
                jikabi: payload.jikabi,
                view: payload.view,
                pegs: payload.pegs,
                rubbish: payload.rubbish,
                sumi: payload.sumi,
                baggage: payload.baggage,
                style: payload.style,
                food: payload.food,
                onsen: payload.onsen,
                water: payload.water,
                other: payload.other,
                reserve: payload.reserve,
                adress: payload.adress,
            },
        }),
    
    resetEditedSite: () =>
        set({
            editedSite:
            {
    id: '',
    // created_at: 
    // user_id: '',
    title: '',
    main_url: '',
    hitokoto: '',
    pros: '',
    cons: '',
    jikabi: '',
    view: '',
    pegs: '',
    rubbish: '',
    sumi: '',
    baggage: '',
    style: '',
    food: '',
    onsen: '',
    water: '',
    other: '',
    reserve: '',
    adress: ''
            }
        }),
}))

export default useStore