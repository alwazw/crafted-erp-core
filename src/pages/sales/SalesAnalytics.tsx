
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/dashboard/DataTable";
import { 
  FilePlus,
  FileText,
  Calendar,
  Search,
  TrendingUp,
  TrendingDown,
  ChartBar,
  ChartLine,
  ChartPie,
  Download
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import { useToast } from "@/hooks/use-toast";

// Sample sales transaction data
const salesTransactions = [
  {
    id: "TRX-5001",
    date: "2025-05-10",
    customer: "Acme Corp",
    sku: "WD-5001",
    product: "Premium Widget",
    quantity: 15,
    unitPrice: 24.99,
    totalPrice: 374.85,
    averageCost: 12.50,
    totalCost: 187.50,
    profit: 187.35,
    margin: 50.0
  },
  {
    id: "TRX-5002",
    date: "2025-05-09",
    customer: "TechSoft",
    sku: "GD-2001",
    product: "Standard Gadget",
    quantity: 8,
    unitPrice: 34.99,
    totalPrice: 279.92,
    averageCost: 17.25,
    totalCost: 138.00,
    profit: 141.92,
    margin: 50.7
  },
  {
    id: "TRX-5003",
    date: "2025-05-09",
    customer: "Global Industries",
    sku: "AC-1001",
    product: "Advanced Component",
    quantity: 6,
    unitPrice: 89.99,
    totalPrice: 539.94,
    averageCost: 45.00,
    totalCost: 270.00,
    profit: 269.94,
    margin: 50.0
  },
  {
    id: "TRX-5004",
    date: "2025-05-08",
    customer: "Pinnacle Services",
    sku: "WD-5002",
    product: "Basic Widget",
    quantity: 20,
    unitPrice: 14.99,
    totalPrice: 299.80,
    averageCost: 7.50,
    totalCost: 150.00,
    profit: 149.80,
    margin: 50.0
  },
  {
    id: "TRX-5005",
    date: "2025-05-07",
    customer: "Elite Enterprises",
    sku: "GD-2002",
    product: "Deluxe Gadget",
    quantity: 3,
    unitPrice: 59.99,
    totalPrice: 179.97,
    averageCost: 32.75,
    totalCost: 98.25,
    profit: 81.72,
    margin: 45.4
  },
  {
    id: "TRX-5006",
    date: "2025-05-06",
    customer: "Acme Corp",
    sku: "AC-1002",
    product: "Basic Component",
    quantity: 12,
    unitPrice: 49.99,
    totalPrice: 599.88,
    averageCost: 22.50,
    totalCost: 270.00,
    profit: 329.88,
    margin: 55.0
  },
  {
    id: "TRX-5007",
    date: "2025-05-05",
    customer: "TechSoft",
    sku: "SP-3001",
    product: "Specialty Part",
    quantity: 10,
    unitPrice: 29.99,
    totalPrice: 299.90,
    averageCost: 15.25,
    totalCost: 152.50,
    profit: 147.40,
    margin: 49.1
  },
  {
    id: "TRX-5008",
    date: "2025-05-04",
    customer: "Global Industries",
    sku: "WD-5001",
    product: "Premium Widget",
    quantity: 5,
    unitPrice: 24.99,
    totalPrice: 124.95,
    averageCost: 12.50,
    totalCost: 62.50,
    profit: 62.45,
    margin: 50.0
  },
  {
    id: "TRX-5009",
    date: "2025-05-03",
    customer: "Pinnacle Services",
    sku: "GD-2001",
    product: "Standard Gadget",
    quantity: 6,
    unitPrice: 34.99,
    totalPrice: 209.94,
    averageCost: 17.25,
    totalCost: 103.50,
    profit: 106.44,
    margin: 50.7
  },
  {
    id: "TRX-5010",
    date: "2025-05-02",
    customer: "Elite Enterprises",
    sku: "AC-1001",
    product: "Advanced Component",
    quantity: 4,
    unitPrice: 89.99,
    totalPrice: 359.96,
    averageCost: 45.00,
    totalCost: 180.00,
    profit: 179.96,
    margin: 50.0
  },
];

// Calculate aggregated data by SKU
const aggregatedBySku = salesTransactions.reduce((acc, trx) => {
  if (!acc[trx.sku]) {
    acc[trx.sku] = {
      sku: trx.sku,
      product: trx.product,
      totalQuantity: 0,
      totalRevenue: 0,
      totalCost: 0,
      totalProfit: 0,
      averageCost: 0,
      transactions: 0,
      margin: 0
    };
  }
  
  const skuData = acc[trx.sku];
  skuData.totalQuantity += trx.quantity;
  skuData.totalRevenue += trx.totalPrice;
  skuData.totalCost += trx.totalCost;
  skuData.totalProfit += trx.profit;
  skuData.transactions += 1;
  skuData.averageCost = trx.averageCost; // Using the average cost from transaction
  
  return acc;
}, {} as Record<string, any>);

// Convert to array and calculate margins
const salesByProduct = Object.values(aggregatedBySku).map((item: any) => {
  item.margin = (item.totalProfit / item.totalRevenue) * 100;
  return item;
});

// Aggregate by customer
const salesByCustomer = salesTransactions.reduce((acc, trx) => {
  if (!acc[trx.customer]) {
    acc[trx.customer] = {
      customer: trx.customer,
      totalQuantity: 0,
      totalRevenue: 0,
      totalProfit: 0,
      transactions: 0,
    };
  }
  
  const customerData = acc[trx.customer];
  customerData.totalQuantity += trx.quantity;
  customerData.totalRevenue += trx.totalPrice;
  customerData.totalProfit += trx.profit;
  customerData.transactions += 1;
  
  return acc;
}, {} as Record<string, any>);

// Convert to array
const customerData = Object.values(salesByCustomer);

// Aggregate by date
const salesByDate = salesTransactions.reduce((acc, trx) => {
  const date = trx.date;
  if (!acc[date]) {
    acc[date] = {
      date,
      revenue: 0,
      cost: 0,
      profit: 0,
      quantity: 0
    };
  }
  
  acc[date].revenue += trx.totalPrice;
  acc[date].cost += trx.totalCost;
  acc[date].profit += trx.profit;
  acc[date].quantity += trx.quantity;
  
  return acc;
}, {} as Record<string, any>);

// Convert to array and sort by date
const timeSeriesData = Object.values(salesByDate).sort((a: any, b: any) => 
  new Date(a.date).getTime() - new Date(b.date).getTime()
);

// Column definitions for aggregated SKU data table
const skuColumns = [
  {
    id: "sku",
    header: "SKU",
    cell: (item: any) => item.sku,
  },
  {
    id: "product",
    header: "Product",
    cell: (item: any) => item.product,
  },
  {
    id: "totalQuantity",
    header: "Quantity Sold",
    cell: (item: any) => item.totalQuantity.toLocaleString(),
  },
  {
    id: "totalRevenue",
    header: "Revenue",
    cell: (item: any) => (
      <div className="font-medium">
        ${item.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </div>
    ),
  },
  {
    id: "averageCost",
    header: "Avg. Cost",
    cell: (item: any) => (
      <div className="text-gray-600">
        ${item.averageCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </div>
    ),
  },
  {
    id: "totalCost",
    header: "Total Cost",
    cell: (item: any) => (
      <div className="text-gray-600">
        ${item.totalCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </div>
    ),
  },
  {
    id: "totalProfit",
    header: "Profit",
    cell: (item: any) => (
      <div className="text-green-600 font-medium">
        ${item.totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </div>
    ),
  },
  {
    id: "margin",
    header: "Margin %",
    cell: (item: any) => (
      <div className="font-medium">
        {item.margin.toFixed(2)}%
      </div>
    ),
  },
];

// Column definitions for transaction detail table
const transactionColumns = [
  {
    id: "id",
    header: "Trans. ID",
    cell: (item: any) => item.id,
  },
  {
    id: "date",
    header: "Date",
    cell: (item: any) => item.date,
  },
  {
    id: "customer",
    header: "Customer",
    cell: (item: any) => item.customer,
  },
  {
    id: "product",
    header: "Product",
    cell: (item: any) => item.product,
  },
  {
    id: "quantity",
    header: "Qty",
    cell: (item: any) => item.quantity,
  },
  {
    id: "unitPrice",
    header: "Unit Price",
    cell: (item: any) => `$${item.unitPrice.toFixed(2)}`,
  },
  {
    id: "totalPrice",
    header: "Total",
    cell: (item: any) => (
      <div className="font-medium">
        ${item.totalPrice.toFixed(2)}
      </div>
    ),
  },
  {
    id: "averageCost",
    header: "Avg. Cost",
    cell: (item: any) => `$${item.averageCost.toFixed(2)}`,
  },
  {
    id: "profit",
    header: "Profit",
    cell: (item: any) => (
      <div className="text-green-600">
        ${item.profit.toFixed(2)}
      </div>
    ),
  },
  {
    id: "margin",
    header: "Margin",
    cell: (item: any) => `${item.margin.toFixed(2)}%`,
  },
];

// Column definitions for customer data
const customerColumns = [
  {
    id: "customer",
    header: "Customer",
    cell: (item: any) => item.customer,
  },
  {
    id: "transactions",
    header: "Orders",
    cell: (item: any) => item.transactions,
  },
  {
    id: "totalQuantity",
    header: "Items",
    cell: (item: any) => item.totalQuantity,
  },
  {
    id: "totalRevenue",
    header: "Revenue",
    cell: (item: any) => (
      <div className="font-medium">
        ${item.totalRevenue.toFixed(2)}
      </div>
    ),
  },
  {
    id: "totalProfit",
    header: "Profit",
    cell: (item: any) => (
      <div className="text-green-600">
        ${item.totalProfit.toFixed(2)}
      </div>
    ),
  },
  {
    id: "avgOrderValue",
    header: "Avg. Order",
    cell: (item: any) => (
      `$${(item.totalRevenue / item.transactions).toFixed(2)}`
    ),
  },
];

// Colors for charts
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe', '#00C49F'];

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 border border-border shadow-md rounded">
        <p className="font-medium">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: $${entry.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const SalesAnalytics = () => {
  const { toast } = useToast();
  const [activeView, setActiveView] = useState<"overview" | "products" | "customers" | "time">("overview");
  const [selectedSku, setSelectedSku] = useState<string | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState("day");
  const [dateRange, setDateRange] = useState({
    start: "2025-05-01",
    end: "2025-05-10"
  });
  
  // Filter data if SKU is selected
  const filteredTransactions = selectedSku
    ? salesTransactions.filter(trx => trx.sku === selectedSku)
    : selectedCustomer 
      ? salesTransactions.filter(trx => trx.customer === selectedCustomer)
      : salesTransactions;
  
  // Calculate totals for KPIs
  const totalSales = filteredTransactions.reduce((sum, trx) => sum + trx.totalPrice, 0);
  const totalQuantity = filteredTransactions.reduce((sum, trx) => sum + trx.quantity, 0);
  const totalCost = filteredTransactions.reduce((sum, trx) => sum + trx.totalCost, 0);
  const totalProfit = filteredTransactions.reduce((sum, trx) => sum + trx.profit, 0);
  const avgMargin = totalSales > 0 ? (totalProfit / totalSales) * 100 : 0;
  
  const handleSkuDrilldown = (sku: any) => {
    setSelectedSku(sku.sku);
    setSelectedCustomer(null);
    setActiveView("products");
    toast({
      title: "Product Selected",
      description: `Viewing sales data for ${sku.product} (${sku.sku})`,
    });
  };
  
  const handleCustomerDrilldown = (customer: any) => {
    setSelectedCustomer(customer.customer);
    setSelectedSku(null);
    setActiveView("customers");
    toast({
      title: "Customer Selected", 
      description: `Viewing sales data for ${customer.customer}`
    });
  };
  
  const resetFilters = () => {
    setSelectedSku(null);
    setSelectedCustomer(null);
    toast({
      title: "Filters Reset",
      description: "Viewing all sales data",
    });
  };
  
  const handleExport = () => {
    toast({
      title: "Report Exported",
      description: "Sales report has been generated and downloaded",
    });
  };

  return (
    <div className="page-container">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="page-title mb-0">Sales Analytics</h1>
          {selectedSku && (
            <div className="text-sm text-muted-foreground mt-1">
              Filtered by SKU: <span className="font-medium">{selectedSku}</span>
              <Button variant="link" size="sm" className="p-0 ml-2 h-auto" onClick={resetFilters}>
                Reset
              </Button>
            </div>
          )}
          {selectedCustomer && (
            <div className="text-sm text-muted-foreground mt-1">
              Filtered by Customer: <span className="font-medium">{selectedCustomer}</span>
              <Button variant="link" size="sm" className="p-0 ml-2 h-auto" onClick={resetFilters}>
                Reset
              </Button>
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button size="sm" variant="default">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-4 mb-6">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Total Sales</div>
          <div className="text-2xl font-bold">
            ${totalSales.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Items Sold</div>
          <div className="text-2xl font-bold">
            {totalQuantity.toLocaleString()}
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Total Profit</div>
          <div className="text-2xl font-bold text-green-600">
            ${totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Profit Margin</div>
          <div className="text-2xl font-bold text-blue-600">
            {avgMargin.toFixed(2)}%
          </div>
        </Card>
      </div>
      
      <Tabs value={activeView} onValueChange={(v) => setActiveView(v as any)} className="mb-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">By Product</TabsTrigger>
          <TabsTrigger value="customers">By Customer</TabsTrigger>
          <TabsTrigger value="time">By Time Period</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {activeView === "overview" && (
        <>
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer>
                    <LineChart data={timeSeriesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="profit" name="Profit" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Sales by Product</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer>
                    <BarChart data={salesByProduct} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="sku" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="totalRevenue" name="Revenue" fill="#8884d8" />
                      <Bar dataKey="totalProfit" name="Profit" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-6 grid-cols-1 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Products</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={skuColumns}
                  data={salesByProduct.sort((a, b) => b.totalRevenue - a.totalRevenue)}
                  idField="sku"
                  onRowClick={handleSkuDrilldown}
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-6 grid-cols-1 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={customerColumns}
                  data={customerData}
                  idField="customer"
                  onRowClick={handleCustomerDrilldown}
                />
              </CardContent>
            </Card>
          </div>
        </>
      )}
      
      {activeView === "products" && (
        <>
          <div className="flex flex-col md:flex-row gap-4 mb-4 items-end">
            <div className="relative flex-1">
              <label className="text-sm font-medium mb-1 block">Search Products</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by SKU or product name..." className="pl-8" />
              </div>
            </div>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div style={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer>
                    <BarChart data={selectedSku ? salesByProduct.filter(p => p.sku === selectedSku) : salesByProduct} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="sku" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="totalQuantity" name="Quantity" fill="#ffc658" />
                      <Bar dataKey="totalRevenue" name="Revenue" fill="#8884d8" />
                      <Bar dataKey="totalProfit" name="Profit" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <DataTable
                columns={skuColumns}
                data={selectedSku ? salesByProduct.filter(p => p.sku === selectedSku) : salesByProduct}
                idField="sku"
                onRowClick={handleSkuDrilldown}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Detailed Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={transactionColumns}
                data={filteredTransactions}
                idField="id"
              />
            </CardContent>
          </Card>
        </>
      )}
      
      {activeView === "customers" && (
        <>
          <div className="flex flex-col md:flex-row gap-4 mb-4 items-end">
            <div className="relative flex-1">
              <label className="text-sm font-medium mb-1 block">Search Customers</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by customer name..." className="pl-8" />
              </div>
            </div>
          </div>
          
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer>
                    <BarChart data={selectedCustomer 
                      ? customerData.filter(c => c.customer === selectedCustomer) 
                      : customerData.sort((a, b) => b.totalRevenue - a.totalRevenue).slice(0, 5)
                    } margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="customer" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="totalRevenue" name="Revenue" fill="#8884d8" />
                      <Bar dataKey="totalProfit" name="Profit" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Customer Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={customerData}
                        dataKey="totalRevenue"
                        nameKey="customer"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      >
                        {customerData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`$${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2 })}`, undefined]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Customer Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={customerColumns}
                data={selectedCustomer ? customerData.filter(c => c.customer === selectedCustomer) : customerData}
                idField="customer"
                onRowClick={handleCustomerDrilldown}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Customer Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={transactionColumns}
                data={filteredTransactions}
                idField="id"
              />
            </CardContent>
          </Card>
        </>
      )}
      
      {activeView === "time" && (
        <>
          <div className="flex flex-col md:flex-row gap-4 mb-6 items-end">
            <div className="w-full md:w-64">
              <label className="text-sm font-medium mb-1 block">Time Period</label>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Daily</SelectItem>
                  <SelectItem value="week">Weekly</SelectItem>
                  <SelectItem value="month">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <div>
                <label className="text-sm font-medium mb-1 block">From</label>
                <Input 
                  type="date" 
                  className="w-auto" 
                  value={dateRange.start} 
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">To</label>
                <Input 
                  type="date" 
                  className="w-auto" 
                  value={dateRange.end} 
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                />
              </div>
            </div>
            <Button variant="outline" size="sm">
              Apply
            </Button>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Sales Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ width: "100%", height: 400 }}>
                <ResponsiveContainer>
                  <LineChart data={timeSeriesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="cost" name="Cost" stroke="#ff7300" strokeWidth={2} />
                    <Line type="monotone" dataKey="profit" name="Profit" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-6 grid-cols-1 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales by Date</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Date</th>
                      <th className="text-right py-2">Units Sold</th>
                      <th className="text-right py-2">Revenue</th>
                      <th className="text-right py-2">Cost</th>
                      <th className="text-right py-2">Profit</th>
                      <th className="text-right py-2">Margin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timeSeriesData.map((day, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3">{day.date}</td>
                        <td className="text-right">{day.quantity}</td>
                        <td className="text-right">${day.revenue.toFixed(2)}</td>
                        <td className="text-right">${day.cost.toFixed(2)}</td>
                        <td className="text-right text-green-600">${day.profit.toFixed(2)}</td>
                        <td className="text-right">
                          {(day.profit / day.revenue * 100).toFixed(2)}%
                        </td>
                      </tr>
                    ))}
                    <tr className="font-bold bg-muted/20">
                      <td className="py-3">Total</td>
                      <td className="text-right">
                        {timeSeriesData.reduce((sum, day) => sum + day.quantity, 0)}
                      </td>
                      <td className="text-right">
                        ${timeSeriesData.reduce((sum, day) => sum + day.revenue, 0).toFixed(2)}
                      </td>
                      <td className="text-right">
                        ${timeSeriesData.reduce((sum, day) => sum + day.cost, 0).toFixed(2)}
                      </td>
                      <td className="text-right text-green-600">
                        ${timeSeriesData.reduce((sum, day) => sum + day.profit, 0).toFixed(2)}
                      </td>
                      <td className="text-right">
                        {(timeSeriesData.reduce((sum, day) => sum + day.profit, 0) / 
                          timeSeriesData.reduce((sum, day) => sum + day.revenue, 0) * 100).toFixed(2)}%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default SalesAnalytics;
