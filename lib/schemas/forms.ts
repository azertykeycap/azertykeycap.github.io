import { z } from "zod";
import { statusList, materialList } from "../utils";

export const formSchema = z.object({
  title: z
    .string({
      required_error: "Veuillez indiquer un titre pour votre keyset.",
    })
    .describe("Nom :")
    .min(10, {
      message: "Le titre doit faire au minimum 10 caractères.",
    }),

  status: z
    .enum(statusList as [string], {
      required_error: "Veuillez indiquer le statut de vente de votre keyset.",
    })
    .describe("Statut :"),

  material: z
    .enum(materialList as [string], {
      required_error:
        "Veuillez indiquer la matière utilisée pour votre keyset.",
    })
    .describe("Matière :"),

  description: z.string().describe("Description :").optional(),

  startDate: z.coerce.date().optional().describe("Date du début du GB :"),

  endDate: z.coerce.date().optional().describe("Date de fin du GB:"),

  url: z
    .string()
    .url({
      message: "Veuillez indiquer un lien valide vers votre keyset.",
    })
    .describe("Lien (URL) :"),

  additionalUrl: z
    .string()
    .url({
      message: "Veuillez indiquer un lien valide vers votre keyset.",
    })
    .optional()
    .describe("Lien secondaire (URL) :"),

  warningText: z.string().optional().describe("Texte d'avertissement :"),

  isNew: z.boolean().optional().describe("Nouveauté :"),
});
