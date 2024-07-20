"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { createSkill, modifySkill } from "./SkillServerActions";

const FormSchema = z.object({
  skillID: z.string().optional(),
  skillName: z.string().min(1, "Skill name is required"),
  addedBy: z.string().min(1, "Added by is required"),
  skillType: z.enum(["Quiz", "Lab", "Professional", "Other"], {
    required_error: "Skill type is required",
  }),
});

export type FormSchemaType = z.infer<typeof FormSchema>;

interface CreateSkillFormProps {
  onFormSubmit: () => void;
  initialData?: FormSchemaType;
  isEditMode?: boolean;
}

const mapInitialData = (data: any) => ({
  skillID: data.SkillID,
  skillName: data.SkillName,
  addedBy: data.AddedBy,
  skillType: data.SkillType,
});

export function SkillForm({
  onFormSubmit,
  initialData,
  isEditMode = false,
}: CreateSkillFormProps) {
  const mappedInitialData = initialData
    ? mapInitialData(initialData)
    : undefined;

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: mappedInitialData,
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      const response = isEditMode
        ? await modifySkill(data)
        : await createSkill(data);

      if (!response.success) {
        throw new Error(response.error);
      }

      const newSkill = response.skill;

      toast({
        title: isEditMode ? "Skill Modified" : "Skill Created",
        description: `Skill ${newSkill.SkillName} was ${
          isEditMode ? "modified" : "created"
        } successfully.`,
      });
      onFormSubmit();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEditMode ? "modify" : "create"} the skill.`,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="skillName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter skill name" {...field} />
              </FormControl>
              <FormDescription>Enter the name of the skill</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="skillType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select skill type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Quiz">Quiz</SelectItem>
                    <SelectItem value="Lab">Lab</SelectItem>
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Specify the type of the skill</FormDescription>
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

