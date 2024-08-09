"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useCourse } from "@/context/CourseContext";
import { AssessmentForm } from "./AssessmentForm";
import { SelfAssessmentForm } from "./SelfAssessmentForm";
import { Button } from "../ui/button";
import { useUserRole } from "@/context/UserRoleContext";
import { Course, UserCourseRole } from "@/types";

interface CreateAssessmentDialogProps {
  onAssessmentCreated: () => void;
}

export function CreateAssessmentDialog({
  onAssessmentCreated,
}: CreateAssessmentDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { getSelectedCourse } = useCourse();
  const selectedCourse = getSelectedCourse();
  const { role } = useUserRole();

  const isStudent = role === UserCourseRole.Student;

  const handleFormSubmit = () => {
    onAssessmentCreated();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="font-semibold bg-sky-500 hover:bg-sky-600">
          Create Assessment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] max-h-screen overflow-hidden">
        <DialogHeader>
          <DialogTitle>Create Assessment</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new assessment.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[75vh]">
          {isStudent ? (
            <SelfAssessmentForm
              onFormSubmit={handleFormSubmit}
              selectedCourse={selectedCourse as Course}
            />
          ) : (
            <AssessmentForm
              onFormSubmit={handleFormSubmit}
              selectedCourse={selectedCourse}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
