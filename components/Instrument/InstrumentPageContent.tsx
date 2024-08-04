import { Skill } from "@/types";
import { DataTable } from "@/components/DataTable/DataTable";
import displayIfRole from "@/components/DisplayIfRole";
import { UserCourseRole } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CreateInstrumentDialog } from "./CreateInstrumentDialog";

interface InstrumentPageContentProps {
  data: Instrument[];
  role: UserCourseRole;
  columns: ColumnDef<Instrument>[];
}

interface Instrument {
    InstrumentID: string;
    InstrumentName: string;
    CreatedBy: string;
    CourseID: string;
    Skills: Skill[];
    CreatedAt: Date;
    UpdatedAt: Date;
  }

const InstrumentPageContent: React.FC<InstrumentPageContentProps> = ({ data, role, columns }) => {
  return (
    <div className="flex mx-20 items-center content-center">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex justify-between">
          <div className="flex gap-x-2 justify-between">
            {displayIfRole(role, <CreateInstrumentDialog onInstrumentCreated={() => window.location.reload()} />)}
          </div>
        </div>
        <div className="overflow-auto max-h-screen">
          <DataTable
            columns={columns}
            data={data}
            columnKey={"InstrumentName"}
            placeholder="Filter Instruments..."
          />
        </div>
      </div>
    </div>
  );
};

export default InstrumentPageContent;
