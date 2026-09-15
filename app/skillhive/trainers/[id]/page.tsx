import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { average } from "@/lib/utils";
import { Sparkline } from "@/components/skillhive/Sparkline";
import { ReviewForm } from "@/components/skillhive/ReviewForm";
import { IconLinkButton } from "@/components/ui/IconButton";
import {
  IconBack,
  IconTwitter,
  IconLinkedin,
  IconInstagram,
  IconMail,
  IconExternal,
  IconStar,
} from "@/components/icons";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";

export const dynamic = "force-dynamic";

export default async function TrainerDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const trainer = await prisma.trainer.findUnique({
    where: { id: params.id },
    include: {
      experiences: { orderBy: { id: "asc" } },
      reviews: { orderBy: { createdAt: "asc" } },
    },
  });

  if (!trainer) notFound();

  const ratings = trainer.reviews.map((r) => r.rating);
  const avg = average(ratings);
  const contactHref = `mailto:${trainer.email}?subject=${encodeURIComponent(
    `Request session with ${trainer.name}`
  )}`;
  const portfolioHref = trainer.linkedin || trainer.instagram || trainer.twitter || null;

  return (
    <div>
      <IconLinkButton href="/skillhive/trainers" label="Kembali ke trainers" className="mb-6">
        <IconBack size={18} />
      </IconLinkButton>

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        {/* Trainer info card */}
        <Reveal className="rounded-xl2 border-3 border-ink bg-yolk p-6 shadow-brut">
          <div className="flex flex-col gap-5 sm:flex-row">
            <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl border-3 border-ink bg-gradient-to-br from-white to-peach font-display text-4xl font-bold">
              {trainer.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-display text-2xl font-bold">{trainer.name}</h1>
                <div className="flex items-center gap-2">
                  {trainer.twitter && (
                    <a
                      href={trainer.twitter}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Twitter"
                      className="rounded-lg border-3 border-ink bg-white p-1.5 shadow-brut-sm transition-transform hover:-translate-y-0.5"
                    >
                      <IconTwitter size={14} />
                    </a>
                  )}
                  {trainer.linkedin && (
                    <a
                      href={trainer.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="rounded-lg border-3 border-ink bg-white p-1.5 shadow-brut-sm transition-transform hover:-translate-y-0.5"
                    >
                      <IconLinkedin size={14} />
                    </a>
                  )}
                  {trainer.instagram && (
                    <a
                      href={trainer.instagram}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram"
                      className="rounded-lg border-3 border-ink bg-white p-1.5 shadow-brut-sm transition-transform hover:-translate-y-0.5"
                    >
                      <IconInstagram size={14} />
                    </a>
                  )}
                </div>
              </div>
              <p className="text-sm text-ink/70">{trainer.email}</p>

              <div className="mt-4 flex flex-wrap gap-4">
                <Stat value={`${trainer.yearsExp}+`} label="experience" />
                <Stat value={trainer.rankLabel} label="on platform" />
                <Stat value={`${trainer.yearsTeach} ya`} label="of teaching" />
                <Stat value={`${trainer.coursesQty}`} label="courses" />
              </div>

              <p className="mt-4 text-sm leading-relaxed text-ink/80">{trainer.bio}</p>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={contactHref}
                  className="shine focus-brut inline-flex items-center gap-2 rounded-xl border-3 border-ink bg-ink px-4 py-2 font-display text-sm font-bold text-white shadow-brut-sm transition-transform hover:-translate-y-0.5"
                >
                  <IconMail size={16} />
                  Request session
                </a>
                {portfolioHref ? (
                  <a
                    href={portfolioHref}
                    target="_blank"
                    rel="noreferrer"
                    className="shine focus-brut inline-flex items-center gap-2 rounded-xl border-3 border-ink bg-white px-4 py-2 font-display text-sm font-bold shadow-brut-sm transition-transform hover:-translate-y-0.5"
                  >
                    <IconExternal size={16} />
                    Portfolio
                  </a>
                ) : (
                  <span
                    className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border-3 border-ink/30 bg-white/50 px-4 py-2 font-display text-sm font-bold text-ink/40"
                    title="Belum ada tautan portofolio"
                  >
                    <IconExternal size={16} />
                    Portfolio
                  </span>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Work experience */}
        <Reveal delay={0.08} className="rounded-xl2 border-3 border-ink bg-white p-5 shadow-brut">
          <h2 className="mb-3 font-display text-lg font-bold">Work experience</h2>
          <div className="space-y-3">
            {trainer.experiences.map((exp) => (
              <div key={exp.id} className="rounded-xl border-3 border-ink/15 p-3">
                <p className="font-display text-sm font-bold">{exp.title}</p>
                <p className="text-xs text-ink/60">{exp.company}</p>
                <p className="text-xs text-ink/40">
                  {exp.startDate} – {exp.endDate}
                </p>
              </div>
            ))}
            {trainer.experiences.length === 0 && (
              <p className="text-sm text-ink/50">Belum ada data pengalaman kerja.</p>
            )}
          </div>
        </Reveal>
      </div>

      {/* Students reviews */}
      <div className="mt-6">
        <Reveal>
          <h2 className="font-display text-xl font-bold">Students reviews</h2>
        </Reveal>

        <div className="mt-4 grid gap-4 lg:grid-cols-[280px_1fr]">
          <Reveal delay={0.05} className="rounded-xl2 border-3 border-ink bg-bubblegum p-5 text-white shadow-brut">
            <p className="font-display text-3xl font-bold">
              {avg > 0 ? <CountUp value={avg} decimals={1} /> : "–"}{" "}
              <span className="text-lg font-medium">/ 5.0</span>
            </p>
            <div className="mt-3 rounded-xl border-3 border-ink bg-white p-2">
              <Sparkline values={ratings} />
            </div>
            <p className="mt-3 text-sm font-bold">
              {trainer.reviews.length} rate{trainer.reviews.length === 1 ? "" : "s"} from
              students
            </p>
          </Reveal>

          <RevealGroup className="grid gap-3 sm:grid-cols-2" stagger={0.06}>
            {trainer.reviews
              .slice()
              .reverse()
              .map((r) => (
                <RevealItem key={r.id}>
                  <div className="h-full rounded-xl2 border-3 border-ink bg-white p-4 shadow-brut-sm">
                    <div className="mb-1 flex items-center justify-between">
                      <p className="font-display text-sm font-bold">{r.author}</p>
                      <span className="flex items-center gap-1 text-xs font-bold">
                        <IconStar size={12} filled className="text-yolk" />
                        {r.rating.toFixed(1)}
                      </span>
                    </div>
                    <p className="mb-2 text-xs text-ink/50">{r.role}</p>
                    <p className="text-sm text-ink/80">{r.comment}</p>
                  </div>
                </RevealItem>
              ))}
            {trainer.reviews.length === 0 && (
              <p className="text-sm text-ink/50">Belum ada review.</p>
            )}
          </RevealGroup>
        </div>

        <div className="mt-5 max-w-xl">
          <ReviewForm trainerId={trainer.id} />
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border-3 border-ink bg-white/70 px-3 py-1.5">
      <p className="font-display text-sm font-bold leading-none">{value}</p>
      <p className="text-[10px] font-medium text-ink/60">{label}</p>
    </div>
  );
}
