
import * as React from "react";

export function Switch({ id, checked, onCheckedChange }:{ id?: string; checked: boolean; onCheckedChange: (v:boolean)=>void }){
  return (
    <button
      id={id}
      type="button"
      onClick={() => onCheckedChange(!checked)}
      className={`h-6 w-11 rounded-full transition-colors ${checked ? "bg-violet-600" : "bg-white/20"} relative`}
      aria-pressed={checked}
      aria-label="Toggle"
    >
      <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : ""}`} />
    </button>
  );
}
