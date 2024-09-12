import React from "react";
import AssessmentClientPage from "./AssessmentClientPage copy";
import { useUserId } from "@/lib/auth/useUser";
import { auth } from "@/auth";

const AdminAssessmentPage = async () => {
  const userID = await useUserId();
  const session = await auth();

  return <AssessmentClientPage userID={userID as string} session={session} />;
};

export default AdminAssessmentPage;