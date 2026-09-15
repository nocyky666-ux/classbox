import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json().catch(() => null);
  const data: { name?: string; color?: string; icon?: string } = {};

  if (typeof body?.name === "string" && body.name.trim()) data.name = body.name.trim();
  if (typeof body?.color === "string") data.color = body.color;
  if (typeof body?.icon === "string") data.icon = body.icon;

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "Tidak ada perubahan yang dikirim." }, { status: 400 });
  }

  try {
    const collection = await prisma.collection.update({
      where: { id: params.id },
      data,
    });
    return NextResponse.json(collection);
  } catch {
    return NextResponse.json({ error: "Koleksi tidak ditemukan." }, { status: 404 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.collection.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Koleksi tidak ditemukan." }, { status: 404 });
  }
}
