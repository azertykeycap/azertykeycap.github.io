import { TypographyH1 } from "@/components/core/typography/h1";
import { TypographyP } from "@/components/core/typography/p";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container my-32">
      <div className="space-y-4">
        <TypographyH1>
          <span className="text-primary">Quatre cent quatre</span> - pas trouvé.
        </TypographyH1>
        <TypographyP>
          Impossible de trouver la ressource que vous recherchiez, merci de
          réessayer.
        </TypographyP>
      </div>
      <Link
        href="/"
        className={cn(buttonVariants({ variant: "secondary" }), "mt-8")}
      >
        Retour à la maison
      </Link>
    </main>
  );
}
