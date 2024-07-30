import { UserCourseRole } from "@/types";
import AdminSkillClientPage from "./AdminSkillClientPage";
import { getUserRole } from "@/lib/auth/getUserRoleServerAction";
import StudentSkillClientPage from "./StudentSkillClientPage";
export default async function AdminSkillPage() {
  const role = await getUserRole();

  if (role == UserCourseRole.Student) {
    return <StudentSkillClientPage />;
  } else {
    return <AdminSkillClientPage />;
  }
}
