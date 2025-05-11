
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";
import { Download, FileText, Printer } from "lucide-react";

// Sample financial data for charts
const financialData = [
  { month: "Jan", revenue: 45000, expenses: 32000, profit: 13000 },
  { month: "Feb", revenue: 52000, expenses: 34000, profit: 18000 },
  { month: "Mar", revenue: 49000, expenses: 33000, profit: 16000 },
  { month: "Apr", revenue: 58000, expenses: 36000, profit: 22000 },
  { month: "May", revenue: 55000, expenses: 35000, profit: 20000 },
];

// Sample expense breakdown data
const expenseData = [
  { category: "Salaries", amount: 45000 },
  { category: "Rent", amount: 12000 },
  { category: "Utilities", amount: 5000 },
  { category: "Supplies", amount: 8000 },
  { category: "Marketing", amount: 15000 },
  { category: "Other", amount: 5000 },
];

const Reports = () => {
  const [activeTab, setActiveTab] = useState("profit-loss");

  return (
    <div className="page-container">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="page-title mb-0">Financial Reports</h1>
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button size="sm" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm" variant="default">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
          <TabsTrigger value="profit-loss">Profit & Loss</TabsTrigger>
          <TabsTrigger value="balance-sheet">Balance Sheet</TabsTrigger>
          <TabsTrigger value="cash-flow">Cash Flow</TabsTrigger>
          <TabsTrigger value="tax">Tax Report</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profit-loss" className="mt-6">
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue vs. Expenses</CardTitle>
                <CardDescription>Year-to-date comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <div style={{ width: "100%", height: "300px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={financialData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="month"
                        stroke="#6b7280"
                        fontSize={12}
                        tickLine={false}
                        axisLine={{ stroke: "#e5e7eb" }}
                      />
                      <YAxis
                        stroke="#6b7280"
                        fontSize={12}
                        tickLine={false}
                        axisLine={{ stroke: "#e5e7eb" }}
                        tickFormatter={(value) => `$${value / 1000}k`}
                      />
                      <Tooltip
                        formatter={(value) => [`$${value}`, undefined]}
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "0.375rem",
                        }}
                      />
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconSize={10}
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="expenses"
                        stroke="#EF4444"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="profit"
                        stroke="#10B981"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>By category</CardDescription>
              </CardHeader>
              <CardContent>
                <div style={{ width: "100%", height: "300px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={expenseData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="category"
                        stroke="#6b7280"
                        fontSize={12}
                        tickLine={false}
                        axisLine={{ stroke: "#e5e7eb" }}
                      />
                      <YAxis
                        stroke="#6b7280"
                        fontSize={12}
                        tickLine={false}
                        axisLine={{ stroke: "#e5e7eb" }}
                        tickFormatter={(value) => `$${value / 1000}k`}
                      />
                      <Tooltip
                        formatter={(value) => [`$${value}`, undefined]}
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "0.375rem",
                        }}
                      />
                      <Bar dataKey="amount" fill="#6366F1" barSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Profit & Loss Statement</CardTitle>
                <CardDescription>Year-to-date summary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="p-3 text-left font-medium text-sm">Item</th>
                          <th className="p-3 text-right font-medium text-sm">Amount</th>
                          <th className="p-3 text-right font-medium text-sm">% of Revenue</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="p-3 text-left font-medium">Revenue</td>
                          <td className="p-3 text-right">$259,000.00</td>
                          <td className="p-3 text-right">100%</td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-3 text-left">Cost of Goods Sold</td>
                          <td className="p-3 text-right">$120,000.00</td>
                          <td className="p-3 text-right">46.3%</td>
                        </tr>
                        <tr className="border-t bg-muted/30">
                          <td className="p-3 text-left font-medium">Gross Profit</td>
                          <td className="p-3 text-right font-medium">$139,000.00</td>
                          <td className="p-3 text-right font-medium">53.7%</td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-3 text-left">Operating Expenses</td>
                          <td className="p-3 text-right">$90,000.00</td>
                          <td className="p-3 text-right">34.7%</td>
                        </tr>
                        <tr className="border-t bg-muted/30">
                          <td className="p-3 text-left font-medium">Net Operating Income</td>
                          <td className="p-3 text-right font-medium">$49,000.00</td>
                          <td className="p-3 text-right font-medium">18.9%</td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-3 text-left">Other Income</td>
                          <td className="p-3 text-right">$3,500.00</td>
                          <td className="p-3 text-right">1.4%</td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-3 text-left">Other Expenses</td>
                          <td className="p-3 text-right">$2,800.00</td>
                          <td className="p-3 text-right">1.1%</td>
                        </tr>
                        <tr className="border-t bg-muted/50">
                          <td className="p-3 text-left font-bold">Net Income</td>
                          <td className="p-3 text-right font-bold">$49,700.00</td>
                          <td className="p-3 text-right font-bold">19.2%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="balance-sheet" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Balance Sheet</CardTitle>
              <CardDescription>As of May 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Assets</h3>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="p-3 text-left font-medium text-sm">Item</th>
                            <th className="p-3 text-right font-medium text-sm">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t">
                            <td className="p-3 text-left">Cash and Equivalents</td>
                            <td className="p-3 text-right">$65,000.00</td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3 text-left">Accounts Receivable</td>
                            <td className="p-3 text-right">$42,500.00</td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3 text-left">Inventory</td>
                            <td className="p-3 text-right">$85,750.00</td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3 text-left">Fixed Assets</td>
                            <td className="p-3 text-right">$125,000.00</td>
                          </tr>
                          <tr className="border-t bg-muted/30">
                            <td className="p-3 text-left font-bold">Total Assets</td>
                            <td className="p-3 text-right font-bold">$318,250.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Liabilities & Equity</h3>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="p-3 text-left font-medium text-sm">Item</th>
                            <th className="p-3 text-right font-medium text-sm">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t">
                            <td className="p-3 text-left">Accounts Payable</td>
                            <td className="p-3 text-right">$28,750.00</td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3 text-left">Short-term Loans</td>
                            <td className="p-3 text-right">$15,000.00</td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3 text-left">Long-term Loans</td>
                            <td className="p-3 text-right">$75,000.00</td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3 text-left">Owner's Equity</td>
                            <td className="p-3 text-right">$199,500.00</td>
                          </tr>
                          <tr className="border-t bg-muted/30">
                            <td className="p-3 text-left font-bold">Total Liabilities & Equity</td>
                            <td className="p-3 text-right font-bold">$318,250.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cash-flow" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Cash Flow Statement</CardTitle>
              <CardDescription>Year-to-date</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">Select a date range to view cash flow details</p>
              
              <div className="border rounded-lg overflow-hidden mb-6">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="p-3 text-left font-medium text-sm">Category</th>
                      <th className="p-3 text-right font-medium text-sm">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t bg-muted/30">
                      <td className="p-3 text-left font-medium">Operating Activities</td>
                      <td className="p-3 text-right font-medium"></td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 text-left pl-6">Net Income</td>
                      <td className="p-3 text-right">$49,700.00</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 text-left pl-6">Depreciation</td>
                      <td className="p-3 text-right">$12,500.00</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 text-left pl-6">Changes in Working Capital</td>
                      <td className="p-3 text-right">-$8,750.00</td>
                    </tr>
                    <tr className="border-t bg-muted/20">
                      <td className="p-3 text-left pl-6 font-medium">Net Cash from Operating</td>
                      <td className="p-3 text-right font-medium">$53,450.00</td>
                    </tr>
                    
                    <tr className="border-t bg-muted/30">
                      <td className="p-3 text-left font-medium">Investing Activities</td>
                      <td className="p-3 text-right font-medium"></td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 text-left pl-6">Fixed Asset Purchases</td>
                      <td className="p-3 text-right">-$25,000.00</td>
                    </tr>
                    <tr className="border-t bg-muted/20">
                      <td className="p-3 text-left pl-6 font-medium">Net Cash from Investing</td>
                      <td className="p-3 text-right font-medium">-$25,000.00</td>
                    </tr>
                    
                    <tr className="border-t bg-muted/30">
                      <td className="p-3 text-left font-medium">Financing Activities</td>
                      <td className="p-3 text-right font-medium"></td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 text-left pl-6">Loan Repayments</td>
                      <td className="p-3 text-right">-$12,500.00</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 text-left pl-6">Dividends Paid</td>
                      <td className="p-3 text-right">-$5,000.00</td>
                    </tr>
                    <tr className="border-t bg-muted/20">
                      <td className="p-3 text-left pl-6 font-medium">Net Cash from Financing</td>
                      <td className="p-3 text-right font-medium">-$17,500.00</td>
                    </tr>
                    
                    <tr className="border-t bg-muted/50">
                      <td className="p-3 text-left font-bold">Net Increase in Cash</td>
                      <td className="p-3 text-right font-bold">$10,950.00</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 text-left">Cash at Beginning of Period</td>
                      <td className="p-3 text-right">$54,050.00</td>
                    </tr>
                    <tr className="border-t bg-muted/50">
                      <td className="p-3 text-left font-bold">Cash at End of Period</td>
                      <td className="p-3 text-right font-bold">$65,000.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tax" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Tax Reports</CardTitle>
              <CardDescription>Select a tax report type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
                {["Sales Tax", "Income Tax", "Payroll Tax", "Property Tax"].map((tax) => (
                  <Card key={tax} className="cursor-pointer card-hover">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{tax}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">View and generate {tax.toLowerCase()} reports</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="flex justify-center text-center p-12">
                <div className="max-w-md">
                  <h3 className="text-lg font-medium mb-2">Select a report type above</h3>
                  <p className="text-muted-foreground mb-4">
                    Choose one of the tax report types to view detailed reports
                    and generate tax documents.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
