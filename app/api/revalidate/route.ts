import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret && secret === process.env.CONTENTFUL_WEBHOOK_SECRET) {
    revalidatePath("/profil/[slug]", "layout");
    return Response.json({ revalidated: true, now: Date.now() });
  }

  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: "Missing secret in webhook",
  });
}
