"use client";
import * as React from "react";
import Link from "next/link";
import { HomeIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuButton,
  navigationMenuButtonStyle,
} from "@/components/ui/navigation-menu";


// Komponen untuk menu Komunitas
const components: { title: string; href: string; description: string }[] = [
  {
    title: "Forum MiAceh",
    href: "/komunitas/1",
    description: "Apa saja yang ada di MiAceh",
  },
  {
    title: "Percakapan",
    href: "/komunitas/2",
    description: "Ngobrol dengan sesama pengguna",
  },
  {
    title: "Pembaruan",
    href: "/komunitas/3",
    description: "Apa saja yang diubah",
  },
];

function DesktopNavbar() {
  return (
    <div className="md:block">
      <NavigationMenu viewport={false}>
        <NavigationMenuList >
          <NavigationMenuItem>
            
            </NavigationMenuItem>
<NavigationMenuItem>
  <NavigationMenuButton asChild>
    <Link 
      href="/" 
      className={cn(
        navigationMenuButtonStyle(),
        "flex items-center gap-2"
      )}
    >
      <HomeIcon className="w-4 h-4" /> 
      <span>Home</span>
    </Link>
  </NavigationMenuButton>
</NavigationMenuItem>
          
<NavigationMenuItem>
            <NavigationMenuTrigger><a href="/komunitas">Komunitas</a></NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-2 md:w-[400px] md:grid-cols-1 lg:w-[300px]">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
  <NavigationMenuButton asChild>
    <Link 
      href="/e-learning" 
      className={cn(
        navigationMenuButtonStyle(),
        "flex items-center gap-2"
      )}
    >
      
      <span>Kelas</span>
    </Link>
  </NavigationMenuButton>
</NavigationMenuItem>

        </NavigationMenuList>

      </NavigationMenu>
    </div>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default DesktopNavbar;
