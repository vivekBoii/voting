import "./globals.css";

export const metadata = {
  title: "Voting Application",
  description: "VivekBoii",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
