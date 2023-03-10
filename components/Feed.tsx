import { FC,useState } from "react";
import { useQuerySites } from "@/hooks/useQuerySites";
import { SiteItem } from "./SiteItem";
import { Top } from "./Top";
import { MapItem } from "./MapItem";
import { AdminUpdateSite } from "./AdminUpdateSite";

import {Stikey} from './Stikey'

import React from 'react';
import classes from './Feed.module.css'



export const Feed: FC= () => {
    const { data: sites } = useQuerySites()
    
  const [openEdit, setOpenEdit] = useState(false);

  const changeState = (isState:any) => {
 setOpenEdit(isState)
}


  
  return (
    
        <>
        <Top />
      
        <div className='snap-start w-screen h-screen'>   
           <MapItem />
        </div> 
    
        <div className="w-full snap-y snap-mandatory h-screen  overflow-scroll"> 
          <div className='font-rich'>
            {sites?.map((site) => (
                  
                  <SiteItem
                    key={site.id}
                    id={site.id}
                    user_id={site.user_id}
                    created_at={site.created_at}
                    title={site.title}
                    main_url={site.main_url}
                    hitokoto={site.hitokoto}
                    pros={site.pros}
                    cons={site.cons}
                    jikabi={site.jikabi}
                    view={site.view}
                    pegs={site.pegs}
                    rubbish={site.rubbish}
                    sumi={site.sumi}
                    baggage={site.baggage}
                    style={site.style}
                    food={site.food}
                    onsen={site.onsen}
                    water={site.water}
                    other={site.other}
                    reserve={site.reserve}
                adress={site.adress}
                price={site.price}
                />
                
              ))}
          </div> 
        
         
    </div>
</>         
  )
}
