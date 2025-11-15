"use client"

import { motion } from "framer-motion"
import { Calendar, Package, AlertTriangle, CheckCircle2, Clock, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Assessment } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface ReleaseLifecycleTimelineProps {
  releaseLifecycle: Assessment["releaseLifecycle"]
  reportSize?: "small" | "medium" | "full"
}

export function ReleaseLifecycleTimeline({ releaseLifecycle, reportSize = "medium" }: ReleaseLifecycleTimelineProps) {
  const recentVersions = reportSize === "small" 
    ? releaseLifecycle.versionHistory.slice(0, 3)
    : reportSize === "medium"
    ? releaseLifecycle.versionHistory.slice(0, 5)
    : releaseLifecycle.versionHistory

  if (reportSize === "small") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Release Lifecycle
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <span className="text-sm text-muted-foreground">Latest Version:</span>
            <Badge variant="secondary" className="ml-2">{releaseLifecycle.latestVersion}</Badge>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Update Frequency:</span>
            <span className="ml-2 text-sm font-medium">{releaseLifecycle.releaseFrequency}</span>
          </div>
          {releaseLifecycle.eolDates.length > 0 && (
            <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
              <p className="text-sm">
                {releaseLifecycle.eolDates.length} version(s) reached end-of-life
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Release Lifecycle
        </CardTitle>
        <CardDescription>
          Version history, update cadence, and end-of-life dates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Version & Update Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Package className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Latest Version</span>
            </div>
            <p className="text-2xl font-bold">{releaseLifecycle.latestVersion}</p>
          </div>

          <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-muted-foreground">Update Frequency</span>
            </div>
            <p className="text-lg font-semibold">{releaseLifecycle.releaseFrequency}</p>
          </div>

          <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-purple-500" />
              <span className="text-sm text-muted-foreground">Patch Cadence</span>
            </div>
            <p className="text-sm font-medium">{releaseLifecycle.patchCadence}</p>
          </div>
        </div>

        {/* LTS Versions */}
        {releaseLifecycle.ltsVersions.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Long-Term Support (LTS) Versions
            </h4>
            <div className="flex flex-wrap gap-2">
              {releaseLifecycle.ltsVersions.map((version) => (
                <Badge key={version} variant="secondary" className="bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/40">
                  {version}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* End-of-Life Versions */}
        {releaseLifecycle.eolDates.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              End-of-Life Versions
            </h4>
            <div className="space-y-2">
              {releaseLifecycle.eolDates.map((eol, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    <span className="font-medium">{eol.version}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    EOL: {formatDate(eol.date)}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Version History Timeline */}
        {releaseLifecycle.versionHistory.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Recent Version History
            </h4>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

              <div className="space-y-4">
                {recentVersions.map((version, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-12"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-3 top-2 h-3 w-3 rounded-full bg-primary border-2 border-background" />

                    <div className={cn(
                      "p-4 rounded-lg border transition-all hover:shadow-md",
                      version.securityFixes > 0 
                        ? "bg-red-500/5 border-red-500/20" 
                        : "bg-card border-border"
                    )}>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{version.version}</span>
                            {version.securityFixes > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {version.securityFixes} security fix{version.securityFixes > 1 ? "es" : ""}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5" />
                            {formatDate(version.releaseDate)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
