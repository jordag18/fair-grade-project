import { UserCourseRole } from "@/types";
import OverviewClientPage from "./OverviewClientPage";
import { getUserRole } from "@/lib/auth/getUserRoleServerAction";
import { redirect } from "next/navigation";

export default async function AdminOverviewPage() {
  const role = await getUserRole();

  if (!role) {
      return <div>Loading...</div>;
  }

  if (role === UserCourseRole.Admin || role === UserCourseRole.Instructor || role === UserCourseRole.IA || role === UserCourseRole.TA) {
      return <OverviewClientPage/>;
  }
  else {
      redirect("/dashboard/courses")
  }
}
