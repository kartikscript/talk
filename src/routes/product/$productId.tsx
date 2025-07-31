import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/product/$productId')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const { productId } = params
    // Simulate fetching product data based on productId
    return { productId }
  }
})

    



function RouteComponent() {
  // const { productId } = Route.useLoaderData()
  return (
    <div className='bg-talkBG min-h-screen'>
      <main className="w-52">
        <h3 className='font-medium'>2020 Apple MacBook Pro with Apple M1 Chip (13-inch, 8GB RAM, 256GB SSD Storage) - Space Gray</h3>
        <div className='flex items-center gap-1 my-4 text-xs tracking-wide'>  
          <div>
            {Array.from({ length: 5 }, (_, index) => (
                <span key={index} className='text-lg text-yellow-500'>★</span>
            ))} 
          </div>
          <p className='font-medium'>4.7 Star Rating</p>
          <p className='opacity-70'>(21,671 User feedback)</p>
        </div>
        <div>
          <div className='p-8 border rounded-lg'>
            <img
              src='/images/product-demo.png'
              alt='Product Image'
              className='w-64 h-auto object-cover '
              loading='lazy'
            />
          </div>
          <Carousel className="w-full max-w-sm">
            <CarouselContent className="-ml-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-2xl font-semibold">{index + 1}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </main>
    </div>
  )
}
