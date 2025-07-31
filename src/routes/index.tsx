import { Input } from '@/components/ui/input'
import { createFileRoute } from '@tanstack/react-router'
import EventBanner from '@/components/EventBanner'
import { Search } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useSwipeable } from 'react-swipeable'
import HomeUpdates from '@/components/HomeUpdates'
import HomePulse from '@/components/HomePulse'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const [activeTab, setActiveTab] = useState<'updates' | 'pulse'>('updates')

  const fetchPosts = async () => {
    try {
      const datares = await axios.get('https://talk-l955.onrender.com/api/v1/products/marketplace/list-products/')
      console.log("Fetched posts:", datares);
      return datares.data
    } catch (error) {
      console.error("Error fetching posts:", error);
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
    <div className="flex">
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
    </div>
  )
}
