"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Assessment, ReportSize } from "@/lib/types";
import { Info, ShieldCheck } from "lucide-react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface SourcesBreakdownProps {
  sources: Assessment["sources"];
  detailLevel?: ReportSize;
}

const SUMMARY_COLORS = {
  Public: "#2563eb",
  Confidential: "#f97316",
};

export function SourcesBreakdown({
  sources,
  detailLevel = "medium",
}: SourcesBreakdownProps) {
  const summaryData = [
    { name: "Public", value: sources.public.count },
    { name: "Confidential", value: sources.confidential.count },
  ];

  const total = summaryData.reduce((sum, slice) => sum + slice.value, 0);
  const showTypeBreakdown = detailLevel !== "small";
  const highlightSources =
    detailLevel === "full"
      ? [...sources.public.types, ...sources.confidential.types]
      : [...sources.public.types.slice(0, 3)];

  return (
    <Card className="border border-primary/10">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Source Transparency</CardTitle>
        <p className="text-sm text-muted-foreground">
          Balance of independently verifiable vs. confidential intelligence.
        </p>
      </CardHeader>
      <CardContent className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge
              variant="outline"
              className="border-blue-500/40 bg-blue-500/10 text-blue-600"
            >
              {sources.public.count} Public Sources
            </Badge>
            <Badge
              variant="outline"
              className="border-orange-500/40 bg-orange-500/10 text-orange-600"
            >
              {sources.confidential.count} Confidential Sources
            </Badge>
            <Badge variant="secondary">
              {total} total references
            </Badge>
          </div>

          <div className="h-[240px] w-full">
            {total === 0 ? (
              <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-muted-foreground/30 bg-muted/20 text-sm text-muted-foreground">
                <Info className="mr-2 h-4 w-4" />
                No sources recorded for this assessment.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={summaryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    startAngle={90}
                    endAngle={-270}
                  >
                    {summaryData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={SUMMARY_COLORS[entry.name as keyof typeof SUMMARY_COLORS]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<SourceTooltip total={total} />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {showTypeBreakdown ? (
            <div className="rounded-xl border border-dashed border-primary/20 bg-muted/20 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Source Mix
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {highlightSources.map((type) => (
                  <li
                    key={`${type.type}-${type.count}`}
                    className="flex items-center justify-between gap-3 rounded-lg border border-transparent bg-background/60 px-3 py-2 shadow-sm"
                  >
                    <span className="font-medium text-foreground">{type.type}</span>
                    <Badge variant="outline" className="border-primary/20 text-primary">
                      {type.count}
                    </Badge>
                  </li>
                ))}
              </ul>
              {detailLevel !== "full" &&
                sources.public.types.length + sources.confidential.types.length >
                  highlightSources.length && (
                  <p className="mt-3 text-xs text-muted-foreground">
                    Additional source types available in Full detail.
                  </p>
              )}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-muted-foreground/30 bg-muted/10 p-6 text-sm text-muted-foreground">
              <Info className="mb-2 h-5 w-5 opacity-60" />
              Source type breakdown is hidden in the compact view. Increase the report size for detailed citations.
            </div>
          )}

          {detailLevel === "full" && (
            <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-4 text-sm text-green-700">
              <div className="flex items-center gap-2 font-semibold">
                <ShieldCheck className="h-4 w-4" />
                Verification Strategy
              </div>
              <p className="mt-2 leading-relaxed">
                {Math.round((sources.public.count / Math.max(total, 1)) * 100)}% of claims are publicly auditable, with confidential intel preserved for internal use only. Each record links back to traceable evidence in the full report.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface SourceTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: { name: string; value: number } }>;
  total: number;
}

function SourceTooltip({ active, payload, total }: SourceTooltipProps) {
  if (!active || !payload?.length) return null;

  const slice = payload[0].payload;
  const percentage =
    total === 0 ? 0 : Math.round((slice.value / total) * 100);

  return (
    <div className="rounded-lg border border-muted-foreground/20 bg-background/90 px-3 py-2 shadow-md backdrop-blur">
      <p className="text-xs font-semibold text-foreground">{slice.name}</p>
      <p className="text-xs text-muted-foreground">
        {slice.value} sources ({percentage}%)
      </p>
    </div>
  );
}
