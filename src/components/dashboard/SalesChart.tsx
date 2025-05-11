
import { useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";

interface SalesChartProps {
  data: Array<{
    name: string;
    sales: number;
    expenses: number;
  }>;
}

export function SalesChart({ data }: SalesChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales & Expenses Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={chartContainerRef} style={{ width: "100%", height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
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
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                formatter={(value) => [`$${value}`, undefined]}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                }}
              />
              <Legend 
                verticalAlign="bottom"
                iconSize={10}
                wrapperStyle={{ fontSize: "0.75rem", paddingTop: "1rem" }}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#EF4444"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
