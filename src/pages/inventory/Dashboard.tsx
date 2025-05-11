
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Calendar, Database, Package, PackageCheck } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Sample inventory data
const inventoryData = [
  { month: "Jan", stock: 250, restock: 50, sold: 45 },
  { month: "Feb", stock: 255, restock: 40, sold: 55 },
  { month: "Mar", stock: 240, restock: 60, sold: 70 },
  { month: "Apr", stock: 230, restock: 80, sold: 85 },
  { month: "May", stock: 225, restock: 70, sold: 75 },
  { month: "Jun", stock: 220, restock: 60, sold: 65 },
  { month: "Jul", stock: 215, restock: 50, sold: 55 },
];

// Sample inventory forecast data
const forecastData = [
  { month: "Aug", forecast: 210, restock: 80 },
  { month: "Sep", forecast: 205, restock: 0 },
  { month: "Oct", forecast: 170, restock: 100 },
  { month: "Nov", forecast: 190, restock: 0 },
  { month: "Dec", forecast: 160, restock: 120 },
];

// Sample category distribution data
const categoryData = [
  { name: "Widgets", value: 45 },
  { name: "Gadgets", value: 25 },
  { name: "Components", value: 18 },
  { name: "Parts", value: 12 },
];

// Sample inventory aging data
const agingData = [
  { range: "0-30 days", value: 65 },
  { range: "31-60 days", value: 20 },
  { range: "61-90 days", value: 10 },
  { range: "91+ days", value: 5 },
];

const InventoryDashboard = () => {
  return (
    <div className="page-container">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="page-title mb-0">Inventory Dashboard</h1>
      </div>
      
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-4 mb-6">
        <StatsCard
          title="Total SKUs"
          value="154"
          description="7 categories"
          icon={<Package className="h-4 w-4" />}
        />
        <StatsCard
          title="Inventory Value"
          value="$64,580"
          description="328 products"
          trend={{ value: 5, isPositive: true }}
          icon={<Database className="h-4 w-4" />}
        />
        <StatsCard
          title="Low Stock Items"
          value="18"
          description="Needs reordering"
          trend={{ value: 12, isPositive: false }}
          icon={<PackageCheck className="h-4 w-4" />}
        />
        <StatsCard
          title="Expected Deliveries"
          value="6"
          description="Next 30 days"
          icon={<Calendar className="h-4 w-4" />}
        />
      </div>
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Inventory Levels</h2>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <AreaChart data={inventoryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area type="monotone" dataKey="stock" stroke="#8884d8" fillOpacity={1} fill="url(#colorStock)" />
                <Area type="monotone" dataKey="restock" stroke="#82ca9d" fillOpacity={0.3} fill="#82ca9d" />
                <Area type="monotone" dataKey="sold" stroke="#ffc658" fillOpacity={0.3} fill="#ffc658" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Inventory Forecast & Restock</h2>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={forecastData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="forecast" stroke="#ff7300" activeDot={{ r: 8 }} strokeWidth={2} />
                <Line type="monotone" dataKey="restock" stroke="#387908" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Inventory by Category</h2>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={categoryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="value" name="Percentage %" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Inventory Aging</h2>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={agingData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="value" name="Percentage %" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Custom tooltip component for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-md rounded">
        <p className="font-medium">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default InventoryDashboard;
