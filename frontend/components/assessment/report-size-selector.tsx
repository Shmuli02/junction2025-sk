"use client";

import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { ReportSize } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const OPTIONS: Record<
  ReportSize,
  { label: string; readTime: string; description: string; emphasis: string }
> = {
  small: {
    label: "Small",
    readTime: "2 min",
    description: "Executive summary with essential security signals.",
    emphasis: "Highlight headline risk and trust score.",
  },
  medium: {
    label: "Medium",
    readTime: "5 min",
    description: "Balanced detail with all key controls and incidents.",
    emphasis: "Ideal for most vendor reviews.",
  },
  full: {
    label: "Full",
    readTime: "10 min",
    description: "Deep dive with complete citations and data breakdowns.",
    emphasis: "Use for board briefings or audits.",
  },
};

const DEFAULT_PERSIST_KEY = "security-assessor.report-size";

interface ReportSizeSelectorProps {
  value: ReportSize;
  onChange: (size: ReportSize) => void;
  persistKey?: string;
  className?: string;
}

export function ReportSizeSelector({
  value,
  onChange,
  persistKey = DEFAULT_PERSIST_KEY,
  className,
}: ReportSizeSelectorProps) {
  useEffect(() => {
    if (!persistKey) return;

    try {
      const stored = window.localStorage.getItem(persistKey) as ReportSize | null;
      if (stored && stored !== value && isReportSize(stored)) {
        onChange(stored);
      }
    } catch {
      // ignore storage errors
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persistKey]);

  useEffect(() => {
    if (!persistKey) return;

    try {
      window.localStorage.setItem(persistKey, value);
    } catch {
      // ignore storage errors
    }
  }, [value, persistKey]);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-primary/10 bg-primary/5 p-3 backdrop-blur",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10" />
      <div className="relative flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-primary/80">
              Report Detail Level
            </p>
            <h3 className="text-lg font-semibold">Adjust depth & read time</h3>
          </div>
          <Badge
            variant="outline"
            className="border-primary/30 bg-background/60 text-primary"
          >
            <Clock className="mr-1 h-3.5 w-3.5" />
            {OPTIONS[value].readTime}
          </Badge>
        </div>

        <div className="grid gap-2 md:grid-cols-3">
          {(Object.keys(OPTIONS) as ReportSize[]).map((size) => {
            const option = OPTIONS[size];
            const isActive = size === value;

            return (
              <button
                key={size}
                type="button"
                onClick={() => onChange(size)}
                className={cn(
                  "relative overflow-hidden rounded-xl border p-4 text-left transition-all duration-200",
                  "bg-background/80 hover:border-primary/50 hover:shadow-lg",
                  isActive
                    ? "border-primary bg-gradient-to-br from-primary/10 via-primary/5 to-purple-500/10 shadow-lg"
                    : "border-white/10",
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="selector-pill"
                    className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-primary/15 via-primary/10 to-purple-500/10"
                    transition={{ type: "spring", stiffness: 250, damping: 25 }}
                  />
                )}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold uppercase tracking-wide">
                    {option.label}
                  </span>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "text-[11px]",
                      isActive
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {option.readTime}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {option.description}
                </p>
                <p className="mt-3 text-xs font-medium text-primary">
                  {option.emphasis}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function isReportSize(value: string): value is ReportSize {
  return value === "small" || value === "medium" || value === "full";
}
