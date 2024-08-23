"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const moderatorLinks = [
  { name: "Courses", href: "/dashboard/courses" },
  { name: "Skills", href: "/dashboard/skills" },
  { name: "Instruments", href: "/dashboard/instruments" },
  { name: "Assessments", href: "/dashboard/assessments" },
  { name: "Users", href: "/dashboard/users" },
  { name: "Overview", href: "/dashboard/overview" },
];

const studentLinks = [
  { name: "Courses", href: "/dashboard/courses" },
  { name: "Instruments", href: "/dashboard/instruments" },
  { name: "Skills", href: "/dashboard/skills" },
  { name: "Assessments", href: "/dashboard/assessments" },
];

const NavLinks = ({ userRole }: { userRole: string }) => {
  const pathname = usePathname();
  let links;

  switch (userRole) {
    case "Admin":
      links = moderatorLinks;
      break;
    case "Instructor":
      links = moderatorLinks;
      break;
    case "TA":
      links = moderatorLinks;
      break;
    case "IA":
      links = moderatorLinks;
      break;
    default:
      links = studentLinks;
      break;
  }

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={clsx(
            "flex h-[64px] grow items-center justify-center bg-slate-200 p-3 text-lg font-semibold hover:bg-slate-400 hover:border-black hover:border-2 hover:border-opacity-20 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3",
            {
              "bg-slate-400 text-white drop-shadow-2xl border-2 border-black border-opacity-20":
                pathname === link.href,
            }
          )}
        >
          <p className="hidden md:block">{link.name}</p>
        </Link>
      ))}
    </>
  );
};

export default NavLinks;
