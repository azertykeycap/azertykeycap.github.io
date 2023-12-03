import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  NavigationLinksInterface,
  ShapedNavigationLinksInterface,
} from "@/lib/api/contentful";

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
}

const ListItem: React.ForwardRefRenderFunction<
  HTMLAnchorElement,
  ListItemProps
> = ({ className, title, children, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </a>
    </NavigationMenuLink>
  </li>
);

ListItem.displayName = "ListItem";

export function NavigationMenuNavbar({
  links,
}: {
  links: ShapedNavigationLinksInterface;
}) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {Object.entries(links).map(([link, subLinks]) => (
          <NavigationMenuItem key={link}>
            <NavigationMenuTrigger>
              {link === "uniform" ? "Uniforme" : "Sculpté"}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {(subLinks as NavigationLinksInterface[]).map((subLink) => (
                  <ListItem
                    key={subLink.title}
                    title={subLink.title}
                    href={`/profil/${subLink.slug}`}
                  >
                    {subLink.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
