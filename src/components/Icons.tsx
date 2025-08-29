import type { FC } from "react";


export type IconName = "shield" | "check" | "factory" | "bolt" | "map";


export const Icons: Record<IconName, FC<{ className?: string }>> = {
shield: ({ className }) => (
<svg
viewBox="0 0 24 24"
aria-hidden
fill="currentColor"
className={className ?? "h-5 w-5 text-[#0e7dc2]"}
>
<path d="M12 3l7 3v6c0 4.4-3 8.4-7 9-4-0.6-7-4.6-7-9V6l7-3z" />
</svg>
),
check: ({ className }) => (
<svg
viewBox="0 0 24 24"
aria-hidden
fill="currentColor"
className={className ?? "h-5 w-5 text-[#0e7dc2]"}
>
<path d="M20 6l-11 11-5-5 2-2 3 3 9-9z" />
</svg>
),
factory: ({ className }) => (
<svg
viewBox="0 0 24 24"
aria-hidden
fill="currentColor"
className={className ?? "h-5 w-5 text-[#0e7dc2]"}
>
<path d="M2 21h20v-8l-6 3v-3l-6 3V8L6 10V5H2v16z" />
</svg>
),
bolt: ({ className }) => (
<svg
viewBox="0 0 24 24"
aria-hidden
fill="currentColor"
className={className ?? "h-5 w-5 text-[#0e7dc2]"}
>
<path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
</svg>
),
map: ({ className }) => (
<svg
viewBox="0 0 24 24"
aria-hidden
fill="currentColor"
className={className ?? "h-5 w-5 text-[#0e7dc2]"}
>
<path d="M15 6l-6 2-4-2v12l4 2 6-2 4 2V8l-4-2z" />
</svg>
),
};