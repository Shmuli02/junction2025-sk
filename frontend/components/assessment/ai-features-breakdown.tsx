"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Assessment, ReportSize } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  Cloud,
  Cpu,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

interface AIFeaturesBreakdownProps {
  aiFeatures: Assessment["aiFeatures"];
  detailLevel?: ReportSize;
}

export function AIFeaturesBreakdown({
  aiFeatures,
  detailLevel = "medium",
}: AIFeaturesBreakdownProps) {
  if (!aiFeatures.hasAI) {
    return (
      <Card className="border border-green-500/30 bg-green-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base text-green-700">
            <ShieldCheck className="h-5 w-5" />
            No AI surface area detected
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-green-700/80">
          This product does not expose AI-powered experiences or use customer
          data for training. No additional review required for AI governance.
        </CardContent>
      </Card>
    );
  }

  const features =
    detailLevel === "full"
      ? aiFeatures.features
      : detailLevel === "medium"
      ? aiFeatures.features.slice(0, 2)
      : aiFeatures.features.slice(0, 1);

  const trimmed = features.length < aiFeatures.features.length;
  const processingLabel =
    aiFeatures.processingLocation === "local"
      ? "Processed on device"
      : aiFeatures.processingLocation === "cloud"
      ? "Processed in vendor cloud"
      : "Hybrid processing";

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <Card className="border border-primary/10">
        <CardHeader className="flex flex-row items-start justify-between gap-3 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Experience Highlights
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Capabilities surfaced to end users. Scope adapts by report size.
            </p>
          </div>
          {trimmed && (
            <Badge variant="outline" className="border-primary/40 text-primary">
              Compact View
            </Badge>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="rounded-xl border border-dashed border-primary/20 bg-muted/20 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-base font-semibold">{feature.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="border-purple-500/30 bg-purple-500/10 text-purple-600"
                >
                  AI
                </Badge>
              </div>

              {detailLevel === "full" ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {feature.dataAccess.map((dataset) => (
                    <Badge
                      key={dataset}
                      variant="outline"
                      className="border-orange-500/30 bg-orange-500/10 text-orange-600"
                    >
                      {dataset}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-xs text-muted-foreground">
                  Accesses {feature.dataAccess.length} data source
                  {feature.dataAccess.length > 1 ? "s" : ""}. Expand to Full for
                  granular list.
                </p>
              )}
            </div>
          ))}

          {trimmed && (
            <p className="text-xs text-muted-foreground">
              Additional AI capabilities are available in the full report.
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="border border-primary/10">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Governance Snapshot</CardTitle>
          <p className="text-sm text-muted-foreground">
            Review training posture, opt-out controls, and processing model.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <InfoTile
            icon={<Cpu className="h-5 w-5 text-purple-500" />}
            label="Training posture"
            value={
              aiFeatures.dataUsedForTraining
                ? "Customer data contributes to training."
                : "Customer data excluded from model training."
            }
            tone={aiFeatures.dataUsedForTraining ? "warning" : "positive"}
          />

          <InfoTile
            icon={<Workflow className="h-5 w-5 text-blue-500" />}
            label="Opt-out controls"
            value={
              aiFeatures.canOptOut
                ? "Administrators can disable AI usage per workspace."
                : "No opt-out provided; feature is always on."
            }
            tone={aiFeatures.canOptOut ? "positive" : "warning"}
          />

          <InfoTile
            icon={<Cloud className="h-5 w-5 text-teal-500" />}
            label="Processing model"
            value={processingLabel}
            tone={
              aiFeatures.processingLocation === "cloud" ? "warning" : "positive"
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}

interface InfoTileProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: "positive" | "warning";
}

function InfoTile({ icon, label, value, tone }: InfoTileProps) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4 text-sm shadow-sm",
        tone === "positive"
          ? "border-green-500/30 bg-green-500/5 text-green-700"
          : "border-orange-500/40 bg-orange-500/5 text-orange-700",
      )}
    >
      <div className="flex items-start gap-3">
        <span>{icon}</span>
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide opacity-80">{label}</p>
          <p className="font-medium leading-relaxed">{value}</p>
        </div>
      </div>
    </div>
  );
}
