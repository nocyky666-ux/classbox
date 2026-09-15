import { InteractiveCardLink } from "@/components/ui/InteractiveCardLink";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { IconBookmark, IconGraduate, IconArrowRight } from "@/components/icons";

export default function HomePage() {
  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-cream px-6 py-10 sm:py-16">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-bubblegum/20 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl">
        <Reveal className="mb-10 flex items-center justify-between">
          <span className="font-display text-xl font-bold">BrutalHub</span>
          <span className="rounded-full border-3 border-ink bg-white px-3 py-1 text-xs font-bold shadow-brut-sm">
            2 apps, 1 project
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="font-display text-4xl font-bold leading-[1.05] sm:text-6xl">
            Dua produk kecil,
            <br />
            satu gaya berani.
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-4 max-w-md text-base text-ink/70">
            Pilih salah satu untuk mulai. Semua data beneran tersimpan di database —
            bukan sekadar tampilan.
          </p>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2" stagger={0.12}>
          <RevealItem>
            <InteractiveCardLink
              href="/linkvault"
              ariaLabel="Buka LinkVault"
              className="group h-full rounded-xl2 border-3 border-ink bg-yolk p-6 shadow-brut hover:shadow-brut-lg"
            >
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl border-3 border-ink bg-white shadow-brut-sm">
                <IconBookmark size={26} />
              </div>
              <h2 className="font-display text-2xl font-bold">LinkVault</h2>
              <p className="mt-2 text-sm text-ink/70">
                Simpan link, kelompokkan ke koleksi, temukan lagi kapan saja.
              </p>
              <span className="mt-6 inline-flex items-center gap-1 font-display text-sm font-bold underline decoration-2 underline-offset-4">
                Buka LinkVault
                <IconArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </InteractiveCardLink>
          </RevealItem>

          <RevealItem>
            <InteractiveCardLink
              href="/skillhive"
              ariaLabel="Buka SkillHive"
              className="group h-full rounded-xl2 border-3 border-ink bg-violet p-6 text-white shadow-brut hover:shadow-brut-lg"
            >
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl border-3 border-ink bg-white text-ink shadow-brut-sm">
                <IconGraduate size={26} />
              </div>
              <h2 className="font-display text-2xl font-bold">SkillHive</h2>
              <p className="mt-2 text-sm text-white/80">
                Dashboard trainer: profil, pengalaman kerja, dan review murid.
              </p>
              <span className="mt-6 inline-flex items-center gap-1 font-display text-sm font-bold underline decoration-2 underline-offset-4">
                Buka SkillHive
                <IconArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </InteractiveCardLink>
          </RevealItem>
        </RevealGroup>
      </div>
    </main>
  );
}
