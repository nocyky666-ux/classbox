"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const MotionLink = motion(Link);

export function InteractiveCardLink({
  href,
  className,
  children,
  ariaLabel,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  function handleMove(e: React.MouseEvent<HTMLElement>) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }

  return (
    <MotionLink
      href={href}
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      className={cn("spotlight block", className)}
      whileHover={{ y: -6 }}
      whileTap={{ y: -1 }}
      transition={{ type: "spring", stiffness: 420, damping: 26 }}
    >
      {children}
    </MotionLink>
  );
}
