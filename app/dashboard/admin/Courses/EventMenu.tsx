"use client";
import React, { useState, useEffect } from "react";
//import { Course } from "@/types";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const data: Course[] = [
  {
    CourseID: "CS3432",
    CourseName: "Computer Organization",
    DateRange: "June 10 - July 8",
    TimeRange: "9:20 - 12:45",
    Location: "LART 108",
    Instructor: "Dr. Eric Fruedenthal"
  },
  {
    CourseID: "CS4175",
    CourseName: "Parallel Computing",
    DateRange: "June 10 - July 8",
    TimeRange: "9:20 - 12:45",
    Location: "CSB 117",
    Instructor: "Dr. Eric Fruedenthal"
  },
  {
    CourseID: "CS4375",
    CourseName: "Operating Systems",
    DateRange: "June 10 - July 8",
    TimeRange: "9:20 - 12:45",
    Location: "CS 128",
    Instructor: "Dr. Eric Fruedenthal"
  },

]
 
export type Course = {
  CourseID: String
  CourseName: string
  DateRange: string
  TimeRange: string
  Location: string
  Instructor: string
}

const CourseTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch("/api/admin/courses");
      const data = await res.json();
      setCourses(data);
    };

    fetchCourses();
  }, []);

  const handleOpenModal = (event: Event) => {
    //when an event's modify button is pressed and the modal is opened the event is set as the selected project
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="flex overflow-auto rounded-lg">
      <table className="table w-full table-fixed">
        <thead className="bg-slate-300 border-b-2 border-slate-500">
          <tr>
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Date Range</th>
            <th>Time</th>
            <th>Location</th>
            <th>Instructor</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody className="bg-slate-200">
          {courses.map((course: Course, index) => (
            <tr key={index} className="hover:bg-slate-300">
              <td>{course.CourseID}</td>
              <td>{course.CourseName}</td>
              <td>{course.CourseName}</td>
              <td>{course.CourseName}</td>
              <td>{course.CourseName}</td>
              <td>{course.CourseName}</td>
              <td>{course.CourseName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
