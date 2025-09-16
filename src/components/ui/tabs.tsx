
import * as React from "react";
import { cn } from "@/lib";

type TabsCtx = { value: string; setValue: (v:string)=>void };
const Ctx = React.createContext<TabsCtx | null>(null);

export function Tabs({ defaultValue, className, children }:{ defaultValue: string; className?: string; children: React.ReactNode }){
  const [value, setValue] = React.useState(defaultValue);
  return <div className={className}><Ctx.Provider value={{value,setValue}}>{children}</Ctx.Provider></div>;
}

export function TabsList({ className, children }:{ className?: string; children: React.ReactNode }){
  return <div className={cn("inline-grid rounded-xl bg-white/5 p-1 gap-1", className)}>{children}</div>;
}

export function TabsTrigger({ value, children }:{ value: string; children: React.ReactNode }){
  const ctx = React.useContext(Ctx)!;
  const active = ctx.value === value;
  return (
    <button onClick={()=>ctx.setValue(value)} className={cn("px-4 py-2 rounded-lg text-sm", active ? "bg-white/10" : "opacity-70 hover:opacity-100")}>
      {children}
    </button>
  );
}

export function TabsContent({ value, className, children }:{ value: string; className?: string; children: React.ReactNode }){
  const ctx = React.useContext(Ctx)!;
  if (ctx.value !== value) return null;
  return <div className={cn("mt-4", className)}>{children}</div>;
}
