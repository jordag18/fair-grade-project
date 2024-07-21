"use client";

import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from "react";
import { Course, CourseSkill } from "@/types";

interface CourseContextProps {
  selectedCourse: Course | null;
  setSelectedCourse: (course: Course | null) => void;
  courseSkills: CourseSkill[] | null;
  setCourseSkills: (skills: CourseSkill[] | null) => void;
  getSelectedCourse: () => Course | null;
}

const CourseContext = createContext<CourseContextProps | undefined>(undefined);

const LOCAL_STORAGE_KEY = "selectedCourse";

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCourse, setSelectedCourseState] = useState<Course | null>(null);
  const [courseSkills, setCourseSkills] = useState<CourseSkill[] | null>(null);

  useEffect(() => {
    const storedCourse = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedCourse) {
      setSelectedCourseState(JSON.parse(storedCourse));
    }
  }, []);

  const setSelectedCourse = (course: Course | null) => {
    setSelectedCourseState(course);
    if (course) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(course));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  const getSelectedCourse = useCallback(() => {
    return selectedCourse;
  }, [selectedCourse]);

  return (
    <CourseContext.Provider
      value={{ selectedCourse, setSelectedCourse, courseSkills, setCourseSkills, getSelectedCourse }}
    >
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

