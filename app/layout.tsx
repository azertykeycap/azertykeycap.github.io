import "./globals.css";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Navbar } from "@/components/navigation/navbar";
import {
  getArticles,
  getNavigationLinks,
  getSocialLinksEntries,
} from "@/lib/api/contentful";
import Link from "next/link";
import Icon from "@/components/core/icon";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { SpeedInsights } from "@vercel/speed-insights/next";

async function getData() {
  const navigationLinks = await getNavigationLinks();
  const articles = await getArticles();
  const socialLinks = await getSocialLinksEntries();

  return { navigationLinks, articles, socialLinks };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { navigationLinks, articles, socialLinks } = await getData();

  return (
    <html className={`${GeistSans.variable} ${GeistMono.variable}`} lang="fr">
      <body className="min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar links={navigationLinks} articles={articles} />
          {children}
          <footer className="py-6 md:px-8 md:py-0 border-t mt-auto">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                Construit par{" "}
                <a
                  href="https://github.com/theosenoussaoui"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline underline-offset-4"
                >
                  @theosenoussaoui
                </a>
              </p>
              {socialLinks && (
                <div className="flex items-center gap-2 md:flex-row flex-col">
                  {socialLinks.map((socialLink) => (
                    <Link
                      key={socialLink.url}
                      href={socialLink.url}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "gap-x-2 text-sm leading-loose text-muted-foreground"
                      )}
                    >
                      <Icon name={socialLink.iconText} width={16} height={16} />
                      {socialLink.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </footer>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
