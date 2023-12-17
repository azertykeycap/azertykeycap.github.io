"use client";

import AutoForm from "@/components/ui/auto-form";
import { formSchema } from "@/lib/schemas/forms";
import { cn } from "@/lib/utils";
import { serverAction } from "@/app/actions/contentful";
import { type ClassNameValue } from "tailwind-merge";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import { z } from "zod";

export function SuggestForm({ className }: { className?: ClassNameValue }) {
  const [values, setValues] = useState<Partial<z.infer<typeof formSchema>>>({});
  const { toast } = useToast();

  return (
    <section className={cn(className)}>
      <AutoForm
        formSchema={formSchema}
        onSubmit={async (data) => {
          const res = await serverAction(data);

          if (res.status === 200) {
            setValues({});
            toast({
              title: "Suggestion envoyée !",
              description:
                "Votre suggestion a bien été envoyée, et sera traitée dans les plus brefs délais.",
            });
          }
        }}
        fieldConfig={{
          title: {
            description:
              "Le titre de votre keyset, qui doit faire au minimum 10 caractères.",
          },

          status: {
            fieldType: "select",
            description:
              "Le profil de votre keyset, que nous revérifierons par la suite.",
          },

          material: {
            fieldType: "select",
            description:
              "La matière de votre keyset, que nous revérifierons par la suite.",
          },

          startDate: {
            description: "La date de début du GB, à sélectionner au mois près.",
          },

          endDate: {
            description: "La date de début du GB, à sélectionner au mois près.",
          },

          url: {
            description:
              "Le lien principale vers votre keyset, qui doit être valide et accessible.",
          },

          additionalUrl: {
            description:
              "Le lien secondaire vers votre keyset (ou vers un sous kit de votre set), qui doit être valide et accessible.",
          },

          warningText: {
            fieldType: "textarea",
            description:
              "Un texte d'avertissement, qui doit relever des points que vous jugez importants pour l'acheteur.",
          },

          description: {
            fieldType: "textarea",
            description:
              "Une description facultative de votre keyset, qui peut être la plus complète possible.",
          },

          isNew: {
            fieldType: "switch",
            description:
              "Une nouveauté est un keyset qui a été récemment mise en avant sur le site sur lequel il est vendu (GB ou in-stock).",
          },
        }}
        className="w-full xl:w-1/2"
      >
        <Button type="submit" className="mt-12">
          Envoyez votre suggestion
        </Button>
      </AutoForm>
    </section>
  );
}
