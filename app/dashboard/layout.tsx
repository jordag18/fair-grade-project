import DashboardProps from "@/components/dashboardProps";
import { CourseProvider } from "@/context/CourseContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProps>
      {children}
    </DashboardProps>
  );
}
