import { FC } from "react";
import { useQuerySites } from "@/hooks/useQuerySites";
import { SiteItem } from "./SiteItem";
import { Top } from "./Top";
import {AdminUpdateSite} from "./AdminUpdateSite";

import React from 'react';
import classes from './Feed.module.css'



export const Feed: FC = () => {
    const { data: sites } = useQuerySites()
    

  return (
      <>
    <div className={classes.fullscreen}>
        <div className={classes.container}>         
            <Top />
        </div> 
        <div className={classes.container}>   
           <Top />
        </div> 
          {/* <ul data-testid="ul-post" className="my-5">
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
                  />
              ))}
          </ul> */}
    </div>
          {}
{/* <AdminUpdateSite /> */}
      </>
  )
}
