import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[110px] w-full rounded-lg border border-steel bg-white px-4 py-3 text-base text-ink placeholder:text-ink/35 outline-none transition-colors duration-150 resize-none",
        "focus-visible:border-cool focus-visible:ring-2 focus-visible:ring-cool/25",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
