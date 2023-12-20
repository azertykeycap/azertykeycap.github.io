"use server";

import { contentfulManagementClient } from "@/lib/api/contentful";
import { formSchema } from "@/lib/schemas/forms";
import { wrapValuesWithFr } from "@/lib/utils";

export async function serverAction({
  data,
  token,
}: {
  data: any;
  token: string;
}) {
  const validatedData = await formSchema.safeParse(data);
  const secretKey = process.env.NEXT_SECRET_RECAPTCHA_SITE_KEY;

  const formData = `secret=${secretKey}&response=${token}`;

  try {
    const googleResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      }
    );

    const googleResponseJson = await googleResponse.json();

    if (!googleResponseJson.success) {
      return {
        status: 400,
        body: "Recaptcha verification failed",
      };
    }
  } catch (e) {
    return {
      status: 400,
    };
  }

  if (!validatedData.success) {
    return {
      status: 400,
      body: validatedData.error,
    };
  } else {
    try {
      const contentfulResponse = await contentfulManagementClient.entry.create(
        { contentTypeId: "article" },
        {
          fields: wrapValuesWithFr(validatedData.data),
        }
      );

      if (!contentfulResponse.sys || !contentfulResponse.sys.id) {
        return {
          status: 400,
          body: "Contentful entry creation failed",
        };
      }
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
