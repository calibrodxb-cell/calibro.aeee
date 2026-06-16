import "../globals.css";
import { Nunito_Sans } from "next/font/google";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "About Calibro | Furniture Factory in Dubai",
  description:
    "Calibro is a Dubai-based custom furniture factory with 18+ years of international manufacturing experience, the UAE and the wider GCC.",
  alternates: {
    canonical: "https://calibro.ae/about",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="font-body">{children}</body>
    </html>
  );
}