import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { savedItems } from "@/data/saved-items";
import { CloseCircle, ShoppingCart } from "iconsax-react";
import { MoreHorizontal } from "lucide-react";

export const Route = createFileRoute("/saved")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">PRODUCTS</TableHead>
          <TableHead>PRICE</TableHead>
          <TableHead className="hidden sm:!table-cell">STATUS</TableHead>
          <TableHead>ACTIONS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {savedItems.map((saved, idx) => (
          <TableRow key={idx} className="hover:bg-white">
            <TableCell className="font-medium flex items-center gap-2">
              <img
                src={saved.imgUrl}
                alt="saved image"
                className="w-12.5 h-12.5 sm:w-18 sm:h-18"
              />
              <span className="truncate w-[50vw] sm:w-60 md:w-90 lg:w-150 lg:h-20 lg:text-wrap flex items-center">
                {saved.desc}
              </span>
            </TableCell>
            <TableCell className="font-bold">₦{saved.price}</TableCell>
            <TableCell
              className={`hidden font-bold ${saved.isAvailable ? "text-green-400" : "text-red-400"} sm:table-cell`}
            >
              {saved.isAvailable ? "IN STOCK" : "OUT OF STOCK"}
            </TableCell>
            <TableCell className="items-center gap-6 hidden sm:!flex">
              <Button className="flex items-center gap-3 rounded-xs">
                <span>Message Vendor</span>
                <ShoppingCart className="w-5 h-5 stroke-white" />
              </Button>
              <CloseCircle className="w-5 h-5 stroke-black" />
            </TableCell>
            <TableCell className="sm:!hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className={`font-bold ${saved.isAvailable ? "text-green-400" : "text-red-400"}`}
                  >
                    {saved.isAvailable ? "IN STOCK" : "OUT OF STOCK"}
                  </DropdownMenuItem>
                  <DropdownMenuItem>Message Vendor</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
