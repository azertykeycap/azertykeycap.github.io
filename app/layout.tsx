import "./globals.css";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Navbar } from "@/components/navigation/navbar";
import {
  getArticles,
  getNavigationLinks,
  getRandomOgApiImg,
  getSocialLinksEntries,
} from "@/lib/api/contentful";
import Link from "next/link";
import Icon from "@/components/core/icon";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
import { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({}) {
  const randomOgApi = await getRandomOgApiImg();

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
    title: "Azertykeycaps - Annuaire de keycaps françaises",
    description:
      "Azertykeycaps est un site communautaire répertoriant les derniers keysets possédant une compatibilité AZERTY (ou ISO-FR) dans le hobby des claviers mécaniques.",
    openGraph: {
      title: "Azertykeycaps - Annuaire de keycaps françaises",
      description:
        "Azertykeycaps est un site communautaire répertoriant les derniers keysets possédant une compatibilité AZERTY (ou ISO-FR) dans le hobby des claviers mécaniques.",
      locale: "fr_FR",
      type: "website",
      images: [
        {
          url: `/og?imgUrl=${randomOgApi}`,
          width: 1200,
          height: 630,
          alt: "Azertykeycaps - Annuaire de keycaps françaises",
        },
      ],
    },
    generator: "Next.js",
    applicationName: "Azertykeycaps",
    referrer: "origin-when-cross-origin",
    keywords: ["Next.js", "React", "JavaScript"],
    creator: "Théo Senoussaoui",
    publisher: "Plaketdebeur",
    icons: "/favicon.png",
    twitter: {
      title: "Azertykeycaps - Annuaire de keycaps françaises",
      description:
        "Azertykeycaps est un site communautaire répertoriant les derniers keysets possédant une compatibilité AZERTY (ou ISO-FR) dans le hobby des claviers mécaniques.",
      card: "summary_large_image",
      creator: "@theosenoussaoui",
      creatorId: "1294263126481874944",
      images: `${process.env.NEXT_PUBLIC_URL}/og?imgUrl=${randomOgApi}`,
      app: {
        name: "twitter_app",
        id: {
          iphone: "twitter_app://iphone",
          ipad: "twitter_app://ipad",
          googleplay: "twitter_app://googleplay",
        },
        url: {
          iphone: "https://iphone_url",
          ipad: "https://ipad_url",
        },
      },
    },
  };
}

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
      </body>
      {process.env.NODE_ENV === "production" && (
        <Script
          async
          src="https://analytics.azertykeycaps.fr/script.js"
          data-website-id="767b5e54-5d36-4f30-b703-9f42086dfbc7"
        />
      )}
    </html>
  );
}
