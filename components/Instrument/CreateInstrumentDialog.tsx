"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { InstrumentForm } from "./InstrumentForm";

interface CreateInstrumentDialogProps {
    onInstrumentCreated: () => void;
  }

export function CreateInstrumentDialog({ onInstrumentCreated }: CreateInstrumentDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFormSubmit = () => {
    onInstrumentCreated();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="font-semibold bg-sky-500 hover:bg-sky-600">
          Create Instrument
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Instrument</DialogTitle>
          <DialogDescription>
            Insert instrument details here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <InstrumentForm onFormSubmit={handleFormSubmit} />
      </DialogContent>
    </Dialog>
  );
}
