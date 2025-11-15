"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Assessment, ReportSize } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  CalendarClock,
  GitBranch,
  History,
  RefreshCcw,
  Shield,
} from "lucide-react";

interface ReleaseLifecycleTimelineProps {
  lifecycle: Assessment["releaseLifecycle"];
  detailLevel?: ReportSize;
}

export function ReleaseLifecycleTimeline({
  lifecycle,
  detailLevel = "medium",
}: ReleaseLifecycleTimelineProps) {
  const historyLimit =
    detailLevel === "full" ? undefined : detailLevel === "medium" ? 4 : 2;
  const visibleHistory = historyLimit
    ? lifecycle.versionHistory.slice(0, historyLimit)
    : lifecycle.versionHistory;

  const showEol =
    detailLevel === "full" && lifecycle.eolDates.length > 0;

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <Card className="border border-primary/10">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="text-lg">Release Cadence</CardTitle>
              <p className="text-sm text-muted-foreground">
                How quickly patches land and versions advance.
              </p>
            </div>
            <Badge variant="outline" className="border-primary/30 text-primary">
              {lifecycle.latestVersion || "Continuous"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 text-sm">
            <InfoRow
              icon={<RefreshCcw className="h-4 w-4 text-primary" />}
              label="Release Frequency"
              value={lifecycle.releaseFrequency}
            />
            <InfoRow
              icon={<CalendarClock className="h-4 w-4 text-primary" />}
              label="Patch Cadence"
              value={lifecycle.patchCadence}
            />
            {lifecycle.ltsVersions.length > 0 && (
              <InfoRow
                icon={<Shield className="h-4 w-4 text-primary" />}
                label="LTS Coverage"
                value={
                  <div className="flex flex-wrap gap-2">
                    {lifecycle.ltsVersions.map((version) => (
                      <Badge
                        key={version}
                        variant="secondary"
                        className="border border-green-500/40 bg-green-500/10 text-green-600"
                      >
                        {version}
                      </Badge>
                    ))}
                  </div>
                }
              />
            )}
          </div>

          {showEol && (
            <div className="rounded-xl border border-dashed border-red-500/40 bg-red-500/5 p-4 text-sm text-red-600">
              <p className="font-semibold uppercase tracking-wide text-xs">
                End-of-Life Warnings
              </p>
              <ul className="mt-2 space-y-1">
                {lifecycle.eolDates.map((entry) => (
                  <li key={`${entry.version}-${entry.date}`}>
                    Version <span className="font-semibold">{entry.version}</span>{" "}
                    goes EOL on {formatDate(entry.date)}.
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border border-primary/10">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Version History</CardTitle>
          <p className="text-sm text-muted-foreground">
            Recent releases and documented security fixes.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {visibleHistory.length > 0 ? (
            <ol className="relative space-y-4 border-l border-dashed border-primary/30 pl-4">
              {visibleHistory.map((entry, index) => (
                <motion.li
                  key={`${entry.version}-${entry.releaseDate}`}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ delay: index * 0.05 }}
                  className="ml-2 space-y-1"
                >
                  <span className="absolute -left-[37px] flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary shadow">
                    <GitBranch className="h-4 w-4" />
                  </span>

                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-foreground">
                      {entry.version}
                    </p>
                    <Badge variant="outline" className="border-blue-500/30 text-blue-600">
                      {formatDate(entry.releaseDate)}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {entry.securityFixes === 0 ? (
                      "No security fixes documented."
                    ) : (
                      <>
                        {entry.securityFixes} security fix
                        {entry.securityFixes > 1 ? "es" : ""} included.
                      </>
                    )}
                  </p>
                </motion.li>
              ))}
            </ol>
          ) : (
            <div className="rounded-xl border border-dashed border-muted-foreground/30 bg-muted/10 p-6 text-center text-sm text-muted-foreground">
              <History className="mx-auto mb-2 h-5 w-5 opacity-60" />
              <p>
                {lifecycle.versionHistory.length === 0
                  ? "This product uses continuous delivery without discrete version milestones."
                  : "Timeline trimmed for this report size. Expand to Full for complete history."}
              </p>
            </div>
          )}

          {historyLimit && lifecycle.versionHistory.length > visibleHistory.length && (
            <p className="text-xs text-muted-foreground">
              Showing the latest {visibleHistory.length} releases. Switch to Full detail for complete history.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg bg-muted/20 p-3">
      <span className="mt-0.5">{icon}</span>
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <div className="text-sm font-medium text-foreground">{value}</div>
      </div>
    </div>
  );
}
