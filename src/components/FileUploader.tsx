import { UploadCloud } from 'lucide-react'
import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

type FileUploaderProps = {
  files :File[] | undefined,
  onChange: (files:File[])=> void
}
const FileUploader =({files,onChange}:FileUploaderProps)=> {
  const onDrop = useCallback((acceptedFiles:File[]) => {
    // Do something with the files
    onChange(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})
  const convertFileToUrl = (file: File) => URL.createObjectURL(file);
  return (
    <div {...getRootProps()} className='bg-[#EDEFF2] h-32 overflow-hidden cursor-pointer flex items-center justify-center border-dashed border focus-within:border-black/50 rounded-lg '>
      <input {...getInputProps()} />
      {
        files && files?.length>0 ?(
          // to show uploaded image
          <img
           src={convertFileToUrl(files[0])}
           width={600}
           height={600}
           alt='uploaded file'
           className='object-cover '
          />
        ):(
          <div className='flex-col flex justify-center items-center text-gray-700 text-sm'>
           <UploadCloud className='bg-background text-main my-2  p-1 size-7 rounded-xl'/>
           <p className=''>
            <span className='text-main'>Click to upload </span>
            or drag and drop
           </p>
           <p >SVG, PNG, JPG or Gif (max 800x400)</p>
          </div>
        )
      }
      {/* {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      } */}
    </div>
  )
}
export default FileUploader