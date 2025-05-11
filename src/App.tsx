
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AppShell } from "./components/layout/AppShell";
import GeneralLedger from "./pages/accounting/GeneralLedger";
import Transactions from "./pages/accounting/Transactions";
import Reports from "./pages/accounting/Reports";
import Customers from "./pages/sales/Customers";
import Orders from "./pages/sales/Orders";
import Calendar from "./pages/sales/Calendar";
import Products from "./pages/inventory/Products";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AppShell>
                <Index />
              </AppShell>
            }
          />
          <Route
            path="/accounting/ledger"
            element={
              <AppShell>
                <GeneralLedger />
              </AppShell>
            }
          />
          <Route
            path="/accounting/transactions"
            element={
              <AppShell>
                <Transactions />
              </AppShell>
            }
          />
          <Route
            path="/accounting/reports"
            element={
              <AppShell>
                <Reports />
              </AppShell>
            }
          />
          <Route
            path="/sales/customers"
            element={
              <AppShell>
                <Customers />
              </AppShell>
            }
          />
          <Route
            path="/sales/orders"
            element={
              <AppShell>
                <Orders />
              </AppShell>
            }
          />
          <Route
            path="/sales/calendar"
            element={
              <AppShell>
                <Calendar />
              </AppShell>
            }
          />
          <Route
            path="/inventory/products"
            element={
              <AppShell>
                <Products />
              </AppShell>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
