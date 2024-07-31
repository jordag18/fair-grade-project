import React from 'react';
import UserClientPage from "./UserClientPage";
import { getUserRole } from '@/lib/auth/getUserRoleServerAction';
import { UserCourseRole } from '@/types';
import { redirect } from 'next/navigation';

export default async function UserPage() {
    const role = await getUserRole();

    if (!role) {
        return <div>Loading...</div>;
    }

    if (role === UserCourseRole.Admin || role === UserCourseRole.Instructor || role === UserCourseRole.IA || role === UserCourseRole.TA) {
        return <UserClientPage />;
    }
    else {
        redirect("/dashboard/courses")
    }
}