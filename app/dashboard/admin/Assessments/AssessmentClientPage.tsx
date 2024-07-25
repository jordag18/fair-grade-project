"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "../../../../components/DataTable/DataTable";
import { CreateAssessmentDialog } from "../../../../components/Assessments/CreateAssessmentDialog";
import { useCourse } from "@/context/CourseContext";
import { getAssessmentsByCourse } from "../../../../components/Assessments/AssessmentServerActions";
import { columns } from "./columns";

const AssessmentClientPage = () => {
  const { selectedCourse } = useCourse();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("assessment columns: ", columns({ refreshAssessments }))
    if (selectedCourse) {
      getAssessmentsByCourse(selectedCourse.CourseID).then((data) => {
        setAssessments(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [selectedCourse]);

  const refreshAssessments = () => {
    if (selectedCourse) {
      getAssessmentsByCourse(selectedCourse.CourseID).then((data) => {
        setAssessments(data);
      });
    }
  };

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
            <CreateAssessmentDialog onAssessmentCreated={refreshAssessments} />
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
