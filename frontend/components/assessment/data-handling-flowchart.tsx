"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Assessment, ReportSize } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Database,
  Lock,
  Network,
  ShieldCheck,
} from "lucide-react";

interface DataHandlingFlowchartProps {
  data: Assessment["dataHandling"];
  detailLevel?: ReportSize;
}

export function DataHandlingFlowchart({
  data,
  detailLevel = "medium",
}: DataHandlingFlowchartProps) {
  const showAllRegions = detailLevel === "full";
  const showAllEndpoints = detailLevel === "full";
  const showAllSubProcessors = detailLevel !== "small";

  const visibleRegions = showAllRegions
    ? data.storage.regions
    : data.storage.regions.slice(0, detailLevel === "small" ? 1 : 3);

  const visibleEndpoints = showAllEndpoints
    ? data.transmission.endpoints
    : data.transmission.endpoints.slice(0, detailLevel === "small" ? 1 : 3);

  const visibleSubProcessors = showAllSubProcessors
    ? data.transmission.subProcessors
    : data.transmission.subProcessors.slice(0, 1);

  const storageHighlights = [
    `Location: ${data.storage.location}`,
    `Encryption at Rest: ${data.storage.encryptionAtRest ? "Enabled" : "Disabled"}`,
    data.storage.cloudProvider
      ? `Cloud Provider: ${data.storage.cloudProvider}`
      : null,
  ].filter(Boolean) as string[];

  const usageHighlights = [
    ["Analytics", data.usage.analytics],
    ["Advertising", data.usage.advertising],
    ["AI Training", data.usage.aiTraining],
    ["User Deletion", data.usage.userCanDelete],
  ] as const;

  const stages = [
    {
      id: "storage",
      title: "Storage",
      description:
        detailLevel === "small"
          ? "Where and how data lives at rest."
          : "Understand physical location, residency guarantees, and encryption posture.",
      icon: <Database className="h-6 w-6" />,
      accent: "from-blue-500/90 to-cyan-500/90",
      highlights: storageHighlights,
      chips: visibleRegions.map((region) => ({
        label: region,
        tone: "region" as const,
      })),
      footer:
        !showAllRegions && data.storage.regions.length > visibleRegions.length
          ? `+${data.storage.regions.length - visibleRegions.length} more region${
              data.storage.regions.length - visibleRegions.length > 1 ? "s" : ""
            }`
          : undefined,
    },
    {
      id: "transmission",
      title: "Transmission",
      description:
        detailLevel === "small"
          ? "How data moves between services."
          : "Review network paths, sub-processors, and transport encryption.",
      icon: <Network className="h-6 w-6" />,
      accent: "from-purple-500/90 to-indigo-500/90",
      highlights: [
        `TLS Version: ${data.transmission.encryptionInTransit.tls}`,
        `Certificate Verified: ${
          data.transmission.encryptionInTransit.certVerified ? "Yes" : "No"
        }`,
      ],
      chips: [
        ...visibleEndpoints.map((endpoint) => ({
          label: endpoint,
          tone: "endpoint" as const,
        })),
        ...visibleSubProcessors.map((processor) => ({
          label: processor,
          tone: "processor" as const,
        })),
      ],
      footer:
        !showAllEndpoints && data.transmission.endpoints.length > visibleEndpoints.length
          ? `+${data.transmission.endpoints.length - visibleEndpoints.length} additional endpoint${
              data.transmission.endpoints.length - visibleEndpoints.length > 1 ? "s" : ""
            }`
          : undefined,
      secondaryFooter:
        !showAllSubProcessors &&
        data.transmission.subProcessors.length > visibleSubProcessors.length
          ? `Sub-processors trimmed for ${detailLevel} view`
          : undefined,
    },
    {
      id: "usage",
      title: "Usage",
      description:
        detailLevel === "small"
          ? "How data is put to work."
          : "Track downstream data usage, retention policy, and AI involvement.",
      icon: <Activity className="h-6 w-6" />,
      accent: "from-emerald-500/90 to-teal-500/90",
      highlights: [
        `Retention: ${data.usage.retentionPolicy}`,
        detailLevel !== "small"
          ? `AI Training: ${data.usage.aiTraining ? "Uses customer data" : "Does not use customer data"}`
          : null,
      ].filter(Boolean) as string[],
      chips: usageHighlights.map(([label, value]) => ({
        label,
        tone: value ? "positive" : "negative",
        value,
      })),
      footer:
        detailLevel === "full"
          ? undefined
          : "Switch to Full detail for granular policy statements.",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6 md:grid md:grid-cols-[repeat(3,minmax(0,1fr))]">
        {stages.map((stage, index) => (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative"
          >
            <Card className="h-full border border-primary/10 shadow-sm transition-shadow duration-300 hover:shadow-xl">
              <CardContent className="flex h-full flex-col gap-4 p-6">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "rounded-xl p-3 text-white shadow-lg",
                      "bg-gradient-to-br",
                      stage.accent,
                    )}
                  >
                    {stage.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{stage.title}</h3>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      {detailLevel === "small"
                        ? "Core insight"
                        : detailLevel === "medium"
                        ? "Key signals"
                        : "Deep dive"}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{stage.description}</p>

                <ul className="space-y-2 text-sm">
                  {stage.highlights.map((highlight, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 rounded-lg bg-muted/30 p-3 leading-relaxed"
                    >
                      <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {stage.chips.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {stage.chips.map((chip, idx) => (
                      <Badge
                        key={`${stage.id}-${chip.label}-${idx}`}
                        variant="outline"
                        className={cn(
                          "flex items-center gap-1 border-dashed text-xs font-medium",
                          chip.tone === "positive" && chip.value
                            ? "border-green-500/40 bg-green-500/10 text-green-600"
                            : chip.tone === "negative" && chip.value === false
                            ? "border-red-500/40 bg-red-500/10 text-red-600"
                            : chip.tone === "endpoint"
                            ? "border-blue-500/30 bg-blue-500/10 text-blue-600"
                            : chip.tone === "processor"
                            ? "border-purple-500/30 bg-purple-500/10 text-purple-600"
                            : "border-primary/20 bg-primary/5 text-primary",
                        )}
                      >
                        {chip.label}
                        {typeof chip.value === "boolean" && (
                          <Lock className="ml-1 h-3 w-3 opacity-60" />
                        )}
                      </Badge>
                    ))}
                  </div>
                )}

                {(stage.footer || stage.secondaryFooter) && (
                  <div className="rounded-lg border border-dashed border-muted-foreground/20 bg-muted/20 p-3 text-xs text-muted-foreground">
                    {stage.footer}
                    {stage.secondaryFooter && (
                      <span className="mt-1 block text-[11px]">
                        {stage.secondaryFooter}
                      </span>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {index < stages.length - 1 && (
              <div className="hidden h-12 items-center justify-center md:flex">
                <ArrowRight className="h-6 w-6 text-muted-foreground/40" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
