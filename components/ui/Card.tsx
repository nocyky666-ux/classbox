import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl2 border-3 border-ink bg-white shadow-brut",
        className
      )}
      {...props}
    />
  );
}
