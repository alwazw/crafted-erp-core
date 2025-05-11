
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/dashboard/DataTable";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FilePlus, Plus, Search } from "lucide-react";

// Enhanced transaction data with SKU information
const transactions = [
  {
    id: "TRX-10001",
    date: "2025-05-10",
    type: "Invoice",
    description: "Invoice #1234 - Acme Corp",
    amount: 1245.99,
    account: "Accounts Receivable",
    status: "Completed",
    sku: "WD-5001",
    quantity: 50,
    unitAmount: 24.92,
  },
  {
    id: "TRX-10002",
    date: "2025-05-09",
    type: "Payment",
    description: "Payment #9876 - Global Industries",
    amount: -845.50,
    account: "Cash",
    status: "Completed",
    sku: "",
    quantity: 0,
    unitAmount: 0,
  },
  {
    id: "TRX-10003",
    date: "2025-05-08",
    type: "Expense",
    description: "Office Supplies",
    amount: -250.00,
    account: "Office Expenses",
    status: "Completed",
    sku: "",
    quantity: 0,
    unitAmount: 0,
  },
  {
    id: "TRX-10004",
    date: "2025-05-08",
    type: "Invoice",
    description: "Invoice #1235 - Tech Solutions",
    amount: 2456.00,
    account: "Accounts Receivable",
    status: "Pending",
    sku: "AC-1001",
    quantity: 28,
    unitAmount: 87.71,
  },
  {
    id: "TRX-10005",
    date: "2025-05-07",
    type: "Payment",
    description: "Payment #9877 - Acme Corp",
    amount: -1200.00,
    account: "Cash",
    status: "Completed",
    sku: "",
    quantity: 0,
    unitAmount: 0,
  },
  {
    id: "TRX-10006",
    date: "2025-05-06",
    type: "Expense",
    description: "Rent Payment",
    amount: -3500.00,
    account: "Rent Expense",
    status: "Completed",
    sku: "",
    quantity: 0,
    unitAmount: 0,
  },
  {
    id: "TRX-10007",
    date: "2025-05-05",
    type: "Payroll",
    description: "Payroll - May Week 1",
    amount: -4850.00,
    account: "Salaries Expense",
    status: "Completed",
    sku: "",
    quantity: 0,
    unitAmount: 0,
  },
  {
    id: "TRX-10008",
    date: "2025-05-04",
    type: "Purchase",
    description: "Inventory Purchase - WidgetCo Inc.",
    amount: -1875.00,
    account: "Inventory",
    status: "Completed",
    sku: "WD-5001",
    quantity: 150,
    unitAmount: 12.50,
  },
  {
    id: "TRX-10009",
    date: "2025-05-03",
    type: "Purchase",
    description: "Inventory Purchase - TechParts Ltd.",
    amount: -2250.00,
    account: "Inventory",
    status: "Completed",
    sku: "AC-1002",
    quantity: 100,
    unitAmount: 22.50,
  },
];

// Get unique transaction types
const transactionTypes = [...new Set(transactions.map(t => t.type))];

// Get unique accounts
const accounts = [...new Set(transactions.map(t => t.account))];

// Get unique SKUs that are not empty
const skus = [...new Set(transactions.map(t => t.sku).filter(sku => sku !== ""))];

// Column definitions for transactions table
const transactionColumns = [
  {
    id: "id",
    header: "ID",
    cell: (transaction: any) => transaction.id,
  },
  {
    id: "date",
    header: "Date",
    cell: (transaction: any) => transaction.date,
  },
  {
    id: "type",
    header: "Type",
    cell: (transaction: any) => {
      const typeColors = {
        Invoice: "bg-blue-100 text-blue-800",
        Payment: "bg-green-100 text-green-800",
        Expense: "bg-red-100 text-red-800",
        Payroll: "bg-purple-100 text-purple-800",
        Purchase: "bg-orange-100 text-orange-800",
      };
      return (
        <div className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${typeColors[transaction.type as keyof typeof typeColors]}`}>
          {transaction.type}
        </div>
      );
    },
  },
  {
    id: "description",
    header: "Description",
    cell: (transaction: any) => transaction.description,
  },
  {
    id: "sku",
    header: "SKU",
    cell: (transaction: any) => transaction.sku || "-",
  },
  {
    id: "quantity",
    header: "Qty",
    cell: (transaction: any) => transaction.quantity > 0 ? transaction.quantity : "-",
  },
  {
    id: "amount",
    header: "Amount",
    cell: (transaction: any) => {
      const isPositive = transaction.amount > 0;
      return (
        <div className={`font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
          {isPositive ? "+" : ""}${Math.abs(transaction.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      );
    },
  },
  {
    id: "account",
    header: "Account",
    cell: (transaction: any) => transaction.account,
  },
  {
    id: "status",
    header: "Status",
    cell: (transaction: any) => {
      const statusColor = transaction.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800";
      return (
        <div className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${statusColor}`}>
          {transaction.status}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: (transaction: any) => (
      <Button variant="ghost" size="sm">
        View
      </Button>
    ),
  },
];

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedAccount, setSelectedAccount] = useState("all");
  const [selectedSku, setSelectedSku] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Filter transactions based on selections
  let filteredTransactions = [...transactions];
  
  // Apply type filter
  if (selectedType !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.type === selectedType);
  }
  
  // Apply account filter
  if (selectedAccount !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.account === selectedAccount);
  }
  
  // Apply SKU filter
  if (selectedSku !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.sku === selectedSku);
  }
  
  // Apply date filters
  if (startDate) {
    filteredTransactions = filteredTransactions.filter(t => t.date >= startDate);
  }
  if (endDate) {
    filteredTransactions = filteredTransactions.filter(t => t.date <= endDate);
  }
  
  // Apply search filter
  if (searchTerm.trim() !== "") {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    filteredTransactions = filteredTransactions.filter(t => 
      t.id.toLowerCase().includes(lowerCaseSearchTerm) ||
      t.description.toLowerCase().includes(lowerCaseSearchTerm) ||
      t.sku.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }
  
  // Calculate statistics
  const totalIncome = filteredTransactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = filteredTransactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
  const netAmount = totalIncome - totalExpenses;

  return (
    <div className="page-container">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="page-title mb-0">Transactions</h1>
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline">
            <FilePlus className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm" variant="default">
            <Plus className="mr-2 h-4 w-4" />
            New Transaction
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3 mb-6">
        <Card className="p-4 flex flex-col items-center justify-center text-center">
          <div className="text-sm text-muted-foreground mb-1">Total Income</div>
          <div className="text-2xl font-bold text-green-600">
            ${totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </Card>
        <Card className="p-4 flex flex-col items-center justify-center text-center">
          <div className="text-sm text-muted-foreground mb-1">Total Expenses</div>
          <div className="text-2xl font-bold text-red-600">
            ${totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </Card>
        <Card className="p-4 flex flex-col items-center justify-center text-center">
          <div className="text-sm text-muted-foreground mb-1">Net Amount</div>
          <div className={`text-2xl font-bold ${netAmount >= 0 ? "text-green-600" : "text-red-600"}`}>
            ${netAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </Card>
      </div>
      
      <div className="grid gap-4 mb-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Transaction Type</label>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {transactionTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Account</label>
          <Select value={selectedAccount} onValueChange={setSelectedAccount}>
            <SelectTrigger>
              <SelectValue placeholder="All Accounts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Accounts</SelectItem>
              {accounts.map(account => (
                <SelectItem key={account} value={account}>{account}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">SKU</label>
          <Select value={selectedSku} onValueChange={setSelectedSku}>
            <SelectTrigger>
              <SelectValue placeholder="All SKUs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All SKUs</SelectItem>
              {skus.map(sku => (
                <SelectItem key={sku} value={sku}>{sku}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="relative">
          <label className="text-sm font-medium mb-1 block">Search</label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search transactions..." 
              className="pl-8" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-2 md:gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Start Date</label>
            <Input 
              type="date" 
              className="w-auto"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <span className="text-sm hidden md:block mt-auto mb-2">to</span>
          <div>
            <label className="text-sm font-medium mb-1 block">End Date</label>
            <Input 
              type="date" 
              className="w-auto"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2 md:mt-0"
            onClick={() => {
              setStartDate("");
              setEndDate("");
              setSearchTerm("");
              setSelectedType("all");
              setSelectedAccount("all");
              setSelectedSku("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      </div>
      
      <DataTable
        columns={transactionColumns}
        data={filteredTransactions}
        idField="id"
      />
    </div>
  );
};

export default Transactions;
