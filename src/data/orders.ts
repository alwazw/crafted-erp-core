
// Sample orders data
export const orders = [
  {
    id: "ORD-1001",
    date: "2025-05-10",
    customer: "Acme Corporation",
    amount: 1245.99,
    status: "Completed",
    payment: "Paid",
    items: 3,
  },
  {
    id: "ORD-1002",
    date: "2025-05-09",
    customer: "TechSoft Solutions",
    amount: 845.50,
    status: "Processing",
    payment: "Paid",
    items: 2,
  },
  {
    id: "ORD-1003",
    date: "2025-05-08",
    customer: "Global Industries",
    amount: 2456.00,
    status: "Pending",
    payment: "Unpaid",
    items: 5,
  },
  {
    id: "ORD-1004",
    date: "2025-05-07",
    customer: "Pinnacle Services",
    amount: 355.75,
    status: "Completed",
    payment: "Paid",
    items: 1,
  },
  {
    id: "ORD-1005",
    date: "2025-05-05",
    customer: "Elite Enterprises",
    amount: 1850.25,
    status: "Cancelled",
    payment: "Refunded",
    items: 4,
  },
  {
    id: "ORD-1006",
    date: "2025-05-03",
    customer: "Strategic Partners Inc.",
    amount: 945.00,
    status: "Processing",
    payment: "Paid",
    items: 2,
  },
];

export type Order = {
  id: string;
  date: string;
  customer: string;
  amount: number;
  status: "Pending" | "Processing" | "Completed" | "Cancelled";
  payment: "Paid" | "Unpaid" | "Refunded";
  items: number;
};

export const getOrderStatistics = () => {
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === "Pending").length;
  const processingOrders = orders.filter(o => o.status === "Processing").length;
  const completedOrders = orders.filter(o => o.status === "Completed").length;
  
  return {
    totalOrders,
    pendingOrders,
    processingOrders,
    completedOrders
  };
};
