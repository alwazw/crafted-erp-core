
import { Button } from "@/components/ui/button";
import type { Order } from "@/data/orders";

export const orderColumns = [
  {
    id: "id",
    header: "Order ID",
    cell: (order: Order) => order.id,
  },
  {
    id: "date",
    header: "Date",
    cell: (order: Order) => order.date,
  },
  {
    id: "customer",
    header: "Customer",
    cell: (order: Order) => order.customer,
  },
  {
    id: "amount",
    header: "Amount",
    cell: (order: Order) => (
      <div className="font-medium">
        ${order.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
    ),
  },
  {
    id: "status",
    header: "Status",
    cell: (order: Order) => {
      const statusColors = {
        Pending: "bg-yellow-100 text-yellow-800",
        Processing: "bg-blue-100 text-blue-800",
        Completed: "bg-green-100 text-green-800",
        Cancelled: "bg-red-100 text-red-800",
      };
      return (
        <div className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${statusColors[order.status]}`}>
          {order.status}
        </div>
      );
    },
  },
  {
    id: "payment",
    header: "Payment",
    cell: (order: Order) => {
      const paymentColors = {
        Paid: "bg-green-100 text-green-800",
        Unpaid: "bg-yellow-100 text-yellow-800",
        Refunded: "bg-gray-100 text-gray-800",
      };
      return (
        <div className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${paymentColors[order.payment]}`}>
          {order.payment}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: (order: Order) => (
      <div className="flex space-x-2">
        <Button variant="ghost" size="sm">
          View
        </Button>
        <Button variant="ghost" size="sm">
          Edit
        </Button>
      </div>
    ),
  },
];
