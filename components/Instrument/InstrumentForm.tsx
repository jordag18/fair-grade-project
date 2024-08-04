"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const InstrumentSchema = z.object({
  InstrumentName: z.string().min(1, "Instrument name is required"),
  CreatedBy: z.string().min(1, "Creator is required"),
  CourseID: z.string().min(1, "Course ID is required"),
});

type InstrumentFormSchema = z.infer<typeof InstrumentSchema>;

interface InstrumentFormProps {
  onFormSubmit: () => void;
}

export function InstrumentForm({ onFormSubmit }: InstrumentFormProps) {
  const form = useForm<InstrumentFormSchema>({
    resolver: zodResolver(InstrumentSchema),
    defaultValues: {
      InstrumentName: "",
      CreatedBy: "",
      CourseID: "",
    },
  });

  const onSubmit: SubmitHandler<InstrumentFormSchema> = (data) => {
    // Handle form submission logic here
    console.log(data);
    onFormSubmit();
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
        <FormField
          control={form.control}
          name="CreatedBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Created By</FormLabel>
              <FormControl>
                <Input placeholder="Enter creator" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="CourseID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter course ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="font-semibold bg-sky-500 hover:bg-sky-600 text-white">
          Save
        </Button>
      </form>
    </Form>
  );
}
