"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteInstrument } from "@/components/Instrument/InstrumentServerActions";
import { toast } from "../ui/use-toast";

interface DeleteInstrumentDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  instrumentID: string;
  refreshInstruments: () => void;
}

export function DeleteInstrumentDialog({
  isOpen,
  onOpenChange,
  instrumentID,
  refreshInstruments,
}: DeleteInstrumentDialogProps) {
  const handleDelete = async () => {
    const response = await deleteInstrument(instrumentID);
    if (response.success) {
      toast({
        title: "Instrument Deleted",
        description: `Instrument was deleted successfully.`,
      });
      onOpenChange(false);
      refreshInstruments();
    } else {
      toast({
        title: "Error",
        description: `Failed to delete the instrument`,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this instrument?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
