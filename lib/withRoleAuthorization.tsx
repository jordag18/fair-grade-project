"use client";

import React, { useEffect, useState } from 'react';
import { getUserRole } from './auth/getUserRoleServerAction';
import UnauthorizedPage from '@/components/UnauthorizedPage';
import { UserCourseRole } from '@/types';
export const withRoleAuthorization = (
  Component: React.ComponentType,
  allowedRoles: string[]
) => {
  return function WrappedComponent(props: any) {
    const [authorized, setAuthorized] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchRole = async () => {
        try {
          const role = await getUserRole();
          setAuthorized(allowedRoles.includes(role as UserCourseRole));
        } catch (error) {
          console.error('Error fetching user role:', error);
          setAuthorized(false);
        } finally {
          setLoading(false);
        }
      };

      fetchRole();
    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (authorized === false) {
      return <UnauthorizedPage />;
    }

    return <Component {...props} />;
  };
};
