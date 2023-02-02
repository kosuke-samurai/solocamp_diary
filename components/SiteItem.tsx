import { FC, useState, memo } from "react";
import Image from "next/image";
import {
  PencilAltIcon,
  TrashIcon,
  ExclamationCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/solid'
import { ChatAlt2Icon } from '@heroicons/react/outline'
import { Spinner } from "./Spinner";
import useStore from "@/Store";
import { Site } from "@/types";
import { useMutateSite } from "@/hooks/useMutateSite";
import { useDownloadUrl } from "@/hooks/useDownloadUrl";
import Link from "next/link";
import { AdminUpdateSite } from "@/components/AdminUpdateSite"
import {format} from 'date-fns'
import ja from "date-fns/locale/ja"

export const SiteItemMemo: FC<Site> = ({
    id,
    created_at,
    user_id,
    title,
    main_url,
    hitokoto,
    pros,
    cons,
    jikabi,
    view,
    pegs,
    rubbish,
    sumi,
    baggage,
    style,
    food,
    onsen,
    water,
    other,
    reserve,
    adress,
}) => {

    
    const session = useStore((state) => state.session)
    const update = useStore((state) => state.updatedEditedSite)
    const { deleteSiteMutation } = useMutateSite()
    const { fullUrl: mainUrl, isLoading: isLoadingMainImg } = useDownloadUrl(
        main_url,
        'main'
    ) 

  
    
    //追記↓
    const [openEdit, setOpenEdit] = useState(false)

  return (
      <>
{!openEdit && (
        <li className="w-80">
        <div className="my-3 w-full border border-dashed border-gray-400" />
        <div className="flex items-center justify-between">

        <div className="flex">
            <span className="ml-2 font-bold">{title}</span>            
            {!created_at ? <Spinner/> : (<span className="ml-2 font-bold">{format(new Date(created_at), 'MM/dd(E) HH:mm', { locale: ja })}</span>)} 
            <span className="ml-2 font-bold">{hitokoto}</span>            
            <span className="ml-2 font-bold">{pros}</span>                       
            <span className="ml-2 font-bold">{cons}</span>            
            <span className="ml-2 font-bold">{jikabi}</span> 
            <span className="ml-2 font-bold">{view}</span>            
            <span className="ml-2 font-bold">{pegs}</span>                     
            <span className="ml-2 font-bold">{rubbish}</span>            
            <span className="ml-2 font-bold">{sumi}</span>                   
            <span className="ml-2 font-bold">{baggage}</span>            
            <span className="ml-2 font-bold">{style}</span>             
            <span className="ml-2 font-bold">{food}</span>            
            <span className="ml-2 font-bold">{onsen}</span>            
            <span className="ml-2 font-bold">{water}</span>
            <span className="ml-2 font-bold">{other}</span>     
            <span className="ml-2 font-bold">{reserve}</span>            
            <span className="ml-2 font-bold">{adress}</span>
        </div>

                   {session?.user?.id === user_id && (
                      
                      <div className="flex pr-4">
                          
                              <PencilAltIcon
                              className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
                                  onClick={() => {
                                    setOpenEdit(!openEdit)
                                    update({
                                        id: id,
                                        title: title,
                                        main_url: main_url,
                                        hitokoto: hitokoto,
                                        pros: pros,
                                        cons: cons,
                                        jikabi: jikabi,
                                        view: view,
                                        pegs: pegs,
                                        rubbish: rubbish,
                                        sumi: sumi,
                                        baggage: baggage,
                                        style: style,
                                        food: food,
                                        onsen: onsen,
                                        water: water,
                                        other: other,
                                        reserve: reserve,
                                        adress: adress,
                  })
                                  }}
                                   /> 
                           
                          <TrashIcon
                              className="h-5 w-5 cursor-pointer text-blue-500"
                              onClick={() => {
                                  deleteSiteMutation.mutate(id)
                              }}
                          />
                      </div>
                  )}              
        </div>


        <div className="my-3 flex justify-center">
          {mainUrl && (
            <Image
              src={mainUrl}
              alt="Image"
              className="rounded-lg"
              width={300}
              height={220}
            />
          )} 
        </div>
        <div className="my-3 flex justify-center">
          {isLoadingMainImg  && <Spinner />}
        </div>                
     </li>
)}
          
          {session?.user?.id === user_id && openEdit && (
            <div className="w-10/12 mx-auto md:max-w-md">
              <AdminUpdateSite />
                  <button
                      className="w-full flex justify-center my-5 rounded bg-indigo-600 px-3 py-2 text-sm font-medium text-white"
                      onClick={() => { setOpenEdit(!openEdit) }}>戻る</button>
            </div>
    )}
      </>
  )
}

export const SiteItem = memo(SiteItemMemo)