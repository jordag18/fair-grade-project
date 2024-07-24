"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "../../../../components/DataTable/DataTable";
import { useCourse } from "@/context/CourseContext";
import { fetchUsersByCourseAndRole } from "@/components/User/UserServerActions";
import { columns } from "./columns";
import { User } from "@/types";

const UserClientPage = () => {
  const { selectedCourse } = useCourse();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedCourse) {
      fetchUsersByCourseAndRole(selectedCourse.CourseID, "Student").then(
        (data) => {
          if (data.success && data.users) {
            console.log("User Data: ", data.users);
            setUsers(data.users);
          } else {
            console.error("Failed to fetch users:", data.error);
          }
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }
  }, [selectedCourse]);

  const refreshUsers = () => {
    if (selectedCourse) {
      fetchUsersByCourseAndRole(selectedCourse.CourseID, "Student").then(
        (data) => {
          if (data.success && data.users) {
            setUsers(data.users);
          } else {
            console.error("Failed to refresh users:", data.error);
          }
        }
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!selectedCourse) {
    return <div>Please select a course to view its users.</div>;
  }

  return (
    <div className="flex mx-20 items-center content-center">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex justify-between"></div>
        <div className="overflow-auto max-h-screen">
          <DataTable
            columns={columns({ refreshUsers })}
            data={users}
            columnKey={"name"}
            placeholder="Filter Users..."
          />
        </div>
      </div>
    </div>
  );
};

export default UserClientPage;
