"use client"

import { motion } from "framer-motion"
import { Brain, Cloud, HardDrive, Layers, CheckCircle2, XCircle, AlertTriangle, Database } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Assessment } from "@/lib/types"
import { cn } from "@/lib/utils"

interface AIFeaturesBreakdownProps {
  aiFeatures: Assessment["aiFeatures"]
  reportSize?: "small" | "medium" | "full"
}

const processingLocationIcons = {
  local: HardDrive,
  cloud: Cloud,
  hybrid: Layers,
}

const processingLocationLabels = {
  local: "Local Processing",
  cloud: "Cloud Processing",
  hybrid: "Hybrid Processing",
}

const processingLocationColors = {
  local: "bg-green-500/20 border-green-500/40 text-green-700 dark:text-green-400",
  cloud: "bg-blue-500/20 border-blue-500/40 text-blue-700 dark:text-blue-400",
  hybrid: "bg-purple-500/20 border-purple-500/40 text-purple-700 dark:text-purple-400",
}

export function AIFeaturesBreakdown({ aiFeatures, reportSize = "medium" }: AIFeaturesBreakdownProps) {
  if (!aiFeatures.hasAI) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <span className="text-sm">This product does not include AI features.</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (reportSize === "small") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Features
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">AI Features</span>
            <Badge variant="secondary">{aiFeatures.features.length}</Badge>
          </div>
          <div className="flex items-center gap-2 text-sm">
            {aiFeatures.dataUsedForTraining ? (
              <>
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                <span>Data used for training</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>No training data usage</span>
              </>
            )}
          </div>
          {aiFeatures.canOptOut && (
            <Badge variant="outline" className="text-xs">Opt-out available</Badge>
          )}
        </CardContent>
      </Card>
    )
  }

  const ProcessingIcon = processingLocationIcons[aiFeatures.processingLocation]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI Features Breakdown
        </CardTitle>
        <CardDescription>
          AI capabilities, data usage, and processing details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Processing Location */}
        <div className={cn(
          "p-4 rounded-lg border-2",
          processingLocationColors[aiFeatures.processingLocation]
        )}>
          <div className="flex items-center gap-3 mb-2">
            <ProcessingIcon className="h-5 w-5" />
            <span className="font-semibold">{processingLocationLabels[aiFeatures.processingLocation]}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            AI processing occurs {aiFeatures.processingLocation === "local" 
              ? "on your device" 
              : aiFeatures.processingLocation === "cloud"
              ? "on vendor servers"
              : "both locally and in the cloud"}
          </p>
        </div>

        {/* AI Features List */}
        <div>
          <h4 className="text-sm font-semibold mb-3">AI Capabilities</h4>
          <div className="space-y-3">
            {aiFeatures.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg border bg-gradient-to-r from-purple-500/5 to-indigo-500/5 border-purple-500/20"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h5 className="font-semibold flex items-center gap-2">
                    <Brain className="h-4 w-4 text-purple-500" />
                    {feature.name}
                  </h5>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                
                {feature.dataAccess.length > 0 && (
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                      Data Access:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {feature.dataAccess.map((access, accessIndex) => (
                        <Badge key={accessIndex} variant="outline" className="text-xs">
                          <Database className="h-3 w-3 mr-1" />
                          {access}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Data Usage & Privacy */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Data Usage & Privacy</h4>
          
          {/* Training Data Usage */}
          <div className={cn(
            "p-4 rounded-lg border-2 flex items-start gap-3",
            aiFeatures.dataUsedForTraining
              ? "bg-orange-500/10 border-orange-500/30"
              : "bg-green-500/10 border-green-500/30"
          )}>
            {aiFeatures.dataUsedForTraining ? (
              <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <div className="font-semibold mb-1">
                {aiFeatures.dataUsedForTraining 
                  ? "Data Used for Training" 
                  : "No Training Data Usage"}
              </div>
              <p className="text-sm text-muted-foreground">
                {aiFeatures.dataUsedForTraining
                  ? "Your data may be used to train AI models. Review privacy policy for details."
                  : "Your data is not used to train AI models."}
              </p>
            </div>
          </div>

          {/* Opt-out Availability */}
          <div className={cn(
            "p-4 rounded-lg border flex items-start gap-3",
            aiFeatures.canOptOut
              ? "bg-green-500/10 border-green-500/30"
              : "bg-red-500/10 border-red-500/30"
          )}>
            {aiFeatures.canOptOut ? (
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <div className="font-semibold mb-1">
                {aiFeatures.canOptOut ? "Opt-out Available" : "No Opt-out Option"}
              </div>
              <p className="text-sm text-muted-foreground">
                {aiFeatures.canOptOut
                  ? "You can disable AI features or opt out of data usage for training."
                  : "No option to opt out of AI features or data usage."}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
