"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { IconHash } from "@/components/icons";
import { AnimatePresence, motion } from "framer-motion";

type CollectionOption = { id: string; name: string };

export function QuickAddBar({
  collections,
  defaultCollectionId,
}: {
  collections: CollectionOption[];
  defaultCollectionId?: string;
}) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [collectionId, setCollectionId] = useState(
    defaultCollectionId ?? collections[0]?.id ?? ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAdd() {
    if (!url.trim()) {
      setError("Tempel link dulu ya.");
      return;
    }
    if (!collectionId) {
      setError("Belum ada koleksi tujuan. Buat koleksi dulu.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, collectionId }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Gagal menyimpan link.");
      }
      setUrl("");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-3 rounded-xl2 border-3 border-ink bg-white p-2 shadow-brut transition-shadow focus-within:shadow-brut-lg sm:flex-row sm:items-center">
        <IconHash size={18} className="ml-2 shrink-0 text-ink/40" />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Tempel link untuk disimpan"
          className="focus-brut w-full flex-1 rounded-lg px-2 py-2 text-sm outline-none placeholder:text-ink/40"
        />
        <select
          value={collectionId}
          onChange={(e) => setCollectionId(e.target.value)}
          className="focus-brut rounded-lg border-3 border-ink/20 bg-cream px-2 py-2 text-xs font-bold"
          aria-label="Pilih koleksi tujuan"
        >
          {collections.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <Button onClick={handleAdd} disabled={loading} className="shrink-0 px-3">
          {loading ? "..." : "Simpan"}
        </Button>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-2 text-sm font-medium text-bubblegum"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
