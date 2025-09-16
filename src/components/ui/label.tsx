
import * as React from "react";
import { cn } from "@/lib";

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("mb-1 block text-sm text-slate-300", className)} {...props} />;
}
