
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/dashboard/DataTable";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FilePlus, Plus, Search, ShoppingCart } from "lucide-react";

// Sample orders data
const orders = [
  {
    id: "ORD-1001",
    date: "2025-05-10",
    customer: "Acme Corporation",
    amount: 1245.99,
    status: "Completed",
    payment: "Paid",
    items: 3,
  },
  {
    id: "ORD-1002",
    date: "2025-05-09",
    customer: "TechSoft Solutions",
    amount: 845.50,
    status: "Processing",
    payment: "Paid",
    items: 2,
  },
  {
    id: "ORD-1003",
    date: "2025-05-08",
    customer: "Global Industries",
    amount: 2456.00,
    status: "Pending",
    payment: "Unpaid",
    items: 5,
  },
  {
    id: "ORD-1004",
    date: "2025-05-07",
    customer: "Pinnacle Services",
    amount: 355.75,
    status: "Completed",
    payment: "Paid",
    items: 1,
  },
  {
    id: "ORD-1005",
    date: "2025-05-05",
    customer: "Elite Enterprises",
    amount: 1850.25,
    status: "Cancelled",
    payment: "Refunded",
    items: 4,
  },
  {
    id: "ORD-1006",
    date: "2025-05-03",
    customer: "Strategic Partners Inc.",
    amount: 945.00,
    status: "Processing",
    payment: "Paid",
    items: 2,
  },
];

// Column definitions for orders table
const orderColumns = [
  {
    id: "id",
    header: "Order ID",
    cell: (order: any) => order.id,
  },
  {
    id: "date",
    header: "Date",
    cell: (order: any) => order.date,
  },
  {
    id: "customer",
    header: "Customer",
    cell: (order: any) => order.customer,
  },
  {
    id: "amount",
    header: "Amount",
    cell: (order: any) => (
      <div className="font-medium">
        ${order.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
    ),
  },
  {
    id: "status",
    header: "Status",
    cell: (order: any) => {
      const statusColors = {
        Pending: "bg-yellow-100 text-yellow-800",
        Processing: "bg-blue-100 text-blue-800",
        Completed: "bg-green-100 text-green-800",
        Cancelled: "bg-red-100 text-red-800",
      };
      return (
        <div className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${statusColors[order.status as keyof typeof statusColors]}`}>
          {order.status}
        </div>
      );
    },
  },
  {
    id: "payment",
    header: "Payment",
    cell: (order: any) => {
      const paymentColors = {
        Paid: "bg-green-100 text-green-800",
        Unpaid: "bg-yellow-100 text-yellow-800",
        Refunded: "bg-gray-100 text-gray-800",
      };
      return (
        <div className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${paymentColors[order.payment as keyof typeof paymentColors]}`}>
          {order.payment}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: (order: any) => (
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

const Orders = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter orders by status
  const filteredOrders = activeTab === "all"
    ? orders
    : orders.filter(order => order.status.toLowerCase() === activeTab);
  
  // Order statistics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === "Pending").length;
  const processingOrders = orders.filter(o => o.status === "Processing").length;
  const completedOrders = orders.filter(o => o.status === "Completed").length;

  return (
    <div className="page-container">
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="flex items-center gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search orders..." className="pl-8" />
        </div>
        <div className="flex items-center space-x-2">
          <Input type="date" className="w-auto" />
          <span className="text-sm">to</span>
          <Input type="date" className="w-auto" />
        </div>
      </div>
      
      <DataTable
        columns={orderColumns}
        data={filteredOrders}
        idField="id"
      />
    </div>
  );
};

export default Orders;
