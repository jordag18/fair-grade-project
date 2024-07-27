import React, { ReactNode } from 'react';
import { UserCourseRole } from '@/types';

const allowedRoles = [
  UserCourseRole.Admin,
  UserCourseRole.Instructor,
  UserCourseRole.IA,
  UserCourseRole.TA,
];

function displayIfRole(role: UserCourseRole, component: ReactNode) {
  return allowedRoles.includes(role) ? component : null;
}

export default displayIfRole;
