import { ClientThemeProvider } from '@/components/ClientThemeProvider';
import Footer from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { ClerkProvider } from '@clerk/nextjs';
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk Publishable Key');
}

export const metadata = {
  title: "CareerPilot AI",
  description: "Your AI-powered career preparation and interview platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#1f2937" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={`${geistSans.variable} font-sans h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-x-hidden`}>
        <ClientThemeProvider>
          <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <div className="min-h-full bg-inherit flex flex-col w-full max-w-full">
              <Navbar />
              <main className="flex-1 bg-inherit w-full px-2 sm:px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto w-full">
                  {children}
                </div>
              </main>
              <Footer />
            </div>
          </ClerkProvider>
        </ClientThemeProvider>
      </body>
    </html>
  );
}
