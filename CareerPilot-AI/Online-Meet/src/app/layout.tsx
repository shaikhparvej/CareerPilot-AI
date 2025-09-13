import { ThemeWrapper } from '@/components/ThemeWrapper';
import './globals.css';

export const metadata = {
  title: "CareerPilot AI - Online IDE",
  description: "AI-powered online code editor and execution environment",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#1f2937" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-x-hidden">
        <ThemeWrapper>
          <div className="h-full w-full max-w-full">
            {children}
          </div>
        </ThemeWrapper>
      </body>
    </html>
  )
}
