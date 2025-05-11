
import { useState } from "react";
import { DataTable } from "@/components/dashboard/DataTable";
import { OrderHeader } from "@/components/orders/OrderHeader";
import { OrderStatCards } from "@/components/orders/OrderStatCards";
import { OrderFilters } from "@/components/orders/OrderFilters";
import { orderColumns } from "@/components/orders/OrderTableColumns";
import { orders, getOrderStatistics } from "@/data/orders";

const Orders = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter orders by status
  const filteredOrders = activeTab === "all"
    ? orders
    : orders.filter(order => order.status.toLowerCase() === activeTab);
  
  // Order statistics
  const { totalOrders, pendingOrders, processingOrders, completedOrders } = getOrderStatistics();

  return (
    <div className="page-container">
      <OrderHeader />
      
      <OrderStatCards 
        totalOrders={totalOrders}
        pendingOrders={pendingOrders}
        processingOrders={processingOrders}
        completedOrders={completedOrders}
      />
      
      <OrderFilters 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <DataTable
        columns={orderColumns}
        data={filteredOrders}
        idField="id"
      />
    </div>
  );
};

export default Orders;
