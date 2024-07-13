import { User, columns } from "./columns";
import { DataTable } from "../../../../components/DataTable/DataTable";
import { DeleteUserAlertDialog } from "@/components/User/DeleteUserAlertDialog";
import { ModifyUserDialog } from "@/components/User/ModifyUserDialog";

async function getData(): Promise<User[]> {
  // Fetch data from your API here.
  return [
    {
      Email: "jaaguon@miners.utep.edu",
      Name: "Jordan Aguon",
      Courses: ["CS3331", "CS3432"],
      Role: "Admin",
      DateAdded: new Date("2024-08-06T10:00:00Z"),
    },
    {
      Email: "realemail@miners.utep.edu",
      Name: "Kevin Moreno",
      Courses: ["CS3331"],
      Role: "Teaching Assistant",
      DateAdded: new Date("2024-03-05T10:00:00Z"),
    },
    {
      Email: "fakeemail@miners.utep.edu",
      Name: "Christan Dees",
      Courses: ["CS3432"],
      Role: "Instructional Assistant",
      DateAdded: new Date("2024-04-14T10:00:00Z"),
    },
    {
      Email: "thetestemail@miners.utep.edu",
      Name: "Eric Cartman",
      Courses: ["CS3331", "CS3432", "CS1313"],
      Role: "Student",
      DateAdded: new Date("2024-10-17T10:00:00Z"),
    },
  ];
}

export default async function AdminUsersPage() {
  const data = await getData();

  return (
    <div className="flex mx-20 items-center content-center">
      <div className="flex flex-col">
        <div className="flex flex-col gap-y-2">
          <div className="flex justify-between">
            <DeleteUserAlertDialog />
            <div className="flex gap-x-2">
              <ModifyUserDialog />
            </div>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={data}
          columnKey={"Name"}
          placeholder="Filter Name..."
        />
      </div>
    </div>
  );
}