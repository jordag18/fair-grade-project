import { courseColumns } from "./CourseColumns";
import { instrumentColumns } from "./InstrumentColumns";
import { Course, UserCourseRole } from "@/types";
import { fetchAllCourses } from "@/components/Course/CourseServerActions";
import { getUserRole } from "@/lib/auth/getUserRoleServerAction";
import CoursePageContent from "@/components/Course/CoursePageContent";
import InstrumentPageContent from "@/components/Instrument/InstrumentPageContent";
import { columns } from '../assessments/columns';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default async function AdminCoursePage() {
  const role: any = await getUserRole();
  let courseData: Course[];
  courseData = await fetchAllCourses(); //temp fix
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
    <div
      className="flex w-full justify-center h-full bg-slate-100 m-5 overflow-x-auto"
      style={{ marginTop: "1rem" }}
    >
      <ResizablePanelGroup direction="horizontal" className="flex-grow h-full">
        <ResizablePanel defaultSize={50} className="h-full" minSize={45}>
          <CoursePageContent data={courseData} role={role} columns={courseColumns} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50} minSize={25}>
          <InstrumentPageContent data={} role={role} columns={instrumentColumns} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
