import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { IconCalendar } from "@/components/icons";

const SESSIONS = [
  { day: "Senin", time: "09:00 – 10:30", title: "Intro to JavaScript", trainer: "Hillary Bale" },
  { day: "Rabu", time: "13:00 – 14:30", title: "REST API Design", trainer: "Marcus Reyna" },
  { day: "Jumat", time: "16:00 – 17:00", title: "Code Review Session", trainer: "Hillary Bale" },
];

export default function SchedulePage() {
  return (
    <div>
      <Reveal>
        <h1 className="font-display text-3xl font-bold">Schedule</h1>
        <p className="mt-2 text-sm text-ink/60">Jadwal sesi mengajar minggu ini.</p>
      </Reveal>

      <RevealGroup className="mt-6 space-y-3" stagger={0.08}>
        {SESSIONS.map((s, i) => (
          <RevealItem key={i}>
            <div className="flex items-center justify-between gap-3 rounded-xl2 border-3 border-ink bg-white p-4 shadow-brut-sm transition-shadow hover:shadow-brut">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-3 border-ink bg-sky/40">
                  <IconCalendar size={18} />
                </span>
                <div>
                  <p className="font-display font-bold">{s.title}</p>
                  <p className="text-sm text-ink/60">
                    {s.day} · {s.time}
                  </p>
                </div>
              </div>
              <span className="shrink-0 rounded-full border-3 border-ink bg-sky px-3 py-1 text-xs font-bold">
                {s.trainer}
              </span>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
