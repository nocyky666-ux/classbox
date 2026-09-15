import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
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

Textarea.displayName = "Textarea";
