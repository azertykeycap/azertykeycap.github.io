"use server";

import { contentfulManagementClient } from "@/lib/api/contentful";
import { formSchema } from "@/lib/schemas/forms";
import { wrapValuesWithFr } from "@/lib/utils";

export async function serverAction(data: any) {
  const validatedData = await formSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      status: 400,
      body: validatedData.error,
    };
  } else {
    try {
      const e = await contentfulManagementClient.entry.create(
        { contentTypeId: "article" },
        {
          fields: wrapValuesWithFr(validatedData.data),
        }
      );
    } catch (e) {
      console.error(e);
      return {
        status: 400,
      };
    }

    return {
      status: 200,
    };
  }
}
