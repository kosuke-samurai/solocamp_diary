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

//追記↓CSS
if (typeof window !== "undefined") {
 
const setFillHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

let vw = window.innerWidth;

window.addEventListener('resize', () => {
  if (vw === window.innerWidth) {
  // 画面の横幅にサイズ変動がないので処理を終える
    return;
  }

  // 画面の横幅のサイズ変動があった時のみ高さを再計算する
  vw = window.innerWidth;
  setFillHeight();
});

// 初期化
setFillHeight(); 
}

  return (
      <>
      {!openEdit && (
<div className='snap-start w-screen h-screen'>

        <div>
          {mainUrl && (
          <div className={classes.image_container}>    
            <Image
              src={mainUrl}
              alt="Image"
              className=""
              width={500}
              height={20}
                />
            <div className={classes.site_title}>
                  <h1 className="text-2xl font-bold">{title}</h1>
                  <p className="text-xs">{hitokoto}</p>
            </div>
          </div>
          )} 
        </div>
        <div>
          {isLoadingMainImg  && <Spinner />}
        </div>             
       
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
            <Button><Box sx={{ flexDirection: 'column' }}><LocalFireDepartmentIcon fontSize="small"/><p className='font-rich text-xs'>直火{jikabi}</p></Box></Button>
            <Button><Box sx={{ flexDirection: 'column' }}><CameraAltIcon fontSize="small" /><br/><p className='font-rich text-xs'>{view}</p></Box></Button>
            <Button><Box sx={{ flexDirection: 'column' }}><StorefrontIcon fontSize="small"/><br/><p className='font-rich text-xs'>容易</p></Box></Button>
            <Button><Box sx={{ flexDirection: 'column' }}><DeleteIcon fontSize="small" /><br /><p className='font-rich text-xs'>{rubbish}</p></Box></Button>
            <Button><Box sx={{ flexDirection: 'column' }}><BusinessCenterIcon fontSize="small"/><br/><p className='font-rich text-xs'>{baggage}</p></Box></Button>
        </ButtonGroup>

        <ButtonGroup variant="text" color='inherit' aria-label="text button group" fullWidth={true} >
            <Button><Box sx={{ flexDirection: 'column' }}><LocalDrinkIcon fontSize="small"/><br/><p className='font-rich text-xs'>{water}</p></Box></Button>
            <Button><Box sx={{ flexDirection: 'column' }}><HardwareIcon fontSize="small" /><br/><p className='font-rich text-xs'>ペグ{pegs}</p></Box></Button>
            <Button><Box sx={{ flexDirection: 'column' }}><TakeoutDiningIcon fontSize="small"/><br/><p className='font-rich text-xs'>炭捨{sumi}</p></Box></Button>
            <Button><Box sx={{ flexDirection: 'column' }}><HikingIcon fontSize="small" /><br /><p className='font-rich text-xs'>{style}</p></Box></Button>
            <Button><Box sx={{ flexDirection: 'column' }}><CurrencyYenIcon fontSize="small"/><br/><p className='font-rich text-xs'>1500円</p></Box></Button>
          </ButtonGroup>            
        </Box >

  <div className="">
    <dl>
      <div className="bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-xs font-medium text-gray-500">イチオシPOINT</dt>
        <dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">{pros}</dd>
      </div>
      <div className="bg-white px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-xs font-medium text-gray-500">イマイチPOINT</dt>
        <dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">{cons}</dd>
      </div>
      <div className="bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-xs font-medium text-gray-500">お風呂</dt>
        <dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">{onsen}</dd>
      </div>
      <div className="bg-white px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-xs font-medium text-gray-500">その他</dt>
        <dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">{other}</dd>
      </div>
      <div className="bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-xs font-medium text-gray-500">予約</dt>
        <dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">{reserve}</dd>
      </div>
   </dl>      

  <div className="flex">
              {!created_at ? <Spinner /> : (<p className="text-xs">投稿日時：{format(new Date(created_at), 'MM/dd(E) HH:mm', { locale: ja })}</p>)}
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
         
        
</div>
</div>
)}
          
          {session?.user?.id === user_id && openEdit && (
        <div>  
        <div className="w-10/12 mx-auto md:max-w-md">
              <AdminUpdateSite />
                  <button
                      className="w-full flex justify-center my-5 rounded bg-indigo-600 px-3 py-2 text-sm font-medium text-white"
                      onClick={() => { setOpenEdit(!openEdit) }}>戻る</button>
          </div>
        </div>  
    )}
      </>
  )
}

export const SiteItem = memo(SiteItemMemo)