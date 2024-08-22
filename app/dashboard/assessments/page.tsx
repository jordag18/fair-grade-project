import React from "react";
import AssessmentClientPage from "./AssessmentClientPage";
import { useUserId } from "@/lib/auth/useUser";

const AdminAssessmentPage = async () => {
  const userID = await useUserId();

  return <AssessmentClientPage userID={userID} />;
};

export default AdminAssessmentPage;