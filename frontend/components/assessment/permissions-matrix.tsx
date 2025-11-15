"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Assessment, ReportSize } from "@/lib/types";
import { ShieldAlert, ShieldCheck, ShieldMinus } from "lucide-react";

type PermissionEntry =
  Assessment["permissions"]["required"][number]
  | Assessment["permissions"]["optional"][number];

const riskColors: Record<PermissionEntry["riskLevel"], string> = {
  low: "bg-green-500/10 text-green-600 border-green-500/30",
  medium: "bg-yellow-500/10 text-yellow-600 border-yellow-500/40",
  high: "bg-red-500/10 text-red-600 border-red-500/40",
};

interface PermissionsMatrixProps {
  permissions: Assessment["permissions"];
  detailLevel?: ReportSize;
}

export function PermissionsMatrix({
  permissions,
  detailLevel = "medium",
}: PermissionsMatrixProps) {
  const maxRequired =
    detailLevel === "small" ? 3 : detailLevel === "medium" ? 6 : undefined;
  const maxOptional =
    detailLevel === "full" ? undefined : detailLevel === "medium" ? 4 : 0;

  const required = maxRequired
    ? permissions.required.slice(0, maxRequired)
    : permissions.required;
  const optional =
    maxOptional === 0
      ? []
      : maxOptional
      ? permissions.optional.slice(0, maxOptional)
      : permissions.optional;

  const trimmedRequired = required.length < permissions.required.length;
  const trimmedOptional = optional.length < permissions.optional.length;

  const showOverPermissioning =
    permissions.overPermissioningRisk && detailLevel !== "small";

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <PermissionColumn
        title="Required Permissions"
        description="Needed for baseline functionality."
        entries={required}
        trimmed={trimmedRequired}
      />
      <PermissionColumn
        title="Optional & Elevated"
        description={
          maxOptional === 0
            ? "Switch to Medium or Full to view optional scopes."
            : "Review carefully before granting access."
        }
        entries={optional}
        trimmed={trimmedOptional}
        emptyFallback={
          maxOptional === 0
            ? {
                title: "Hidden in compact view",
                description:
                  "Optional permissions are available in Medium and Full detail levels.",
                icon: <ShieldMinus className="h-5 w-5 text-muted-foreground" />,
              }
            : undefined
        }
      />

      {showOverPermissioning && (
        <Card className="lg:col-span-2 border-red-500/40 bg-red-500/5">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-5 w-5 text-red-500" />
              <CardTitle className="text-sm font-semibold text-red-600">
                Over-Permissioning Risk
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0 text-sm text-red-600">
            {permissions.overPermissioningRisk}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

interface PermissionColumnProps {
  title: string;
  description: string;
  entries: PermissionEntry[];
  trimmed: boolean;
  emptyFallback?: {
    title: string;
    description: string;
    icon: React.ReactNode;
  };
}

function PermissionColumn({
  title,
  description,
  entries,
  trimmed,
  emptyFallback,
}: PermissionColumnProps) {
  return (
    <Card className="h-full border border-primary/10">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {entries.length > 0 ? (
          entries.map((entry) => (
            <div
              key={`${entry.name}-${entry.riskLevel}`}
              className="rounded-xl border border-dashed border-muted-foreground/20 bg-muted/20 p-3 shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-primary/5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">{entry.name}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {entry.justification}
                  </p>
                </div>
                <Badge variant="outline" className={riskColors[entry.riskLevel]}>
                  {entry.riskLevel.toUpperCase()}
                </Badge>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-muted-foreground/30 bg-muted/10 p-6 text-center">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              {emptyFallback?.icon ?? (
                <ShieldCheck className="h-5 w-5 text-muted-foreground" />
              )}
              <p className="text-sm font-semibold">
                {emptyFallback?.title ?? "No permissions listed"}
              </p>
              <p className="text-xs text-muted-foreground/80 max-w-[240px]">
                {emptyFallback?.description ??
                  "No additional scopes requested for this category."}
              </p>
            </div>
          </div>
        )}

        {trimmed && (
          <p className="text-xs text-muted-foreground/80">
            Additional entries available in expanded report sizes.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
