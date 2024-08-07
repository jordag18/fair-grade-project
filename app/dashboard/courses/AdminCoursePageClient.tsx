"use client";

import { useState, useEffect, useCallback } from "react";
import { useCourse } from "@/context/CourseContext";
import { Course, UserCourseRole } from "@/types";
import { fetchInstrumentsByCourse } from "@/components/Instrument/InstrumentServerActions";
import CoursePageContent from "@/components/Course/CoursePageContent";
import InstrumentPageContent from "@/components/Instrument/InstrumentPageContent";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { courseColumns } from "./CourseColumns";
import { instrumentColumns } from "./InstrumentColumns";

interface AdminCoursePageClientProps {
  role: UserCourseRole;
  courseData: Course[];
}

const AdminCoursePageClient: React.FC<AdminCoursePageClientProps> = ({ role, courseData }) => {
  const { selectedCourse } = useCourse();
  const [instrumentData, setInstrumentData] = useState<any[]>([]);

  const refreshInstruments = useCallback(async () => {
    if (selectedCourse) {
      const data = await fetchInstrumentsByCourse(selectedCourse.CourseID);
      console.log("Instrument data: ", data);
      setInstrumentData(data);
    }
  }, [selectedCourse]);

  useEffect(() => {
    refreshInstruments();
  }, [selectedCourse, refreshInstruments]);

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
        <ResizablePanel defaultSize={50} minSize={45}>
          {selectedCourse ? (
            <InstrumentPageContent 
              data={instrumentData} 
              role={role} 
              columns={instrumentColumns(refreshInstruments)} 
              refreshInstruments={refreshInstruments}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <span>Please select a course to view its instruments.</span>
            </div>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default AdminCoursePageClient;
