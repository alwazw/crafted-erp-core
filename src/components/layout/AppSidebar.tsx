
import { Book, Calendar, ChartBar, Coins, Database, Home, ShoppingCart, Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";

// Menu items with route information
const mainItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: Home,
  },
];

// Accounting menu items
const accountingItems = [
  {
    title: "General Ledger",
    path: "/accounting/ledger",
    icon: Book,
  },
  {
    title: "Transactions",
    path: "/accounting/transactions",
    icon: Coins,
  },
  {
    title: "Reports",
    path: "/accounting/reports",
    icon: ChartBar,
  },
];

// Sales menu items
const salesItems = [
  {
    title: "Customers",
    path: "/sales/customers",
    icon: Users,
  },
  {
    title: "Orders",
    path: "/sales/orders",
    icon: ShoppingCart,
  },
  {
    title: "Calendar",
    path: "/sales/calendar",
    icon: Calendar,
  },
];

// Inventory menu items
const inventoryItems = [
  {
    title: "Products",
    path: "/inventory/products",
    icon: Database,
  }
];

export function AppSidebar() {
  const location = useLocation();

  // Create menu item with active state
  const createMenuItem = (item: { title: string; path: string; icon: any }) => {
    const isActive = location.pathname === item.path;
    return (
      <SidebarMenuItem key={item.path}>
        <SidebarMenuButton
          className={isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}
          asChild
        >
          <Link to={item.path}>
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold">
            ERP
          </div>
          <div className="font-semibold text-lg">ERP System</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map(createMenuItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Accounting</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountingItems.map(createMenuItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Sales</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {salesItems.map(createMenuItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Inventory</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {inventoryItems.map(createMenuItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
