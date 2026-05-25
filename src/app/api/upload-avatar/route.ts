import { requireSelfOrPermission } from "@/features/auth/auth.authorize";
import { user } from "@/lib/db/auth-schema";
import { db } from "@/lib/db/db";
import { put, del, list } from "@vercel/blob";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;

    if (!file || !userId) {
      return Response.json(
        { error: "Missing file or userId" },
        { status: 400 },
      );
    }

    // requireSelfOrPermission(userId, {
    //   resource: "user",
    //   own: "update:own",
    //   any: "update:any",
    // });

    const filename = `avatars/${userId}`;

    const existing = await list({
      prefix: filename,
    });

    if (existing.blobs.length > 0) {
      await Promise.all(existing.blobs.map((blob) => del(blob.url)));
    }

    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
    });

    await db
      .update(user)
      .set({ image: `${blob.url}?updated=${new Date()}` })
      .where(eq(user.id, userId));
    revalidatePath("/admin/profile");

    return Response.json(
      {
        url: blob.url,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}
