import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border-3 border-ink bg-white px-2.5 py-0.5 text-xs font-bold",
        className
      )}
      {...props}
    />
  );
}
