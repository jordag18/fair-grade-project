import SideNav from "@/components/sidebar";
import TopBar from "@/components/topbar-mainwindow";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <TopBar />
      <div className="flex w-full bg-slate-300">
        <SideNav />
        <div
          className="flex w-full justify-center h-full-with-margin bg-slate-100 m-5"
          style={{ "--top-margin": "10rem", marginTop: "1rem" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
