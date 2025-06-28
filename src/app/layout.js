import "./globals.css";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Movie-Menfess",
  description: "Share messages about your favorite movies",
  icons: {
    icon: "/movie-icon-bw.svg",
    shortcut: "/movie-icon-bw.svg",
    apple: "/movie-icon-bw.svg",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/movie-icon-bw.svg",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="w-full overflow-x-hidden">
      <body className="bg-gray-50 antialiased w-full">
        <header className="bg-white shadow-md top-0 z-10 w-full">
          <div className="w-full px-4 py-4 flex items-center justify-between gap-2">
            <Link
              href="/"
              className="text-xl sm:text-2xl md:text-lg font-bold text-gray-900"
            >
              Movie-Menfess
            </Link>
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-4">
                {/* Dropdown for Browse Menfess */}
                <NavigationMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="hover:text-gray-600">
                      Browse
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48">
                      <DropdownMenuItem asChild>
                        <Link href="/menfess_browse">Browse Menfess</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/movie_browse">Browse Movies</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/send"
                    className="hover:text-gray-600"
                  >
                    Send Menfess
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/about"
                    className="hover:text-gray-600"
                  >
                    About Us
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </header>
        <main className="w-full px-4 py-6">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}