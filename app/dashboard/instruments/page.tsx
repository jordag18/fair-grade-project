
import { UserCourseRole } from "@/types";
import { getUserRole } from "@/lib/auth/getUserRoleServerAction";

import AdminInstrumentPageClient from "./AdminInstrumentPageClient";

export default async function AdminInstrumentPage() {
  const role: any = await getUserRole();

  /*
  if (role === UserCourseRole.Admin) {
    data = await fetchAllCourses();
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const userId = await useUserId();
    data = await fetchUserCourses(userId as string);
  }

  console.log("Course Data: ", data)
  */

  return (
    <AdminInstrumentPageClient role={role}/>
  );
}
