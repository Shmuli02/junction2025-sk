"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Assessment, ReportSize } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  Globe,
  Laptop,
  Monitor,
  Smartphone,
  TabletSmartphone,
  Terminal,
} from "lucide-react";

type Platform = Assessment["platformSupport"]["platforms"][number];
type PlatformName = Platform["name"];

const platformIcons: Record<PlatformName, JSX.Element> = {
  macOS: <Laptop className="h-5 w-5" />,
  Windows: <Monitor className="h-5 w-5" />,
  Linux: <Terminal className="h-5 w-5" />,
  iOS: <TabletSmartphone className="h-5 w-5" />,
  Android: <Smartphone className="h-5 w-5" />,
  Web: <Globe className="h-5 w-5" />,
};

const statusStyles: Record<
  "supported" | "unsupported",
  { badge: string; label: string }
> = {
  supported: {
    badge: "bg-green-500/10 text-green-500 border-green-500/30",
    label: "Supported",
  },
  unsupported: {
    badge: "bg-red-500/10 text-red-500 border-red-500/30",
    label: "Not Supported",
  },
};

interface PlatformSupportGridProps {
  platforms: Platform[];
  versionDifferences?: string;
  detailLevel?: ReportSize;
}

export function PlatformSupportGrid({
  platforms,
  versionDifferences,
  detailLevel = "medium",
}: PlatformSupportGridProps) {
  const showSecurityModel = detailLevel === "full";
  const showVersionNotes = Boolean(versionDifferences);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {platforms.map((platform) => {
          const key = platform.name;
          const status = platform.supported ? "supported" : "unsupported";
          const icon = platformIcons[key];
          const showVersions = platform.versions && detailLevel !== "small";

          return (
            <Card
              key={key}
              className={cn(
                "relative overflow-hidden border border-primary/10 transition-all duration-300 hover:border-primary/40 hover:shadow-lg",
                !platform.supported && "opacity-75",
              )}
            >
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "rounded-xl p-3 shadow-inner",
                        platform.supported
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {icon}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-semibold leading-tight">
                        {platform.name}
                      </h4>
                      {showVersions && (
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                          {platform.versions}
                        </p>
                      )}
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "uppercase tracking-wide text-[11px]",
                      statusStyles[status].badge,
                    )}
                  >
                    {statusStyles[status].label}
                  </Badge>
                </div>

                {platform.securityModel && detailLevel !== "small" && (
                  <div className="rounded-lg bg-muted/40 p-3 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Security Model:
                    </span>{" "}
                    {showSecurityModel
                      ? platform.securityModel
                      : truncate(platform.securityModel, 80)}
                  </div>
                )}
              </CardContent>

              {platform.supported && (
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/40 via-purple-500/40 to-blue-500/40" />
              )}
            </Card>
          );
        })}
      </div>

      {showVersionNotes && (
        <div className="rounded-xl border border-dashed border-primary/30 bg-primary/5 p-4 text-sm leading-relaxed text-primary">
          <span className="font-semibold uppercase tracking-wide text-xs text-primary/80">
            Version Differences
          </span>
          <p className="mt-2 text-primary">
            {detailLevel === "small"
              ? truncate(versionDifferences!, 140)
              : versionDifferences}
          </p>
        </div>
      )}
    </div>
  );
}

function truncate(value: string, length: number) {
  return value.length <= length ? value : `${value.slice(0, length)}…`;
}
