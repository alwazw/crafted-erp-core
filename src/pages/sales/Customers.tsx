
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/dashboard/DataTable";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FilePlus, Search, UserPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Sample customer data
const customers = [
  {
    id: "CUST-001",
    name: "Acme Corporation",
    contact: "John Doe",
    email: "john@acmecorp.com",
    phone: "(555) 123-4567",
    status: "Active",
    balance: 2450.75,
    orders: 12,
  },
  {
    id: "CUST-002",
    name: "TechSoft Solutions",
    contact: "Jane Smith",
    email: "jane@techsoft.com",
    phone: "(555) 987-6543",
    status: "Active",
    balance: 0,
    orders: 8,
  },
  {
    id: "CUST-003",
    name: "Global Industries",
    contact: "Robert Johnson",
    email: "robert@globalind.com",
    phone: "(555) 456-7890",
    status: "Inactive",
    balance: 750.25,
    orders: 4,
  },
  {
    id: "CUST-004",
    name: "Pinnacle Services",
    contact: "Sarah Williams",
    email: "sarah@pinnacle.com",
    phone: "(555) 789-0123",
    status: "Active",
    balance: 1200.50,
    orders: 9,
  },
  {
    id: "CUST-005",
    name: "Elite Enterprises",
    contact: "Michael Brown",
    email: "michael@elite.com",
    phone: "(555) 234-5678",
    status: "Active",
    balance: 0,
    orders: 6,
  },
  {
    id: "CUST-006",
    name: "Strategic Partners Inc.",
    contact: "Lisa Anderson",
    email: "lisa@strategic.com",
    phone: "(555) 345-6789",
    status: "Inactive",
    balance: 320.75,
    orders: 3,
  },
];

// Column definitions for customers table
const customerColumns = [
  {
    id: "id",
    header: "ID",
    cell: (customer: any) => customer.id,
  },
  {
    id: "name",
    header: "Company Name",
    cell: (customer: any) => customer.name,
  },
  {
    id: "contact",
    header: "Contact Person",
    cell: (customer: any) => customer.contact,
  },
  {
    id: "email",
    header: "Email",
    cell: (customer: any) => (
      <a href={`mailto:${customer.email}`} className="text-primary hover:underline">
        {customer.email}
      </a>
    ),
  },
  {
    id: "status",
    header: "Status",
    cell: (customer: any) => {
      const statusColor = customer.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800";
      return (
        <div className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${statusColor}`}>
          {customer.status}
        </div>
      );
    },
  },
  {
    id: "balance",
    header: "Balance",
    cell: (customer: any) => (
      <div className={`font-medium ${customer.balance > 0 ? "text-red-600" : "text-green-600"}`}>
        ${customer.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: (customer: any) => (
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

const Customers = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter customers by status
  const filteredCustomers = activeTab === "all"
    ? customers
    : customers.filter(customer => customer.status.toLowerCase() === activeTab);
  
  // Customer statistics
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === "Active").length;
  const totalReceivables = customers.reduce((sum, c) => sum + c.balance, 0);

  return (
    <div className="page-container">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="page-title mb-0">Customers</h1>
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline">
            <FilePlus className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm" variant="default">
            <UserPlus className="mr-2 h-4 w-4" />
            New Customer
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3 mb-6">
        <Card className="p-4 flex flex-col items-center justify-center text-center">
          <div className="text-sm text-muted-foreground mb-1">Total Customers</div>
          <div className="text-2xl font-bold">{totalCustomers}</div>
        </Card>
        <Card className="p-4 flex flex-col items-center justify-center text-center">
          <div className="text-sm text-muted-foreground mb-1">Active Customers</div>
          <div className="text-2xl font-bold text-green-600">{activeCustomers}</div>
        </Card>
        <Card className="p-4 flex flex-col items-center justify-center text-center">
          <div className="text-sm text-muted-foreground mb-1">Total Receivables</div>
          <div className="text-2xl font-bold text-blue-600">
            ${totalReceivables.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Customers</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="flex items-center mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search customers..." className="pl-8" />
        </div>
      </div>
      
      <DataTable
        columns={customerColumns}
        data={filteredCustomers}
        idField="id"
      />
    </div>
  );
};

export default Customers;
