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
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

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
      {process.env.NODE_ENV === "production" &&
        process.env.NEXT_PUBLIC_SITE_URL === "https://azertykeycaps.fr" && (
          <Script
            async
            src="https://analytics.azertykeycaps.fr/script.js"
            data-website-id="767b5e54-5d36-4f30-b703-9f42086dfbc7"
          />
        )}
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
                <Link
                  href="https://github.com/theosenoussaoui"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline underline-offset-4"
                >
                  @theosenoussaoui
                </Link>{" "}
                &{" "}
                <Link
                  href="https://twitter.com/hegoom"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline underline-offset-4"
                >
                  @plaketdebeur
                </Link>
              </p>
              {socialLinks && (
                <div className="flex items-center gap-1 md:flex-row flex-col md:gap-0">
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
          <Toaster
            richColors
            position="top-center"
            toastOptions={{
              className: "font-sans",
            }}
          />
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
