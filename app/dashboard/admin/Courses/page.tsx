//import { Course } from "@/types";
import { Course, Columns } from "./columns";
import { DataTable } from "../../../../components/DataTable/DataTable";
import { CreateCourseDialog } from "@/components/Course/CreateCourseDialog";
import { ModifyCourseDialog } from "@/components/Course/ModifyCourseDialog";
import { DeleteCourseAlertDialog } from "@/components/Course/DeleteCourseAlertDialog";


async function getData(): Promise<Course[]> {
  // Fetch data from your API here.
  return [
    {
      CourseID: "CS3432",
      CourseName: "Computer Organization",
      DateRange: "June 10 - July 8",
      TimeRange: "9:20 - 12:45",
      Location: "LART 108",
      Instructor: "Dr. Eric Fruedenthal",
    },
    {
      CourseID: "CS4175",
      CourseName: "Parallel Computing",
      DateRange: "June 10 - July 8",
      TimeRange: "9:20 - 12:45",
      Location: "CSB 117",
      Instructor: "Dr. Eric Fruedenthal",
    },
    {
      CourseID: "CS4375",
      CourseName: "Operating Systems",
      DateRange: "June 10 - July 8",
      TimeRange: "9:20 - 12:45",
      Location: "CS 128",
      Instructor: "Dr. Eric Fruedenthal",
    },
    {
      CourseID: "CS3432",
      CourseName: "Computer Organization",
      DateRange: "June 10 - July 8",
      TimeRange: "9:20 - 12:45",
      Location: "LART 108",
      Instructor: "Dr. Eric Fruedenthal",
    },
    {
      CourseID: "CS4175",
      CourseName: "Parallel Computing",
      DateRange: "June 10 - July 8",
      TimeRange: "9:20 - 12:45",
      Location: "CSB 117",
      Instructor: "Dr. Eric Fruedenthal",
    },
    {
      CourseID: "CS4375",
      CourseName: "Operating Systems",
      DateRange: "June 10 - July 8",
      TimeRange: "9:20 - 12:45",
      Location: "CS 128",
      Instructor: "Dr. Eric Fruedenthal",
    },
    {
      CourseID: "CS3432",
      CourseName: "Computer Organization",
      DateRange: "June 10 - July 8",
      TimeRange: "9:20 - 12:45",
      Location: "LART 108",
      Instructor: "Dr. Eric Fruedenthal",
    },
    {
      CourseID: "CS4175",
      CourseName: "Parallel Computing",
      DateRange: "June 10 - July 8",
      TimeRange: "9:20 - 12:45",
      Location: "CSB 117",
      Instructor: "Dr. Eric Fruedenthal",
    },
    {
      CourseID: "CS4375",
      CourseName: "Operating Systems",
      DateRange: "June 10 - July 8",
      TimeRange: "9:20 - 12:45",
      Location: "CS 128",
      Instructor: "Dr. Eric Fruedenthal",
    },
    {
      CourseID: "CS3432",
      CourseName: "Computer Organization",
      DateRange: "June 10 - July 8",
      TimeRange: "9:20 - 12:45",
      Location: "LART 108",
      Instructor: "Dr. Eric Fruedenthal",
    },
    {
      CourseID: "CS4175",
      CourseName: "Parallel Computing",
      DateRange: "June 10 - July 8",
      TimeRange: "9:20 - 12:45",
      Location: "CSB 117",
      Instructor: "Dr. Eric Fruedenthal",
    },
    {
      CourseID: "CS4375",
      CourseName: "Operating Systems",
      DateRange: "June 10 - July 8",
      TimeRange: "9:20 - 12:45",
      Location: "CS 128",
      Instructor: "Dr. Eric Fruedenthal",
    },
  ];
}

export default async function AdminCoursePage() {
  const data = await getData();

  return (
    <div className="flex mx-20 items-center content-center">
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between">
          <DeleteCourseAlertDialog />
          <div className="flex gap-x-2">
            <CreateCourseDialog />
            <ModifyCourseDialog />
          </div>
        </div>
        <DataTable
          columns={Columns}
          data={data}
          columnKey={"CourseName"}
          placeholder="Filter Course Name..."
        />
      </div>
    </div>
  );
}
