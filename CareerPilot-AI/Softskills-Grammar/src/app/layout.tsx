import { ThemeWrapper } from "@/components/ThemeWrapper";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CareerPilot AI - Grammar & Q&A',
  description: 'AI-powered grammar checking and question answering platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#1f2937" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col overflow-x-hidden">
        <ThemeWrapper>
          <div className="h-full w-full max-w-full">
            {children}
          </div>
          <Toaster />
        </ThemeWrapper>
      </body>
    </html>
  );
}
