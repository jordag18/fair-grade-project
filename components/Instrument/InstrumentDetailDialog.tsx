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

interface InstrumentDetailDialogProps {
  instrument: {
    CourseID: string,
    CreatedAt: Date,
    UpdatedAt: Date,
    CreatedBy: string,
    InstrumentID: string;
    InstrumentName: string;
    Skills: {
      SkillID: string;
      SkillName: string;
      SkillType: string;
    }[];
  };
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InstrumentDetailDialog = ({
  isOpen,
  onOpenChange,
  instrument,
}: InstrumentDetailDialogProps) => {
  if (!instrument) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Instrument Details</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div>
            <strong>Instrument Name:</strong> {instrument.InstrumentName}
          </div>
          <div>
            <strong>Created By:</strong> {instrument.CreatedBy}
          </div>
          <div>
            <strong>Created At:</strong>{" "}
            {new Date(instrument.CreatedAt).toLocaleDateString()}
          </div>
          <div>
            <strong>Updated At:</strong>{" "}
            {new Date(instrument.UpdatedAt).toLocaleDateString()}
          </div>
          <div>
            <strong>Skills:</strong>
            <ul>
              {instrument.Skills.map((skill) => (
                <li key={skill.SkillID}>
                  {skill.SkillName} (Type: {skill.SkillType})
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
