import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { IconLibrary } from "@/components/icons";

const POLICIES = [
  { title: "Kebijakan Reschedule", desc: "Aturan pengajuan ubah jadwal sesi mengajar." },
  { title: "Kode Etik Trainer", desc: "Standar perilaku dan komunikasi dengan murid." },
  { title: "Panduan Penilaian", desc: "Cara memberi feedback dan menilai progres murid." },
];

export default function PolicyLibraryPage() {
  return (
    <div>
      <Reveal>
        <h1 className="font-display text-3xl font-bold">Policy Library</h1>
        <p className="mt-2 text-sm text-ink/60">Dokumen kebijakan untuk semua trainer.</p>
      </Reveal>

      <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2" stagger={0.08}>
        {POLICIES.map((p) => (
          <RevealItem key={p.title}>
            <div className="flex h-full items-start gap-3 rounded-xl2 border-3 border-ink bg-white p-4 shadow-brut-sm transition-shadow hover:shadow-brut">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-3 border-ink bg-mint/40">
                <IconLibrary size={18} />
              </span>
              <div>
                <p className="font-display font-bold">{p.title}</p>
                <p className="mt-1 text-sm text-ink/60">{p.desc}</p>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
