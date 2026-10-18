import type { Metadata } from "next";
import "./globals.css";
import "./theme.css";
import "./refinement.css";
import "./mock-tests.css";
import ThemeToggle from "@/components/ThemeToggle";
export const metadata: Metadata = {
  title: "GNOSIS — Understand a little deeper.",
  description:
    "A calm learning workspace. Watch, understand, practice, and make knowledge your own.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{document.documentElement.dataset.theme=localStorage.getItem('gnosis:theme')==='dark'?'dark':'light'}catch{document.documentElement.dataset.theme='light'}",
          }}
        />
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
