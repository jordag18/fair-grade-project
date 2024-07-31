import SideNav from "@/components/sidebar";
import { getUserRole } from "@/lib/auth/getUserRoleServerAction";
import TopBar from "@/components/topbar-mainwindow";
import { CourseProvider } from "@/context/CourseContext";

export default async function DashboardProps({
  children,
}: {
  children: React.ReactNode;
}) {
  const userRole = await getUserRole();

  return (
    <div className="flex flex-col">
      <CourseProvider>
        <TopBar userRole={userRole as string} />
        <div className="flex w-full bg-slate-300">
          <SideNav userRole={userRole as string} />
          <div
            className="flex w-full justify-center h-full-with-margin bg-slate-100 m-5 overflow-x-auto"
            style={{ "--top-margin": "10rem", marginTop: "1rem" } as React.CSSProperties}
          >
            {children}
          </div>
        </div>
      </CourseProvider>
    </div>
  );
}
