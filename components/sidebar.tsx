import React from "react";
import NavLinks from "./side-nav-links";

export default function SideNav() {
  return (
      <div className="flex flex-shrink grow flex-row space-x-2 md:flex-col md:space-x-0 bg-slate-200 w-44 pt-5">
        <NavLinks />
      </div>
  );
}
