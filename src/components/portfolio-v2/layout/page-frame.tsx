import { cn } from "@/lib/utils";

type PortfolioPageFrameProps = Readonly<{
  children: React.ReactNode;
  className?: string;
}>;

export function PortfolioPageFrame({
  children,
  className,
}: PortfolioPageFrameProps) {
  return <div className={cn("portfolio-v2-page", className)}>{children}</div>;
}
