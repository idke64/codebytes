import "./globals.css";
import {
  Source_Sans_3,
  Montserrat,
  Assistant,
  Barlow,
  Rubik,
  Carme,
  Raleway,
  Inter,
  Modern_Antiqua,
  Heebo,
  Ubuntu,
  Fira_Sans_Extra_Condensed,
  Helvetica,
  Roboto,
} from "next/font/google";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/context/AuthContext";
import LoadingProvider from "@/context/LoadingContext";
import Footer from "@/components/Footer";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

const font = Barlow({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "CodeBytes",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  description:
    "CodeBytes is a student-run programming competition with the goal of spreading computer science education through a variety of engaging, insightful coding events.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="all" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={font.className}>
        <AuthProvider>
          <LoadingProvider>
            <Navbar />
            {children}
            <Footer />
          </LoadingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
