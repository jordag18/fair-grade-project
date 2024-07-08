"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  {
    name: "Courses",
    href: "/dashboard/admin/Courses",
  },
  {
    name: "Skills",
    href: "/dashboard/admin/Skills",
  },
  {
    name: "Assessments",
    href: "/dashboard/admin/Assessments",
  },
  {
    name: "Users",
    href: "/dashboard/admin/Users",
  },
  {
    name: "Overview",
    href: "/dashboard/admin/Overview",
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[64px] grow items-center justify-center bg-slate-200 p-3 text-lg font-semibold hover:bg-slate-400 hover:border-black hover:border-2 hover:border-opacity-20 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-slate-400 text-white drop-shadow-2xl border-2 border-black border-opacity-20": pathname === link.href,
              }
            )}
          >
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
