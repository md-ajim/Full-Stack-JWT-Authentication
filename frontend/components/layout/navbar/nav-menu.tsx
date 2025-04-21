import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
  } from "@/components/ui/navigation-menu";
  import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
  import Link from "next/link";
  
  export const NavMenu = (props: NavigationMenuProps) => (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="http://localhost:3000/dashboard">Dashboard</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>


        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="http://127.0.0.1:8000/admin/">Admin</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>


    


      </NavigationMenuList>
    </NavigationMenu>
  );
  