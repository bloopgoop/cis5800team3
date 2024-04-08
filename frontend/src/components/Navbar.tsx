import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import ModeToggle from "./ModeToggle";

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
  return (
    <NavigationMenu className="w-screen max-w-full px-12 py-2 justify-between shadow-sm shadow-border">
      <NavigationMenuList>
        <NavigationMenuItem>
          <CustomLink href="/" className={navigationMenuTriggerStyle()}>
            Barber Shop
          </CustomLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuList>
        <NavigationMenuItem>
          <ModeToggle />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <CustomLink href="/login" className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded">
            Login / Sign Up
          </CustomLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
export default Navbar;
