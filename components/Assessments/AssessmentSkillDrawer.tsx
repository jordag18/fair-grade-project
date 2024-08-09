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
import { Input } from "@/components/ui/input";
import { Skill, CourseSkill } from "@/types";

interface AssessmentSkillDrawerProps {
  skills: Skill[];
  selectedSkills: { [key: string]: number };
  onSelectSkill: (skillId: string) => void;
  onRemoveSkill: (skillId: string) => void;
  onScoreChange: (skillId: string, score: number) => void;
  onApply: () => void;
}

export const AssessmentSkillDrawer: React.FC<AssessmentSkillDrawerProps> = ({
  skills,
  selectedSkills,
  onSelectSkill,
  onRemoveSkill,
  onScoreChange,
  onApply,
}) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Select Skills</Button>
      </DrawerTrigger>
      <DrawerContent className="h-1/2">
        <div className="mx-auto w-full max-w-7xl h-full flex flex-col">
          <DrawerHeader>
            <DrawerTitle>Select Skills</DrawerTitle>
            <DrawerDescription>
              Set the skills assessed and competency score.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0 flex-1 flex overflow-hidden">
            <div className="w-1/2 p-2 border-r overflow-y-auto">
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
                      onClick={() => onSelectSkill(skill.SkillID)}
                      disabled={skill.SkillID in selectedSkills}
                    >
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-1/2 p-2 overflow-y-auto">
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
                            onScoreChange(
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
                            onScoreChange(
                              skillId,
                              Math.min(3, selectedSkills[skillId] + 1)
                            )
                          }
                        >
                          +
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => onRemoveSkill(skillId)}
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
              <Button onClick={onApply}>Apply</Button>
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
