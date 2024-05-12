"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa";

const NavBar = () => {
  const path = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex gap-5 h-14 items-center border-b mb-4 pl-5">
      <h3>
        <Link href="/">
          <FaBug />
        </Link>
      </h3>
      <ul className="flex gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={classNames({ "text-zinc-900": link.href === path,
                'text-zinc-500':link.href!==path,
                ' hover:text-zinc-800 transition-colors':true
             })}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
