import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { average } from "@/lib/utils";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { InteractiveCardLink } from "@/components/ui/InteractiveCardLink";
import { IconSparkle, IconArrowRight } from "@/components/icons";

export const dynamic = "force-dynamic";

export default async function SkillHiveHomePage() {
  const trainers = await prisma.trainer.findMany({
    include: { reviews: true },
  });

  const totalReviews = trainers.reduce((sum, t) => sum + t.reviews.length, 0);
  const allRatings = trainers.flatMap((t) => t.reviews.map((r) => r.rating));
  const overallAvg = average(allRatings);

  return (
    <div>
      <Reveal>
        <h1 className="flex items-center gap-2 font-display text-3xl font-bold">
          Selamat datang
          <IconSparkle size={22} className="text-violet" />
        </h1>
        <p className="mt-2 max-w-md text-sm text-ink/60">
          Ringkasan cepat platform training kamu hari ini.
        </p>
      </Reveal>

      <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-3" stagger={0.08}>
        <RevealItem>
          <Card className="p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-ink/50">Trainers</p>
            <p className="mt-2 font-display text-3xl font-bold">
              <CountUp value={trainers.length} />
            </p>
          </Card>
        </RevealItem>
        <RevealItem>
          <Card className="bg-yolk p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-ink/60">Total review</p>
            <p className="mt-2 font-display text-3xl font-bold">
              <CountUp value={totalReviews} />
            </p>
          </Card>
        </RevealItem>
        <RevealItem>
          <Card className="bg-violet p-5 text-white">
            <p className="text-xs font-bold uppercase tracking-wide text-white/70">
              Rating rata-rata
            </p>
            <p className="mt-2 font-display text-3xl font-bold">
              {overallAvg > 0 ? <CountUp value={overallAvg} decimals={1} /> : "–"}
            </p>
          </Card>
        </RevealItem>
      </RevealGroup>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold">Trainers</h2>
        <a
          href="/skillhive/trainers"
          className="inline-flex items-center gap-1 text-sm font-bold underline"
        >
          Lihat semua
          <IconArrowRight size={14} />
        </a>
      </div>

      <RevealGroup className="mt-4 grid gap-4 sm:grid-cols-2" stagger={0.06}>
        {trainers.slice(0, 4).map((t) => (
          <RevealItem key={t.id}>
            <InteractiveCardLink
              href={`/skillhive/trainers/${t.id}`}
              ariaLabel={`Lihat profil ${t.name}`}
              className="h-full rounded-xl2 border-3 border-ink bg-white p-4 shadow-brut hover:shadow-brut-lg"
            >
              <p className="font-display font-bold">{t.name}</p>
              <p className="text-sm text-ink/60">{t.role}</p>
            </InteractiveCardLink>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
