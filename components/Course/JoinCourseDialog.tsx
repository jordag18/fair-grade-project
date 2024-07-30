"use client";

import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { checkCourseCode, enrollInCourse } from "./CourseServerActions";
import { auth } from "@/auth";
import { useUserId } from "@/lib/auth/useUser";

const EnrollCourseSchema = z.object({
  inviteCode: z.string().min(8, { message: "Invite code must be 8 characters long" }),
});

type EnrollCourseSchemaType = z.infer<typeof EnrollCourseSchema>;

//Dialog component for enrolling into a course using the course invite code.
export const JoinCourseDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<EnrollCourseSchemaType>({
    resolver: zodResolver(EnrollCourseSchema),
  });

  const [error, setError] = useState<string | null>(null);

  
  const handleFormSubmit: SubmitHandler<EnrollCourseSchemaType> = async (data) => {
    setError(null);
    console.log("join course data:", data.inviteCode)
    try {
    const checkResult = await checkCourseCode(data.inviteCode)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const userID = await useUserId();

    console.log("submission result: ", checkResult)

    if (checkResult.success) {
      console.log("Course: ", checkResult.course, "userID: ", userID)
      const enrollResult = await enrollInCourse(data.inviteCode, userID)
      if (!enrollResult.success) {
        throw new Error(enrollResult.error);
      }
    }
  } catch (error) {
    
  }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Join Course</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enroll in a course</DialogTitle>
          <DialogDescription>Enter the unique invite code for the course.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mt-2 mb-2">
            <Input
              {...register("inviteCode")}
              placeholder="Enter invite code"
            />
            {errors.inviteCode && <p className="text-red-500">{errors.inviteCode.message}</p>}
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <DialogFooter>
            <Button type="submit">Enroll</Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
