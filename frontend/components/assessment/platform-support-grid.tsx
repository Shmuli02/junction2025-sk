"use client"

import { motion } from "framer-motion"
import { CheckCircle2, XCircle, Monitor, Smartphone, Globe, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Assessment } from "@/lib/types"
import { cn } from "@/lib/utils"

interface PlatformSupportGridProps {
  platformSupport: Assessment["platformSupport"]
  reportSize?: "small" | "medium" | "full"
}

const platformIcons: Record<string, React.ReactNode> = {
  macOS: <Monitor className="h-5 w-5" />,
  Windows: <Monitor className="h-5 w-5" />,
  Linux: <Monitor className="h-5 w-5" />,
  iOS: <Smartphone className="h-5 w-5" />,
  Android: <Smartphone className="h-5 w-5" />,
  Web: <Globe className="h-5 w-5" />,
}

const platformColors: Record<string, string> = {
  macOS: "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900",
  Windows: "bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-950",
  Linux: "bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-950",
  iOS: "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900",
  Android: "bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-950",
  Web: "bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-950",
}

export function PlatformSupportGrid({ platformSupport, reportSize = "medium" }: PlatformSupportGridProps) {
  const supportedPlatforms = platformSupport.platforms.filter(p => p.supported)
  const unsupportedPlatforms = platformSupport.platforms.filter(p => !p.supported)

  if (reportSize === "small") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Platform Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {supportedPlatforms.map((platform) => (
              <Badge key={platform.name} variant="secondary" className="text-sm">
                {platform.name}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {supportedPlatforms.length} of {platformSupport.platforms.length} platforms supported
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Monitor className="h-5 w-5" />
          Platform Support
        </CardTitle>
        <CardDescription>
          Operating system and device compatibility across platforms
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Supported Platforms Grid */}
        <div>
          <h4 className="text-sm font-semibold mb-3 text-muted-foreground">Supported Platforms</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {supportedPlatforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={cn(
                    "relative p-4 rounded-lg border-2 transition-all hover:shadow-lg",
                    platformColors[platform.name] || "bg-muted",
                    "border-green-500/20 dark:border-green-500/30"
                  )}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {platformIcons[platform.name]}
                      <span className="font-semibold">{platform.name}</span>
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  </div>

                  {platform.versions && (
                    <div className="space-y-1.5 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Versions:</span>
                        <Badge variant="outline" className="text-xs">
                          {platform.versions}
                        </Badge>
                      </div>
                    </div>
                  )}

                  {platform.securityModel && reportSize === "full" && (
                    <div className="mt-2 flex items-start gap-2 text-xs">
                      <Shield className="h-3.5 w-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{platform.securityModel}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Unsupported Platforms (if any) */}
        {unsupportedPlatforms.length > 0 && reportSize === "full" && (
          <div>
            <h4 className="text-sm font-semibold mb-3 text-muted-foreground">Not Supported</h4>
            <div className="flex flex-wrap gap-2">
              {unsupportedPlatforms.map((platform) => (
                <div
                  key={platform.name}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted/50 border border-dashed"
                >
                  <XCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{platform.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Version Differences Note */}
        {platformSupport.versionDifferences && reportSize !== "small" && (
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-sm">
              <span className="font-semibold">Note:</span> {platformSupport.versionDifferences}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
