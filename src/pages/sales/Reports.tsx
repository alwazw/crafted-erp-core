
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/dashboard/DataTable";
import {
  FilePlus,
  Search,
  ChartBar,
  Calendar,
  FileText,
  File,
  ArrowDown,
  ArrowUp,
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

// Sample sales data by product
const salesByProduct = [
  { 
    sku: "WD-5001", 
    name: "Premium Widget", 
    category: "Widgets",
    quantity: 450, 
    revenue: 11245.50, 
    cost: 5625.00,
    profit: 5620.50,
    margin: 49.98
  },
  { 
    sku: "GD-2001", 
    name: "Standard Gadget", 
    category: "Gadgets",
    quantity: 320, 
    revenue: 11196.80, 
    cost: 5520.00,
    profit: 5676.80,
    margin: 50.70
  },
  { 
    sku: "AC-1001", 
    name: "Advanced Component", 
    category: "Components",
    quantity: 180, 
    revenue: 16198.20, 
    cost: 8100.00,
    profit: 8098.20,
    margin: 50.00
  },
  { 
    sku: "WD-5002", 
    name: "Basic Widget", 
    category: "Widgets",
    quantity: 540, 
    revenue: 8094.60, 
    cost: 4050.00,
    profit: 4044.60,
    margin: 49.97
  },
  { 
    sku: "GD-2002", 
    name: "Deluxe Gadget", 
    category: "Gadgets",
    quantity: 105, 
    revenue: 6298.95, 
    cost: 3438.75,
    profit: 2860.20,
    margin: 45.41
  },
  { 
    sku: "AC-1002", 
    name: "Basic Component", 
    category: "Components",
    quantity: 290, 
    revenue: 14497.10, 
    cost: 6525.00,
    profit: 7972.10,
    margin: 55.00
  },
  { 
    sku: "SP-3001", 
    name: "Specialty Part", 
    category: "Parts",
    quantity: 210, 
    revenue: 6297.90, 
    cost: 3202.50,
    profit: 3095.40,
    margin: 49.15
  },
];

// Sample sales data by month
const salesByMonth = [
  { month: "Jan", revenue: 15450.20, cost: 7520.10, profit: 7930.10 },
  { month: "Feb", revenue: 18720.50, cost: 9150.25, profit: 9570.25 },
  { month: "Mar", revenue: 22340.75, cost: 10970.30, profit: 11370.45 },
  { month: "Apr", revenue: 19850.30, cost: 9730.15, profit: 10120.15 },
  { month: "May", revenue: 26540.40, cost: 12980.20, profit: 13560.20 },
];

// Sample sales data by category
const salesByCategory = [
  { name: "Widgets", value: 19340.10 },
  { name: "Gadgets", value: 17495.75 },
  { name: "Components", value: 30695.30 },
  { name: "Parts", value: 6297.90 },
];

// Sample recent sales for drilldown
const recentSales = [
  {
    id: "SALE-5001",
    date: "2025-05-10",
    sku: "WD-5001",
    product: "Premium Widget",
    customer: "Acme Corp",
    quantity: 15,
    price: 24.99,
    total: 374.85
  },
  {
    id: "SALE-5002",
    date: "2025-05-09",
    sku: "GD-2001",
    product: "Standard Gadget",
    customer: "TechSoft",
    quantity: 8,
    price: 34.99,
    total: 279.92
  },
  {
    id: "SALE-5003",
    date: "2025-05-09",
    sku: "AC-1001",
    product: "Advanced Component",
    customer: "Global Industries",
    quantity: 6,
    price: 89.99,
    total: 539.94
  },
  {
    id: "SALE-5004",
    date: "2025-05-08",
    sku: "WD-5002",
    product: "Basic Widget",
    customer: "Pinnacle Services",
    quantity: 20,
    price: 14.99,
    total: 299.80
  },
  {
    id: "SALE-5005",
    date: "2025-05-07",
    sku: "GD-2002",
    product: "Deluxe Gadget",
    customer: "Elite Enterprises",
    quantity: 3,
    price: 59.99,
    total: 179.97
  },
];

// Categories from sales data
const categories = [...new Set(salesByProduct.map(p => p.category))];

// COLORS for charts
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe', '#00C49F'];

// Column definitions for sales by product table
const salesByProductColumns = [
  {
    id: "sku",
    header: "SKU",
    cell: (item: any) => item.sku,
  },
  {
    id: "name",
    header: "Product Name",
    cell: (item: any) => item.name,
  },
  {
    id: "category",
    header: "Category",
    cell: (item: any) => item.category,
  },
  {
    id: "quantity",
    header: "Qty Sold",
    cell: (item: any) => item.quantity.toLocaleString(),
  },
  {
    id: "revenue",
    header: "Revenue",
    cell: (item: any) => (
      <div className="font-medium">
        ${item.revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </div>
    ),
  },
  {
    id: "cost",
    header: "Cost",
    cell: (item: any) => (
      <div className="font-medium text-gray-600">
        ${item.cost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </div>
    ),
  },
  {
    id: "profit",
    header: "Profit",
    cell: (item: any) => (
      <div className="font-medium text-green-600">
        ${item.profit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
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
  {
    id: "actions",
    header: "Actions",
    cell: (item: any) => (
      <Button variant="ghost" size="sm">
        Details
      </Button>
    ),
  },
];

// Column definitions for sales drilldown table
const salesDrilldownColumns = [
  {
    id: "id",
    header: "Sale ID",
    cell: (item: any) => item.id,
  },
  {
    id: "date",
    header: "Date",
    cell: (item: any) => item.date,
  },
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
    id: "customer",
    header: "Customer",
    cell: (item: any) => item.customer,
  },
  {
    id: "quantity",
    header: "Quantity",
    cell: (item: any) => item.quantity,
  },
  {
    id: "price",
    header: "Unit Price",
    cell: (item: any) => `$${item.price.toFixed(2)}`,
  },
  {
    id: "total",
    header: "Total",
    cell: (item: any) => (
      <div className="font-medium">
        ${item.total.toFixed(2)}
      </div>
    ),
  },
];

// Custom tooltip component for charts
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

const SalesReports = () => {
  const [activeView, setActiveView] = useState<"overview" | "products" | "time" | "customers">("overview");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSku, setSelectedSku] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTimeframe, setSelectedTimeframe] = useState("month");
  const [showDrilldown, setShowDrilldown] = useState(false);
  const [drilldownTitle, setDrilldownTitle] = useState("");
  
  // Filter sales data based on category
  let filteredSalesByProduct = salesByProduct;
  if (selectedCategory !== "all") {
    filteredSalesByProduct = filteredSalesByProduct.filter(p => p.category === selectedCategory);
  }
  
  // Apply search
  if (searchTerm.trim() !== "") {
    const lowerSearchTerm = searchTerm.toLowerCase();
    filteredSalesByProduct = filteredSalesByProduct.filter(p => 
      p.name.toLowerCase().includes(lowerSearchTerm) ||
      p.sku.toLowerCase().includes(lowerSearchTerm)
    );
  }
  
  // Calculate totals for current filtered products
  const totalRevenue = filteredSalesByProduct.reduce((sum, p) => sum + p.revenue, 0);
  const totalCost = filteredSalesByProduct.reduce((sum, p) => sum + p.cost, 0);
  const totalProfit = filteredSalesByProduct.reduce((sum, p) => sum + p.profit, 0);
  const totalQuantity = filteredSalesByProduct.reduce((sum, p) => sum + p.quantity, 0);
  const avgMargin = totalProfit / totalRevenue * 100;
  
  // Handle drilling down into specific product
  const handleDrilldown = (sku: string) => {
    setSelectedSku(sku);
    const product = salesByProduct.find(p => p.sku === sku);
    if (product) {
      setDrilldownTitle(`Sales Detail for ${product.name} (${sku})`);
      setShowDrilldown(true);
    }
  };

  return (
    <div className="page-container">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="page-title mb-0">Sales Reports</h1>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" variant="outline">
            <FilePlus className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button size="sm" variant="default">
            <FileText className="mr-2 h-4 w-4" />
            Generate PDF
          </Button>
        </div>
      </div>
      
      <Tabs value={activeView} onValueChange={(v) => setActiveView(v as any)} className="mb-6">
        <TabsList>
          <TabsTrigger value="overview">Dashboard</TabsTrigger>
          <TabsTrigger value="products">By Products</TabsTrigger>
          <TabsTrigger value="time">By Time Period</TabsTrigger>
          <TabsTrigger value="customers">By Customers</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {activeView === "overview" && (
        <>
          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-4 mb-6">
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Total Revenue</div>
              <div className="text-2xl font-bold">
                ${salesByMonth.reduce((sum, m) => sum + m.revenue, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <ArrowUp className="h-3 w-3 mr-1" /> 12.5% from last period
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Total Profit</div>
              <div className="text-2xl font-bold text-green-600">
                ${salesByMonth.reduce((sum, m) => sum + m.profit, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <ArrowUp className="h-3 w-3 mr-1" /> 8.7% from last period
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Units Sold</div>
              <div className="text-2xl font-bold">
                {salesByProduct.reduce((sum, p) => sum + p.quantity, 0).toLocaleString()}
              </div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <ArrowUp className="h-3 w-3 mr-1" /> 5.2% from last period
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Average Margin</div>
              <div className="text-2xl font-bold text-blue-600">
                {(totalProfit / totalRevenue * 100).toFixed(2)}%
              </div>
              <div className="flex items-center text-xs text-red-600 mt-1">
                <ArrowDown className="h-3 w-3 mr-1" /> 1.3% from last period
              </div>
            </Card>
          </div>
          
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue vs Profit</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer>
                    <BarChart data={salesByMonth} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="revenue" name="Revenue" fill="#8884d8" />
                      <Bar dataKey="profit" name="Profit" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={salesByCategory}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {salesByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2 })}`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={salesByProductColumns.filter(c => c.id !== "category" && c.id !== "margin")}
                data={salesByProduct.sort((a, b) => b.revenue - a.revenue).slice(0, 5)}
                idField="sku"
              />
            </CardContent>
          </Card>
        </>
      )}
      
      {activeView === "products" && !showDrilldown && (
        <>
          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-4 mb-6">
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Total Revenue</div>
              <div className="text-2xl font-bold">
                ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Total Cost</div>
              <div className="text-2xl font-bold text-red-600">
                ${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Total Profit</div>
              <div className="text-2xl font-bold text-green-600">
                ${totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Average Margin</div>
              <div className="text-2xl font-bold text-blue-600">
                {avgMargin.toFixed(2)}%
              </div>
            </Card>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-4 items-end">
            <div className="w-full md:w-64">
              <label className="text-sm font-medium mb-1 block">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="relative flex-1">
              <label className="text-sm font-medium mb-1 block">Search</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-8" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Sales by Product</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={salesByProductColumns}
                data={filteredSalesByProduct}
                idField="sku"
                onRowClick={(row) => handleDrilldown(row.sku)}
              />
            </CardContent>
          </Card>
        </>
      )}
      
      {activeView === "products" && showDrilldown && (
        <div>
          <div className="mb-4 flex items-center">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowDrilldown(false)}
              className="mr-2"
            >
              Back to Products
            </Button>
            <h2 className="text-xl font-semibold">{drilldownTitle}</h2>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Sales Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={salesDrilldownColumns}
                data={recentSales.filter(s => s.sku === selectedSku)}
                idField="id"
              />
            </CardContent>
          </Card>
        </div>
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
                  <SelectItem value="quarter">Quarterly</SelectItem>
                  <SelectItem value="year">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Input type="date" className="w-auto" />
              <span className="text-sm">to</span>
              <Input type="date" className="w-auto" />
            </div>
            <Button variant="outline" size="sm">
              Apply
            </Button>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                  <LineChart data={salesByMonth} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
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
          
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salesByMonth.map((month) => (
                    <div key={month.month} className="grid grid-cols-4 gap-2">
                      <div className="font-medium">{month.month}</div>
                      <div className="text-right">${month.revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                      <div className="text-right text-gray-600">${month.cost.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                      <div className="text-right text-green-600">${month.profit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                    </div>
                  ))}
                  <div className="grid grid-cols-4 gap-2 border-t pt-2 font-bold">
                    <div>Total</div>
                    <div className="text-right">
                      ${salesByMonth.reduce((sum, m) => sum + m.revenue, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-right text-gray-600">
                      ${salesByMonth.reduce((sum, m) => sum + m.cost, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-right text-green-600">
                      ${salesByMonth.reduce((sum, m) => sum + m.profit, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer>
                    <AreaChart data={salesByMonth} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#8884d8" fillOpacity={1} fill="url(#colorRevenue)" />
                      <Area type="monotone" dataKey="profit" name="Profit" stroke="#82ca9d" fillOpacity={1} fill="url(#colorProfit)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
      
      {activeView === "customers" && (
        <div className="text-center p-12">
          <ChartBar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">Customer Sales Reports</h2>
          <p className="text-muted-foreground mb-4">
            Customer analytics and reports will be available in the next update.
          </p>
          <Button>Check Back Soon</Button>
        </div>
      )}
    </div>
  );
};

export default SalesReports;
