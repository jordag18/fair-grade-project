import { StudentOverview, columns } from "./columns";
import { DataTable } from "../../../../components/DataTable/DataTable";
import { GenerateReportDialog } from "@/components/GenerateReportDialog";

async function getData(): Promise<StudentOverview[]> {
  // Fetch data from your API here.
  return [];
}

export default async function AdminSkillPage() {
  const data = await getData();

  return (
    <div className="flex mx-20 items-center content-center">
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between">
          <GenerateReportDialog />
        </div>
        <DataTable
          columns={columns}
          data={data}
          columnKey={"SkillName"}
          placeholder="Filter Skill..."
        />
      </div>
    </div>
  );
}
