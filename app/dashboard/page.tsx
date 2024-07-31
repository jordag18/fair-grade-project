import { getUserRole } from "@/lib/auth/getUserRoleServerAction"
import { redirect } from "next/navigation";



const Dashboard: React.FC = async () => {
    const role = await getUserRole();

    if (role == "Admin") {
        redirect("dashboard/courses");
    }
    else if (role == "Instructor") {
        redirect("dashboard/courses");
    }
    else if (role == "IA" || role == "TA") {
        redirect("dashboard/courses");
    }
    else if (role == "Student") {
        redirect("dashboard/courses")
    }
    else {
        redirect("/")
    }
}

export default Dashboard;