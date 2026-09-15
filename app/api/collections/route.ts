import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const collections = await prisma.collection.findMany({
    orderBy: { createdAt: "asc" },
    include: { _count: { select: { links: true } } },
  });
  return NextResponse.json(collections);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";

  if (!name) {
    return NextResponse.json({ error: "Nama koleksi wajib diisi." }, { status: 400 });
  }

  const color = typeof body?.color === "string" ? body.color : "#FFC700";
  const icon = typeof body?.icon === "string" ? body.icon : "folder";

  const collection = await prisma.collection.create({
    data: { name, color, icon },
  });

  return NextResponse.json(collection, { status: 201 });
}
