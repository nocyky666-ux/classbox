"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const MotionLink = motion(Link);

const tapAnim = {
  whileHover: { y: -3 },
  whileTap: { y: 1, scale: 0.94 },
  transition: { type: "spring" as const, stiffness: 520, damping: 22 },
};

const baseClass =
  "focus-brut inline-flex h-11 w-11 items-center justify-center rounded-xl border-3 border-ink shadow-brut-sm hover:shadow-brut transition-shadow shrink-0";

function variantClass(variant: "light" | "dark") {
  return variant === "dark" ? "bg-ink text-white" : "bg-white text-ink";
}

export function IconLinkButton({
  href,
  label,
  children,
  className,
  variant = "light",
}: {
  href: string;
  label: string;
  children: ReactNode;
  className?: string;
  variant?: "light" | "dark";
}) {
  return (
    <MotionLink
      href={href}
      aria-label={label}
      className={cn(baseClass, variantClass(variant), className)}
      {...tapAnim}
    >
      {children}
    </MotionLink>
  );
}

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children: ReactNode;
  variant?: "light" | "dark";
}

export function IconButton({
  label,
  children,
  className,
  variant = "light",
  ...props
}: IconButtonProps) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      className={cn(baseClass, variantClass(variant), className)}
      {...tapAnim}
      {...props}
    >
      {children}
    </motion.button>
  );
}
