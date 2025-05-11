
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type OrderFiltersProps = {
  activeTab: string;
  setActiveTab: (value: string) => void;
};

export const OrderFilters = ({ activeTab, setActiveTab }: OrderFiltersProps) => {
  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="flex items-center gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search orders..." className="pl-8" />
        </div>
        <div className="flex items-center space-x-2">
          <Input type="date" className="w-auto" />
          <span className="text-sm">to</span>
          <Input type="date" className="w-auto" />
        </div>
      </div>
    </>
  );
};
