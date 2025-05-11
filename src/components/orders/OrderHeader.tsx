
import { Button } from "@/components/ui/button";
import { FilePlus, ShoppingCart } from "lucide-react";

export const OrderHeader = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <h1 className="page-title mb-0">Sales Orders</h1>
      <div className="flex items-center space-x-2">
        <Button size="sm" variant="outline">
          <FilePlus className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button size="sm" variant="default">
          <ShoppingCart className="mr-2 h-4 w-4" />
          New Order
        </Button>
      </div>
    </div>
  );
};
