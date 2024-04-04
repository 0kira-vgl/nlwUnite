import { ComponentProps } from "react";

interface IconButtonProps extends ComponentProps<"button"> {
  transparent?: boolean;
}

export function IconButton({ transparent, ...props }: IconButtonProps) {
  return (
    <button
      {...props}
      className={
        transparent
          ? "bg-black/20 border border-white/10 rounded-md p-1.5 hover:bg-slate-900/20"
          : "bg-white/10 border border-white/10 rounded-md p-1.5 hover:bg-slate-200/20"
      }
    />
  );
}
