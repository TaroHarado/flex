
import * as React from "react";
import { cn } from "@/lib";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn("flex min-h-[120px] w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-400", className)}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
