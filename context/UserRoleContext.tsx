"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getUserRole } from "@/lib/auth/getUserRoleServerAction";
import { UserCourseRole } from "@/types";

interface UserRoleContextType {
  role: string | null;
  setRole: (role: string) => void;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(
  undefined
);

export const UserRoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchRole = async () => {
      const userRole = await getUserRole();
      setRole(userRole as UserCourseRole);
    };

    fetchRole();
  }, []);

  return (
    <UserRoleContext.Provider value={{ role, setRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => {
  const context = useContext(UserRoleContext);
  if (context === undefined) {
    throw new Error("useUserRole must be used within a UserRoleProvider");
  }
  return context;
};
