"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SkillForm } from "./SkillForm";

export function CreateSkillDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const handleFormSubmit = () => {
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
        <SkillForm onFormSubmit={handleFormSubmit} isEditMode={false} />
      </DialogContent>
    </Dialog>
  );
}

