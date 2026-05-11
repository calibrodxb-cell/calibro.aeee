import "./globals.css";
import CustomCursor from "./Components/CustomCursor"; // 👈 import added

// Metadata configuration
export const metadata = {
  title: "Best Custom Furniture Providers in Dubai - Calibro",
  description:
    "Calibro offering unparalleled interior design services in Dubai. With attention to detail and creativity, we transform your vision into reality.",
  alternates: {
    canonical: "https://www.calibro.ae/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* 👇 Custom Cursor added here */}
        <CustomCursor />

        <main>{children}</main>
      </body>
    </html>
  );
}