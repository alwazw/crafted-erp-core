
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/dashboard/DataTable";
import { FilePlus, Plus, Search } from "lucide-react";

// Sample transaction data
const transactions = [
  {
    id: "TRX-10001",
    date: "2025-05-10",
    type: "Invoice",
    description: "Invoice #1234 - Acme Corp",
    amount: 1245.99,
    account: "Accounts Receivable",
    status: "Completed",
  },
  {
    id: "TRX-10002",
    date: "2025-05-09",
    type: "Payment",
    description: "Payment #9876 - Global Industries",
    amount: -845.50,
    account: "Cash",
    status: "Completed",
  },
  {
    id: "TRX-10003",
    date: "2025-05-08",
    type: "Expense",
    description: "Office Supplies",
    amount: -250.00,
    account: "Office Expenses",
    status: "Completed",
  },
  {
    id: "TRX-10004",
    date: "2025-05-08",
    type: "Invoice",
    description: "Invoice #1235 - Tech Solutions",
    amount: 2456.00,
    account: "Accounts Receivable",
    status: "Pending",
  },
  {
    id: "TRX-10005",
    date: "2025-05-07",
    type: "Payment",
    description: "Payment #9877 - Acme Corp",
    amount: -1200.00,
    account: "Cash",
    status: "Completed",
  },
  {
    id: "TRX-10006",
    date: "2025-05-06",
    type: "Expense",
    description: "Rent Payment",
    amount: -3500.00,
    account: "Rent Expense",
    status: "Completed",
  },
  {
    id: "TRX-10007",
    date: "2025-05-05",
    type: "Payroll",
    description: "Payroll - May Week 1",
    amount: -4850.00,
    account: "Salaries Expense",
    status: "Completed",
  },
];

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
      
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search transactions..." className="pl-8" />
        </div>
        <div className="flex items-center space-x-2">
          <Input type="date" className="w-auto" />
          <span className="text-sm">to</span>
          <Input type="date" className="w-auto" />
        </div>
      </div>
      
      <DataTable
        columns={transactionColumns}
        data={transactions}
        idField="id"
      />
    </div>
  );
};

export default Transactions;
