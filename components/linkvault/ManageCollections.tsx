"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { CollectionIcon } from "./CollectionIcon";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { IconEdit, IconTrash } from "@/components/icons";

type CollectionItem = {
  id: string;
  name: string;
  icon: string;
  color: string;
  _count: { links: number };
};

export function ManageCollections({ collections }: { collections: CollectionItem[] }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftName, setDraftName] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  function startEdit(c: CollectionItem) {
    setEditingId(c.id);
    setDraftName(c.name);
  }

  async function saveEdit(id: string) {
    if (!draftName.trim()) return;
    setBusyId(id);
    try {
      await fetch(`/api/collections/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: draftName.trim() }),
      });
      setEditingId(null);
      router.refresh();
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(id: string) {
    setBusyId(id);
    try {
      await fetch(`/api/collections/${id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-3">
      {collections.map((c, i) => (
        <motion.div
          key={c.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
          className="flex items-center gap-3 rounded-xl border-3 border-ink bg-white p-3 shadow-brut-sm"
        >
          <CollectionIcon icon={c.icon} color={c.color} size="sm" />
          <div className="min-w-0 flex-1">
            {editingId === c.id ? (
              <Input
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveEdit(c.id)}
                autoFocus
              />
            ) : (
              <>
                <p className="truncate font-display text-sm font-bold">{c.name}</p>
                <p className="text-xs text-ink/50">{c._count.links} link tersimpan</p>
              </>
            )}
          </div>
          <div className="flex shrink-0 gap-2">
            {editingId === c.id ? (
              <Button
                variant="secondary"
                className="px-3 py-1.5 text-xs"
                onClick={() => saveEdit(c.id)}
                disabled={busyId === c.id}
              >
                Simpan
              </Button>
            ) : (
              <Button
                variant="secondary"
                className="px-3 py-1.5 text-xs"
                onClick={() => startEdit(c)}
              >
                <IconEdit size={14} />
                Ubah
              </Button>
            )}
            <Button
              variant="danger"
              className="px-3 py-1.5 text-xs"
              onClick={() => handleDelete(c.id)}
              disabled={busyId === c.id}
            >
              <IconTrash size={14} />
              Hapus
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
