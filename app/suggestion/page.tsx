import * as React from "react";
import { SuggestForm } from "@/components/forms/suggest-form";
import { TypographyH1 } from "@/components/core/typography/h1";
import { TypographyP } from "@/components/core/typography/p";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import { getRandomOgApiImg } from "@/lib/api/contentful";

export async function generateMetadata({}) {
  const randomOgApi = await getRandomOgApiImg();

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
    title: "Azertykeycaps - Suggestion",
    description:
      "Vous avez un keyset en tête qui n&apos;est pas présent sur le site ? Vous pouvez le suggérer ici.",
    openGraph: {
      title: "Azertykeycaps - Suggestion",
      description:
        "Vous avez un keyset en tête qui n&apos;est pas présent sur le site ? Vous pouvez le suggérer ici.",
      images: [
        {
          url: `/og?imgUrl=${randomOgApi}&title=Suggestion d'un keyset`,
          width: 1200,
          height: 630,
          alt: "Azertykeycaps - Suggestion",
        },
      ],
    },
    twitter: {
      title: "Azertykeycaps - Suggestion",
      description:
        "Informations techniques générales concernant le site Azertykeycaps.",
      images: `${process.env.NEXT_PUBLIC_URL}/og?imgUrl=${randomOgApi}&title=Suggestion d'un keyset`,
      card: "summary_large_image",
      creator: "@theosenoussaoui",
      creatorId: "1294263126481874944",
    },
  };
}

export default async function Informations() {
  return (
    <main className="container my-12">
      <TypographyH1>Suggérez un keyset !</TypographyH1>
      <TypographyP>
        Vous avez un keyset en tête qui n&apos;est pas présent sur le site ?
        Vous pouvez le suggérer ici, et nous l&apos;ajouterons si il correspond
        aux critères de sélection.
      </TypographyP>
      <ReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      >
        <SuggestForm className="mt-16" />
      </ReCaptchaProvider>
    </main>
  );
}
