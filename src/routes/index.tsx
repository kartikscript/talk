import { Input } from '@/components/ui/input'
import { createFileRoute } from '@tanstack/react-router'
import EventBanner from '@/components/EventBanner'
import { PlusIcon, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSwipeable } from 'react-swipeable'
import HomeUpdates from '@/components/HomeUpdates'
import HomePulse from '@/components/HomePulse'
import Cookies from 'js-cookie'
import { useRouter } from '@tanstack/react-router'
import PostForm from '@/components/PostForm'

export const Route = createFileRoute('/')({
  component: Index,
})  

function Index() {
  const [activeTab, setActiveTab] = useState<'updates' | 'pulse'>('updates')
  const [showPostPage, setShowPostPage] = useState(false)
  const router = useRouter()
 
const fetchPosts = async () => {
  try {
    const accessToken = Cookies.get('access_token')

    if (!accessToken) {
      router.navigate({ to: '/sign-in' })
      return
    }

    console.log('Sending request...')

    const datares = await axios.get(
      'https://talk-l955.onrender.com/api/v1/products/marketplace/list-products/',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    console.log("Fetched posts:", datares)
    return datares.data
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status

      if (status === 401 || status === 403) {
        // Invalid or expired token
        Cookies.remove('access_token') // Optional: clean the token
        router.navigate({ to: '/sign-in' })
      } else {
        console.error(`API Error [${status}]:`, error.response?.data || error.message)
      }
    } else {
      console.error('Unexpected error:', error)
    }
  }
}

  useEffect(() => {
    fetchPosts()
  }, [])

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setActiveTab('pulse'),
    onSwipedRight: () => setActiveTab('updates'),
    preventScrollOnSwipe: true,
    trackMouse: true,
    
  })

  return (
    <div className="relative flex">
      <div
        {...swipeHandlers}
        className="relative flex-1 bg-talkBG h-[92vh] lg:h-full overflow-auto"
      >
        <main className="px-4 py-2 space-y-4">
          <div className="flex lg:hidden px-2 items-center py-1 bg-[#EDEFF2] border focus-within:border-black/50 rounded-sm text-sm">
            <Search className="opacity-50" />
            <Input placeholder="Search..." />
          </div>
          <div className="space-y-4 max-w-lg mx-auto">
            <EventBanner />
            <div className="flex items-center justify-between">
              <h1
                className={`text-lg font-medium tracking-wide cursor-pointer ${
                  activeTab === 'updates' ? 'text-main underline' : 'opacity-50'
                }`}
                onClick={() => setActiveTab('updates')}
              >
                Updates
              </h1>
              <h1
                className={`text-lg font-medium tracking-wide cursor-pointer ${
                  activeTab === 'pulse' ? 'text-main underline' : 'opacity-50'
                }`}
                onClick={() => setActiveTab('pulse')}
              >
                Pulse
              </h1>
            </div>

            {/* Section Switcher */}
            
            {activeTab === 'updates' ? <HomeUpdates /> : <HomePulse />}
          </div>
        </main>
      </div>
      <PlusIcon onClick={()=>setShowPostPage(true)} className='p-2 size-8 cursor-pointer border shadow rounded-lg fixed right-10 bottom-10'/>
      {showPostPage && (
        <div onClick={()=>setShowPostPage(false)} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div onClick={(e)=>e.stopPropagation()} className="bg-white p-4 overflow-y-scroll max-h-[95%] rounded-lg shadow-lg max-w-md w-full">
            <PostForm />
          </div>
        </div>
      )}
    </div>
  )
}
