"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { fetchCourseSkills } from "../Overview/OverviewServerActions";
import { Input } from "../ui/input";
import { Course, CourseSkill, Skill } from "@/types";

interface AssessmentSkillDrawerProps {
  selectedCourse: Course | null;
  onSkillsChange: (skills: CourseSkill[]) => void;
}

export const AssessmentSkillDrawer: React.FC<AssessmentSkillDrawerProps> = ({
  selectedCourse,
  onSkillsChange,
}) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    if (selectedCourse) {
      fetchCourseSkills(selectedCourse.CourseID).then(setSkills);
    }
  }, [selectedCourse]);

  const handleSelectSkill = (skillId: string) => {
    setSelectedSkills((prev) => ({ ...prev, [skillId]: 0 }));
  };

  const handleRemoveSkill = (skillId: string) => {
    setSelectedSkills((prev) => {
      const newSelectedSkills = { ...prev };
      delete newSelectedSkills[skillId];
      return newSelectedSkills;
    });
  };

  const handleScoreChange = (skillId: string, score: number) => {
    setSelectedSkills((prev) => ({ ...prev, [skillId]: score }));
  };

  const handleApply = () => {
    const courseSkills = Object.keys(selectedSkills).map((skillId) => ({
      SkillID: skillId,
      Score: selectedSkills[skillId],
    }));
    onSkillsChange(courseSkills);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Select Skills</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-7xl">
          <DrawerHeader>
            <DrawerTitle>Select Skills</DrawerTitle>
            <DrawerDescription>
              Set the skills assessed and competency score.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0 flex">
            <div className="w-1/2 p-2 border-r">
              <h3 className="mb-2">Available Skills</h3>
              <div className="flex flex-col space-y-2">
                {skills.map((skill) => (
                  <div
                    key={skill.SkillID}
                    className="flex items-center justify-between space-x-2"
                  >
                    <span className="w-full">{skill.SkillName}</span>
                    <Button
                      variant="outline"
                      onClick={() => handleSelectSkill(skill.SkillID)}
                      disabled={skill.SkillID in selectedSkills}
                    >
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-1/2 p-2">
              <h3 className="mb-2">Selected Skills</h3>
              <div className="flex flex-col space-y-2">
                {Object.keys(selectedSkills).map((skillId) => {
                  const skill = skills.find((s) => s.SkillID === skillId);
                  return (
                    <div
                      key={skillId}
                      className="flex items-center justify-between space-x-2"
                    >
                      <span className="w-full">{skill?.SkillName}</span>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          onClick={() =>
                            handleScoreChange(
                              skillId,
                              Math.max(0, selectedSkills[skillId] - 1)
                            )
                          }
                        >
                          -
                        </Button>
                        <Input
                          type="number"
                          value={selectedSkills[skillId]}
                          readOnly
                          className="w-12 text-center no-arrows"
                        />
                        <Button
                          variant="outline"
                          onClick={() =>
                            handleScoreChange(
                              skillId,
                              Math.min(3, selectedSkills[skillId] + 1)
                            )
                          }
                        >
                          +
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleRemoveSkill(skillId)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button onClick={handleApply}>Apply</Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
