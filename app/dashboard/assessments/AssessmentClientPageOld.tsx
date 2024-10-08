"use client";

import { useState, useEffect, useCallback } from "react";
import { DataTable } from "@/components/DataTable/DataTable";
import { useCourse } from "@/context/CourseContext";
import { useUserRole } from "@/context/UserRoleContext";
import {
  getAssessmentsByCourse,
  fetchSelfAssessments,
} from "@/components/Assessments/AssessmentServerActions";
import { UserCourseRole } from "@/types";
import { assessmentColumns } from "./assessmentColumnsOld";
import { selfAssessmentColumns } from "./selfAssessmentColumns";
import { CreateAssessmentDialog } from "@/components/Assessments/CreateAssessmentDialog";
import { fetchCourseSkills } from "@/components/Overview/OverviewServerActions";

const AssessmentClientPage = ({ userID }: { userID: any }) => {
  const { selectedCourse } = useCourse();
  const { role } = useUserRole();
  const [assessments, setAssessments] = useState([]);
  const [selfAssessments, setSelfAssessments] = useState([]);
  const [courseSkills, setCourseSkills] = useState([]);

  const refreshAssessments = useCallback(async () => {
    if (selectedCourse) {
      const data: any = await getAssessmentsByCourse(selectedCourse.CourseID);
      const courseSkills: any = await fetchCourseSkills(
        selectedCourse.CourseID
      );
      console.log("Assessment Data:", data);
      console.log(
        "Selected Course:",
        selectedCourse,
        "Course Skills:",
        courseSkills
      );
      setAssessments(data);
      setCourseSkills(courseSkills);
    }
  }, [selectedCourse]);

  const refreshSelfAssessments = useCallback(async () => {
    if (selectedCourse) {
      const data: any = await fetchSelfAssessments(
        selectedCourse.CourseID,
        userID
      );
      console.log("Self Assessment Data:", data);
      setSelfAssessments(data);
    }
  }, [selectedCourse, userID]);

  useEffect(() => {
    if (role === UserCourseRole.Student) {
      refreshSelfAssessments();
    } else {
      refreshAssessments();
    }
  }, [selectedCourse, role, refreshAssessments, refreshSelfAssessments]);

  if (!selectedCourse) {
    return <div>Please select a course to view the assessments.</div>;
  }

  return (
    <div className="flex mx-20 items-center content-center w-full">
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex overflow-auto max-h-screen">
        <div className="flex justify-between">
          <div className="flex gap-x-2 justify-between">
            <CreateAssessmentDialog
              onAssessmentCreated={
                role === UserCourseRole.Student
                  ? refreshSelfAssessments
                  : refreshAssessments
              }
            />
          </div>
        </div>
        {role === UserCourseRole.Student ? (
          <DataTable
            columns={selfAssessmentColumns({ refreshSelfAssessments })}
            data={selfAssessments}
            columnKey={"InstrumentName"}
            placeholder="Filter by Instrument Name..."
          />
        ) : (
          <DataTable
            columns={assessmentColumns({
              refreshAssessments,
              courseSkills: courseSkills,
            })}
            data={assessments}
            columnKey={"InstrumentName"}
            placeholder="Filter by Instrument..."
            headerHeight="h-72"
          />
        )}
      </div>
    </div>
  );
};

export default AssessmentClientPage;
