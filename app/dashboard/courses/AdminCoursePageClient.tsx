import { Course, UserCourseRole } from "@/types";
import CoursePageContent from "@/components/Course/CoursePageContent";
import { courseColumns } from "./CourseColumns";

interface AdminCoursePageClientProps {
  role: UserCourseRole;
  courseData: Course[];
}

const AdminCoursePageClient: React.FC<AdminCoursePageClientProps> = ({
  role,
  courseData,
}) => {
  return (
    <div className="flex mx-20 items-center content-center w-full">
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex overflow-auto max-h-screen">
        <CoursePageContent
          data={courseData}
          role={role}
          columns={courseColumns}
        />
      </div>
    </div>
  );
};

export default AdminCoursePageClient;
