import "./globals.css";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Navbar } from "@/components/navigation/navbar";
import { getArticles, getNavigationLinks } from "@/lib/api/contentful";
import { group } from "radash";

async function getData() {
  const navigationLinks = await getNavigationLinks();
  const articles = await getArticles();

  return { navigationLinks, articles };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { navigationLinks, articles } = await getData();

  return (
    <html className={`${GeistSans.variable} ${GeistMono.variable}`} lang="fr">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar links={navigationLinks} articles={articles} />
          {children}
          <footer className="py-6 md:px-8 md:py-0 border-t">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built by{" "}
                <a
                  href="https://twitter.com/shadcn"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline underline-offset-4"
                >
                  @theosenoussaoui
                </a>
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
