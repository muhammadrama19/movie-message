import "./globals.css";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="w-full overflow-x-hidden">
      <body className="bg-gray-50 antialiased w-full">
        <header className="bg-white shadow-md sticky top-0 z-10 w-full">
          <div className="w-full px-4 py-4 flex items-center justify-between">
            {/* Adjust font size for "Movie-Menfess" dynamically */}
            <a
              href="/"
              className="text-xl sm:text-2xl md:text-lg font-bold text-gray-900"
            >
              Movie-Menfess
            </a>
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-4">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/browse"
                    className="hover:text-gray-600"
                  >
                    Browse Menfess
                  </NavigationMenuLink>
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
        <main className="w-full px-4 py-6 mt-[75rem] mb-[20rem] sm:mt-[40rem] mb-[5rem]">
          {children}
        </main>
      </body>
    </html>
  );
}