import React from "react";
import AuthSessionProvider from "@/SessionProvider";
import NavLinks from "./side-nav-links";

const SideNav = ({ userRole }: { userRole: string }) => {
  return (
    <AuthSessionProvider>
      <div className="flex flex-shrink grow flex-row space-x-2 md:flex-col md:space-x-0 bg-slate-200 w-44 pt-5">
        <NavLinks userRole={userRole}/>
      </div>
    </AuthSessionProvider>
  );
};

export default SideNav;
