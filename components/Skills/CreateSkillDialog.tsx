"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCourse } from "@/context/CourseContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SkillForm } from "./SkillForm";

interface CreateSkillDialogProps {
  onSkillCreated: () => void;
}

export function CreateSkillDialog({ onSkillCreated }: CreateSkillDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { getSelectedCourse } = useCourse();
  const selectedCourse = getSelectedCourse();

  const handleFormSubmit = () => {
    onSkillCreated();
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="font-semibold bg-sky-500 hover:bg-sky-600">
          Create Skill
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Skill</DialogTitle>
          <DialogDescription>
            Insert course details here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <SkillForm onFormSubmit={handleFormSubmit} isEditMode={false} selectedCourse={selectedCourse} />
      </DialogContent>
    </Dialog>
  );
}

