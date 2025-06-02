import { createFileRoute } from '@tanstack/react-router'
import { BillTabs } from "@/components/BillTabs"

export const Route = createFileRoute('/billboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex justify-center mt-4">
      <BillTabs />
    </div>
  );
}
