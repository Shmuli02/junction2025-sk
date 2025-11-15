"use client"

import { motion } from "framer-motion"
import { Shield, AlertTriangle, CheckCircle2, XCircle, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Assessment } from "@/lib/types"
import { cn } from "@/lib/utils"

interface PermissionsMatrixProps {
  permissions: Assessment["permissions"]
  reportSize?: "small" | "medium" | "full"
}

const riskLevelConfig = {
  low: {
    color: "bg-green-500/20 border-green-500/40 text-green-700 dark:text-green-400",
    icon: CheckCircle2,
    label: "Low Risk",
  },
  medium: {
    color: "bg-yellow-500/20 border-yellow-500/40 text-yellow-700 dark:text-yellow-400",
    icon: AlertTriangle,
    label: "Medium Risk",
  },
  high: {
    color: "bg-red-500/20 border-red-500/40 text-red-700 dark:text-red-400",
    icon: XCircle,
    label: "High Risk",
  },
}

export function PermissionsMatrix({ permissions, reportSize = "medium" }: PermissionsMatrixProps) {
  const allPermissions = [
    ...permissions.required.map(p => ({ ...p, type: "required" as const })),
    ...permissions.optional.map(p => ({ ...p, type: "optional" as const })),
  ]

  if (reportSize === "small") {
    const highRiskCount = allPermissions.filter(p => p.riskLevel === "high").length
    const mediumRiskCount = allPermissions.filter(p => p.riskLevel === "medium").length

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Permissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Required Permissions</span>
              <Badge variant="secondary">{permissions.required.length}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Optional Permissions</span>
              <Badge variant="secondary">{permissions.optional.length}</Badge>
            </div>
            {(highRiskCount > 0 || mediumRiskCount > 0) && (
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-sm">
                  {highRiskCount > 0 && `${highRiskCount} high-risk permission(s)`}
                  {highRiskCount > 0 && mediumRiskCount > 0 && " and "}
                  {mediumRiskCount > 0 && `${mediumRiskCount} medium-risk permission(s)`}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Permissions Matrix
        </CardTitle>
        <CardDescription>
          Required and optional permissions with risk assessment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Required Permissions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Required Permissions
            </h4>
            <Badge variant="secondary">{permissions.required.length}</Badge>
          </div>
          <div className="space-y-3">
            {permissions.required.map((permission, index) => {
              const config = riskLevelConfig[permission.riskLevel]
              const Icon = config.icon

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "p-4 rounded-lg border-2 transition-all hover:shadow-md",
                    config.color
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="h-4 w-4 flex-shrink-0" />
                        <span className="font-semibold">{permission.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {config.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{permission.justification}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Optional Permissions */}
        {permissions.optional.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                Optional Permissions
              </h4>
              <Badge variant="outline">{permissions.optional.length}</Badge>
            </div>
            <div className="space-y-3">
              {permissions.optional.map((permission, index) => {
                const config = riskLevelConfig[permission.riskLevel]
                const Icon = config.icon

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (permissions.required.length + index) * 0.05 }}
                    className={cn(
                      "p-4 rounded-lg border-2 transition-all hover:shadow-md border-dashed",
                      config.color
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className="h-4 w-4 flex-shrink-0" />
                          <span className="font-semibold">{permission.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {config.label}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            Optional
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{permission.justification}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}

        {/* Over-permissioning Risk Warning */}
        {permissions.overPermissioningRisk && reportSize !== "small" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-1">
                  Over-permissioning Risk
                </h4>
                <p className="text-sm text-orange-600 dark:text-orange-300">
                  {permissions.overPermissioningRisk}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
