import { ChangeEvent } from "react";
import { useMutation } from "react-query";
import { supabase } from "@/utils/supabase";
import useStore from "@/Store";



export const useUploadMainImg = () => {
    const editedSite = useStore((state) => state.editedSite)
    const updatedSite = useStore((state) => state.updatedEditedSite)
    
    const useMutateUploadMainImg = useMutation(
        async (e: ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files || e.target.files.length === 0) {
                throw new Error('画像ファイルを選択してください')
            }

            const file = e.target.files[0]
            //（最後の.以降（拡張子の部分）だけ取れるようにしている↓）
            const fileExt = file.name.split('.').pop()
            //ファイルネームを新規作成している↓
            const filename = `${Math.random()}.${fileExt}`
            const filePath = `${filename}`
            //ストレージにアップ↓
            const { error } = await supabase.storage
                .from('main')
                .upload(filePath, file)
            if (error) throw new Error(error.message)

            //ファイルパスの所だけ上書きするようになっている↓
            updatedSite({...editedSite, main_url: filePath})
        },
        {
            onError: (err: any) => {
                alert(err.message)
            },
        }
    )
    return {
      useMutateUploadMainImg
  }
}
