"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useUserId } from "@/lib/auth/useUser";
import { toast } from "@/components/ui/use-toast";
import { fetchInstrumentsByCourse } from "../Instrument/InstrumentServerActions";
import {
  fetchStudentsWithSelfAssessment,
  fetchSelfAssessmentSkills,
  createInstructorAssessment,
  fetchSelfAssessmentID,
  fetchStudents,
  fetchStudentsWithSelfAssessmentStatus,
  fetchAssessmentInstrumentSkills,
} from "./AssessmentServerActions";
import { Course, Skill, Instrument } from "@/types";

const FormSchema = z.object({
  selfAssessmentID: z.string().optional(),
  instrumentID: z.string().min(1, "Instrument is required"),
  assessorID: z.string().optional(),
  assessedUserID: z.string().optional(),
  assessmentSkills: z
    .array(
      z.object({
        SkillID: z.string(),
        initialScore: z.number(),
        adjustedScore: z.number(),
        approved: z.boolean(),
      })
    )
    .optional(),
  comment: z.string().optional(),
});

export type AssessmentFormSchemaType = z.infer<typeof FormSchema>;

interface ReviewAssessmentFormProps {
  onFormSubmit: () => void;
  selectedCourse?: Course | null;
}

interface Student {
  id: string;
  name: string | null;
  hasSelfAssessment: boolean;
}

interface AssessmentSkill {
  SkillID: string;
  SkillName: string;
  initialScore: number;
  adjustedScore: number;
  approved: boolean;
}

export function AssessmentForm({
  onFormSubmit,
  selectedCourse,
}: ReviewAssessmentFormProps) {
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [assessmentSkills, setAssessmentSkills] = useState<AssessmentSkill[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [selectedInstrument, setSelectedInstrument] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");

  const form = useForm<AssessmentFormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      instrumentID: "",
      assessedUserID: "",
      assessmentSkills: [],
      comment: "",
    },
  });

  useEffect(() => {
    const fetchInstruments = async () => {
      if (selectedCourse) {
        const instrumentsData = await fetchInstrumentsByCourse(
          selectedCourse.CourseID
        );
        setInstruments(instrumentsData);
      }
    };
    fetchInstruments();
  }, [selectedCourse]);

  useEffect(() => {
    const fetchStudentsData = async () => {
      if (selectedInstrument && selectedCourse) {
        // fetch students with self-assessment
        const studentsData = await fetchStudentsWithSelfAssessmentStatus(
          selectedCourse.CourseID as string,
          selectedInstrument
        );
        console.log("studentsData:", studentsData);
        setStudents(studentsData);
      }
    };

    fetchStudentsData();
  }, [selectedInstrument, selectedCourse]);

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

  const onSubmit: SubmitHandler<AssessmentFormSchemaType> = async (data) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const userID = await useUserId();

    data.assessorID = userID as string;

    data.assessmentSkills = assessmentSkills;

    const selfAssessmentID = await fetchSelfAssessmentID({
      instrumentID: selectedInstrument,
      studentID: selectedStudent,
      courseID: selectedCourse?.CourseID as string,
    });

    data.selfAssessmentID = selfAssessmentID || undefined;

    console.log("Data before submission: ", data);

    try {
      const response = await createInstructorAssessment(data);

      if (!response.success) {
        throw new Error(response.error);
      }

      toast({
        title: "Assessment Submitted",
        description: `The assessment for the selected student was submitted successfully.`,
      });
      onFormSubmit();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to submit the assessment.`,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormItem>
          <FormLabel>Select Instrument</FormLabel>
          <Select
            onValueChange={(value) => {
              form.setValue("instrumentID", value);
              setSelectedInstrument(value);
              setSelectedStudent("");
            }}
            defaultValue={form.getValues("instrumentID")}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an instrument" />
            </SelectTrigger>
            <SelectContent>
              {instruments.map((instrument) => (
                <SelectItem
                  key={instrument.InstrumentID}
                  value={instrument.InstrumentID}
                >
                  {instrument.InstrumentName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>

        <FormItem>
          <FormLabel>Select Student</FormLabel>
          <Select
            onValueChange={(value) => {
              form.setValue("assessedUserID", value);
              setSelectedStudent(value);
            }}
            value={selectedStudent}
            disabled={!selectedInstrument}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a student" />
            </SelectTrigger>
            <SelectContent>
              {students.map((student) => (
                <SelectItem key={student.id} value={student.id}>
                  <div className="flex justify-between items-center">
                    <span>{student.name}</span>
                    <span
                      className={`ml-2 px-2 py-1 rounded-md text-sm ${
                        student.hasSelfAssessment
                          ? "bg-green-500 text-white"
                          : "bg-gray-300 text-black"
                      }`}
                    >
                      {student.hasSelfAssessment
                        ? "Completed"
                        : "Not Completed"}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>

        <FormItem>
          <FormLabel>Review Assessment Skills</FormLabel>
          <ScrollArea className="max-h-96">
            {assessmentSkills.map((skill, index) => (
              <div
                key={skill.SkillID}
                className="flex justify-between items-center p-2 border-b"
              >
                <div className="flex flex-col w-full">
                  <span className="font-medium">{skill.SkillName}</span>
                  <span className="text-sm text-gray-500">
                    Initial Score: {skill.initialScore}
                  </span>
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={skill.adjustedScore}
                    onChange={(e) => {
                      const newScore = parseInt(e.target.value, 10);
                      const updatedSkills = assessmentSkills.map((s, i) =>
                        i === index ? { ...s, adjustedScore: newScore } : s
                      );
                      setAssessmentSkills(updatedSkills);
                    }}
                    className="w-16 p-1 border rounded-md text-center"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updatedSkills = assessmentSkills.map((s, i) =>
                        i === index ? { ...s, approved: !s.approved } : s
                      );
                      setAssessmentSkills(updatedSkills);
                    }}
                    className={`ml-2 px-2 py-1 rounded-md text-sm ${
                      skill.approved
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-black"
                    }`}
                  >
                    {skill.approved ? "Approved" : "Unapproved"}
                  </button>
                </div>
              </div>
            ))}
          </ScrollArea>
        </FormItem>

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter comment" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="font-semibold bg-sky-500 hover:bg-sky-600 text-white"
        >
          Submit Assessment
        </Button>
      </form>
    </Form>
  );
}
