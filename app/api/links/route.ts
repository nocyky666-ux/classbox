import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDomain, normalizeUrl } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const collectionId = req.nextUrl.searchParams.get("collectionId");
  const links = await prisma.link.findMany({
    where: collectionId ? { collectionId } : undefined,
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(links);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const rawUrl = typeof body?.url === "string" ? body.url.trim() : "";
  const collectionId = typeof body?.collectionId === "string" ? body.collectionId : "";

  if (!rawUrl || !collectionId) {
    return NextResponse.json(
      { error: "URL dan koleksi tujuan wajib diisi." },
      { status: 400 }
    );
  }

  const url = normalizeUrl(rawUrl);

  let domain: string;
  try {
    domain = getDomain(url);
    // eslint-disable-next-line no-new
    new URL(url);
  } catch {
    return NextResponse.json({ error: "URL tidak valid." }, { status: 400 });
  }

  const collection = await prisma.collection.findUnique({ where: { id: collectionId } });
  if (!collection) {
    return NextResponse.json({ error: "Koleksi tujuan tidak ditemukan." }, { status: 404 });
  }

  const link = await prisma.link.create({
    data: {
      url,
      domain,
      title: typeof body?.title === "string" && body.title.trim() ? body.title.trim() : domain,
      collectionId,
    },
  });

  return NextResponse.json(link, { status: 201 });
}
