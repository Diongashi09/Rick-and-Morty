// import { Geist, Geist_Mono } from "next/font/google";
// import { LanguageProvider } from "./context/LanguageContext";
import "./globals.css";
// import "@/app/lib/i18n";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "Rick and Morty",
  description: "Rick and Morty App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="bg-gray-900 text-white"
      >
        {/* <LanguageProvider>{children}</LanguageProvider> */}
        {children}
      </body>
    </html>
  );
}
