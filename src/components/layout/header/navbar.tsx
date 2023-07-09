"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "~/hooks/use-scroll";
import { cn } from "~/lib/utils";
import { type CurrentUser } from "~/types";
import ThemeToggle from "../../shared/theme-toggle";
import UserNav from "../user-nav";
import { buttonVariants } from "~/components/ui/button";
import { usePathname, useSearchParams } from "next/navigation";

export default function Navbar({ currentUser }: { currentUser: CurrentUser }) {
  const scrolled = useScroll(50);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const callbackUrl = `${pathname}?${searchParams.toString()}`;

  return (
    <header
      className={cn(
        "sticky top-0 z-30  w-full bg-transparent ",
        scrolled
          ? " h-16 border-b backdrop-blur-xl  transition-all duration-300 ease-in-out"
          : " h-20"
      )}
    >
      <div className="container h-full">
        <div className="flex h-full  items-center justify-between">
          <Link href="/" className="flex items-center text-2xl font-bold">
            <Image
              src="/chad-next.png"
              alt="ChadNext logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm object-contain"
            />
            <p>ChadNext</p>
          </Link>
          <div className=" flex items-center gap-x-2">
            <ThemeToggle />
            {currentUser ? (
              <UserNav user={currentUser} />
            ) : (
              <Link
                href={{
                  pathname: `/signin`,
                  query: { callbackUrl },
                }}
                className={buttonVariants()}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
