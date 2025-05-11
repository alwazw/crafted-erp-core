
import { Book, Coins, Database, ShoppingCart, Users } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { RecentActivityCard } from "@/components/dashboard/RecentActivityCard";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Sample sales data for the chart
const salesData = [
  { name: "Jan", sales: 4000, expenses: 2400 },
  { name: "Feb", sales: 3000, expenses: 1398 },
  { name: "Mar", sales: 9800, expenses: 2000 },
  { name: "Apr", sales: 3908, expenses: 2780 },
  { name: "May", sales: 4800, expenses: 1890 },
  { name: "Jun", sales: 3800, expenses: 2390 },
  { name: "Jul", sales: 4300, expenses: 3490 },
];

// Sample recent activity data
const recentActivities = [
  {
    id: "1",
    description: "New order #1234 received from Customer XYZ",
    timestamp: "Just now",
    type: "sales" as const,
  },
  {
    id: "2",
    description: "General ledger updated for Q2 2025",
    timestamp: "2 hours ago",
    type: "accounting" as const,
  },
  {
    id: "3",
    description: "Inventory levels updated for Product ABC",
    timestamp: "Yesterday",
    type: "inventory" as const,
  },
  {
    id: "4",
    description: "New customer added: Acme Corp",
    timestamp: "2 days ago",
    type: "sales" as const,
  },
];

// Sample data for recent orders
const recentOrders = [
  {
    id: "ORD-1234",
    customer: "Acme Corp",
    amount: 1245.99,
    status: "Completed",
    date: "2025-05-10",
  },
  {
    id: "ORD-1235",
    customer: "Global Industries",
    amount: 845.50,
    status: "Processing",
    date: "2025-05-09",
  },
  {
    id: "ORD-1236",
    customer: "Tech Solutions Inc",
    amount: 2456.00,
    status: "Pending",
    date: "2025-05-08",
  },
  {
    id: "ORD-1237",
    customer: "Smith Enterprises",
    amount: 355.75,
    status: "Completed",
    date: "2025-05-07",
  },
];

// Column definitions for recent orders table
const orderColumns = [
  {
    id: "id",
    header: "Order ID",
    cell: (order: any) => order.id,
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
      const statusClasses = {
        Completed: "bg-green-100 text-green-800",
        Processing: "bg-blue-100 text-blue-800",
        Pending: "bg-yellow-100 text-yellow-800",
      };
      return (
        <div className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${statusClasses[order.status as keyof typeof statusClasses]}`}>
          {order.status}
        </div>
      );
    },
  },
  {
    id: "date",
    header: "Date",
    cell: (order: any) => order.date,
  },
  {
    id: "actions",
    header: "Actions",
    cell: (order: any) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          console.log("View order", order.id);
        }}
      >
        View
      </Button>
    ),
  },
];

const Dashboard = () => {
  const { toast } = useToast();

  return (
    <div className="page-container">
      <h1 className="page-title">Dashboard</h1>
      
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Sales"
          value="$24,780.00"
          description="This month"
          trend={{ value: 12, isPositive: true }}
          icon={<ShoppingCart className="h-4 w-4" />}
        />
        <StatsCard
          title="Accounts Receivable"
          value="$8,450.00"
          description="Outstanding"
          trend={{ value: 5, isPositive: false }}
          icon={<Book className="h-4 w-4" />}
        />
        <StatsCard
          title="Customers"
          value="124"
          description="Active accounts"
          trend={{ value: 8, isPositive: true }}
          icon={<Users className="h-4 w-4" />}
        />
        <StatsCard
          title="Inventory Value"
          value="$45,890.00"
          description="328 products"
          icon={<Database className="h-4 w-4" />}
        />
      </div>
      
      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-3 mt-6">
        <div className="lg:col-span-2">
          <SalesChart data={salesData} />
        </div>
        <div>
          <RecentActivityCard activities={recentActivities} />
        </div>
      </div>
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <DataTable
          columns={orderColumns}
          data={recentOrders}
          idField="id"
        />
      </div>
    </div>
  );
};

export default Dashboard;
