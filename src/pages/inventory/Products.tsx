
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FilePlus, Search, Package, Database, ImportExport } from "lucide-react";
import { BulkActions } from "@/components/inventory/BulkActions";

// Enhanced product data with cost information
const products = [
  {
    id: "PRD-001",
    sku: "WD-5001",
    name: "Premium Widget",
    category: "Widgets",
    stock: 125,
    price: 24.99,
    cost: 12.50,
    avgCost: 12.50,
    status: "In Stock",
    lastPurchased: "2025-05-01",
    supplier: "WidgetCo Inc."
  },
  {
    id: "PRD-002",
    sku: "GD-2001",
    name: "Standard Gadget",
    category: "Gadgets",
    stock: 85,
    price: 34.99,
    cost: 17.25,
    avgCost: 17.10,
    status: "In Stock",
    lastPurchased: "2025-05-03",
    supplier: "Gadget Supply Co."
  },
  {
    id: "PRD-003",
    sku: "AC-1001",
    name: "Advanced Component",
    category: "Components",
    stock: 42,
    price: 89.99,
    cost: 45.00,
    avgCost: 44.25,
    status: "Low Stock",
    lastPurchased: "2025-04-28",
    supplier: "TechParts Ltd."
  },
  {
    id: "PRD-004",
    sku: "WD-5002",
    name: "Basic Widget",
    category: "Widgets",
    stock: 0,
    price: 14.99,
    cost: 7.50,
    avgCost: 7.50,
    status: "Out of Stock",
    lastPurchased: "2025-04-15",
    supplier: "WidgetCo Inc."
  },
  {
    id: "PRD-005",
    sku: "GD-2002",
    name: "Deluxe Gadget",
    category: "Gadgets",
    stock: 15,
    price: 59.99,
    cost: 32.75,
    avgCost: 31.90,
    status: "Low Stock",
    lastPurchased: "2025-04-20",
    supplier: "Gadget Supply Co."
  },
  {
    id: "PRD-006",
    sku: "AC-1002",
    name: "Basic Component",
    category: "Components",
    stock: 250,
    price: 49.99,
    cost: 22.50,
    avgCost: 22.50,
    status: "In Stock",
    lastPurchased: "2025-05-05",
    supplier: "TechParts Ltd."
  },
  {
    id: "PRD-007",
    sku: "SP-3001",
    name: "Specialty Part",
    category: "Parts",
    stock: 35,
    price: 29.99,
    cost: 15.25,
    avgCost: 14.90,
    status: "In Stock",
    lastPurchased: "2025-04-25",
    supplier: "SpecialtySuppliers Inc."
  },
];

// Categories from products
const categories = [...new Set(products.map(p => p.category))];

// Column definitions for products table with cost data
const productColumns = [
  {
    id: "sku",
    header: "SKU",
    cell: (product: any) => product.sku,
  },
  {
    id: "name",
    header: "Product Name",
    cell: (product: any) => product.name,
  },
  {
    id: "category",
    header: "Category",
    cell: (product: any) => product.category,
  },
  {
    id: "stock",
    header: "Stock",
    cell: (product: any) => product.stock,
  },
  {
    id: "cost",
    header: "Last Cost",
    cell: (product: any) => `$${product.cost.toFixed(2)}`,
  },
  {
    id: "avgCost",
    header: "Avg Cost",
    cell: (product: any) => `$${product.avgCost.toFixed(2)}`,
  },
  {
    id: "price",
    header: "Sale Price",
    cell: (product: any) => `$${product.price.toFixed(2)}`,
  },
  {
    id: "status",
    header: "Status",
    cell: (product: any) => {
      const statusColor = {
        "In Stock": "bg-green-100 text-green-800",
        "Low Stock": "bg-yellow-100 text-yellow-800",
        "Out of Stock": "bg-red-100 text-red-800",
      };
      return (
        <div className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${statusColor[product.status as keyof typeof statusColor]}`}>
          {product.status}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: (product: any) => (
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

const Products = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentView, setCurrentView] = useState("list");
  
  // Filter products by status tab
  let filteredProducts = activeTab === "all"
    ? products
    : activeTab === "in-stock"
    ? products.filter(p => p.status === "In Stock")
    : activeTab === "low-stock"
    ? products.filter(p => p.status === "Low Stock")
    : products.filter(p => p.status === "Out of Stock");
    
  // Apply category filter
  if (selectedCategory !== "all") {
    filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
  }
  
  // Product statistics
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + (p.stock * p.cost), 0);
  const lowStockItems = products.filter(p => p.status === "Low Stock").length;
  const outOfStockItems = products.filter(p => p.status === "Out of Stock").length;

  return (
    <div className="page-container">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="page-title mb-0">Inventory Products</h1>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => setCurrentView("bulk")}>
            <ImportExport className="mr-2 h-4 w-4" />
            Import/Export
          </Button>
          <Button size="sm" variant="outline" onClick={() => setCurrentView("dashboard")}>
            <Database className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button size="sm" variant="outline">
            <FilePlus className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm" variant="default">
            <Package className="mr-2 h-4 w-4" />
            New Product
          </Button>
        </div>
      </div>
      
      {currentView === "list" && (
        <>
          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-4 mb-6">
            <Card className="p-4 flex flex-col items-center justify-center text-center">
              <div className="text-sm text-muted-foreground mb-1">Total Products</div>
              <div className="text-2xl font-bold">{totalProducts}</div>
            </Card>
            <Card className="p-4 flex flex-col items-center justify-center text-center">
              <div className="text-sm text-muted-foreground mb-1">Inventory Value</div>
              <div className="text-2xl font-bold text-blue-600">
                ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
            </Card>
            <Card className="p-4 flex flex-col items-center justify-center text-center">
              <div className="text-sm text-muted-foreground mb-1">Low Stock Items</div>
              <div className="text-2xl font-bold text-yellow-600">{lowStockItems}</div>
            </Card>
            <Card className="p-4 flex flex-col items-center justify-center text-center">
              <div className="text-sm text-muted-foreground mb-1">Out of Stock</div>
              <div className="text-2xl font-bold text-red-600">{outOfStockItems}</div>
            </Card>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Products</TabsTrigger>
              <TabsTrigger value="in-stock">In Stock</TabsTrigger>
              <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
              <TabsTrigger value="out-of-stock">Out of Stock</TabsTrigger>
            </TabsList>
          </Tabs>
          
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
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search products..." className="pl-8" />
            </div>
          </div>
          
          <DataTable
            columns={productColumns}
            data={filteredProducts}
            idField="id"
          />
        </>
      )}
      
      {currentView === "bulk" && (
        <BulkActions onImportComplete={() => setCurrentView("list")} />
      )}
      
      {currentView === "dashboard" && (
        <Button 
          variant="outline" 
          onClick={() => setCurrentView("list")}
          className="mb-4"
        >
          Back to Products
        </Button>
      )}
    </div>
  );
};

export default Products;
