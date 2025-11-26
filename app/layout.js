import "./globals.css";

export const metadata = {
  title: "Git Documentation",
  description: "Complete Git learning documentation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
