import { createFileRoute, Outlet, useMatchRoute } from '@tanstack/react-router'
import { GalleryVertical, Grip, SlidersHorizontal } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from 'react'
import ProductCard from '@/components/ProductCard'
export const Route = createFileRoute('/market/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  const [pageCount, setPageCount] = useState('16')
  const [sortByValue, setSortByValue] = useState('Default')
  const allPagesCount = ['16', '20', '24', '32', '40', '48', '56', '64']
  const allSortBy = ['Default', 'Price: Low to High', 'Price: High to Low', 'Newest Arrivals', 'Best Sellers']
  
const matchRoute = useMatchRoute()
let currentSubRoute: string = '';
if (matchRoute({to:'/market/product'})) currentSubRoute = 'Product'
if (matchRoute({to:'/market/service'})) currentSubRoute = 'Service'
if (matchRoute({to:'/market/taka'})) currentSubRoute = 'Taka'

  

  return (
    <div className='h-[92vh] overflow-auto sm:h-full'>
      <header className='bg-[#F9F1E7] sm:mx-0 mx-2 px-4 py-2 lg:py-6 lg:px-14 sm:rounded-none rounded-lg sm:mt-0 mt-2 flex flex-wrap gap-5 justify-center sm:justify-between items-center'>
        <div className='flex gap-4 sm:gap-8 items-center'>
          <div className=' flex items-center gap-3 sm:gap-5 border-r sm:pr-7 '>
            <p className='flex gap-1.5 items-center font-light'><SlidersHorizontal className='size-4'/>Filter</p>
            <Grip className='size-4'/>
            <GalleryVertical className='size-4'/>
          </div>
          <p className='text-xs'>Showing 1-16 of 32 results</p>
        </div>
        <div className='hidden sm:flex gap-8 items-center'>
          <div className='flex gap-2 text-xs items-center'>
            <p className=''>Page Count</p>
            <Select value={pageCount} onValueChange={setPageCount} >
              <SelectTrigger className='px-2 py-1 gap-1 bg-white' >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Pages</SelectLabel>
                  {
                    allPagesCount.map((page) => (
                      <SelectItem key={page} value={page}>
                        {page}
                      </SelectItem>
                    ))
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='flex gap-2 text-xs items-center'>
            <p className=''>Sort By</p>
            <Select value={sortByValue} onValueChange={setSortByValue} >
              <SelectTrigger className='px-2 py-1 gap-1 bg-white' >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort Products</SelectLabel>
                  {
                    allSortBy.map((val) => (
                      <SelectItem key={val} value={val}>
                        {val}
                      </SelectItem>
                    ))
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
            
          </div>
        </div>
      </header>
      <h3 className='text-center my-4 text-black/60 tracking-wide'>Marketplace {'>'} <span className='text-black/80 font-medium'>{currentSubRoute}</span></h3>
      <Outlet/>
      <div className='*:px-2 sm:*:px-6'>
        <h2 className='text-lg font-medium'>Trending</h2>
        <main className='sm:px-6 xl:px-14 py-6 max-w-6xl remove-scrollbar mx-auto flex items-stretch overflow-x-scroll whitespace-nowrap sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-10 sm:gap-6 gap-3'>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
        </main>
        <h2 className='text-lg font-medium'>Popular</h2>
        <main className='sm:px-6 xl:px-14 py-6 max-w-6xl remove-scrollbar mx-auto flex items-stretch overflow-x-scroll whitespace-nowrap sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-10 sm:gap-6 gap-3'>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
        </main>
      </div>
    </div>
  )
}
