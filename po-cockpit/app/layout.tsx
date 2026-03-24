import "./globals.css";

export const metadata = {
  title: "PO Cockpit",
  description: "PO Cockpit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}