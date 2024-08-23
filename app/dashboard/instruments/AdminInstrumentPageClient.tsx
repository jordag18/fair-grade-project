"use client";

import { useState, useEffect, useCallback } from "react";
import { useCourse } from "@/context/CourseContext";
import { UserCourseRole } from "@/types";
import { fetchInstrumentsByCourse } from "@/components/Instrument/InstrumentServerActions";
import InstrumentPageContent from "@/components/Instrument/InstrumentPageContent";
import { instrumentColumns } from "./InstrumentColumns";

interface AdminInstrumentPageClientProps {
  role: UserCourseRole;
}

const AdminInstrumentPageClient: React.FC<AdminInstrumentPageClientProps> = ({
  role,
}) => {
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
    <div className="flex mx-20 items-center content-center w-full">
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex overflow-auto max-h-screen">
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
      </div>
    </div>
  );
};

export default AdminInstrumentPageClient;
