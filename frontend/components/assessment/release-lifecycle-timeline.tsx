"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, GitBranch, Shield, AlertCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface ReleaseLifecycleTimelineProps {
  releaseLifecycle: {
    latestVersion: string;
    releaseFrequency: string;
    patchCadence: string;
    eolDates: Array<{ version: string; date: string }>;
    ltsVersions: string[];
    versionHistory: Array<{
      version: string;
      releaseDate: string;
      securityFixes: number;
    }>;
  };
}

export function ReleaseLifecycleTimeline({ releaseLifecycle }: ReleaseLifecycleTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Release Lifecycle</CardTitle>
        <CardDescription>Version management and patch cadence</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4 bg-blue-500/5 border-blue-500/20">
            <div className="flex items-center gap-2 mb-2">
              <GitBranch className="h-5 w-5 text-blue-500" />
              <h5 className="font-semibold">Latest Version</h5>
            </div>
            <p className="text-2xl font-bold text-blue-500">{releaseLifecycle.latestVersion}</p>
          </div>

          <div className="border rounded-lg p-4 bg-green-500/5 border-green-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-green-500" />
              <h5 className="font-semibold">Release Frequency</h5>
            </div>
            <p className="text-sm text-muted-foreground">{releaseLifecycle.releaseFrequency}</p>
          </div>

          <div className="border rounded-lg p-4 bg-purple-500/5 border-purple-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-purple-500" />
              <h5 className="font-semibold">Patch Cadence</h5>
            </div>
            <p className="text-sm text-muted-foreground">{releaseLifecycle.patchCadence}</p>
          </div>
        </div>

        {/* LTS Versions */}
        {releaseLifecycle.ltsVersions.length > 0 && (
          <div className="border rounded-lg p-4">
            <h5 className="font-semibold mb-2">Long-Term Support (LTS) Versions</h5>
            <div className="flex flex-wrap gap-2">
              {releaseLifecycle.ltsVersions.map((version) => (
                <Badge key={version} variant="secondary" className="text-sm">
                  {version}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Version History */}
        {releaseLifecycle.versionHistory.length > 0 && (
          <div>
            <h5 className="font-semibold mb-3">Recent Releases</h5>
            <div className="space-y-2">
              {releaseLifecycle.versionHistory.slice(0, 5).map((release, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border rounded-lg p-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <GitBranch className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-mono font-semibold">{release.version}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(release.releaseDate)}
                      </p>
                    </div>
                  </div>
                  {release.securityFixes > 0 && (
                    <Badge variant="outline" className="gap-1">
                      <Shield className="h-3 w-3" />
                      {release.securityFixes} security fix{release.securityFixes !== 1 ? 'es' : ''}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* End of Life Dates */}
        {releaseLifecycle.eolDates.length > 0 && (
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
              <div className="flex-1">
                <h5 className="font-semibold mb-2 text-orange-500">End of Life (EOL) Versions</h5>
                <div className="space-y-1">
                  {releaseLifecycle.eolDates.map((eol, index) => (
                    <p key={index} className="text-sm text-muted-foreground">
                      <span className="font-mono">{eol.version}</span> - EOL: {formatDate(eol.date)}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
