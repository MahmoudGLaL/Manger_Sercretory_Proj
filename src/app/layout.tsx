import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css';
// import { Provider } from "react-redux";
// import { store } from "./Utils/Redux/store";
import { WebSocketProvider } from "./context/WebSocketContext";

const poppins = Poppins({
  subsets: ["latin-ext"],
  weight: ["500", "600"],
  display: "swap", // Ensures smooth fallback
  fallback: ["Arial", "sans-serif"], // Local fallback fonts
});

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// const FontInter = localFont({
//   src: "./fonts/Inter_18pt-Bold.ttf",
//   variable: "--font-Inter-bold",
//   weight: "100 900",
// });


export const metadata: Metadata = {
  title: "Meeting App",
  description: "Meeting app for Manger ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ${poppins.className}
  return (
    <html lang="en">
      <body
        className={` ${poppins.className} antialiased`}
      >
        <WebSocketProvider>
          {children}
        </WebSocketProvider>
      </body>
    </html>
  );
}
