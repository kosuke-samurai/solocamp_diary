import { FormEvent, FC, memo } from "react";
import Image from "next/image";
import { LogoutIcon, CameraIcon } from "@heroicons/react/solid";
import useStore from "@/Store";
import { useMutateSite } from "@/hooks/useMutateSite";
import { useUploadMainImg } from "@/hooks/useUploadMainImg";
import { Spinner } from "./Spinner";
import { supabase } from "@/utils/supabase";
import { useDownloadUrl } from "@/hooks/useDownloadUrl";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState } from "react";

import classes from "./SiteItem.module.css"
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

export const AdminUpdateSiteMemo: FC = () => {
    const session = useStore((state) => state.session)
    const editedSite = useStore((state) => state.editedSite)
    const update = useStore((state) => state.updatedEditedSite)
    const resetsite = useStore((state)=>state.resetEditedSite)
    
    const { updateSiteMutation } = useMutateSite()
    const { useMutateUploadMainImg } = useUploadMainImg()

    const { fullUrl: mainUrl, setFullUrl } = useDownloadUrl(
        editedSite.main_url,
        'main'
    )
    
    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (editedSite.id !== '') {
            await updateSiteMutation.mutateAsync({
                id: editedSite.id,
                title: editedSite.title,
                main_url: editedSite.main_url,
                hitokoto: editedSite.hitokoto,
                pros: editedSite.pros,
                cons: editedSite.cons,
                jikabi: editedSite.jikabi,
                view: editedSite.view,
                pegs: editedSite.pegs,
                rubbish: editedSite.rubbish,
                sumi: editedSite.sumi,
                baggage: editedSite.baggage,
                style: editedSite.style,
                food: editedSite.food,
                onsen: editedSite.onsen,
                water: editedSite.water,
                other: editedSite.other,
                reserve: editedSite.reserve,
              adress: editedSite.adress,
                price: editedSite.price,
            })
            setFullUrl('')
        }
        
    }

    const signOut = () => {
        resetsite()
        supabase.auth.signOut()
    }


    return (
        <>
            
            {/* <p>管理者：{session?.user?.email}</p>
            <LogoutIcon
                className='my-6 h-6 w-6 curor-pointer text-blue-500'
                onClick={signOut} /> */}
<div className='snap-start w-screen h-screen'>
<div className='font-rich'>         
    <form onSubmit={submitHandler}>
      <div className={classes.image_container}>
          <Image
              src={mainUrl}
              alt="Image"
              className=""
              width={500}
              height={20}
               layout='responsive'  
            />


      <div className={classes.site_title_update}>
        
        <label htmlFor="main" className="flex"></label>
        <input
          className="block w-full text-xs p-10
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-xs file:font-semibold
      file:bg-gray-500/50 file:text-black
      hover:file:bg-gray-100"
          type="file"
          id="main"
          accept="image/*"
          onChange={(e) => useMutateUploadMainImg.mutate(e)}
          />          
              
        <input
          className="bg-transparent text-2xl font-bold border outline-none"
          type="text"    
            value={editedSite.title || ''}
            onChange={(e) => update({ ...editedSite, title: e.target.value })}
                />  
        <input
          className="bg-transparent text-xs w-full border outline-none"
          type="text"
          value={editedSite.hitokoto || ''}
          onChange={(e) => update({ ...editedSite,hitokoto: e.target.value })}
        />
      </div>      


     <div className={classes.pc_site_text}> 
              <p className="text-xs"><LocationOnIcon fontSize='small' />
                <input
                className='border w-10/12 outline-none'
                type="text"
                value={editedSite.adress || ''}
                onChange={(e) => update({ ...editedSite, adress: e.target.value })}
                  />   
              </p>

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
                  <Button><Box sx={{ flexDirection: 'column' }}><LocalFireDepartmentIcon fontSize="small" /><p className='font-rich text-xs'>直火
                    <input
                   className="w-16"
                        type="text"
                        value={editedSite.jikabi || ''}
                        onChange={(e) => update({ ...editedSite, jikabi: e.target.value })}
                          /></p></Box></Button>
                  <Button><Box sx={{ flexDirection: 'column' }}><CameraAltIcon fontSize="small" /><br /><p className='font-rich text-xs'>
                      <input
                          className="w-16"
                          type="text"
                          value={editedSite.view || ''}
                          onChange={(e) => update({ ...editedSite, view: e.target.value })}
                            /></p></Box></Button>
                  <Button><Box sx={{ flexDirection: 'column' }}><StorefrontIcon fontSize="small" /><br /><p className='font-rich text-xs'>
                    <input
                          className="w-16"
                          type="text"
                          value={editedSite.food || ''}
                          onChange={(e) => update({ ...editedSite, food: e.target.value })}
                            /></p></Box></Button>
                  <Button><Box sx={{ flexDirection: 'column' }}><DeleteIcon fontSize="small" /><br /><p className='font-rich text-xs'>
                    <input
                        className="w-16"
                        type="text"
                        value={editedSite.rubbish || ''}
                        onChange={(e) => update({ ...editedSite, rubbish: e.target.value })}
                          /></p></Box></Button>
                  <Button><Box sx={{ flexDirection: 'column' }}><BusinessCenterIcon fontSize="small" /><br /><p className='font-rich text-xs'>
                    <input
                          className="w-16"
                          type="text"
                          value={editedSite.baggage || ''}
                          onChange={(e) => update({ ...editedSite, baggage: e.target.value })}
                            /></p></Box></Button>
              </ButtonGroup>

              <ButtonGroup variant="text" color='inherit' aria-label="text button group" fullWidth={true} >
                  <Button><Box sx={{ flexDirection: 'column' }}><LocalDrinkIcon fontSize="small" /><br /><p className='font-rich text-xs'>
                    <input
                          className="w-16"
                          type="text"
                          value={editedSite.water || ''}
                          onChange={(e) => update({ ...editedSite, water: e.target.value })}
                            /></p></Box></Button>
                  <Button><Box sx={{ flexDirection: 'column' }}><HardwareIcon fontSize="small" /><br /><p className='font-rich text-xs'>ペグ
                    <input
                          className="w-16"
                          type="text"
                          value={editedSite.pegs || ''}
                          onChange={(e) => update({ ...editedSite, pegs: e.target.value })}
                            /></p></Box></Button>
                  <Button><Box sx={{ flexDirection: 'column' }}><TakeoutDiningIcon fontSize="small" /><br /><p className='font-rich text-xs'>炭捨
                  <input
                      className="w-16"
                      type="text"
                      value={editedSite.sumi || ''}
                      onChange={(e) => update({ ...editedSite, sumi: e.target.value })}
                        /></p></Box></Button>
                  <Button><Box sx={{ flexDirection: 'column' }}><HikingIcon fontSize="small" /><br /><p className='font-rich text-xs'>
                <input
                      className="w-16"
                      type="text"
                      value={editedSite.style || ''}
                      onChange={(e) => update({ ...editedSite, style: e.target.value })}
                        /></p></Box></Button>
                  <Button><Box sx={{ flexDirection: 'column' }}><CurrencyYenIcon fontSize="small" /><br /><p className='font-rich text-xs'>
                <input
                      className="w-16"
                      type="text"
                      value={editedSite.price || ''}
                      onChange={(e) => update({ ...editedSite, price: e.target.value })}
                        /></p></Box></Button>
                </ButtonGroup>            
              </Box >

        <div className="">
          <dl>
            <div className="md:bg-transparent bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="md:text-slate-200 text-xs font-medium text-gray-500">イチオシPOINT</dt>
                    <dd className="md:text-white mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
                      <input
                      className="w-full border outline-none"
                      type="text"
                      value={editedSite.pros || ''}
                      onChange={(e) => update({ ...editedSite, pros: e.target.value })}
                        />
              </dd>
            </div>
            <div className="md:bg-transparent bg-white px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="md:text-slate-200 text-xs font-medium text-gray-500">イマイチPOINT</dt>
              <dd className="md:text-white mt-1 mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
                   <input
                      className="w-full border outline-none"
                      type="text"
                      value={editedSite.cons || ''}
                      onChange={(e) => update({ ...editedSite, cons: e.target.value })}
                        />
              </dd>
            </div>
            <div className="md:bg-transparent bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="md:text-slate-200 text-xs font-medium text-gray-500">お風呂</dt>
              <dd className="md:text-white mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
                  <input
                      className="w-full border outline-none"
                      type="text"
                      value={editedSite.onsen || ''}
                      onChange={(e) => update({ ...editedSite, onsen: e.target.value })}
                        />
              </dd>
            </div>
            <div className="md:bg-transparent bg-white px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="md:text-slate-200 text-xs font-medium text-gray-500">その他</dt>
                    <dd className="md:text-white mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
                  <input
                    className="w-full border outline-none"
                    type="text"
                    value={editedSite.other || ''}
                    onChange={(e) => update({ ...editedSite, other: e.target.value })}
          />
              </dd>
            </div>
            <div className="md:bg-transparent bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="md:text-slate-200 text-xs font-medium text-gray-500">予約</dt>
               <dd className="md:text-white mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
                
                <div className="flex">        
                <input
                    className="flex-none border outline-none w-7/12"        
                    type="text"
                    value={editedSite.reserve || ''}
                    onChange={(e) => update({ ...editedSite, reserve: e.target.value })}
                            />
<div className="flex-1 w-2 pl-10">
                <button
                  className={`rounded px-2.5 py-1.5 ${
                  updateSiteMutation.isLoading || !editedSite
                  ? 'bg-gray-400'
                  : 'bg-indigo-600'
                  } text-xs text-white`}
                  disabled={updateSiteMutation.isLoading || !editedSite}
                              >
                  更新する
                </button>                            
               </div>
                            </div>  
              
              
            </dd>
            </div>


        </dl>             
        </div>   
    
        
            </div>
    </div>
          </form>
          
</div> 
</div>    
        </>
  )
}

export const AdminUpdateSite = memo(AdminUpdateSiteMemo)