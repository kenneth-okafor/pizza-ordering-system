import "./globals.css";

export const metadata = {
  title: "Pizza Ordering",
  description: "Online Pizza Ordering System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}