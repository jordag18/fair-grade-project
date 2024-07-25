"use client";

import React, { useState, useEffect } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Skill, CourseSkill } from "@/types";
import { fetchCourseSkills } from "../Overview/OverviewServerActions";
import { Course } from "@/types";

interface AssessmentSkillPopoverProps {
  selectedCourse: Course | null;
  onSkillsChange: (skills: CourseSkill[]) => void;
}

export const AssessmentSkillPopover: React.FC<AssessmentSkillPopoverProps> = ({
  selectedCourse,
  onSkillsChange,
}) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (selectedCourse) {
      fetchCourseSkills(selectedCourse.CourseID).then(setSkills);
    }
  }, [selectedCourse]);

  const handleCheckboxChange = (skillId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedSkills((prev) => ({ ...prev, [skillId]: 0 }));
    } else {
      setSelectedSkills((prev) => {
        const newSelectedSkills = { ...prev };
        delete newSelectedSkills[skillId];
        return newSelectedSkills;
      });
    }
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
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Select Skills</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="flex flex-col space-y-2">
          {skills.map((skill) => (
            <div key={skill.SkillID} className="flex items-center space-x-2">
              <Checkbox
                checked={skill.SkillID in selectedSkills}
                onCheckedChange={(isChecked) =>
                  handleCheckboxChange(skill.SkillID, isChecked as boolean)
                }
              />
              <span>{skill.SkillName}</span>
              {skill.SkillID in selectedSkills && (
                <Input
                  type="number"
                  placeholder="Score"
                  value={selectedSkills[skill.SkillID]}
                  onChange={(e) => handleScoreChange(skill.SkillID, parseInt(e.target.value))}
                  className="w-20 ml-auto"
                />
              )}
            </div>
          ))}
          <Button onClick={handleApply}>Apply</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
