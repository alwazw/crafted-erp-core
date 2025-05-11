
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import SalesAnalytics from "./sales/SalesAnalytics";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/sales/analytics" element={<SalesAnalytics />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Index;
