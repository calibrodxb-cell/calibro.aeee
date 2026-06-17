import "./globals.css";
import CustomCursor from "./Components/CustomCursor";
import { Nunito_Sans } from "next/font/google";

// Load Nunito Sans properly with Next.js font optimization
const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito-sans",
  display: "swap",
});

// Metadata configuration
export const metadata = {
  title: "Custom Furniture Manufacturer in Dubai | Calibro",
  description:
    "Calibro is a custom furniture factory in Dubai serving architects, designers, developers & private clients across the UAE and GCC. From brief to aftercare.",
  alternates: {
    canonical: "https://calibro.ae/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={nunitoSans.variable}>
      <body>
        <CustomCursor />
        <main>{children}</main>
      </body>
    </html>
  );
}