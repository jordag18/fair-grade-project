"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { Course, CourseSkill } from "@/types";

interface CourseContextProps {
  selectedCourse: Course | null;
  setSelectedCourse: (course: Course | null) => void;
  courseSkills: CourseSkill[] | null;
  setCourseSkills: (skills: CourseSkill[] | null) => void;
}

const CourseContext = createContext<CourseContextProps | undefined>(undefined);

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courseSkills, setCourseSkills] = useState<CourseSkill[] | null>(null);

  return (
    <CourseContext.Provider value={{ selectedCourse, setSelectedCourse, courseSkills, setCourseSkills }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
};