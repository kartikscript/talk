import { Check, Dot } from "lucide-react"

const allStatus = [
  {
    id:1,
    title:'Sign In Details',
  },
  {
    id:2,
    title:'Personal Details',
  },
  {
    id:3,
    title:'Select Institution',
  },
]
const StatusLine = ({activePage, setActiveSlide}:{activePage:number, setActiveSlide:React.Dispatch<React.SetStateAction<number>>}) => {
  return (
    <div className=' h-20 px-12 flex justify-center items-center z-10'>
      <div className='w-[90%] h-[1px] bg-[#999] lg:bg-white text-[#777] lg:text-white/70 font-light relative '>
        {
          allStatus.map((status,index) => {
            const leftPosition = `${(index/(allStatus.length - 1))*100}%`
            const active = activePage === status.id
            const prev = activePage > status.id
            const next = activePage < status.id
            return (
              <div key={index} style={{left:leftPosition}} onClick={()=>setActiveSlide(status.id)} className='absolute -bottom-3/4 -translate-x-1/2 translate-y-3/4 flex flex-col items-center tracking-wide text-grey-150'>
                <div className={`${(active || prev) ? 'text-white bg-main border-main lg:border-white' :'border-[#999] lg:border-main bg-white dark:bg-black'} p-1 flex items-center justify-center w-6 h-6 rounded-full border dark:border-dark-grey-150 text-xs `}>
                  {(active || next) && <Dot className={`${active ? 'lg:text-white':"lg:text-main"}`}/>}
                  {prev && <Check/>}
                </div>
                <p className={`${active && 'text-main lg:text-white '} font-normal text-xs lg:text-base`}>STEP-{status.id}</p>
                <p className={`${active && 'text-main lg:text-white '} text-[10px] lg:text-xs whitespace-nowrap`}>{status.title}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default StatusLine