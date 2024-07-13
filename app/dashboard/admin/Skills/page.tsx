import { Skill, columns } from "./columns";
import { DataTable } from "../../../../components/DataTable/DataTable";
import { CreateSkillDialog } from "@/components/Skills/CreateSkillDialog";
import { DeleteSkillAlertDialog } from "@/components/Skills/DeleteSkillAlertDialog";
import { ModifySkillDialog } from "@/components/Skills/ModifySkillDialog";

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
    {
      SkillID: "3",
      SkillName: "Non-Numeric Representation",
      SkillType: "Quiz/Lab",
      AddedBy: "Christan Dees",
    },
    {
      SkillID: "4",
      SkillName: "Tools",
      SkillType: "Professional",
      AddedBy: "Kevin Moreno",
    },
    {
      SkillID: "5",
      SkillName: "Coaching Preperation",
      SkillType: "Professional",
      AddedBy: "Natasha Rovelli",
    },
    {
      SkillID: "6",
      SkillName: "Linearization",
      SkillType: "Quiz/Lab",
      AddedBy: "Eric Fruedenthal",
    },
    {
      SkillID: "7",
      SkillName: "I/O Address Mapping",
      SkillType: "Quiz/Lab",
      AddedBy: "Eric Fruedenthal",
    },
    {
      SkillID: "8",
      SkillName: "Subroutine Linkage",
      SkillType: "Quiz/Lab",
      AddedBy: "Eric Fruedenthal",
    },
    {
      SkillID: "9",
      SkillName: "State Machines",
      SkillType: "Quiz/Lab",
      AddedBy: "Eric Fruedenthal",
    },
    {
      SkillID: "10",
      SkillName: "Pointer Arithmetric",
      SkillType: "Quiz/Lab",
      AddedBy: "Eric Fruedenthal",
    },
    {
      SkillID: "11",
      SkillName: "Addressing Modes",
      SkillType: "Quiz/Lab",
      AddedBy: "Eric Fruedenthal",
    },
    {
      SkillID: "12",
      SkillName: "Sleep/Wakeup",
      SkillType: "Quiz/Lab",
      AddedBy: "Eric Fruedenthal",
    },
    {
      SkillID: "13",
      SkillName: "Control Flow & Comparison",
      SkillType: "Quiz/Lab",
      AddedBy: "Eric Fruedenthal",
    },
    {
      SkillID: "14",
      SkillName: "Interrupts",
      SkillType: "Quiz/Lab",
      AddedBy: "Eric Fruedenthal",
    },
    {
      SkillID: "15",
      SkillName: "Signed Comparison",
      SkillType: "Quiz/Lab",
      AddedBy: "Eric Fruedenthal",
    },
    {
      SkillID: "16",
      SkillName: "Unsigned Comparison",
      SkillType: "Quiz/Lab",
      AddedBy: "Eric Fruedenthal",
    },
  ];
}

export default async function AdminSkillPage() {
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
