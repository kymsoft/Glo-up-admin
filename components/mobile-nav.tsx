"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { TornadoIcon } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";

export function MobileNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Overview",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboard",
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "Sizes",
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/colors`,
      label: "Colors",
      active: pathname === `/${params.storeId}/colors`,
    },
    {
      href: `/${params.storeId}/products`,
      label: "Products",
      active: pathname === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Orders",
      active: pathname === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
        variant="outline"
        onClick={() => setOpen((prev) => !prev)}
        className={cn("absolute right-4 top-4", className)}
      >
        <TornadoIcon />
      </Button>
        </DropdownMenuTrigger>
      
      {open && (
        <DropdownMenuContent
          className={cn(
            "rounded-md p-8 bg-[#f6f6f6]",
            className
          )}
        >
          {routes.map((route) => (
            <div key={route.href} className="py-1">
              <Link
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  route.active
                    ? "text-black dark:text-white"
                    : "text-muted-foreground"
                )}
              >
                {route.label}
              </Link>
            </div>
          ))}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
