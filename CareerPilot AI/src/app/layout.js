import "./globals.css";
import { Providers } from "./providers";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import { ThemeToggle } from "./components/ThemeToggle";
import { ThemeProvider } from "./components/ThemeContext";

export const metadata = {
  title: "CareerPilot AI - Your Career Companion",
  description: "AI-powered career guidance and job preparation platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <ThemeProvider>
            <div className="flex flex-col min-h-screen">
              <NavBar />
              <main className="flex-grow">{children}</main>
              <Footer />
              <ChatBot />
              <div className="fixed bottom-6 left-6 z-50">
                <ThemeToggle />
              </div>
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
