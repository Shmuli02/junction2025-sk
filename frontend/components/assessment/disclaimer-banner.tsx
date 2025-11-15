"use client"

import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface DisclaimerBannerProps {
  timestamp: string;
  confidence: number;
}

export function DisclaimerBanner({ timestamp, confidence }: DisclaimerBannerProps) {
  return (
    <Card className="border-2 border-yellow-500/30 bg-yellow-500/5">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <AlertTriangle className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1 space-y-2">
            <h4 className="font-semibold text-yellow-500 text-lg">Important Disclaimer</h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>Accuracy Warning:</strong> This security assessment is generated from publicly available 
                information and internal testing. While we strive for accuracy, information may be incomplete, 
                outdated, or incorrect.
              </p>
              <p>
                <strong>Not Professional Advice:</strong> This report is for informational purposes only and does 
                not constitute professional security advice. Organizations should conduct their own due diligence 
                and security assessments.
              </p>
              <p>
                <strong>Verification Required:</strong> Always verify critical security claims with official vendor 
                documentation and independent security audits before making procurement decisions.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-yellow-500/20 mt-3">
                <div className="flex items-center gap-2 text-xs">
                  <Clock className="h-4 w-4" />
                  <span>Generated: {formatDate(timestamp)}</span>
                </div>
                <div className="text-xs">
                  <span className="font-semibold">Confidence Level:</span> {confidence}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
