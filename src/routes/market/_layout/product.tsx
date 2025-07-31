import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/market/_layout/product')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/market/_layout/product"!</div>
}
