"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Course } from "@/types";

export default function AdminPage() {
  const { data: session } = useSession();
  const [courseName, setCourseName] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch("/api/admin/courses");
      const data = await res.json();
      setCourses(data);
    };

    fetchCourses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/courses", {
      method: "POST",
      body: JSON.stringify({ courseName }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      setCourseName("");
      alert("Course added successfully");
      const newCourse = await res.json();
      setCourses((prevCourses) => [...prevCourses, newCourse]);
    } else {
      alert("Failed to add course");
    }
  };

  return (
    <div className="flex flex-col">
      <h1>Admin Users Page</h1>
      <p>Welcome, {session?.user?.name}!</p>
      <form onSubmit={handleSubmit}>
        <label>
          Course Name:
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </label>
        <button type="submit">Add Course</button>
      </form>
      <h2>Courses:</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.CourseID}>{course.CourseName}</li>
        ))}
      </ul>
    </div>
  );
}
