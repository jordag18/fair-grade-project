
import { DeleteSkillAlertDialog } from "@/components/Skills/DeleteSkillAlertDialog";
import { CreateSkillDialog } from "@/components/Skills/CreateSkillDialog";
import { ModifySkillDialog } from "@/components/Skills/ModifySkillDialog";
import { DataTable } from "@/components/DataTable/DataTable";
import { Assessment, columns } from "./columns";

async function getData(): Promise<Assessment[]> {
  // Fetch data from your API here.
  return [
    {
      CoachName: "Jordan Aguon",
      StudentName: "Eric Cartman",
      Comment: "This is the comment test",
      Instrument: "Coaching Session",
      DateCreated: new Date("2024-08-02T10:00:00Z"),

    },
    {
      CoachName: "Jordan Aguon",
      StudentName: "Stan Marsh",
      Comment: "This is the comment test 2",
      Instrument: "Quiz",
      DateCreated: new Date("2024-09-02T10:00:00Z"),

    },
    {
      CoachName: "Kevin Moreno",
      StudentName: "Kyle Broflowski",
      Comment: "This is the comment test 3",
      Instrument: "Lab 1",
      DateCreated: new Date("2024-09-03T10:00:00Z"),

    },

  ];
}

export default async function AdminAssessmentPage() {
  const data = await getData();

  return (
    <div className="flex mx-20 items-center content-center">
      <div className="flex flex-col">
        <div className="flex flex-col gap-y-2">
          <div className="flex justify-between">
            <DeleteSkillAlertDialog />
            <div className="flex gap-x-2">
              <CreateSkillDialog />
              <ModifySkillDialog />
            </div>
          </div>
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
