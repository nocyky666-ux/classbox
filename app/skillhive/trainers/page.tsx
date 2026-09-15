import { prisma } from "@/lib/prisma";
import { average } from "@/lib/utils";
import { InteractiveCardLink } from "@/components/ui/InteractiveCardLink";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { IconStar } from "@/components/icons";

export const dynamic = "force-dynamic";

export default async function TrainersPage() {
  const trainers = await prisma.trainer.findMany({
    include: { reviews: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div>
      <Reveal>
        <h1 className="font-display text-3xl font-bold">Trainers</h1>
        <p className="mt-2 text-sm text-ink/60">Semua trainer aktif di platform kamu.</p>
      </Reveal>

      <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
        {trainers.map((t) => {
          const avg = average(t.reviews.map((r) => r.rating));
          return (
            <RevealItem key={t.id}>
              <InteractiveCardLink
                href={`/skillhive/trainers/${t.id}`}
                ariaLabel={`Lihat profil ${t.name}`}
                className="h-full rounded-xl2 border-3 border-ink bg-white p-5 shadow-brut hover:shadow-brut-lg"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border-3 border-ink bg-gradient-to-br from-peach to-bubblegum font-display text-lg font-bold text-white">
                  {t.name.charAt(0)}
                </div>
                <p className="font-display text-lg font-bold">{t.name}</p>
                <p className="text-sm text-ink/60">{t.role}</p>
                <div className="mt-3 flex items-center gap-1 text-sm font-bold">
                  <IconStar size={16} filled={avg > 0} className="text-yolk" />
                  {avg > 0 ? avg.toFixed(1) : "Belum ada rating"}
                  <span className="font-normal text-ink/50">
                    {t.reviews.length > 0 && `(${t.reviews.length})`}
                  </span>
                </div>
              </InteractiveCardLink>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </div>
  );
}
