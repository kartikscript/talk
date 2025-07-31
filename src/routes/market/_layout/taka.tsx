import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/market/_layout/taka')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/market/_layout/taka"!</div>
}
