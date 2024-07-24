"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  createAssessment,
  modifyAssessment,
  fetchUsersByCourseAndRole,
} from "./AssessmentServerActions";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Course } from "@/types";
import { useUserId } from "@/lib/auth/useUser";

const FormSchema = z.object({
  assessmentID: z.string().optional(),
  assessmentTitle: z.string().min(1, "Assessment Title is required"),
  assessorID: z.string().optional(),
  assessedUserID: z.string().optional(),
  courseID: z.string().optional(),
  comment: z.string().optional(),
  instrumentType: z.string().min(1, "Instrument Type is required"),
  assessmentDate: z.date().optional(),
  instrumentDescription: z
    .string()
    .min(1, "Instrument Description is required"),
});

export type FormSchemaType = z.infer<typeof FormSchema>;

interface CreateAssessmentFormProps {
  onFormSubmit: () => void;
  initialData?: FormSchemaType;
  isEditMode?: boolean;
  selectedCourse?: Course | null;
}

const mapInitialData = (data: any) => ({
  assessmentID: data.AssessmentID,
  assessmentTitle: data.AssessmentTitle || "",
  assessorID: data.AssessorID,
  assessedUserID: data.AssessedUserID || "",
  courseID: data.CourseID,
  comment: data.Comment,
  instrumentType: data.InstrumentType,
  assessmentDate: data.AssessmentDate,
  instrumentDescription: data.InstrumentDescription,
});

export function AssessmentForm({
  onFormSubmit,
  initialData,
  isEditMode = false,
  selectedCourse,
}: CreateAssessmentFormProps) {
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
 //TODO: fix displaying initial data for student and title, modifications should not replace current but add a new one with maybe a relation to previous 
  useEffect(() => {
    console.log("initial data: ", initialData)
    if (selectedCourse) {
      fetchUsersByCourseAndRole(selectedCourse.CourseID, "Student").then(
        (response) => {
          if (response.success) {
            const fetchedUsers = (response.users || []).map((user) => ({
              id: user.id,
              name: user.name || "",
            }));
            setUsers(fetchedUsers);
          } else {
            console.error(response.error);
          }
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }
  }, [selectedCourse]);

  const mappedInitialData = initialData
    ? mapInitialData(initialData)
    : undefined;

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: mappedInitialData,
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    data.assessorID = (await useUserId()) as string;
    data.courseID = selectedCourse?.CourseID as string;
    data.assessmentDate = new Date();
    try {
      const response = isEditMode
        ? await modifyAssessment(data)
        : await createAssessment(data);

      if (!response.success) {
        throw new Error(response.error);
      }

      const newAssessment = response.assessment;

      toast({
        title: isEditMode ? "Assessment Modified" : "Assessment Created",
        description: `Assessment ${data.assessmentTitle} was ${
          isEditMode ? "modified" : "created"
        } successfully.`,
      });
      onFormSubmit();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${
          isEditMode ? "modify" : "create"
        } the assessment.`,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="assessedUserID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {loading ? (
                      <SelectItem value="Loading" disabled>
                        Loading...
                      </SelectItem>
                    ) : (
                      users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Specify the student being assessed</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="assessmentTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assessment Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instrumentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instrument Type</FormLabel>
              <FormControl>
                <Input placeholder="Enter Instrument Type" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instrumentDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instrument Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter Instrument Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter Comment" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="font-semibold bg-sky-500 hover:bg-sky-600 text-white"
        >
          Save changes
        </Button>
      </form>
    </Form>
  );
}
