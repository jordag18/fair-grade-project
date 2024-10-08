/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useCallback } from "react";
import { DataTable } from "@/components/DataTable/DataTable";
import { useCourse } from "@/context/CourseContext";
import { useUserRole } from "@/context/UserRoleContext";
import { useForm, FormProvider } from "react-hook-form";
import {
  getAssessmentsByCourse,
  fetchSelfAssessmentSkills,
  fetchAssessmentInstrumentSkills,
  CreateOrUpdateAssessment,
  getUserAssessmentsByCourse,
  fetchStudents,
} from "@/components/Assessments/AssessmentServerActions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Course, Instrument, UserCourseRole } from "@/types";
import { assessmentColumns } from "./assessmentColumns";
import { fetchCourseSkills } from "@/components/Overview/OverviewServerActions";
import { fetchInstrumentsByCourse } from "@/components/Instrument/InstrumentServerActions";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { CreateSkillDialog } from "@/components/Skills/CreateSkillDialog";
import { CreateInstrumentDialog } from "@/components/Instrument/CreateInstrumentDialog";
import displayIfRole from "@/components/DisplayIfRole";

interface Student {
  id: string;
  name: string | null;
  hasSelfAssessment?: boolean;
}

export interface AssessmentSkill {
  SkillID: string;
  SkillName: string;
  initialScore: number;
  adjustedScore: number;
  approved: boolean;
}

const AssessmentSkillSchema = z.object({
  SkillID: z.string(),
  SkillName: z.string(),
  Score: z.number().default(0),
  initialScore: z.number().default(0),
  adjustedScore: z.number().default(0),
  approved: z.boolean().default(false),
});

const InstrumentSchema = z.object({
  CourseID: z.string(),
  CreatedAt: z.string(),
  InstrumentID: z.string(),
  Name: z.string(),
  UpdatedAt: z.string(),
});

export const AssessmentSchema = z.object({
  AssessmentID: z.string(),
  AssessorID: z.string().optional(),
  Assessor: z.string().default("Unknown"),
  AssessedUserID: z.string().optional(),
  AssessedUser: z.string().default("Unknown"),
  CourseID: z.string().optional(),
  InstrumentID: z.string().optional(),
  Instrument_Assessment: z.any(InstrumentSchema).optional(),
  SelfAssessmentID: z.string().optional(),
  Title: z.string().optional(),
  Comment: z.string().optional(),
  AssessmentDate: z.string().optional(), 
  InstrumentDescription: z.string().optional(),
  Skills: z.array(AssessmentSkillSchema),
});

export type AssessmentType = z.infer<typeof AssessmentSchema>;

type FormValues = {
  assessments: AssessmentType[];
};

interface AssessmentClientPageProps {
  userID: any;
  session: Session | null;
}

const AssessmentClientPage = ({
  userID,
  session,
}: AssessmentClientPageProps) => {
  const { selectedCourse } = useCourse();
  const { role } = useUserRole();
  const [currentAssessedUser, setCurrentAssessedUser] = useState<Student | null>(null);
  const [courseSkills, setCourseSkills] = useState<AssessmentSkill[]>([]);
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [assessmentSkills, setAssessmentSkills] = useState<AssessmentSkill[]>(
    []
  );
  const form = useForm<FormValues>({
    defaultValues: {
      assessments: [],
    },
  });
  const { setValue, watch } = form;
  const [selectedInstrument, setSelectedInstrument] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [editingAssessment, setEditingAssessment] =
    useState<AssessmentType | null>(null);
    

  const refreshAssessments = useCallback(async () => {
    if (selectedCourse) {
      const data: any = await getAssessmentsByCourse(selectedCourse.CourseID);
      const courseSkills: any = await fetchCourseSkills(
        selectedCourse.CourseID
      );

      console.log("Assessment Data before validation:", data);

      const validatedData = data
        .map((item: any) => ({
          ...item,
          AssessmentDate: item.AssessmentDate
            ? new Date(item.AssessmentDate).toISOString()
            : undefined,
          SelfAssessmentDate: item.SelfAssessmentDate
            ? new Date(item.SelfAssessmentDate).toISOString()
            : undefined,
        }))
        .map((item: any) => AssessmentSchema.parse(item));

      setValue("assessments", validatedData);
      console.log("Assessment Data after validation: ", validatedData);
      console.log("Course Skills fetched:", courseSkills);
      setCourseSkills(courseSkills);
    }
  }, [selectedCourse, setValue]);

  const refreshSelfAssessments = useCallback(async () => {
    if (selectedCourse) {
      const data: any = await getUserAssessmentsByCourse(
        selectedCourse.CourseID,
        userID
      );
      const courseSkills: any = await fetchCourseSkills(
        selectedCourse.CourseID
      );

      console.log("Assessment Data before validation:", data);

      const validatedData = data
        .map((item: any) => ({
          ...item,
          AssessmentDate: item.AssessmentDate
            ? new Date(item.AssessmentDate).toISOString()
            : undefined,
          SelfAssessmentDate: item.SelfAssessmentDate
            ? new Date(item.SelfAssessmentDate).toISOString()
            : undefined,
        }))
        .map((item: any) => AssessmentSchema.parse(item));

      setValue("assessments", validatedData);
      console.log("Assessment Data after validation: ", validatedData);
      console.log("Course Skills fetched:", courseSkills);
      setCourseSkills(courseSkills);
    }
  }, [selectedCourse, userID, setValue]);

  // State to track when both InstrumentID and AssessedUserID have changed
  const [changedAssessments, setChangedAssessments] = useState<
    Record<number, { instrumentChanged: boolean; userChanged: boolean }>
  >({});

  // Function to update the state and check if both fields are changed
  const handleFieldChange = (
    rowIndex: number,
    field: "InstrumentID" | "AssessedUserID",
    value: string
  ) => {
    // Synchronously update the state first
    setChangedAssessments((prev) => {
      const current = prev[rowIndex] || {
        instrumentChanged: false,
        userChanged: false,
      };
      const updated = {
        ...current,
        [field === "InstrumentID" ? "instrumentChanged" : "userChanged"]: true,
      };
      return { ...prev, [rowIndex]: updated };
    });

    const updateAndCreateAssessment = async () => {
      const assessments = watch("assessments");
      const current = changedAssessments[rowIndex] || {
        instrumentChanged: false,
        userChanged: false,
      };
      const updated = {
        ...current,
        [field === "InstrumentID" ? "instrumentChanged" : "userChanged"]: true,
      };

      // Check if both instrument and user changes are detected, then create assessment
      if (updated.instrumentChanged && updated.userChanged) {
        const assessment = assessments[rowIndex];
        await CreateOrUpdateAssessment(assessment);
        console.log("Assessment Data before submission:", assessment);
      }
    };

    // Call the async function
    updateAndCreateAssessment();
  };

  const addBlankAssessment = () => {
    const isStudent = role === UserCourseRole.Student;
  
    const newAssessmentData = {
      AssessmentID: Math.random().toString(36).substr(2, 9),
      AssessorID: session?.user.id,
      Assessor: session?.user?.name || "",
      AssessedUserID: isStudent
        ? session?.user.id
        : currentAssessedUser?.id || "", // Set to current selected user's ID if not a student
      AssessedUser: isStudent
        ? session?.user?.name || "Unknown"
        : currentAssessedUser?.name || "Unknown", // Set to current selected user's name if not a student
      CourseID: selectedCourse?.CourseID || "",
      Instrument: "",
      Title: "",
      Comment: "",
      AssessmentDate: new Date().toISOString(),
      InstrumentDescription: isStudent ? "Student-Assessment" : "Assessment",
      Skills: courseSkills.map((skill) => ({
        SkillID: skill.SkillID,
        SkillName: skill.SkillName,
        initialScore: 0,
        Score: 0,
        adjustedScore: 0,
        approved: false,
      })),
    };
  
    const newAssessment = AssessmentSchema.parse(newAssessmentData);
    setValue("assessments", [...watch("assessments"), newAssessment]);
  };

  const fetchInstruments = async () => {
    if (selectedCourse) {
      const instrumentsData = await fetchInstrumentsByCourse(
        selectedCourse.CourseID
      );
      setInstruments(instrumentsData);
      console.log("fetched Instrument Data:", instrumentsData);
    }
  };

  // Handler to update assessments based on the selected student
  const handleSelectStudent = async (studentID: any) => {
    if (studentID) {
      const student = students.find((s) => s.id === studentID);
      setCurrentAssessedUser(student || null);

      const data = await getUserAssessmentsByCourse(
        (selectedCourse as Course).CourseID,
        studentID
      );

      const validatedData = data
        .map((item: any) => ({
          ...item,
          AssessmentDate: item.AssessmentDate
            ? new Date(item.AssessmentDate).toISOString() // Includes date and time in ISO format
            : undefined,
          SelfAssessmentDate: item.SelfAssessmentDate
            ? new Date(item.SelfAssessmentDate).toISOString()
            : undefined,
        }))
        .map((item: any) => AssessmentSchema.parse(item));

      setValue("assessments", validatedData);
    }
  };

  useEffect(() => {
    fetchInstruments();
  }, [selectedCourse]);

    // Automatically set the current assessed user to the logged-in user if the role is Student
    useEffect(() => {
      if (role === UserCourseRole.Student && session?.user) {
        setCurrentAssessedUser({
          id: session.user.id,
          name: session.user.name || "Unknown",
        });
        setSelectedStudent(session.user.id); // Set the selected student to the current user
      }
    }, [role, session]);


  const fetchCourseStudents = useCallback(async () => {
    if (selectedCourse) {
      const studentsData = await fetchStudents(
        selectedCourse.CourseID
      );
      setStudents(studentsData);
    }
  }, [selectedCourse]);

  useEffect(() => {
    fetchCourseStudents();
    refreshAssessments();
  }, [fetchStudents, refreshAssessments]);

  useEffect(() => {
    const fetchSkills = async () => {
      if (selectedStudent && selectedInstrument) {
        // First, try to fetch self-assessment skills
        let skillsData = await fetchSelfAssessmentSkills(
          selectedInstrument,
          selectedStudent
        );

        // If no self-assessment skills are found, fetch instrument skills
        if (skillsData.length === 0) {
          console.log(
            "No self-assessment found, fetching instrument skills..."
          );
          skillsData = await fetchAssessmentInstrumentSkills(
            selectedInstrument,
            selectedStudent
          );
        }

        console.log("Skills data: ", skillsData);
        setAssessmentSkills(skillsData);
      }
    };

    fetchSkills();
  }, [selectedStudent, selectedInstrument]);

  useEffect(() => {
    if (role === UserCourseRole.Student) {
      refreshSelfAssessments();
    } else {
      refreshAssessments();
    }
  }, [selectedCourse, role, refreshAssessments, refreshSelfAssessments]);

  if (!selectedCourse) {
    return <div>Please select a course to view the assessments.</div>;
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(() => {})}>
        <div className="flex mx-20 items-center content-center w-full">
          <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex overflow-auto max-h-screen">
            <div className="flex justify-between">
              <SelectScrollable
                students={students}
                onSelectStudent={handleSelectStudent}
                disabled={role === UserCourseRole.Student} 
                selectedStudent={selectedStudent}
              />
              <div className="flex gap-x-2 justify-between">
                <Button onClick={addBlankAssessment}>Add Assessment</Button>
                {displayIfRole(
                  role as UserCourseRole,
                  <CreateSkillDialog onSkillCreated={refreshAssessments} />
                )}
                {displayIfRole(
                  role as UserCourseRole,
                  <CreateInstrumentDialog
                    onInstrumentCreated={fetchInstruments}
                  />
                )}
              </div>
            </div>
            {role === UserCourseRole.Student ? (
              <DataTable
                columns={assessmentColumns({
                  handleFieldChange,
                  refreshAssessments: refreshSelfAssessments,
                  changedAssessments,
                  courseSkills,
                  instruments,
                  students,
                  isStudent: true,
                  userID: userID,
                })}
                data={form.watch("assessments")}
                columnKey={"Instrument_Assessment"}
                placeholder="Filter by Instrument Name..."
                headerHeight="h-72"
                initialSorting={{ id: "AssessmentDate", desc: true }}
              />
            ) : (
              <DataTable
                columns={assessmentColumns({
                  handleFieldChange,
                  refreshAssessments,
                  changedAssessments,
                  courseSkills,
                  instruments,
                  students,
                  userID: userID,
                })}
                data={form.watch("assessments")}
                columnKey={"Instrument_Assessment"}
                placeholder="Filter by Instrument..."
                headerHeight="h-72"
                initialSorting={{ id: "AssessmentDate", desc: true }}
              />
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default AssessmentClientPage;

// Modify the SelectScrollable component to accept props
export function SelectScrollable({ students, onSelectStudent, disabled, selectedStudent }: any) {
  return (
    <Select
      onValueChange={(value) => onSelectStudent(value)}
      value={selectedStudent.id} 
      disabled={disabled} 
    >
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a student" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {students.map((student: any) => (
            <SelectItem key={student.id} value={student.id}>
              {student.name || "Unknown"}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
