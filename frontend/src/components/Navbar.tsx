import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import ModeToggle from "./ModeToggle";
import AuthContext from "@/context/auth-context";
import { useContext } from "react";

type CustomLinkProps = {
  href: string;
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

const CustomLink = ({ href, children, ...props }: CustomLinkProps) => {
  const location = useLocation();
  const isActive = href === location.pathname;

  return (
    <NavigationMenuLink asChild active={isActive}>
      <Link to={href} className="NavigationMenuLink" {...props}>
        {children}
      </Link>
    </NavigationMenuLink>
  );
};

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <NavigationMenu className="w-screen max-w-full px-12 py-2 justify-between shadow-sm shadow-border">
      <NavigationMenuList>
        <NavigationMenuItem>
          <CustomLink href="/" className={navigationMenuTriggerStyle()}>
            Barber Shop
          </CustomLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuList className="gap-1">
        <NavigationMenuItem>
          <ModeToggle />
        </NavigationMenuItem>
        {user ? (
          <>
            <NavigationMenuItem className="hidden md:block">
              <CustomLink href="/profile" className="">
                {user.email}
              </CustomLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button variant={"ghost"} onClick={logoutUser}>Log Out</Button>
            </NavigationMenuItem>
          </>
        ) : (
          <NavigationMenuItem>
            <CustomLink
              href="/login"
              className="bg-accent text-sm text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded"
            >
              Login / Sign Up
            </CustomLink>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
export default Navbar;
