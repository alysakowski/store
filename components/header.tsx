import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { ShoppingCartIcon } from "lucide-react";
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";
import Link from "next/link";
import Search from "./search";
import { Badge } from "./ui/badge";

const links = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Watches",
    href: "/category/watches",
  },
  {
    label: "Bags",
    href: "/category/bags",
  },
];

export default function Header() {
  return (
    <header className="z-50 py-4 sticky top-0 bg-white/90 backdrop-blur-sm nav-scroll-border">
      <nav className="flex items-center justify-between container max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <Link href="/" passHref>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Acme Store logo"
              viewBox="0 0 32 28"
              className="h-6 w-6 fill-black dark:fill-white"
            >
              <path d="M21.5758 9.75769L16 0L0 28H11.6255L21.5758 9.75769Z"></path>
              <path d="M26.2381 17.9167L20.7382 28H32L26.2381 17.9167Z"></path>
            </svg>
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              {links.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <Link href={link.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex gap-4 items-center">
          <Search />

          <div className="relative">
            <ShoppingCartIcon className="h-6 w-6" />

            <Badge
              variant="default"
              className="absolute -right-4 -top-3 px-1.5 py-0.5 text-xs"
            >
              0
            </Badge>
          </div>
        </div>
      </nav>
    </header>
  );
}
