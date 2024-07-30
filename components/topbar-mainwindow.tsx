"use client";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useCourse } from "@/context/CourseContext";
import displayIfRole from "@/components/DisplayIfRole";

export default function TopBar({ userRole }: { userRole: string }) {
  const { selectedCourse } = useCourse();

  return (
    <div className="relative flex h-14 w-full bg-slate-200 items-center drop-shadow-md">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight ml-5">
        {userRole} Dashboard
      </h3>
      <h3 className="absolute left-1/2 transform -translate-x-1/2 scroll-m-20 text-2xl font-semibold tracking-tight ml-5 mx-auto">
        Selected Course: {selectedCourse?.CourseName}
      </h3>
      {displayIfRole(
        userRole,
        <div className="ml-auto mr-5">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link">Unique Invite Code</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">
                    Enter this code after authenticating to join this course.
                  </h4>
                  <p className="text-sm">Code: {selectedCourse?.uniqueCode}</p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      )}
    </div>
  );
}
