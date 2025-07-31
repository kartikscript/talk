import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import axios from 'axios'

export const Route = createFileRoute('/market/_layout/service')({
  component: RouteComponent,
  loader:async ()=>{
    const res = await axios.get('https://talk-l955.onrender.com/api/v1/products/marketplace/list-products')
    return res.data
  }
})

function RouteComponent() {
  const data = useLoaderData({from:Route.id})
  console.log(data)
  return <div>Hello "/market/_layout/service"!</div>
}
