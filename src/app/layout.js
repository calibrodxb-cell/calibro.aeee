import "./globals.css";
import CustomCursor from "./Components/CustomCursor"; // 👈 import added

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
    <html lang="en">
      <body>
        {/* 👇 Custom Cursor added here */}
        <CustomCursor />

        <main>{children}</main>
      </body>
    </html>
  );
}