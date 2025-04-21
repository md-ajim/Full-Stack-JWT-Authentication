"use client";
import { Button } from "@/components/ui/button";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { SunIcon } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import DropdownMenuWithIcon from "@/components/dropdown-menu-02";
import { signOut } from "next-auth/react";

const Navbar02Page = () => {
  const { data: session } = useSession();

  return (
    <div className=" bg-muted">
      <nav className="h-16 bg-background border-b">
        <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 md:px-0 sm:px-6 ">
          <div className="flex items-center gap-8">
            {/* <Logo /> */}

            {/* Desktop Menu */}
            <NavMenu className="hidden md:block" />
          </div>

          <div className="flex items-center gap-3">
            {!session ? (
              <Link href={"/form/login"}>
                <Button variant="outline" className="hidden sm:inline-flex">
                  Sign In
                </Button>
              </Link>
            ) : (
              <DropdownMenuWithIcon />
            )}

            {session ? (
              <Button onClick={() => signOut()}>SignOut</Button>
            ) : (
              <Button>
                {" "}
                <Link href={"/form/signup"}>Sign Up</Link>{" "}
              </Button>
            )}
            <Button size="icon" variant="outline">
              <SunIcon />
            </Button>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar02Page;
