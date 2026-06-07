"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  ...props
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={
        reduceMotion ? { opacity: 1 } : { opacity: 0, y: 28, filter: "blur(8px)" }
      }
      transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.22, margin: "0px 0px -56px 0px" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
