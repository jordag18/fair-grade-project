"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateCourseForm } from "./CreateCourseForm";

export function CreateCourseDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-semibold bg-sky-500 hover:bg-sky-600">
          Create Course
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Course</DialogTitle>
          <DialogDescription>
            Insert course details here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <CreateCourseForm />
      </DialogContent>
    </Dialog>
  );
}
