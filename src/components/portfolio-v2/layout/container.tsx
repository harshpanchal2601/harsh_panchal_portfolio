import { cn } from "@/lib/utils";

type PortfolioContainerProps = Readonly<{
  children: React.ReactNode;
  className?: string;
}>;

export function PortfolioContainer({
  children,
  className,
}: PortfolioContainerProps) {
  return (
    <div className={cn("portfolio-v2-container", className)}>{children}</div>
  );
}
