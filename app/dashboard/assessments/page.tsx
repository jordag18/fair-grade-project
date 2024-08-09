import React from "react";
import AssessmentClientPage from "./AssessmentClientPage";
import { useUserId } from "@/lib/auth/useUser";

const AdminAssessmentPage = async () => {
  const userID = await useUserId();
  const courseID = "example-course-id"; // Replace with the actual course ID or fetch it as needed

  return <AssessmentClientPage userID={userID} />;
};

export default AdminAssessmentPage;