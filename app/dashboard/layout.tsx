import DashboardProps from "@/components/dashboardProps";
import { Toaster } from "@/components/ui/toaster";
import { UserRoleProvider } from "@/context/UserRoleContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserRoleProvider>
      <DashboardProps>
        {children}
        <Toaster />
      </DashboardProps>
    </UserRoleProvider>
  );
}
