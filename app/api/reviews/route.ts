import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  const trainerId = typeof body?.trainerId === "string" ? body.trainerId : "";
  const author = typeof body?.author === "string" ? body.author.trim() : "";
  const role = typeof body?.role === "string" ? body.role.trim() : "";
  const comment = typeof body?.comment === "string" ? body.comment.trim() : "";
  const rating = Number(body?.rating);

  if (!trainerId || !author || !comment || Number.isNaN(rating)) {
    return NextResponse.json(
      { error: "Nama, komentar, dan rating wajib diisi." },
      { status: 400 }
    );
  }

  if (rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Rating harus antara 1–5." }, { status: 400 });
  }

  const trainer = await prisma.trainer.findUnique({ where: { id: trainerId } });
  if (!trainer) {
    return NextResponse.json({ error: "Trainer tidak ditemukan." }, { status: 404 });
  }

  const review = await prisma.review.create({
    data: {
      trainerId,
      author,
      role: role || "Student",
      comment,
      rating,
    },
  });

  return NextResponse.json(review, { status: 201 });
}
