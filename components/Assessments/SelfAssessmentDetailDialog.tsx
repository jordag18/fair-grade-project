import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SelfAssessmentSkill {
  SelfAssessmentSkillID: string;
  skillName: string;
  score: number;
  comment: string | null;
}

interface Assessment {
  AssessmentID: string;
  AssessorID: string;
  AssessedUserID: string;
  CourseID: string;
  InstrumentID: string;
  Title: string;
  Comment: string;
  AssessmentDate: Date;
  InstrumentDescription: string;
}

interface SelfAssessmentDetailDialogProps {
  selfAssessment: {
    SelfAssessmentID: string;
    InstrumentID: string;
    InstrumentName: string;
    assessmentDate: Date;
    comments: string;
    hasAssessments: boolean;
    skills: SelfAssessmentSkill[];
    Assessment?: Assessment[];
  };
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SelfAssessmentDetailDialog = ({
  isOpen,
  onOpenChange,
  selfAssessment,
}: SelfAssessmentDetailDialogProps) => {
  if (!selfAssessment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Self-Assessment Details</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="mb-3">
            <strong>Instrument Name:</strong> {selfAssessment.InstrumentName}
          </div>
          <div className="mb-3">
            <strong>Assessment Date:</strong>{" "}
            {new Date(selfAssessment.assessmentDate).toLocaleDateString()}
          </div>
          <div className="mb-3">
            <strong>Comments:</strong> {selfAssessment.comments || "No comments provided"}
          </div>
          <div className="mb-3">
            <strong>Skills:</strong>
            <ul>
              {selfAssessment.skills.map((skill) => (
                <li key={skill.SelfAssessmentSkillID}>
                  {skill.skillName} - Score: {skill.score} - Comment: {skill.comment || "No comment"}
                </li>
              ))}
            </ul>
          </div>
          {selfAssessment.hasAssessments && selfAssessment.Assessment && (
            <>
              <div>
                <strong>Related Assessments:</strong>
                <ul>
                  {selfAssessment.Assessment.map((assessment) => (
                    <li key={assessment.AssessmentID} className="mb-3">
                      <strong>Title:</strong> {assessment.Title}
                      <br />
                      <strong>Assessment Date:</strong>{" "}
                      {new Date(assessment.AssessmentDate).toLocaleDateString()}
                      <br />
                      <strong>Comment:</strong> {assessment.Comment || "No comment"}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </DialogDescription>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
