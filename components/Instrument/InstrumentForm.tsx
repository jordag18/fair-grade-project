"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InstrumentSkillDrawer } from "../Instrument/InstrumentSkillDrawer";
import { useUserId } from "@/lib/auth/useUser";
import { useCourse } from "@/context/CourseContext";
import { Skill } from "@/types";
import {
  createInstrument,
  modifyInstrumentAndReplace,
} from "./InstrumentServerActions";
import { toast } from "../ui/use-toast";

const InstrumentSchema = z.object({
  InstrumentID: z.string().optional(),
  InstrumentName: z.string().min(1, "Instrument name is required"),
  CreatedBy: z.string().min(1, "Creator is required"),
  CourseID: z.string().min(1, "Course ID is required"),
  CreatedAt: z.date().optional(),
  Skills: z
    .array(
      z.object({
        SkillID: z.string(),
        SkillName: z.string(),
        SkillType: z.string(),
      })
    )
    .default([]),
});

export type InstrumentFormSchema = z.infer<typeof InstrumentSchema>;

interface InstrumentFormProps {
  onFormSubmit: () => void;
  initialData?: InstrumentFormSchema;
  isEditMode?: boolean;
}

export function InstrumentForm({
  onFormSubmit,
  initialData,
  isEditMode,
}: InstrumentFormProps) {
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>(
    initialData?.Skills || []
  );
  const [userId, setUserId] = useState<string | null>(null);
  const { selectedCourse } = useCourse();

  const form = useForm<InstrumentFormSchema>({
    resolver: zodResolver(InstrumentSchema),
    defaultValues: initialData || {
      InstrumentName: "",
      CreatedBy: "",
      CourseID: "",
      CreatedAt: undefined,
      Skills: [],
    },
  });

  useEffect(() => {
    const fetchUserId = async () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const id = await useUserId();
      setUserId(id as string);
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      form.setValue("CreatedBy", userId);
    }
    if (selectedCourse) {
      form.setValue("CourseID", selectedCourse.CourseID);
    }
  }, [userId, selectedCourse, form]);

  useEffect(() => {
    if (initialData?.Skills) {
      setSelectedSkills(initialData.Skills);
    }
  }, [initialData]);

  const onSubmit: SubmitHandler<InstrumentFormSchema> = async (data) => {
    data.Skills = selectedSkills;
    data.CreatedAt = initialData?.CreatedAt;
    console.log("Instrument Data before Submission: ", data);
    const response = isEditMode
      ? await modifyInstrumentAndReplace(data)
      : await createInstrument(data);

    if (response.success) {
      toast({
        title: "Success",
        description: `Instrument ${
          isEditMode ? "modified" : "created"
        } successfully`,
      });
      
      onFormSubmit();
    } else {
      toast({
        title: "Error",
        description: response.error,
      });
    }
  };

  const handleSkillsChange = (skills: Skill[]) => {
    setSelectedSkills(skills);
    form.setValue("Skills", skills);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="InstrumentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instrument Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter instrument name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <InstrumentSkillDrawer
          selectedCourse={selectedCourse}
          onSkillsChange={handleSkillsChange}
          initialSelectedSkills={selectedSkills}
        />
        <Button
          type="submit"
          className="font-semibold bg-sky-500 hover:bg-sky-600 text-white"
        >
          {isEditMode ? "Save Changes" : "Save"}
        </Button>
      </form>
    </Form>
  );
}
