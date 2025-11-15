"use client"

import { motion } from "framer-motion"
import { Database, Cloud, Lock, Eye, BarChart3, Megaphone, Brain, Trash2, ArrowRight, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Assessment } from "@/lib/types"
import { cn } from "@/lib/utils"

interface DataHandlingFlowchartProps {
  dataHandling: Assessment["dataHandling"]
  reportSize?: "small" | "medium" | "full"
}

export function DataHandlingFlowchart({ dataHandling, reportSize = "medium" }: DataHandlingFlowchartProps) {
  const steps = [
    {
      title: "Storage",
      icon: Database,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      details: [
        { label: "Location", value: dataHandling.storage.location },
        { label: "Regions", value: dataHandling.storage.regions.join(", ") },
        ...(dataHandling.storage.cloudProvider ? [{ label: "Provider", value: dataHandling.storage.cloudProvider }] : []),
        { label: "Encryption at Rest", value: dataHandling.storage.encryptionAtRest ? "Yes" : "No", status: dataHandling.storage.encryptionAtRest },
      ],
    },
    {
      title: "Transmission",
      icon: Cloud,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      details: [
        { label: "TLS Version", value: dataHandling.transmission.encryptionInTransit.tls },
        { label: "Certificate Verified", value: dataHandling.transmission.encryptionInTransit.certVerified ? "Yes" : "No", status: dataHandling.transmission.encryptionInTransit.certVerified },
        { label: "Endpoints", value: `${dataHandling.transmission.endpoints.length} endpoint(s)` },
        ...(reportSize === "full" && dataHandling.transmission.subProcessors.length > 0
          ? [{ label: "Sub-processors", value: `${dataHandling.transmission.subProcessors.length} service(s)` }]
          : []),
      ],
    },
    {
      title: "Usage",
      icon: Eye,
      color: "from-teal-500 to-emerald-500",
      bgColor: "bg-teal-500/10",
      borderColor: "border-teal-500/30",
      details: [
        { label: "Analytics", value: dataHandling.usage.analytics ? "Yes" : "No", icon: BarChart3, status: !dataHandling.usage.analytics },
        { label: "Advertising", value: dataHandling.usage.advertising ? "Yes" : "No", icon: Megaphone, status: !dataHandling.usage.advertising },
        { label: "AI Training", value: dataHandling.usage.aiTraining ? "Yes" : "No", icon: Brain, status: !dataHandling.usage.aiTraining },
        { label: "User Can Delete", value: dataHandling.usage.userCanDelete ? "Yes" : "No", icon: Trash2, status: dataHandling.usage.userCanDelete },
        { label: "Retention", value: dataHandling.usage.retentionPolicy },
      ],
    },
  ]

  if (reportSize === "small") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Handling
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Shield className={cn("h-4 w-4", dataHandling.storage.encryptionAtRest ? "text-green-500" : "text-red-500")} />
            <span>Encryption at Rest: {dataHandling.storage.encryptionAtRest ? "Yes" : "No"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Lock className={cn("h-4 w-4", dataHandling.transmission.encryptionInTransit.certVerified ? "text-green-500" : "text-yellow-500")} />
            <span>TLS: {dataHandling.transmission.encryptionInTransit.tls}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Regions: {dataHandling.storage.regions.join(", ")}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Data Handling Flow
        </CardTitle>
        <CardDescription>
          How your data is stored, transmitted, and used
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Flow Steps */}
          <div className="relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 opacity-20 -translate-y-1/2" />
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 opacity-20 -translate-y-1/2 blur-sm" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                    className="relative"
                  >
                    {/* Arrow between steps (desktop only) */}
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-2 z-10">
                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}

                    <div className={cn("p-5 rounded-lg border-2 h-full", step.bgColor, step.borderColor)}>
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className={cn("p-2 rounded-lg bg-gradient-to-br", step.color)}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="font-semibold text-lg">{step.title}</h3>
                      </div>

                      {/* Details */}
                      <div className="space-y-2.5">
                        {step.details.map((detail, detailIndex) => {
                          const DetailIcon = detail.icon
                          return (
                            <div key={detailIndex} className="flex items-start justify-between gap-2 text-sm">
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                {DetailIcon && (
                                  <DetailIcon className={cn(
                                    "h-3.5 w-3.5 flex-shrink-0",
                                    detail.status === true ? "text-green-500" : detail.status === false ? "text-red-500" : "text-muted-foreground"
                                  )} />
                                )}
                                <span className="text-muted-foreground">{detail.label}:</span>
                              </div>
                              <div className="flex items-center gap-1.5 flex-shrink-0">
                                {detail.status !== undefined && (
                                  <div className={cn(
                                    "h-2 w-2 rounded-full",
                                    detail.status ? "bg-green-500" : "bg-red-500"
                                  )} />
                                )}
                                <span className={cn(
                                  "font-medium text-right",
                                  detail.status === true ? "text-green-600 dark:text-green-400" : detail.status === false ? "text-red-600 dark:text-red-400" : ""
                                )}>
                                  {detail.value}
                                </span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Additional Details for Full Report */}
          {reportSize === "full" && (
            <div className="space-y-4 pt-4 border-t">
              {/* Sub-processors */}
              {dataHandling.transmission.subProcessors.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-2">Sub-processors</h4>
                  <div className="flex flex-wrap gap-2">
                    {dataHandling.transmission.subProcessors.map((processor) => (
                      <Badge key={processor} variant="outline" className="text-xs">
                        {processor}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Endpoints */}
              {dataHandling.transmission.endpoints.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-2">Endpoints</h4>
                  <div className="space-y-1">
                    {dataHandling.transmission.endpoints.map((endpoint) => (
                      <code key={endpoint} className="text-xs bg-muted px-2 py-1 rounded block">
                        {endpoint}
                      </code>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
