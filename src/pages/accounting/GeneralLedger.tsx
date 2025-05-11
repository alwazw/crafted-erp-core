
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/dashboard/DataTable";
import { Card } from "@/components/ui/card";
import { ChartBar, FilePlus } from "lucide-react";

// Sample ledger accounts
const ledgerAccounts = [
  {
    id: "1001",
    code: "1001",
    name: "Cash",
    type: "Asset",
    balance: 25000.00,
    updated: "2025-05-01",
  },
  {
    id: "1002",
    code: "1002",
    name: "Accounts Receivable",
    type: "Asset",
    balance: 12450.75,
    updated: "2025-05-03",
  },
  {
    id: "2001",
    code: "2001",
    name: "Accounts Payable",
    type: "Liability",
    balance: 8750.25,
    updated: "2025-05-02",
  },
  {
    id: "3001",
    code: "3001",
    name: "Common Stock",
    type: "Equity",
    balance: 50000.00,
    updated: "2025-01-01",
  },
  {
    id: "4001",
    code: "4001",
    name: "Sales Revenue",
    type: "Revenue",
    balance: 35250.00,
    updated: "2025-05-10",
  },
  {
    id: "5001",
    code: "5001",
    name: "Cost of Goods Sold",
    type: "Expense",
    balance: 18750.50,
    updated: "2025-05-09",
  },
  {
    id: "5002",
    code: "5002",
    name: "Salaries Expense",
    type: "Expense",
    balance: 12500.00,
    updated: "2025-05-05",
  },
  {
    id: "5003",
    code: "5003",
    name: "Rent Expense",
    type: "Expense",
    balance: 3500.00,
    updated: "2025-05-01",
  },
];

// Column definitions for ledger accounts table
const accountColumns = [
  {
    id: "code",
    header: "Account Code",
    cell: (account: any) => account.code,
  },
  {
    id: "name",
    header: "Account Name",
    cell: (account: any) => account.name,
  },
  {
    id: "type",
    header: "Type",
    cell: (account: any) => {
      const typeClasses = {
        Asset: "bg-blue-100 text-blue-800",
        Liability: "bg-red-100 text-red-800",
        Equity: "bg-green-100 text-green-800",
        Revenue: "bg-purple-100 text-purple-800",
        Expense: "bg-orange-100 text-orange-800",
      };
      return (
        <div className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${typeClasses[account.type as keyof typeof typeClasses]}`}>
          {account.type}
        </div>
      );
    },
  },
  {
    id: "balance",
    header: "Balance",
    cell: (account: any) => (
      <div className="font-medium text-right">
        ${account.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
    ),
  },
  {
    id: "updated",
    header: "Last Updated",
    cell: (account: any) => account.updated,
  },
  {
    id: "actions",
    header: "Actions",
    cell: (account: any) => (
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

const GeneralLedger = () => {
  const [accountType, setAccountType] = useState<string>("all");
  
  // Filter accounts by type
  const filteredAccounts = accountType === "all"
    ? ledgerAccounts
    : ledgerAccounts.filter(account => account.type.toLowerCase() === accountType.toLowerCase());

  // Calculate totals
  const assetTotal = ledgerAccounts
    .filter(account => account.type === "Asset")
    .reduce((sum, account) => sum + account.balance, 0);
    
  const liabilityTotal = ledgerAccounts
    .filter(account => account.type === "Liability")
    .reduce((sum, account) => sum + account.balance, 0);
    
  const equityTotal = ledgerAccounts
    .filter(account => account.type === "Equity")
    .reduce((sum, account) => sum + account.balance, 0);

  return (
    <div className="page-container">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="page-title mb-0">General Ledger</h1>
        <div className="flex items-center space-x-2">
          <Button size="sm">
            <ChartBar className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button size="sm" variant="default">
            <FilePlus className="mr-2 h-4 w-4" />
            New Account
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3 mb-6">
        <Card className="p-4 flex flex-col items-center justify-center text-center">
          <div className="text-sm text-muted-foreground mb-1">Total Assets</div>
          <div className="text-2xl font-bold text-blue-600">
            ${assetTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </Card>
        <Card className="p-4 flex flex-col items-center justify-center text-center">
          <div className="text-sm text-muted-foreground mb-1">Total Liabilities</div>
          <div className="text-2xl font-bold text-red-600">
            ${liabilityTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </Card>
        <Card className="p-4 flex flex-col items-center justify-center text-center">
          <div className="text-sm text-muted-foreground mb-1">Total Equity</div>
          <div className="text-2xl font-bold text-green-600">
            ${equityTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </Card>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-4 items-end">
        <div className="w-full md:w-64">
          <label className="text-sm font-medium mb-1 block">Account Type</label>
          <Select value={accountType} onValueChange={setAccountType}>
            <SelectTrigger>
              <SelectValue placeholder="All Account Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Account Types</SelectItem>
              <SelectItem value="asset">Asset</SelectItem>
              <SelectItem value="liability">Liability</SelectItem>
              <SelectItem value="equity">Equity</SelectItem>
              <SelectItem value="revenue">Revenue</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-auto">
          <Input placeholder="Search accounts..." className="md:w-64" />
        </div>
      </div>
      
      <DataTable
        columns={accountColumns}
        data={filteredAccounts}
        idField="id"
      />
    </div>
  );
};

export default GeneralLedger;
