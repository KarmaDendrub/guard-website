import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // primary navy
        default:
          "bg-navy text-ink hover:bg-navy-dark shadow-card hover:shadow-card-hover",
        // emergency red CTA
        danger:
          "bg-danger text-white hover:bg-[#c41f1f] shadow-card hover:shadow-card-hover",
        // gold outline (on dark backgrounds)
        outlineGold:
          "border-2 border-gold text-gold bg-transparent hover:bg-gold hover:text-ink",
        // gold solid
        gold: "bg-gold text-ink hover:bg-gold-dark shadow-card",
        outline:
          "border border-border bg-white text-ink hover:border-gold hover:text-ink",
        ghost: "text-ink hover:bg-light hover:text-ink",
        link: "text-ink underline-offset-4 hover:text-gold hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-4 text-sm",
        lg: "h-14 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
