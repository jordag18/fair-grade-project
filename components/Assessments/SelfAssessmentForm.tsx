"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUserId } from "@/lib/auth/useUser";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { fetchInstrumentsByCourse } from "../Instrument/InstrumentServerActions";
import { getCourseSkills } from "../Skills/SkillServerActions";
import { Course, Instrument } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { createSelfAssessment } from "./AssessmentServerActions";
import { toast } from "../ui/use-toast";

interface Skill {
  SkillID: string;
  CourseID?: string;
  SkillName: string;
  SkillType: string;
  AddedBy?: string;
  User?: {
    name: string | null;
  };
  Score?: number;
  IsInstrumentSkill?: boolean;
}

interface SelfAssessmentFormSchema {
  InstrumentID: string;
  Skills: Skill[];
  Comment?: string;
}

const selfAssessmentSchema = z.object({
  InstrumentID: z.string().optional(),
  Skills: z
    .array(
      z.object({
        SkillID: z.string(),
        SkillName: z.string(),
        Score: z.number().min(0).max(3),
      })
    )
    .optional(),
  Comment: z.string().optional(),
});


export const SelfAssessmentForm: React.FC<{
  onFormSubmit: () => void;
  initialData?: SelfAssessmentFormSchema;
  selectedCourse: Course;
}> = ({ onFormSubmit, initialData, selectedCourse }) => {
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [additionalSkills, setAdditionalSkills] = useState<Skill[]>([]);
  const [selectedInstrumentID, setSelectedInstrumentID] = useState<string>("");

  const form = useForm<SelfAssessmentFormSchema>({
    resolver: zodResolver(selfAssessmentSchema),
    defaultValues: initialData || {
      InstrumentID: "",
      Skills: [],
      Comment: "",
    },
  });

  const { handleSubmit, setValue } = form;

  // Fetch instruments when the course changes
  useEffect(() => {
    const fetchInstruments = async () => {
      if (selectedCourse) {
        const instruments = await fetchInstrumentsByCourse(
          selectedCourse.CourseID
        );
        console.log("Fetched Course instruments: ", instruments);
        setInstruments(instruments);
      }
    };

    fetchInstruments();
  }, [selectedCourse]);

  const handleInstrumentSelection = (instrumentID: string) => {
    setSelectedInstrumentID(instrumentID);
    setValue("InstrumentID", instrumentID); 
  };

  useEffect(() => {
    if (selectedInstrumentID) {
      const instrument = instruments.find(
        (inst) => inst.InstrumentID === selectedInstrumentID
      );
      if (instrument) {
        const instrumentSkills = instrument.Skills.map((skill) => ({
          ...skill,
          Score: 0,
          IsInstrumentSkill: true, 
        }));

        setSelectedSkills(instrumentSkills);
        setValue("Skills", instrumentSkills);
      }
    }
  }, [selectedInstrumentID, instruments, setValue]);

  // Fetch additional course skills
  useEffect(() => {
    const fetchSkills = async () => {
      if (selectedCourse) {
        const courseSkills = await getCourseSkills(selectedCourse.CourseID);
        console.log("Fetched Course Skills: ", courseSkills);

        // Transform the data into the Skill[] format
        const transformedSkills = courseSkills.map((cs) => ({
          SkillID: cs.Skills.SkillID,
          SkillName: cs.Skills.SkillName,
          SkillType: cs.Skills.SkillType,
          AddedBy: cs.Skills.AddedBy,
          User: cs.Skills.User,
        }));

        setAdditionalSkills(transformedSkills);
      }
    };

    fetchSkills();
  }, [selectedCourse]);

  const addAdditionalSkill = (skill: Skill) => {
    const updatedSkills = [
      ...selectedSkills,
      { ...skill, Score: 0, IsInstrumentSkill: false },
    ];
    setSelectedSkills(updatedSkills);
    setValue("Skills", updatedSkills);
  };

  const handleScoreChange = (index: number, delta: number) => {
    const updatedSkills = [...selectedSkills];
    const newScore = updatedSkills[index].Score! + delta;
    if (newScore >= 0 && newScore <= 3) {
      updatedSkills[index].Score = newScore;
      setSelectedSkills(updatedSkills);
      setValue("Skills", updatedSkills);
    }
  };

  const removeSkill = (index: number) => {
    const skillToRemove = selectedSkills[index];

    // Prevent removal of instrument skills
    if (skillToRemove.IsInstrumentSkill) {
      return;
    }

    const updatedSkills = selectedSkills.filter((_, i) => i !== index);
    setSelectedSkills(updatedSkills);
    setValue("Skills", updatedSkills);
  };

  const onSubmit: SubmitHandler<SelfAssessmentFormSchema> = async (data) => {
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const StudentID = await useUserId();
  

      const formattedData = {
        ...data,
        CourseID: selectedCourse.CourseID,
        StudentID: StudentID || "",
      };
  
      const result = await createSelfAssessment(formattedData as any);
  
      if (result.success) {
        toast({
          title: "Success",
          description: "Self-assessment submitted successfully!",
        });
        onFormSubmit();
      } else {
        toast({
          title: "Error",
          description: "There was an error submitting your self-assessment.",
        });
      }
    } catch (error) {
      console.error("Error submitting self-assessment:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Instrument List */}
        <ScrollArea className="h-48 max-h-[200px] overflow-y-auto border p-2">
          <h3 className="text-lg font-semibold mb-2 sticky top-0 bg-white">
            Instruments
          </h3>
          {instruments.map((inst) => (
            <React.Fragment key={inst.InstrumentID}>
              <div
                className={`p-2 cursor-pointer rounded ${
                  selectedInstrumentID === inst.InstrumentID
                    ? "bg-blue-200"
                    : "bg-white"
                }`}
                onClick={() => handleInstrumentSelection(inst.InstrumentID)}
              >
                {inst.InstrumentName}
              </div>
              <Separator className="my-2" />
            </React.Fragment>
          ))}
        </ScrollArea>

        {/* Skills List with Scoring */}
        <ScrollArea className="h-64 max-h-[300px] overflow-y-auto border p-2">
          <h3 className="text-lg font-semibold mb-2 sticky top-0 bg-white">
            Skills
          </h3>
          {selectedSkills.length > 0 ? (
            selectedSkills.map((skill, index) => (
              <React.Fragment key={skill.SkillID}>
                <div className="flex items-center justify-between mb-2">
                  <span>{skill.SkillName}</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleScoreChange(index, -1)}
                    >
                      -
                    </Button>
                    <span>{skill.Score}</span>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleScoreChange(index, 1)}
                    >
                      +
                    </Button>
                    {!skill.IsInstrumentSkill && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeSkill(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
                <Separator className="my-2" />
              </React.Fragment>
            ))
          ) : (
            <div>No skills in Instrument</div>
          )}
        </ScrollArea>

        {/* Additional Skills Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Add Additional Skills</Button>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <div className="space-y-4">
              {additionalSkills.map((skill) => (
                <div
                  key={skill.SkillID}
                  className="flex items-center justify-between"
                >
                  <div>
                    <span>{skill.SkillName}</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => addAdditionalSkill(skill)}
                    disabled={selectedSkills.some(
                      (s) => s.SkillID === skill.SkillID
                    )}
                  >
                    +
                  </Button>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <FormField
          control={form.control}
          name="Comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Add a comment..." {...field} />
              </FormControl>
              <FormMessage>
                {form.formState.errors.Comment?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Submit Self-Assessment
        </Button>
      </form>
    </Form>
  );
};
