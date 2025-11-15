"use client"

import { motion } from "framer-motion"
import { AlertTriangle, Clock, ExternalLink, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Assessment } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface DisclaimerBannerProps {
  assessment: Assessment
  reportSize?: "small" | "medium" | "full"
  className?: string
}

export function DisclaimerBanner({ assessment, reportSize = "medium", className }: DisclaimerBannerProps) {
  const confidenceLevel = assessment.trustScore.confidence
  const confidenceColor = confidenceLevel >= 80 
    ? "text-green-500" 
    : confidenceLevel >= 60 
    ? "text-yellow-500" 
    : "text-orange-500"

  const confidenceLabel = confidenceLevel >= 80 
    ? "High Confidence" 
    : confidenceLevel >= 60 
    ? "Moderate Confidence" 
    : "Lower Confidence"

  if (reportSize === "small") {
    return (
      <Card className={cn("border-orange-500/30 bg-orange-500/5", className)}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">
                Assessment accuracy depends on available information. Verify critical claims independently.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <Card className="border-orange-500/30 bg-gradient-to-r from-orange-500/5 via-amber-500/5 to-orange-500/5">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-orange-500/20">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">Assessment Disclaimer</h3>
                <p className="text-sm text-muted-foreground">
                  Important information about assessment accuracy and limitations
                </p>
              </div>
            </div>

            {/* Main Disclaimer */}
            <div className="space-y-3">
              <div className="p-4 bg-background/50 rounded-lg border border-orange-500/20">
                <p className="text-sm leading-relaxed">
                  <strong>Accuracy Warning:</strong> This assessment is based on publicly available information, 
                  vendor documentation, security databases, and internal analysis. While we strive for accuracy, 
                  information may be incomplete, outdated, or subject to change. Always verify critical security 
                  claims independently before making decisions.
                </p>
              </div>

              {/* Confidence Level */}
              <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <Shield className={cn("h-5 w-5", confidenceColor)} />
                  <div>
                    <div className="text-sm font-semibold">{confidenceLabel}</div>
                    <div className="text-xs text-muted-foreground">
                      Assessment confidence: {confidenceLevel}%
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className={cn(confidenceColor, "border-current")}>
                  {confidenceLevel}%
                </Badge>
              </div>

              {/* Additional Details for Full Report */}
              {reportSize === "full" && (
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Assessment Date: {formatDate(assessment.timestamp)}</span>
                    {assessment.cached && (
                      <Badge variant="outline" className="text-xs ml-2">Cached</Badge>
                    )}
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs leading-relaxed">
                      <strong>Source Verification:</strong> All claims are backed by citations. 
                      Public sources are verifiable; confidential sources include proprietary analysis. 
                      Review the Sources tab for complete transparency.
                    </p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs leading-relaxed">
                      <strong>Limitations:</strong> This assessment does not constitute legal, 
                      security, or compliance advice. Security landscapes change rapidly; 
                      always consult with security professionals for critical decisions.
                    </p>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 pt-2">
                <a
                  href="#sources"
                  className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                >
                  View Sources
                  <ExternalLink className="h-3 w-3" />
                </a>
                {assessment.vendorInfo.psirtPage && (
                  <a
                    href={assessment.vendorInfo.psirtPage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                  >
                    Vendor Security Page
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
