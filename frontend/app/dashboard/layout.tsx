import { ReactNode } from "react";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardTopbar from "../components/dashboard/DashboardTopbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background lg:flex">
      <DashboardSidebar />
      <div className="min-w-0 flex-1">
        <DashboardTopbar />
        <main className="px-6 py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
