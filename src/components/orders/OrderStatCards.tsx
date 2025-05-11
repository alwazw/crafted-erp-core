
import { Card } from "@/components/ui/card";

type OrderStatsProps = {
  totalOrders: number;
  pendingOrders: number;
  processingOrders: number;
  completedOrders: number;
};

export const OrderStatCards = ({
  totalOrders,
  pendingOrders,
  processingOrders,
  completedOrders
}: OrderStatsProps) => {
  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-4 mb-6">
      <Card className="p-4 flex flex-col items-center justify-center text-center">
        <div className="text-sm text-muted-foreground mb-1">Total Orders</div>
        <div className="text-2xl font-bold">{totalOrders}</div>
      </Card>
      <Card className="p-4 flex flex-col items-center justify-center text-center">
        <div className="text-sm text-muted-foreground mb-1">Pending</div>
        <div className="text-2xl font-bold text-yellow-600">{pendingOrders}</div>
      </Card>
      <Card className="p-4 flex flex-col items-center justify-center text-center">
        <div className="text-sm text-muted-foreground mb-1">Processing</div>
        <div className="text-2xl font-bold text-blue-600">{processingOrders}</div>
      </Card>
      <Card className="p-4 flex flex-col items-center justify-center text-center">
        <div className="text-sm text-muted-foreground mb-1">Completed</div>
        <div className="text-2xl font-bold text-green-600">{completedOrders}</div>
      </Card>
    </div>
  );
};
