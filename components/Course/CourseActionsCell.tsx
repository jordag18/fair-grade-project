"use client";

import { useCourse } from "@/context/CourseContext";
import { DropdownMenu, DropdownMenuLabel, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

const ActionsCell = ({ row }: { row: any }) => {
  const { setSelectedCourse } = useCourse();
  const user = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setSelectedCourse(user.CourseName)}>
          Select Course
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsCell;
