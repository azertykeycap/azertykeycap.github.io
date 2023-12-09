import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Azerty Keycaps - Annuaire de keycaps françaises",
  description:
    "Azertykeycaps est un site communautaire répertoriant les derniers keysets possédant une compatibilité AZERTY (ou ISO-FR) dans le hobby des claviers mécaniques.",
  icons: "/favicon.png",
  openGraph: {
    title: "Azerty Keycaps - Annuaire de keycaps françaises",
    description:
      "Azertykeycaps est un site communautaire répertoriant les derniers keysets possédant une compatibilité AZERTY (ou ISO-FR) dans le hobby des claviers mécaniques.",
    locale: "fr_FR",
    url: "https://azertykeycaps.com",
    images: [
      {
        url: "https://azertykeycaps.com/images/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "Azerty Keycaps - Annuaire de keycaps françaises",
      },
    ],
  },
  twitter: {
    title: "Azerty Keycaps - Annuaire de keycaps françaises",
    description:
      "Azertykeycaps est un site communautaire répertoriant les derniers keysets possédant une compatibilité AZERTY (ou ISO-FR) dans le hobby des claviers mécaniques.",
    site: process.env.NEXT_PUBLIC_SITE_URL,
    card: "summary_large_image",
  },
};

export default async function Home() {
  return (
    <>
      <main></main>
    </>
  );
}
