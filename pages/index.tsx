import type { NextPage } from "next"
import { useEffect } from "react"
import useStore from "@/Store"
import { supabase } from "@/utils/supabase"
import { Feed } from "@/components/Feed"
import { Layout } from '@/components/Layout'
import classes from '../components/Layout.module.css'

const Home: NextPage = () => {
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
<div className={classes.layout}>
        <Layout />
</div>

<div className={classes.layout}>
        <Feed />
</div>


    </> 
  )
}

export default Home