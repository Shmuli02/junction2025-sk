"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Shield,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  MapPin,
  Globe,
  Building2,
  CalendarClock,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Assessment, ReportSize } from "@/lib/types";
import { getAssessment } from "@/lib/api";
import { getScoreColor, formatDate, truncate } from "@/lib/utils";
import {
  PlatformSupportGrid,
  DataHandlingFlowchart,
  PermissionsMatrix,
  ReleaseLifecycleTimeline,
  AIFeaturesBreakdown,
  SourcesBreakdown,
  ReportSizeSelector,
  DisclaimerBanner,
} from "@/components/assessment";

export default function AssessmentPage() {
  const params = useParams();
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reportSize, setReportSize] = useState<ReportSize>("medium");

  useEffect(() => {
    const fetchAssessment = async () => {
      if (params.id) {
        const data = await getAssessment(params.id as string);
        setAssessment(data);
        setIsLoading(false);
      }
    };

    fetchAssessment();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-block animate-spin">
            <Shield className="h-16 w-16 text-primary" />
          </div>
          <p className="text-xl text-muted-foreground">Loading assessment...</p>
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-xl">Assessment not found</p>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getScoreIcon = (score: number) => {
    if (score >= 71) return <CheckCircle2 className="h-8 w-8 text-green-500" />;
    if (score >= 41) return <AlertTriangle className="h-8 w-8 text-yellow-500" />;
    return <XCircle className="h-8 w-8 text-red-500" />;
  };

  const adminControls = Object.entries(assessment.adminControls);
  const controlLimit = reportSize === "small" ? 4 : adminControls.length;
  const visibleControls = adminControls.slice(0, controlLimit);
  const controlsTrimmed = visibleControls.length < adminControls.length;

  const cveLimit =
    reportSize === "full"
      ? assessment.vulnerabilities.recentCVEs.length
      : reportSize === "medium"
      ? 2
      : 0;
  const visibleCVEs = assessment.vulnerabilities.recentCVEs.slice(0, cveLimit);
  const cveTrimmed =
    cveLimit > 0 &&
    visibleCVEs.length < assessment.vulnerabilities.recentCVEs.length;

  const vendorNarrative =
    reportSize === "full"
      ? assessment.vendorInfo.securityTrackRecord
      : truncate(
          assessment.vendorInfo.securityTrackRecord,
          reportSize === "small" ? 140 : 240,
        );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="text-6xl">{assessment.product.logo}</div>
              <div>
                <h1 className="text-4xl font-bold">{assessment.product.name}</h1>
                <p className="text-xl text-muted-foreground">
                  by {assessment.product.vendor}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge>{assessment.product.category}</Badge>
                  {assessment.cached && (
                    <Badge variant="outline">Cached</Badge>
                  )}
                  {assessment.product.website && (
                    <Badge variant="outline" className="text-xs">
                      {assessment.product.website.replace(/^https?:\/\//, "")}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="relative inline-flex items-center justify-center">
                <div
                  className={`absolute inset-0 rounded-full blur-xl opacity-30 ${getScoreColor(
                    assessment.trustScore.score,
                  ).replace("text-", "bg-")}`}
                ></div>
                <div className="relative bg-card border-4 border-primary rounded-full w-32 h-32 flex flex-col items-center justify-center">
                  {getScoreIcon(assessment.trustScore.score)}
                  <span
                    className={`text-4xl font-bold ${getScoreColor(
                      assessment.trustScore.score,
                    )}`}
                  >
                    {assessment.trustScore.score}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Trust Score
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ReportSizeSelector
            value={reportSize}
            onChange={setReportSize}
            className="shadow-lg"
          />
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]"
        >
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>
                Product narrative and vendor context tailored to your report size.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                {assessment.product.description}
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-primary/10 bg-primary/5 p-4">
                  <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
                    <Building2 className="h-4 w-4" />
                    Vendor Snapshot
                  </h4>
                  <dl className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <InfoRow label="Headquarters" icon={<MapPin className="h-3.5 w-3.5" />}>
                      {assessment.vendorInfo.headquarters}
                    </InfoRow>
                    <InfoRow label="Jurisdiction" icon={<Globe className="h-3.5 w-3.5" />}>
                      {assessment.vendorInfo.jurisdiction}
                    </InfoRow>
                    <InfoRow label="Founded" icon={<CalendarClock className="h-3.5 w-3.5" />}>
                      {assessment.vendorInfo.founded}
                    </InfoRow>
                  </dl>
                </div>

                <div className="rounded-xl border border-muted-foreground/20 bg-muted/20 p-4">
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Typical Use Cases
                  </h4>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {assessment.product.usage}
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-dashed border-primary/30 bg-primary/5 p-4 text-sm text-primary">
                {vendorNarrative}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trust Score Analysis</CardTitle>
              <CardDescription>
                Why this score was assigned and confidence behind it.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed">
                {assessment.trustScore.rationale}
              </p>
              <div className="rounded-xl border border-dashed border-primary/30 bg-primary/5 p-3 text-sm text-primary">
                Confidence level: {assessment.trustScore.confidence}%
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CalendarClock className="h-4 w-4" />
                Last assessed {formatDate(assessment.timestamp)}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Platform Support</CardTitle>
              <CardDescription>
                Evaluate availability across devices and operating systems.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PlatformSupportGrid
                platforms={assessment.platformSupport.platforms}
                versionDifferences={assessment.platformSupport.versionDifferences}
                detailLevel={reportSize}
              />
            </CardContent>
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Data Handling Journey</CardTitle>
              <CardDescription>
                Storage, transmission, and usage policies visualized as a flow.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataHandlingFlowchart
                data={assessment.dataHandling}
                detailLevel={reportSize}
              />
            </CardContent>
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Admin Controls</CardTitle>
              <CardDescription>
                Available security levers for administrators.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {visibleControls.map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center gap-2 rounded-lg border border-muted-foreground/20 bg-muted/20 p-3"
                  >
                    {value ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <span className="text-sm capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                  </div>
                ))}
              </div>
              {controlsTrimmed && (
                <p className="text-xs text-muted-foreground">
                  Additional controls available in expanded report sizes.
                </p>
              )}
            </CardContent>
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Permissions Matrix</CardTitle>
              <CardDescription>
                Risk-coded access requirements and optional scopes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PermissionsMatrix
                permissions={assessment.permissions}
                detailLevel={reportSize}
              />
            </CardContent>
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Release Lifecycle</CardTitle>
              <CardDescription>
                Patch cadence, LTS coverage, and recent releases.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReleaseLifecycleTimeline
                lifecycle={assessment.releaseLifecycle}
                detailLevel={reportSize}
              />
            </CardContent>
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>AI Features</CardTitle>
              <CardDescription>
                Capability inventory and governance posture.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AIFeaturesBreakdown
                aiFeatures={assessment.aiFeatures}
                detailLevel={reportSize}
              />
            </CardContent>
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Vulnerability Landscape</CardTitle>
              <CardDescription>
                Severity mix and recent CVEs with context.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <SeverityTile
                  label="Critical"
                  value={assessment.vulnerabilities.severityBreakdown.critical}
                  className="bg-red-500/10 text-red-500"
                />
                <SeverityTile
                  label="High"
                  value={assessment.vulnerabilities.severityBreakdown.high}
                  className="bg-orange-500/10 text-orange-500"
                />
                <SeverityTile
                  label="Medium"
                  value={assessment.vulnerabilities.severityBreakdown.medium}
                  className="bg-yellow-500/10 text-yellow-500"
                />
                <SeverityTile
                  label="Low"
                  value={assessment.vulnerabilities.severityBreakdown.low}
                  className="bg-blue-500/10 text-blue-500"
                />
              </div>

              {assessment.vulnerabilities.cisaKEV && (
                <div className="flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-500/5 p-4 text-sm text-red-600">
                  <ShieldAlert className="mt-0.5 h-5 w-5" />
                  <div>
                    <p className="font-semibold">CISA KEV Alert</p>
                    <p>
                      Known exploited vulnerabilities were identified. Prioritize
                      remediation and monitor advisories.
                    </p>
                  </div>
                </div>
              )}

              {visibleCVEs.length > 0 ? (
                <div className="space-y-3">
                  {visibleCVEs.map((cve) => (
                    <div
                      key={cve.id}
                      className="rounded-xl border border-dashed border-muted-foreground/30 bg-muted/20 p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-foreground">
                            {cve.id}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Published {formatDate(cve.publishedDate)}
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-purple-500/30 bg-purple-500/10 text-purple-600"
                        >
                          CVSS {cve.cvss.toFixed(1)}
                        </Badge>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {cve.description}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Status: {cve.patched ? "Patched" : "Outstanding"}
                      </p>
                    </div>
                  ))}
                  {cveTrimmed && (
                    <p className="text-xs text-muted-foreground">
                      Showing recent CVEs. Switch to Full detail for the complete
                      list.
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Detailed CVE records are hidden in the compact summary. Increase
                  the report size to review individual advisories.
                </p>
              )}
            </CardContent>
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Sources &amp; Citations</CardTitle>
              <CardDescription>
                Transparency across public and confidential intelligence.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SourcesBreakdown
                sources={assessment.sources}
                detailLevel={reportSize}
              />
            </CardContent>
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Compliance &amp; Certifications</CardTitle>
              <CardDescription>
                Regulatory posture and attestation coverage.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {(reportSize === "small"
                  ? assessment.compliance.certifications.slice(0, 4)
                  : reportSize === "medium"
                  ? assessment.compliance.certifications.slice(0, 6)
                  : assessment.compliance.certifications
                ).map((cert) => (
                  <Badge key={cert} variant="secondary" className="text-sm">
                    {cert}
                  </Badge>
                ))}
              </div>
              {reportSize !== "full" &&
                assessment.compliance.certifications.length >
                  (reportSize === "small" ? 4 : 6) && (
                  <p className="text-xs text-muted-foreground">
                    Additional certifications available in Full detail.
                  </p>
                )}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {reportSize === "small"
                  ? truncate(assessment.compliance.dataHandlingSummary, 180)
                  : assessment.compliance.dataHandlingSummary}
              </p>
              <p className="text-xs text-muted-foreground">
                Data Processing Agreement Available:{" "}
                <span className="font-semibold text-foreground">
                  {assessment.compliance.dpa ? "Yes" : "No"}
                </span>
              </p>
            </CardContent>
          </Card>
        </motion.section>

        <DisclaimerBanner
          lastUpdated={assessment.timestamp}
          variant={reportSize === "small" ? "warning" : "info"}
        />
      </div>
    </div>
  );
}

interface InfoRowProps {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function InfoRow({ label, icon, children }: InfoRowProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground">{icon}</span>
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="text-sm text-foreground">{children}</p>
      </div>
    </div>
  );
}

interface SeverityTileProps {
  label: string;
  value: number;
  className: string;
}

function SeverityTile({ label, value, className }: SeverityTileProps) {
  return (
    <div className={`text-center p-4 rounded-lg ${className}`}>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
