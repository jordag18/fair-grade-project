import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import { Skill, StudentSkill } from "@/types";

export interface User {
  id: string;
  name: string | null;
  skills: StudentSkill[];
}

export const columns: (skills: Skill[]) => ColumnDef<User>[] = (skills) => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{row.getValue("name")}</div>
    ),
  },
  ...skills.map(skill => ({
    accessorKey: `skills.${skill.SkillID}`,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={skill.SkillName} />
    ),
    cell: ({ row }) => {
      const userSkills = row.original.skills || [];
      const skillData = userSkills.find(s => s.SkillID === skill.SkillID);
      return <div className="w-[50px] text-center">{skillData ? skillData.Score : '-'}</div>;
    },
  })),
];