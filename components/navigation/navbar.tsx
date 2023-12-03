import * as React from "react";
import { ModeToggle } from "../theme/mode-toggle";
import { NavigationMenuDemo } from "./menu";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center gap-4">
        <NavigationMenuDemo />
        <ModeToggle />
      </div>
    </nav>
  );
}
