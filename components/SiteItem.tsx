import { FC, useState, memo } from "react";
import Image from "next/image";
import {
  PencilAltIcon,
  TrashIcon,
} from '@heroicons/react/solid'
import { Spinner } from "./Spinner";
import useStore from "@/Store";
import { Site } from "@/types";
import { useMutateSite } from "@/hooks/useMutateSite";
import { useDownloadUrl } from "@/hooks/useDownloadUrl";
import { AdminUpdateSite } from "@/components/AdminUpdateSite"
import {format} from 'date-fns'
import ja from "date-fns/locale/ja"

import classes from "./SiteItem.module.css"

import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Box from '@mui/material/Box'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import HardwareIcon from '@mui/icons-material/Hardware';
import TakeoutDiningIcon from '@mui/icons-material/TakeoutDining';
import HikingIcon from '@mui/icons-material/Hiking';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';

import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';



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
    price,
}) => {


    
    const session = useStore((state) => state.session)
    const update = useStore((state) => state.updatedEditedSite)
    const { deleteSiteMutation } = useMutateSite()
    const { fullUrl: mainUrl, isLoading: isLoadingMainImg } = useDownloadUrl(
        main_url,
        'main'
    ) 

  
    
    //?????????
    const [openEdit, setOpenEdit] = useState(false)



  
//?????????CSS
if (typeof window !== "undefined") {
 
const setFillHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

let vw = window.innerWidth;

window.addEventListener('resize', () => {
  if (vw === window.innerWidth) {
  // ??????????????????????????????????????????????????????????????????
    return;
  }

  // ??????????????????????????????????????????????????????????????????????????????
  vw = window.innerWidth;
  setFillHeight();
});

// ?????????
setFillHeight(); 
}
  
  
  
 
  return (
      <>
      {!openEdit && (

<div className='snap-start w-screen h-screen'>

        
            {mainUrl && (
              <>
          <div className={classes.image_container}>       
            <Image
              src={mainUrl}
              alt="Image"
              className=""
              width={500}
              height={20}
               layout='responsive' 
        
                  
                />
            <div className={classes.site_title}>
                  <h1 className="text-2xl font-bold">{title}</h1>
                  <p className="text-xs">{hitokoto}</p>
            </div>
  
          
       
        <div>
          {isLoadingMainImg  && <Spinner />}
        </div> 

        <div className={classes.pc_site_text}>            
              <p className="text-xs"><LocationOnIcon fontSize='small' />{adress}</p>
        
              <Box
                      sx={{
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          '& > *': {
                              m: 1,
                          },

                      }
                      }
              > 
                    <ButtonGroup variant="text" color='inherit' aria-label="text button group" fullWidth={true} >
                        <Tooltip
                            PopperProps={{
                            sx: {top: "-50px !important"}
                            }}
                          title={<p className='font-rich'>??????</p>}
                          >
                          <Button disableRipple><Box sx={{ flexDirection: 'column' }}><LocalFireDepartmentIcon fontSize="small" /><p className='font-rich text-xs'>{jikabi}</p></Box></Button>
                        </Tooltip>
                      
                        <Tooltip
                            PopperProps={{
                            sx: {top: "-50px !important"}
                        }}
                          title={<p className='font-rich'>??????</p>}
                          >
                          <Button disableRipple><Box sx={{ flexDirection: 'column' }}><CameraAltIcon fontSize="small" /><br /><p className='font-rich text-xs'>{view}</p></Box></Button>
                        </Tooltip>
                      
                        <Tooltip
                            PopperProps={{
                              sx: { top: "-50px !important" }
                            }}
                            title={<p className='font-rich'>????????????</p>}
                              >
                          <Button disableRipple><Box sx={{ flexDirection: 'column' }}><StorefrontIcon fontSize="small" /><br /><p className='font-rich text-xs'>??????</p></Box></Button>
                        </Tooltip>
                        
                        <Tooltip
                            PopperProps={{
                            sx: {top: "-50px !important"}
                            }}
                          title={<p className='font-rich'>??????</p>}
                          >                
                          <Button disableRipple><Box sx={{ flexDirection: 'column' }}><DeleteIcon fontSize="small" /><br /><p className='font-rich text-xs'>{rubbish}</p></Box></Button>
                        </Tooltip>    
                      
                        <Tooltip
                            PopperProps={{
                            sx: {top: "-50px !important"}
                            }}
                          title={<p className='font-rich'>?????????</p>}
                          >  
                            <Button disableRipple><Box sx={{ flexDirection: 'column' }}><BusinessCenterIcon fontSize="small" /><br /><p className='font-rich text-xs'>{baggage}</p></Box></Button>
                        </Tooltip>   
            </ButtonGroup>

                    <ButtonGroup variant="text" color='inherit' aria-label="text button group" fullWidth={true} >
                      <Tooltip
                            PopperProps={{
                            sx: {top: "-50px !important"}
                            }}
                          title={<p className='font-rich'>?????????</p>}
                          >  
                            <Button disableRipple><Box sx={{ flexDirection: 'column' }}><LocalDrinkIcon fontSize="small"/><br/><p className='font-rich text-xs'>{water}</p></Box></Button>
                      </Tooltip>  
                      
                      <Tooltip
                            PopperProps={{
                            sx: {top: "-50px !important"}
                            }}
                          title={<p className='font-rich'>??????</p>}
                          >  
                        <Button disableRipple><Box sx={{ flexDirection: 'column' }}><HardwareIcon fontSize="small" /><br /><p className='font-rich text-xs'>{pegs}</p></Box></Button>
                      </Tooltip> 
                      
                      <Tooltip
                            PopperProps={{
                            sx: {top: "-50px !important"}
                            }}
                          title={<p className='font-rich'>????????????</p>}
                          >
                        <Button disableRipple><Box sx={{ flexDirection: 'column' }}><TakeoutDiningIcon fontSize="small" /><br /><p className='font-rich text-xs'>{sumi}</p></Box></Button>
                      </Tooltip>

                      <Tooltip
                            PopperProps={{
                            sx: {top: "-50px !important"}
                            }}
                          title={<p className='font-rich'>????????????</p>}
                          >
                        <Button disableRipple><Box sx={{ flexDirection: 'column' }}><HikingIcon fontSize="small" /><br /><p className='font-rich text-xs'>{style}</p></Box></Button>
                      </Tooltip>

                      <Tooltip
                            PopperProps={{
                            sx: {top: "-50px !important"}
                            }}
                          title={<p className='font-rich'>??????</p>}
                          >                 
                        <Button disableRipple><Box sx={{ flexDirection: 'column' }}><CurrencyYenIcon fontSize="small" /><br /><p className='font-rich text-xs'>{price}</p></Box></Button>
                      </Tooltip>     
                </ButtonGroup>            
              </Box >

        <div className="">
          <dl>
            <div className="md:bg-transparent bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="md:text-slate-200 text-xs font-medium text-gray-500">????????????POINT</dt>
              <dd className="md:text-white mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">{pros}</dd>
            </div>
            <div className="md:bg-transparent bg-white px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="md:text-slate-200 text-xs font-medium text-gray-500">????????????POINT</dt>
              <dd className="md:text-white mt-1 mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">{cons}</dd>
            </div>
            <div className="md:bg-transparent bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="md:text-slate-200 text-xs font-medium text-gray-500">?????????</dt>
              <dd className="md:text-white mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">{onsen}</dd>
            </div>
            <div className="md:bg-transparent bg-white px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="md:text-slate-200 text-xs font-medium text-gray-500">?????????</dt>
              <dd className="md:text-white mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">{other}</dd>
            </div>
            <div className="md:bg-transparent bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="md:text-slate-200 text-xs font-medium text-gray-500">??????</dt>
              <dd className="md:text-white mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">{reserve}</dd>
            </div>


      <div className="md:bg-transparent bg-white px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <div className="flex">
                    {!created_at ? <Spinner /> : (<dt className="md:text-slate-200 text-xs font-medium text-gray-500">???????????????{format(new Date(created_at), 'yyyy/MM/dd(E) HH:mm', { locale: ja })}</dt>)}
                          {session?.user?.id === user_id && (
                            
                            <div className="flex pr-4">
                                
                                    <PencilAltIcon
                                    className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
                                    onClick={() => {
                                          
                                          setOpenEdit(!openEdit);
                                        
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
                                            price: price,
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
            </div>
        </dl>             
        </div>                     
         
        

                  </div>
     </div>
</>          
)} 
       
            </div>
)}
          
          {session?.user?.id === user_id && openEdit && (
        <> 
        <div>
          <div className="relative">
            
              <AdminUpdateSite />
           
            <div className="absolute bottom-0 z-30 w-full sm:w-6/12 sm:left-1/4">
                  <button
                      className="w-full rounded bg-indigo-600 text-xs text-white py-1"
                onClick={() => { setOpenEdit(!openEdit) }}>??????</button>
            </div>
           </div>  
        </div>  
        </>  
    )}
      </>
  )
}

export const SiteItem = memo(SiteItemMemo)