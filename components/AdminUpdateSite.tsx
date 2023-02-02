import { FormEvent, FC, memo } from "react";
import Image from "next/image";
import { LogoutIcon, CameraIcon } from "@heroicons/react/solid";
import useStore from "@/Store";
import { useMutateSite } from "@/hooks/useMutateSite";
import { useUploadMainImg } from "@/hooks/useUploadMainImg";
import { Spinner } from "./Spinner";
import { supabase } from "@/utils/supabase";
import { useDownloadUrl } from "@/hooks/useDownloadUrl";

import { useState } from "react";



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
            
            <p>管理者：{session?.user?.email}</p>
            <LogoutIcon
                className='my-6 h-6 w-6 curor-pointer text-blue-500'
                onClick={signOut} />
    <form onSubmit={submitHandler}>
    <div className="w-10/12 mx-auto md:max-w-md">
      <div className="mb-8">
        <label className="text-sm block font-bold">キャンプサイト名</label>
        <input
        className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
        type="text"
                
          value={editedSite.title || ''}
          onChange={(e) => update({ ...editedSite, title: e.target.value })}
          />
      </div>


      <div className="mb-8">
      <label className="text-sm block font-bold">写真</label>
      
        <label htmlFor="main" className="flex">
          </label>
        <input
          className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-gray-50 file:text-gray-700
      hover:file:bg-gray-100"
          type="file"
          id="main"
          accept="image/*"
          onChange={(e) => useMutateUploadMainImg.mutate(e)}
          />
     </div>

        
      <div className="mb-8">
        <label className="text-sm block font-bold">特徴</label>
        <textarea
          className="w-full h-32 py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
          
          value={editedSite.hitokoto || ''}
          onChange={(e) => update({ ...editedSite,hitokoto: e.target.value })}
        />
      </div>

    <div className="mb-8">
      <label className="text-sm block font-bold">良い点</label>
      <input
        className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
        type="text"
        value={editedSite.pros || ''}
        onChange={(e) => update({ ...editedSite, pros: e.target.value })}
          />
    </div>

    <div className="mb-8">
      <label className="text-sm block font-bold">悪い点</label>
      <input
        className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
        type="text"
        value={editedSite.cons || ''}
        onChange={(e) => update({ ...editedSite, cons: e.target.value })}
          />
    </div>
        

    <div className="mb-8">
      <label className="text-sm block font-bold">直火</label>
      <input
        className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
        type="text"
        value={editedSite.jikabi || ''}
        onChange={(e) => update({ ...editedSite, jikabi: e.target.value })}
          />
    </div>
    

    <div className="mb-8">
      <label className="text-sm block font-bold">眺望</label>
      <input
        className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
        type="text"
        value={editedSite.view || ''}
        onChange={(e) => update({ ...editedSite, view: e.target.value })}
          />
    </div>
    

    <div className="mb-8">
      <label className="text-sm block font-bold">ペグ</label>
      <input
        className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
        type="text"
        value={editedSite.pegs || ''}
        onChange={(e) => update({ ...editedSite, pegs: e.target.value })}
          />
    </div>
    

    <div className="mb-8">
      <label className="text-sm block font-bold">ごみ</label>
      <input
        className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
        type="text"
        value={editedSite.rubbish || ''}
        onChange={(e) => update({ ...editedSite, rubbish: e.target.value })}
          />
    </div>


    <div className="mb-8">
      <label className="text-sm block font-bold">消し炭捨て場</label>
      <input
        className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
        type="text"
        value={editedSite.sumi || ''}
        onChange={(e) => update({ ...editedSite, sumi: e.target.value })}
          />
    </div>


    <div className="mb-8">
      <label className="text-sm block font-bold">荷物量</label>
      <input
        className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
        type="text"
        value={editedSite.baggage || ''}
        onChange={(e) => update({ ...editedSite, baggage: e.target.value })}
          />
    </div>
    
                
    <div className="mb-8">
      <label className="text-sm block font-bold">スタイル</label>
      <input
        className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
        type="text"
        value={editedSite.style || ''}
        onChange={(e) => update({ ...editedSite, style: e.target.value })}
          />
    </div>
    
                
    <div className="mb-8">
      <label className="text-sm block font-bold">買い出し</label>
      <input
        className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
        type="text"
        value={editedSite.food || ''}
        onChange={(e) => update({ ...editedSite, food: e.target.value })}
          />
    </div>
    
                
    <div className="mb-8">
      <label className="text-sm block font-bold">温泉</label>
      <input
        className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
        type="text"
        value={editedSite.onsen || ''}
        onChange={(e) => update({ ...editedSite, onsen: e.target.value })}
          />
    </div>
    
                
    <div className="mb-8">
      <label className="text-sm block font-bold">水</label>
      <input
        className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
        type="text"
        value={editedSite.water || ''}
        onChange={(e) => update({ ...editedSite, water: e.target.value })}
          />
    </div>
                
    
    <div className="mb-8">
      <label className="text-sm block font-bold">その他</label>
      <input
        className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
        type="text"
        value={editedSite.other || ''}
        onChange={(e) => update({ ...editedSite, other: e.target.value })}
          />
    </div>
    
 
    <div className="mb-8">
      <label className="text-sm block font-bold">予約</label>
      <input
        className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
        type="text"
        value={editedSite.reserve || ''}
        onChange={(e) => update({ ...editedSite, reserve: e.target.value })}
          />
    </div>


    <div className="mb-8">
      <label className="text-sm block font-bold">住所</label>
      <input
        className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
        type="text"
        value={editedSite.adress || ''}
        onChange={(e) => update({ ...editedSite, adress: e.target.value })}
          />
    </div>


      <button
        className={`my-5 rounded ${
          updateSiteMutation.isLoading || !editedSite
          ? 'bg-gray-400'
          : 'bg-indigo-600'
          } px-3 py-2 text-sm font-medium text-white`}
        disabled={updateSiteMutation.isLoading || !editedSite}
      >
        更新する
        </button>
        
    </div>
    </form>
        </>
  )
}

export const AdminUpdateSite = memo(AdminUpdateSiteMemo)