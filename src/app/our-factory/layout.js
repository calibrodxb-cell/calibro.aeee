import "../globals.css";
import { Nunito_Sans } from "next/font/google";

export const metadata = {
  title: "Furniture Factory in Dubai | Joinery, Metal & Upholstery | Calibro",
  description:
    "Inside Calibro's Dubai furniture factory: woodworks, joinery, metalworks, fabrication, upholstery and custom finishing, all under one roof. Visit Us.",

  alternates: {
    canonical: "https://calibro.ae/our-factory",
  },
};

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="font-body">{children}</body>
    </html>
  );
}