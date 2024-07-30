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
import { Button } from "../ui/button";
import { useUserRole } from "@/context/UserRoleContext";
import { UserCourseRole } from "@/types";

interface CreateAssessmentDialogProps {
  onAssessmentCreated: () => void;
}

//Dialog that contains the assessment form to create a new assessment
export function CreateAssessmentDialog({
  onAssessmentCreated,
}: CreateAssessmentDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { getSelectedCourse } = useCourse();
  const selectedCourse = getSelectedCourse();
  const { role } = useUserRole();

  const isStudent = role === UserCourseRole.Student;

  //uses callback function onAssessmentCreated from AssessmentClientPage to refresh assessment data table after form submission and close dialog
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Assessment</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new assessment.
          </DialogDescription>
        </DialogHeader>
        <AssessmentForm
          onFormSubmit={handleFormSubmit}
          selectedCourse={selectedCourse}
          isStudent={isStudent}
        />
      </DialogContent>
    </Dialog>
  );
}

