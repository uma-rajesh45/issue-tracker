"use client";
import { Box, Container, Flex } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa";

const NavBar = () => {
  const { status, data: session } = useSession();
  const path = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="border-b mb-5 pb-5 pt-5 pl-5 pr-5">
      <Container>
      <Flex justify="between">
        <Flex gap='3' align='center'>
          <h3>
            <Link href="/">
              <FaBug />
            </Link>
          </h3>
          <ul className="flex gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={classNames({
                    "text-zinc-900": link.href === path,
                    "text-zinc-500": link.href !== path,
                    " hover:text-zinc-800 transition-colors": true,
                  })}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Flex>
        <Box>
          {status === "authenticated" && (
            <Link href="/api/auth/signout">Logout</Link>
          )}
          {status === "unauthenticated" && (
            <Link href="/api/auth/signin">Login</Link>
          )}
        </Box>
      </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
