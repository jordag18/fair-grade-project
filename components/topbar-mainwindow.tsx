"use client";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useCourse } from "@/context/CourseContext";
import displayIfRole from "@/components/DisplayIfRole";
import { UserCourseRole } from "@/types";
import { toast } from "./ui/use-toast";

export default function TopBar({ userRole }: { userRole: string }) {
  const { selectedCourse } = useCourse();

  const copyToClipboard = async () => {
    if (selectedCourse?.uniqueCode) {
      try {
        await navigator.clipboard.writeText("Invitation to " + selectedCourse.CourseName + ", please enter this code to join the course: " + selectedCourse.uniqueCode);
        toast({
          title: "Copied!",
          description: `Copied invite code ${selectedCourse.uniqueCode} to clipboard!`,
        });
      } catch (err) {
        toast({
          title: "Error",
          description: `Failed to copy invite code!`,
          variant: "destructive",
        });
      }
    }
  };


  return (
    <div className="relative flex h-14 w-full bg-slate-200 items-center drop-shadow-md">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight ml-5">
        {userRole} Dashboard
      </h3>
      <h3 className="absolute left-1/2 transform -translate-x-1/2 scroll-m-20 text-2xl font-semibold tracking-tight ml-5 mx-auto">
        Selected Course: {selectedCourse?.CourseName}
      </h3>
      {displayIfRole(
        userRole as UserCourseRole,
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
                <Button variant="outline" onClick={copyToClipboard}>
                  Copy
                </Button>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      )}
    </div>
  );
}
