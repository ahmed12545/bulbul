import "./globals.css";

export const metadata = {
  title: "Bulbul",
  description: "Language adaptive learning platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
