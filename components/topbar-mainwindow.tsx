"use client";

import { useCourse } from "@/context/CourseContext";

export default function TopBar({ userRole }: { userRole: string }) {
  const { selectedCourse } = useCourse();

  return (
    <div className="relative flex h-14 w-full bg-slate-200 items-center drop-shadow-md">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight ml-5">
        {userRole} Dashboard
      </h3>
      <h3 className="absolute left-1/2 transform -translate-x-1/2 scroll-m-20 text-2xl font-semibold tracking-tight ml-5 mx-auto">
        Selected Course: {selectedCourse}
      </h3>
    </div>
  );
}
