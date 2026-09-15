import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "focus-brut w-full rounded-xl border-3 border-ink bg-white px-4 py-2.5 text-sm placeholder:text-ink/40",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
