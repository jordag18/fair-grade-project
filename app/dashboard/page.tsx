import { getUserRole } from "@/lib/auth/getUserRoleServerAction"
import { redirect } from "next/navigation";


const Dashboard: React.FC = async () => {
    const role = await getUserRole();

    if (role == "Admin") {
        redirect("dashboard/admin/Courses");
    }
    else if (role == "Instructor") {
        redirect("dashboard/instructor/Courses");
    }
    else if (role == "IA" || role == "TA") {
        redirect("dashboard/ia/Courses");
    }
    else if (role == "Student") {
        redirect("dashboard/student/Courses")
    }
    else {
        redirect("localhost:3000")
    }
}

export default Dashboard;