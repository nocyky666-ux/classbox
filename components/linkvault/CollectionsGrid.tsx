"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CollectionIcon, ICON_OPTIONS } from "./CollectionIcon";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { InteractiveCardLink } from "@/components/ui/InteractiveCardLink";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { IconSearch, IconPlus } from "@/components/icons";
import { motion, AnimatePresence } from "framer-motion";

type CollectionWithCount = {
  id: string;
  name: string;
  icon: string;
  color: string;
  _count: { links: number };
};

const COLOR_OPTIONS = ["#FFC700", "#4ADE80", "#FF4D8D", "#7B61FF", "#5FB9FF", "#FFB27A"];

export function CollectionsGrid({ collections }: { collections: CollectionWithCount[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(ICON_OPTIONS[0]);
  const [color, setColor] = useState(COLOR_OPTIONS[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const filtered = collections.filter((c) =>
    c.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  async function handleCreate() {
    if (!name.trim()) {
      setError("Nama koleksi wajib diisi.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/collections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, icon, color }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Gagal membuat koleksi.");
      }
      setOpen(false);
      setName("");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="mb-4 flex items-center gap-2 rounded-xl border-3 border-ink bg-white px-3 py-2 shadow-brut-sm transition-shadow focus-within:shadow-brut">
        <IconSearch size={18} className="text-ink/50" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari koleksi..."
          className="w-full text-sm outline-none placeholder:text-ink/40"
          aria-label="Cari koleksi"
        />
      </div>

      <AnimatePresence>
        {query.trim() && filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 text-sm text-ink/50"
          >
            Tidak ada koleksi bernama &ldquo;{query}&rdquo;.
          </motion.p>
        )}
      </AnimatePresence>

      <RevealGroup className="grid grid-cols-2 gap-4" stagger={0.06}>
        {filtered.map((c) => (
          <RevealItem key={c.id}>
            <InteractiveCardLink
              href={`/linkvault/collections/${c.id}`}
              ariaLabel={`Buka koleksi ${c.name}`}
              className="h-full rounded-xl2 border-3 border-ink bg-white p-4 shadow-brut hover:shadow-brut-lg"
            >
              <div className="mb-6 flex items-start justify-between">
                <CollectionIcon icon={c.icon} color={c.color} />
                <span className="text-xs font-bold text-ink/60">
                  {c._count.links} link{c._count.links === 1 ? "" : "s"}
                </span>
              </div>
              <p className="font-display text-base font-bold leading-tight">{c.name}</p>
            </InteractiveCardLink>
          </RevealItem>
        ))}

        <RevealItem>
          <motion.button
            onClick={() => setOpen(true)}
            whileHover={{ y: -6 }}
            whileTap={{ y: -1, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 26 }}
            className="focus-brut flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl2 border-3 border-dashed border-ink/40 p-4 text-ink/50 transition-colors hover:border-ink hover:text-ink"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-xl border-3 border-dashed border-current">
              <IconPlus size={22} />
            </span>
            <span className="font-display text-sm font-bold">Koleksi baru</span>
          </motion.button>
        </RevealItem>
      </RevealGroup>

      <Modal open={open} onClose={() => setOpen(false)} title="Buat koleksi baru">
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-ink/60">
              Nama koleksi
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="mis. Design Inspo"
              autoFocus
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-ink/60">
              Ikon
            </label>
            <div className="flex flex-wrap gap-2">
              {ICON_OPTIONS.map((opt) => (
                <motion.button
                  key={opt}
                  onClick={() => setIcon(opt)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  className={`rounded-lg border-3 p-1 ${
                    icon === opt ? "border-ink bg-yolk" : "border-ink/20"
                  }`}
                  type="button"
                >
                  <CollectionIcon icon={opt} color="transparent" size="sm" />
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-ink/60">
              Warna
            </label>
            <div className="flex gap-2">
              {COLOR_OPTIONS.map((opt) => (
                <motion.button
                  key={opt}
                  type="button"
                  onClick={() => setColor(opt)}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.9 }}
                  className={`h-8 w-8 rounded-full border-3 ${
                    color === opt ? "border-ink" : "border-transparent"
                  }`}
                  style={{ backgroundColor: opt }}
                  aria-label={`Pilih warna ${opt}`}
                />
              ))}
            </div>
          </div>

          {error && <p className="text-sm font-medium text-bubblegum">{error}</p>}

          <Button onClick={handleCreate} disabled={loading} className="w-full">
            {loading ? "Menyimpan..." : "Buat koleksi"}
          </Button>
        </div>
      </Modal>
    </>
  );
}
