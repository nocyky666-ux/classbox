"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";
import { IconButton } from "@/components/ui/IconButton";
import { IconTrash } from "@/components/icons";

type LinkItem = {
  id: string;
  url: string;
  title: string | null;
  domain: string | null;
  createdAt: string | Date;
};

export function LinkRow({ link }: { link: LinkItem }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/links/${link.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus link.");
      router.refresh();
    } catch {
      setDeleting(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center justify-between gap-3 border-b-3 border-ink/10 py-3 last:border-none"
    >
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="min-w-0 flex-1"
      >
        <p className="truncate font-display text-sm font-bold hover:underline">
          {link.title || link.domain || link.url}
        </p>
        <p className="truncate text-xs text-ink/50">
          {link.domain} · {formatDate(link.createdAt)}
        </p>
      </a>
      <IconButton
        label="Hapus link"
        onClick={handleDelete}
        disabled={deleting}
        className="h-9 w-9 disabled:opacity-40"
      >
        <IconTrash size={16} />
      </IconButton>
    </motion.div>
  );
}
