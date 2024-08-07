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
import { Course, Skill } from "@/types";

interface InstrumentSkillDrawerProps {
  selectedCourse: Course | null;
  onSkillsChange: (skills: Skill[]) => void;
  initialSelectedSkills?: Skill[]; // Add this prop
}

export const InstrumentSkillDrawer: React.FC<InstrumentSkillDrawerProps> = ({
  selectedCourse,
  onSkillsChange,
  initialSelectedSkills = [], // Default to an empty array
}) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>(initialSelectedSkills); // Initialize with initialSelectedSkills

  useEffect(() => {
    if (selectedCourse) {
      fetchCourseSkills(selectedCourse.CourseID).then(setSkills as any);
    }
  }, [selectedCourse]);

  const handleSelectSkill = (skill: Skill) => {
    setSelectedSkills((prev) => [...prev, skill]);
  };

  const handleRemoveSkill = (skillId: string) => {
    setSelectedSkills((prev) => prev.filter((skill) => skill.SkillID !== skillId));
  };

  const handleAddAllSkills = () => {
    setSelectedSkills(skills);
  };

  const handleRemoveAllSkills = () => {
    setSelectedSkills([]);
  };

  const handleApply = () => {
    onSkillsChange(selectedSkills);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Select Skills</Button>
      </DrawerTrigger>
      <DrawerContent className="h-5/6">
        <div className="mx-auto w-full max-w-7xl h-full flex flex-col">
          <DrawerHeader>
            <DrawerTitle>Select Skills</DrawerTitle>
            <DrawerDescription>
              Set the skills for the instrument.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0 flex-1 flex overflow-hidden">
            <div className="w-1/2 p-2 border-r overflow-y-auto">
              <div className="flex justify-between items-center mb-2">
                <h3>Available Skills</h3>
                <Button variant="outline" onClick={handleAddAllSkills}>Add All</Button>
              </div>
              <div className="flex flex-col space-y-2">
                {skills.map((skill) => (
                  <div
                    key={skill.SkillID}
                    className="flex items-center justify-between space-x-2"
                  >
                    <span className="w-full">{skill.SkillName}</span>
                    <Button
                      variant="outline"
                      onClick={() => handleSelectSkill(skill)}
                      disabled={selectedSkills.some(s => s.SkillID === skill.SkillID)}
                    >
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-1/2 p-2 overflow-y-auto">
              <div className="flex justify-between items-center mb-2">
                <h3>Selected Skills</h3>
                <Button variant="outline" onClick={handleRemoveAllSkills}>Remove All</Button>
              </div>
              <div className="flex flex-col space-y-2">
                {selectedSkills.map((skill) => (
                  <div
                    key={skill.SkillID}
                    className="flex items-center justify-between space-x-2"
                  >
                    <span className="w-full">{skill.SkillName}</span>
                    <Button
                      variant="outline"
                      onClick={() => handleRemoveSkill(skill.SkillID)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
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
