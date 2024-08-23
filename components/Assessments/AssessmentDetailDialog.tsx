import React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AssessmentDetailDialogProps {
  assessment: {
    AssessmentID: string;
    Assessor: string;
    AssessedUser: string;
    CourseID: string;
    Instrument: string;
    Title: string;
    Comment: string;
    AssessmentDate: Date;
    InstrumentDescription: string;
    Skills: {
      SkillID: string;
      SkillName: string;
      SkillType: string;
      Score: number;
      Approved: boolean;
      Comment: string;
    }[];
    SelfAssessmentDate: Date;
    InstrumentName: string;
  };
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AssessmentDetailDialog = ({
    isOpen,
    onOpenChange,
    assessment,
  }: AssessmentDetailDialogProps) => {
    if (!assessment) return null;
  
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assessment Details</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <div>
              <strong>Assessor:</strong> {assessment.Assessor}
            </div>
            <div>
              <strong>Assessed User:</strong> {assessment.AssessedUser}
            </div>
            <div>
              <strong>Instrument:</strong> {assessment.InstrumentName}
            </div>
            <div>
              <strong>Title:</strong> {assessment.Title}
            </div>
            <div>
              <strong>Comment:</strong> {assessment.Comment}
            </div>
            <div>
              <strong>Assessment Date:</strong> {new Date(assessment.AssessmentDate).toLocaleDateString()}
            </div>
            <div>
              <strong>Skills:</strong>
              <ul>
                {assessment.Skills.map((skill: any) => (
                  <li key={skill.SkillID}>
                    {skill.SkillName} (Type: {skill.SkillType}) - Score: {skill.Score} - Approved:{" "}
                    {skill.Approved ? "Yes" : "No"} 
                  </li>
                ))}
              </ul>
            </div>
          </DialogDescription>
          <DialogFooter>
            <Button onClick={() => onOpenChange(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
