"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: Variant;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-yolk text-ink shadow-brut hover:shadow-brut-lg",
  secondary: "bg-white text-ink shadow-brut hover:shadow-brut-lg",
  danger: "bg-bubblegum text-white shadow-brut hover:shadow-brut-lg",
  ghost: "bg-transparent border-transparent shadow-none",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -3 }}
        whileTap={{ y: 1, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 500, damping: 24 }}
        className={cn(
          "shine focus-brut inline-flex items-center justify-center gap-2 rounded-xl border-3 border-ink px-4 py-2 font-display text-sm font-bold transition-shadow disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
