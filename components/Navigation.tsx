"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const converters: { title: string; href: string; description: string }[] = [
  {
    title: "Markdown to PDF",
    href: "/mdToPdf",
    description:
      "markdown to PDF with a single click.",
  },
  {
    title: "Markdown to JPG",
    href: "/mdToJpg",
    description:
      "markdown to JPG with a single click.",
  },
  {
    title: "Markdown to PNG",
    href: "/mdToPng",
    description:
      "markdown to PNG with a single click.",
  },
  {
    title: "Markdown to HTML",
    href: "/mdToHtml",
    description:
      "markdown to HTML with a single click.",
  },
  {
    title: "Markdown to CSV",
    href: "/mdToCsv",
    description:
      "markdown to CSV with a single click.",
  },
  {
    title: "Markdown to RST",
    href: "/mdToRst",
    description:
      "markdown to RST with a single click.",
  },
]

export function Navigation() {

const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    document.documentElement.classList.toggle('dark', storedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <button
            onClick={toggleTheme}
            className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-md text-gray-800 dark:text-gray-200"
          >
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
      </div>
      </NavigationMenuList>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Converters</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[100px] gap-3 p-4 md:w-[200px] md:grid-cols-2 lg:w-[300px] ">
              {converters.map((converter) => (
                <ListItem
                  key={converter.title}
                  title={converter.title}
                  href={converter.href}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1 p-2 md:w-[300px] lg:w-[400px] lg:grid-cols-[1fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/combineMarkdown"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Combine Markdowns
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Combine multiple markdown files into one. Useful for creating a single markdown file from multiple files.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/splitMarkdown" title="Split Markdown" />
              <ListItem href="/generateLink" title="Generate Link" />
              <ListItem href="/generateTable" title="Generate Table" />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/aboutus" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              About Us
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={props.href ? props.href : "/"}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
