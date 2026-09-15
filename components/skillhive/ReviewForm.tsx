"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { IconStar } from "@/components/icons";

export function ReviewForm({ trainerId }: { trainerId: string }) {
  const router = useRouter();
  const [author, setAuthor] = useState("");
  const [role, setRole] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit() {
    if (!author.trim() || !comment.trim()) {
      setError("Nama dan komentar wajib diisi.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trainerId, author, role, rating, comment }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Gagal mengirim review.");
      }
      setAuthor("");
      setRole("");
      setRating(5);
      setComment("");
      setSuccess(true);
      router.refresh();
      setTimeout(() => setSuccess(false), 2500);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl2 border-3 border-ink bg-white p-5 shadow-brut">
      <p className="mb-3 font-display text-sm font-bold">Tulis review</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Nama kamu"
        />
        <Input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role (mis. Junior Dev.)"
        />
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className="text-xs font-bold text-ink/60">Rating</span>
        {[1, 2, 3, 4, 5].map((n) => (
          <motion.button
            key={n}
            type="button"
            onClick={() => setRating(n)}
            whileHover={{ scale: 1.2, rotate: -4 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`${n} bintang`}
            className={n <= rating ? "text-yolk" : "text-ink/25"}
          >
            <IconStar size={20} filled={n <= rating} />
          </motion.button>
        ))}
      </div>

      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Ceritakan pengalaman belajarmu..."
        className="mt-3 min-h-[80px]"
      />

      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-2 text-sm font-medium text-bubblegum"
          >
            {error}
          </motion.p>
        )}
        {success && (
          <motion.p
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="animate-pop-in mt-2 flex items-center gap-1 text-sm font-medium text-mint"
          >
            <IconStar size={14} filled />
            Review terkirim!
          </motion.p>
        )}
      </AnimatePresence>

      <Button onClick={handleSubmit} disabled={loading} className="mt-3">
        {loading ? "Mengirim..." : "Kirim review"}
      </Button>
    </div>
  );
}
