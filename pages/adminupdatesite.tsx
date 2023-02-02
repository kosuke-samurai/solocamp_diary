import type { NextPage } from "next"
import { useEffect } from "react"
import useStore from "@/Store"
import { supabase } from "@/utils/supabase"
import { Auth } from "@/components/Auth"
import { AdminUpdateSite } from "@/components/AdminUpdateSite"

const Adminupdatesite:NextPage = () => {
  const session = useStore((state) => state.session)
  const setSession = useStore((state) => state.setSession)
  
  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [setSession])
  
  return (
    <>
      {!session ? <Auth /> : <AdminUpdateSite />}
    </>
  )
}

export default Adminupdatesite