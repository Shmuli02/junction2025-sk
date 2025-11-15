import { cn, formatDate } from "@/lib/utils";
import { AlertTriangle, Info } from "lucide-react";

interface DisclaimerBannerProps {
  lastUpdated?: string;
  className?: string;
  variant?: "info" | "warning";
}

export function DisclaimerBanner({
  lastUpdated,
  className,
  variant = "info",
}: DisclaimerBannerProps) {
  const isWarning = variant === "warning";
  const Icon = isWarning ? AlertTriangle : Info;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border p-4 md:p-5",
        isWarning
          ? "border-orange-500/40 bg-orange-500/5 text-orange-700"
          : "border-primary/30 bg-primary/5 text-primary",
        className,
      )}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <span className="mt-0.5">
            <Icon className="h-5 w-5 flex-shrink-0" />
          </span>
          <div className="space-y-1">
            <p className="text-sm font-semibold uppercase tracking-wide">
              Accuracy Disclaimer
            </p>
            <p className="text-sm leading-relaxed opacity-80">
              Security assessments leverage both public and proprietary
              intelligence. Validate critical findings with the vendor&apos;s
              security team before making high-impact decisions.
            </p>
          </div>
        </div>

        {lastUpdated && (
          <div
            className={cn(
              "rounded-xl px-4 py-2 text-xs font-medium uppercase tracking-wide",
              isWarning
                ? "bg-orange-500/10 text-orange-700"
                : "bg-primary/10 text-primary",
            )}
          >
            Last reviewed {formatDate(lastUpdated)}
          </div>
        )}
      </div>
    </div>
  );
}
