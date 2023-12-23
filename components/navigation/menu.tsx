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
import Image from "next/image";

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
  icon?: string;
}

const ListItem: React.ForwardRefRenderFunction<
  HTMLAnchorElement,
  ListItemProps
> = ({ className, title, children, icon, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        className={cn(
          "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/60 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-x-3">
          {icon && (
            <div className="flex-shrink-0 bg-secondary p-3 rounded-md">
              <Image
                src={`/profiles/${icon}.svg`}
                alt={title}
                width={32}
                height={32}
              />
            </div>
          )}
          <div className="space-y-1.5">
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </div>
        </div>
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
      <NavigationMenuList className="space-x-0">
        {Object.entries(links).map(([link, subLinks]) => (
          <NavigationMenuItem key={link}>
            <NavigationMenuTrigger>{link}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[360px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[650px]">
                {(subLinks as NavigationLinksInterface[]).map((subLink) => (
                  <ListItem
                    key={subLink.title}
                    title={subLink.title}
                    icon={subLink.navbarIconName}
                    href={`/profil/${subLink.slug}`}
                  >
                    {subLink.navbarDescription}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Dropshipping</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem
                title={"Tous les sites de dropshipping"}
                href={`/dropshipping/sites`}
              >
                Voir la liste de tous les sites de dropshipping connus.
              </ListItem>
              <ListItem
                title={"Reconnaître un site de dropshipping"}
                href={`/dropshipping/howto`}
              >
                Comment repérer un site de dropshipping ?
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
