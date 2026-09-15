"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

const STORAGE_KEY = "skillhive:preferences";

type Prefs = {
  compactLayout: boolean;
  emailNotifications: boolean;
};

const DEFAULT_PREFS: Prefs = {
  compactLayout: false,
  emailNotifications: true,
};

export default function PreferencesPage() {
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setPrefs({ ...DEFAULT_PREFS, ...JSON.parse(raw) });
    } catch {
      // ignore malformed storage
    } finally {
      setLoaded(true);
    }
  }, []);

  function update(key: keyof Prefs, value: boolean) {
    const next = { ...prefs, [key]: value };
    setPrefs(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  if (!loaded) return null;

  return (
    <div>
      <Reveal>
        <h1 className="font-display text-3xl font-bold">Preferences</h1>
        <p className="mt-2 text-sm text-ink/60">
          Pengaturan ini tersimpan di perangkatmu sendiri.
        </p>
      </Reveal>

      <RevealGroup className="mt-6 max-w-md space-y-3" stagger={0.08}>
        <RevealItem>
          <ToggleRow
            label="Compact layout"
            description="Kurangi padding di semua halaman SkillHive."
            checked={prefs.compactLayout}
            onChange={(v) => update("compactLayout", v)}
          />
        </RevealItem>
        <RevealItem>
          <ToggleRow
            label="Email notifications"
            description="Dapatkan email saat ada review baru."
            checked={prefs.emailNotifications}
            onChange={(v) => update("emailNotifications", v)}
          />
        </RevealItem>
      </RevealGroup>
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl2 border-3 border-ink bg-white p-4 shadow-brut-sm">
      <div>
        <p className="font-display text-sm font-bold">{label}</p>
        <p className="text-xs text-ink/60">{description}</p>
      </div>
      <motion.button
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        animate={{ backgroundColor: checked ? "#4ADE80" : "#FFFFFF" }}
        transition={{ duration: 0.2 }}
        className="focus-brut relative h-8 w-14 shrink-0 rounded-full border-3 border-ink"
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-0.5 h-5 w-5 rounded-full border-2 border-ink bg-white"
          style={{ left: checked ? "calc(100% - 22px)" : "2px" }}
        />
      </motion.button>
    </div>
  );
}
