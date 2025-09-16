
import * as React from "react";
import { cn } from "@/lib";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn("flex h-10 w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-400", className)}
      {...props}
    />
  )
);
Input.displayName = "Input";
