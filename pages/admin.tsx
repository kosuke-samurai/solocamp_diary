import type { NextPage } from "next"
import { useEffect } from "react"
import useStore from "@/Store"
import { supabase } from "@/utils/supabase"
import { Auth } from "@/components/Auth"
import { AdminUpload } from '../components/AdminUpload'

const Admin: NextPage = () => {
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
      {!session ? <Auth /> : <AdminUpload />}
    </>
  )
}

export default Admin