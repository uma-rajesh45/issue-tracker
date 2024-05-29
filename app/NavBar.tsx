"use client";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 pb-5 pt-5">
      <Container>
        <Flex justify="between">
          <Flex gap="3" align="center">
            <h3>
              <Link href="/">
                <FaBug />
              </Link>
            </h3>
            <NavLinks/>
          </Flex>
          <AuthStatus/>
        </Flex>
      </Container>
    </nav>
  );
};
const NavLinks = () => {
  const path = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <ul className="flex gap-4">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classNames({
              'nav-link':true,
              "!text-zinc-900": link.href === path,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};
const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === "loading") return null;
  if (status === "unauthenticated")
    return <Link href="/api/auth/signin" className="nav-link">Login</Link>;

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content side="left">
          <DropdownMenu.Label>
            <Text size="2" weight="bold">
              {session!.user!.email}
            </Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item className="cursor-pointer">
            <Link href="/api/auth/signout">Logout</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
