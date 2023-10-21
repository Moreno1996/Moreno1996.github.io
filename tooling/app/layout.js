import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="antialiased bg-gray-50 dark:bg-gray-900">
          <header>
            <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-wrap justify-between items-center">
                <div className="flex justify-start items-center">
                  <a href="https://flowbite.com" className="flex mr-4">
                    <img
                      src="/next.svg"
                      className="mr-3 h-8"
                      alt="Flowbite Logo"
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                      Moreno
                    </span>
                  </a>
                  
                </div>

              </div>
            </nav>

            </header>
            

         

          <main className="dark:bg-gray-900 flex-1 p-4 space-y-4">{children}</main>
        </div>
      </body>

    </html>
  );
}
