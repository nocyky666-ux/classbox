"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  IconHome,
  IconCalendar,
  IconGraduate,
  IconLibrary,
  IconSliders,
  IconLogout,
} from "@/components/icons";

const NAV_ITEMS = [
  { href: "/skillhive", label: "Home", icon: IconHome },
  { href: "/skillhive/schedule", label: "Schedule", icon: IconCalendar },
  { href: "/skillhive/trainers", label: "Trainers", icon: IconGraduate },
  { href: "/skillhive/policy-library", label: "Policy Library", icon: IconLibrary },
  { href: "/skillhive/preferences", label: "Preferences", icon: IconSliders },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-full shrink-0 flex-col justify-between border-ink bg-mint/40 p-5 sm:h-[100dvh] sm:w-60 sm:border-r-3">
      <div>
        <Link href="/" className="mb-8 flex items-center gap-2">
          <motion.span
            whileHover={{ rotate: -6, scale: 1.05 }}
            className="flex h-9 w-9 items-center justify-center rounded-lg border-3 border-ink bg-ink font-display text-sm font-bold text-white"
          >
            {"</>"}
          </motion.span>
          <span className="font-display text-lg font-bold">SkillHive</span>
        </Link>

        <nav className="flex flex-row gap-2 overflow-x-auto sm:flex-col sm:gap-1 sm:overflow-visible">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/skillhive"
                ? pathname === "/skillhive"
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "focus-brut relative flex shrink-0 items-center gap-2 rounded-xl border-3 px-3 py-2 text-sm font-bold",
                  active
                    ? "border-ink text-ink"
                    : "border-transparent text-ink/60 hover:border-ink/20"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="sidebar-active"
                    className="absolute inset-0 -z-10 rounded-xl bg-white shadow-brut-sm"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <Link
        href="/"
        className="focus-brut mt-6 hidden items-center gap-2 rounded-xl border-3 border-ink bg-white px-3 py-2 text-sm font-bold shadow-brut-sm transition-shadow hover:shadow-brut sm:flex"
      >
        <IconLogout size={16} />
        Log out
      </Link>
    </aside>
  );
}
