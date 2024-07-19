"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { addDays, format } from "date-fns"
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
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Input } from "@/components/ui/input";
import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  courseID: z.string().min(1, "Course ID is required"),
  courseName: z.string().min(1, "Course name is required"),
  date: z.object({
    from: z.date(),
    to: z.date(),
  }).refine(
      (data) => data.from > addDays(new Date(), -1),
      "Start date must be in the future"
    ),
  timeRange: z.string().min(1, "Time range is required"),
  location: z.string().min(1, "Location is required"),
  instructor: z.string().min(1, "Instructor is required"),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export function CreateCourseForm() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseID: data.courseID,
          courseName: data.courseName,
          startDate: data.date.from,
          endDate: data.date.to,
          timeRange: data.timeRange,
          location: data.location,
          instructor: data.instructor,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create course");
      }

      const newCourse = await response.json();
      console.log(newCourse);
      toast({
        title: "Course Created",
        description: `Course ${newCourse.CourseName} was created successfully.`,
      });
    } catch (error) {
      console.error("Error creating course", error);
      toast({
        title: "Error",
        description: "Failed to create the course.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormField
          control={form.control}
          name="courseID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter Course ID" {...field} />
              </FormControl>
              <FormDescription>Give a name for your course</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="courseName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter course name" {...field} />
              </FormControl>
              <FormDescription>Enter the name of the course</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="timeRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time Range</FormLabel>
              <FormControl>
                <Input placeholder="Enter time range" {...field} />
              </FormControl>
              <FormDescription>Specify the time range for the course</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter location" {...field} />
              </FormControl>
              <FormDescription>Specify the location of the course</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instructor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructor</FormLabel>
              <FormControl>
                <Input placeholder="Enter instructor name" {...field} />
              </FormControl>
              <FormDescription>Enter the instructor&apos;s name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
            <FormLabel>Date</FormLabel>
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value?.from ? (
                      field.value.to ? (
                        <>
                          {format(field.value.from, "LLL dd, y")} -{" "}
                          {format(field.value.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(field.value.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={field.value?.from}
                    selected={field.value}
                    onSelect={field.onChange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormDescription>
              Select the date for when the event will take place
            </FormDescription>
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
