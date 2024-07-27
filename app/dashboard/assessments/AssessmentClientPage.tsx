"use client";

import React, { useEffect, useState, useCallback } from "react";
import { DataTable } from "@/components/DataTable/DataTable";
import { CreateAssessmentDialog } from "@/components/Assessments/CreateAssessmentDialog";
import { useCourse } from "@/context/CourseContext";
import { getAssessmentsByCourse } from "@/components/Assessments/AssessmentServerActions";
import { columns } from "./columns";
import { Assessment } from "@/types";
import { useUserRole } from "@/context/UserRoleContext";
import displayIfRole from "@/components/DisplayIfRole";

//React function component to display the assessment dashboard with assessment data table and create assessment button
const AssessmentClientPage: React.FC = () => {
  const { selectedCourse } = useCourse();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const { role } = useUserRole();

  //Callback function to refresh the assessment data table
  const refreshAssessments = useCallback(() => {
    if (selectedCourse) {
      getAssessmentsByCourse(selectedCourse.CourseID).then((data) => {
        setAssessments(data);
      });
    }
  }, [selectedCourse]);

  //use effect to get assessments of selected course on page load
  useEffect(() => {
    if (selectedCourse) {
      getAssessmentsByCourse(selectedCourse.CourseID).then((data) => {
        setAssessments(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [selectedCourse, refreshAssessments]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!selectedCourse) {
    return <div>Please select a course to view its assessments.</div>;
  }

  return (
    <div className="flex items-center content-center">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex justify-between">
          <div className="flex gap-x-2">
            {displayIfRole(role, <CreateAssessmentDialog onAssessmentCreated={refreshAssessments} />)}
          </div>
        </div>
        <div className="overflow-auto max-h-screen">
          <DataTable
            columns={columns({ refreshAssessments })}
            data={assessments}
            columnKey={"Title"}
            placeholder="Filter Assessments..."
          />
        </div>
      </div>
    </div>
  );
};

export default AssessmentClientPage;