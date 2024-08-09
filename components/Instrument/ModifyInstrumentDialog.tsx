"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InstrumentForm } from "./InstrumentForm";
import { Instrument } from "@/types";

interface ModifyInstrumentDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  initialData: Instrument;
  refreshInstruments: () => void;
}

export function ModifyInstrumentDialog({
  isOpen,
  onOpenChange,
  initialData,
  refreshInstruments,
}: ModifyInstrumentDialogProps) {

  const handleFormSubmit = () => {
    refreshInstruments();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Modify Instrument</DialogTitle>
          <DialogDescription>
            Modify the details of the instrument.
          </DialogDescription>
        </DialogHeader>
        <InstrumentForm
          onFormSubmit={handleFormSubmit}
          initialData={initialData}
          isEditMode
        />
      </DialogContent>
    </Dialog>
  );
}
