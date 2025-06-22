import "./globals.css";
import { Providers } from "./providers";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";

export const metadata = {
  title: "CareerPilot AI - Your Career Companion",
  description: "AI-powered career guidance and job preparation platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />
      </head>
      <body>
        <Providers>
            <div className="flex flex-col min-h-screen">
              <NavBar />
              <main className="flex-grow">{children}</main>
              <Footer />
              <ChatBot />
            </div>
        </Providers>
      </body>
    </html>
  );
}
