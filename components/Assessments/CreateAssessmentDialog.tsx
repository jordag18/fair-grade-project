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

interface CreateAssessmentDialogProps {
  onAssessmentCreated: () => void;
}

export function CreateAssessmentDialog({
  onAssessmentCreated,
}: CreateAssessmentDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { getSelectedCourse } = useCourse();
  const selectedCourse = getSelectedCourse();

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
          isEditMode={false}
          selectedCourse={selectedCourse}
        />
      </DialogContent>
    </Dialog>
  );
}
