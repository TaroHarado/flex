
import * as React from "react";
import { cn } from "@/lib";

type Variant = "default" | "secondary" | "ghost";
type Size = "default" | "lg" | "sm";

const base = "inline-flex items-center justify-center rounded-2xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 disabled:opacity-50 disabled:pointer-events-none";
const variants: Record<Variant,string> = {
  default: "bg-violet-600 hover:bg-violet-500 text-white",
  secondary: "bg-white/10 hover:bg-white/15 text-white border border-white/10",
  ghost: "bg-transparent hover:bg-white/10 text-white"
};
const sizes: Record<Size,string> = {
  default: "h-10 px-4 py-2",
  lg: "h-12 px-6 text-base",
  sm: "h-8 px-3 text-sm"
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

export function Button({ className, variant='default', size='default', asChild, ...props }: ButtonProps) {
  const Comp: any = asChild ? "a" : "button";
  return <Comp className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}
