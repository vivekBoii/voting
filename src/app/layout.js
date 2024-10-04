import "./globals.css";

import { VotingProvider } from "../context/voter"; // Import VotingProvider, not VotingContext
import Navbar from "../components/Navbar/Navbar";

export const metadata = {
  title: "Voting Application",
  description: "VivekBoii",
};

export default function RootLayout({ children }) {
  return (
    <VotingProvider> 
      <html lang="en">
        <body>
          <Navbar />
          {children}
        </body>
      </html>
    </VotingProvider>
  );
}
