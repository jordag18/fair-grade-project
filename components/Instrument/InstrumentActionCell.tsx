"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DeleteInstrumentDialog } from "./DeleteInstrumentDialog";
import { ModifyInstrumentDialog } from "./ModifyInstrumentDialog";
import { useUserRole } from "@/context/UserRoleContext";
import displayIfRole from "../DisplayIfRole";
import { UserCourseRole } from "@/types";
import { Instrument } from "@/types";
import { Dialog } from "../ui/dialog";
import { InstrumentDetailDialog } from "./InstrumentDetailDialog";

interface InstrumentActionCellProps {
  row: {
    original: Instrument;
  };
  refreshInstruments: () => void;
}

const InstrumentActionCell: React.FC<InstrumentActionCellProps> = ({
  row,
  refreshInstruments,
}) => {
  const [isModifyDialogOpen, setIsModifyDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const { role } = useUserRole();
  const selectedRow = row.original;

  return (
    <Dialog
      open={isModifyDialogOpen || isDeleteDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          setIsModifyDialogOpen(false);
          setIsDeleteDialogOpen(false);
          setIsDetailDialogOpen(false);
        }
      }}
    >
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setIsDetailDialogOpen(true);
              console.log("Selected Row Data: ", selectedRow);
            }}
          >
            View Instrument Details
          </DropdownMenuItem>
          {displayIfRole(
            role as UserCourseRole,
            <DropdownMenuItem
              onClick={() => {
                setIsModifyDialogOpen(true);
                console.log("Modify InitialData: ", selectedRow);
              }}
            >
              Modify Instrument
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          {displayIfRole(
            role as UserCourseRole,
            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
              Delete Instrument
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <InstrumentDetailDialog
      isOpen={isDetailDialogOpen}
      onOpenChange={setIsDetailDialogOpen}
      instrument={selectedRow}
       />
      <ModifyInstrumentDialog
        isOpen={isModifyDialogOpen}
        onOpenChange={setIsModifyDialogOpen}
        initialData={selectedRow}
        refreshInstruments={refreshInstruments}
      />
      <DeleteInstrumentDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        instrumentID={selectedRow.InstrumentID}
        refreshInstruments={refreshInstruments}
      />
    </Dialog>
  );
};

export default InstrumentActionCell;
