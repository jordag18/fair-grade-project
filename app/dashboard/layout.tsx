import DashboardProps from "@/components/dashboardProps";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProps>
      {children}
      <Toaster />
    </DashboardProps>
  );
}
