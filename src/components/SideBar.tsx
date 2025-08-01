import { Link, useRouter } from '@tanstack/react-router'
import { ChevronDown, Heart, House, LogOut, Mail, NotepadText, Store } from 'lucide-react'
import { useEffect, useState } from 'react'


const navLinks = [
  {
    id:'1',
    title:'Home',
    icon:<House/>,
    route:"/"
  },
  {
    id:'2',
    title:'Market',
    icon:<Store/>,
    subLinks:[
      {
        id:'2-1',
        title:'Products',
        route:'/market/product'
      },
      {
        id:'2-2',
        title:'Services',
        route:'/market/service',
      },
      {
        id:'2-3',
        title:'Taka',
        route:'/market/taka',
      }
    ]
  },
  {
    id:'3',
    title:'Billboard',
    icon:<NotepadText/>,
    route:"/billboard"
  },
  {
    id:'4',
    title:'Saved',
    icon:<Heart/>,
    route:"/"
  },
  {
    id:'5',
    title:'Messages',
    icon:<Mail/>,
    route:"/messages"
  },
  {
    id:'6',
    title:'Profile',
    icon:(
        <img
          src='/images/profile.jpg'
          alt='user'
          className='rounded-full size-6 border-2 border-current object-cover overflow-hidden'
        />
    ),
    route:"/profile"
  },
  
]


const SideBar = () => {

  const [activeTabId, setActiveTabId] = useState('1')
  const [showMarketTabs, setShowMarketTabs] = useState(false)
  const router = useRouter()
  const currentRoute = router.state.location.pathname
  const handleActiveTab = (id: string,route:string | undefined) => {
    setActiveTabId(id)
    if (route) {
      router.navigate({ to: route });
    } else{
      setShowMarketTabs(!showMarketTabs);
    }
  }
console.log("Current Route:", currentRoute);
  useEffect(() => {
    if(currentRoute.includes('/market/')) {
      setShowMarketTabs(true);
    }
},[currentRoute])
  return (
    <div className='sm:block hidden h-screen w-44 sm:w-52 md:w-60'>
        <aside className='h-full w-44 sm:w-52 md:w-60 fixed top-0 left-0 bg-[#EDEFF2] flex flex-col justify-between px-3 pt-2 pb-5 border-r '>
          <div>
            <div className='px-3 pb-4 pt-8 mb-5 flex items-center gap-2 *:w-12'>
              <img
                src='/images/talk.png'
                alt='talk logo'
              />
              <img
                src='/images/talk-text2.png'
                alt='talk logo'
              />
            </div>
            <ul className='space-y-1.5'>
              {
                navLinks.map(({id,icon,title,route,subLinks},i)=>{
                  const isActive = currentRoute === route || (subLinks && subLinks.some(sub => currentRoute === sub.route));
                  return(
                    <nav
                      key={i}
                      onClick={route ?()=>handleActiveTab(id,route):() => setShowMarketTabs(!showMarketTabs)}
                      className={`p-2 pl-4 flex flex-col justify-center text-sm cursor-pointer rounded-xl    ${isActive ? 'text-black':"text-gray-600 hover:bg-black/[0.02]"} transition-all duration-200`}
                    >
                      <div className=' group flex items-center gap-2 '>
                        <div className='relative'>
                          <span className='*:stroke-1.5 *:size-5'>{icon}</span>
                          {title === 'Messages' && <div className='absolute right-0 top-0 translate-x-1/4 -translate-y-1/4  group-hover:border-current border border-white/50 bg-amber-500 text-white size-[16px] flex justify-center items-center rounded-full text-[8px]  font-medium '>2</div>}
                        </div>
                        {title}

                       {subLinks && subLinks.length > 0 && <ChevronDown className={`size-4 ml-auto ${showMarketTabs && 'rotate-180'} transition`}/>}
                      </div>
                      {
                        showMarketTabs && subLinks && subLinks.length > 0 && 
                        <ul className='pl-6 ml-2 flex flex-col mt-2 space-y-1 border-l border-black/10 italic'>
                          {
                            subLinks.map(({id:titleId,route:subRoute,title:subTitle},j)=>{
                              return(
                                <Link
                                  to={subRoute}
                                  key={j}
                                  onClick={()=>setActiveTabId(titleId)}
                                  className={`p-2 text-sm rounded-lg [&.active]:text-black/95 hover:bg-black/5 transition-all duration-200 ${activeTabId === titleId ? 'bg-main text-white' : 'text-gray-600'}`}
                                >
                                  {subTitle}
                                </Link>
                              )
                            })
                          }
                        </ul>
                      }
                    </nav>
                  )
                })
              }
            </ul>
          </div>
          <div 
          onClick={()=>setActiveTabId('11')}
          className={`p-3 flex items-center gap-4  cursor-pointer rounded-xl *:size-5 text-sm ${(activeTabId === '11') ? 'font-medium bg-main text-white':"text-gray-600 hover:bg-black/5"} active:bg-main/5 transition-all duration-200`}
          >
            <LogOut/>
            Log-out
          </div>
        </aside>
      </div>
  )
}

export default SideBar