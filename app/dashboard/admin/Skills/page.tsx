import { Skill, columns } from "./columns";
import { DataTable } from "../../../../components/DataTable/DataTable";
import { CreateSkillDialog } from "@/components/Skills/CreateSkillDialog";


async function getData(): Promise<Skill[]> {
  // Fetch data from your API here.
  return [
    {
      SkillID: "1",
      SkillName: "Integer Representation",
      SkillType: "Quiz/Lab",
      AddedBy: "Eric Fruedenthal",
    },
    {
      SkillID: "2",
      SkillName: "Bitwise/Bitfield",
      SkillType: "Quiz/Lab",
      AddedBy: "Jordan Aguon",
    },
  ];
}

export default async function AdminSkillPage() {
  const data = await getData();

  return (
    <div className="flex mx-20 items-center content-center">
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between">
          <div className="flex gap-x-2">
              <CreateSkillDialog />
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
