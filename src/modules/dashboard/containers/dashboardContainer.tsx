import { Outlet } from "react-router-dom";
import { DashboardMenu } from "../components/dashboardMenu";

const DashboardContainer = () => {
  return (
    <div className="flex h-screen">
      <DashboardMenu />
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
export default DashboardContainer;