"use client"

import { motion } from "framer-motion"
import { FileText, Lock, Eye, EyeOff, BarChart3 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Assessment } from "@/lib/types"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface SourcesBreakdownProps {
  sources: Assessment["sources"]
  reportSize?: "small" | "medium" | "full"
}

const COLORS = {
  public: "#3b82f6", // blue
  confidential: "#8b5cf6", // purple
}

const sourceTypeIcons: Record<string, React.ReactNode> = {
  "Vendor Documentation": <FileText className="h-4 w-4" />,
  "CVE Database": <Eye className="h-4 w-4" />,
  "Security Blogs": <FileText className="h-4 w-4" />,
  "Compliance Reports": <FileText className="h-4 w-4" />,
  "Security Advisories": <FileText className="h-4 w-4" />,
  "Internal Testing": <Lock className="h-4 w-4" />,
  "Pentesting Reports": <Lock className="h-4 w-4" />,
}

export function SourcesBreakdown({ sources, reportSize = "medium" }: SourcesBreakdownProps) {
  const totalSources = sources.public.count + sources.confidential.count
  const publicPercentage = totalSources > 0 ? Math.round((sources.public.count / totalSources) * 100) : 0
  const confidentialPercentage = totalSources > 0 ? Math.round((sources.confidential.count / totalSources) * 100) : 0

  const pieData = [
    { name: "Public", value: sources.public.count, color: COLORS.public },
    { name: "Confidential", value: sources.confidential.count, color: COLORS.confidential },
  ]

  if (reportSize === "small") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Information Sources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Public Sources</span>
              </div>
              <Badge variant="secondary">{sources.public.count}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-purple-500" />
                <span className="text-sm">Confidential Sources</span>
              </div>
              <Badge variant="secondary">{sources.confidential.count}</Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              {publicPercentage}% public, {confidentialPercentage}% confidential
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Information Sources Breakdown
        </CardTitle>
        <CardDescription>
          Transparency in data sources: public vs confidential information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 rounded-lg bg-blue-500/10 border-2 border-blue-500/30"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Eye className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Public Sources</div>
                <div className="text-3xl font-bold">{sources.public.count}</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {publicPercentage}% of total sources
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="p-5 rounded-lg bg-purple-500/10 border-2 border-purple-500/30"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <Lock className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Confidential Sources</div>
                <div className="text-3xl font-bold">{sources.confidential.count}</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {confidentialPercentage}% of total sources
            </div>
          </motion.div>
        </div>

        {/* Pie Chart */}
        {reportSize !== "small" && totalSources > 0 && (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Source Distribution
            </h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    formatter={(value: number) => [`${value} sources`, ""]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Legend
                    formatter={(value) => (
                      <span className="text-sm">
                        {value === "Public" ? (
                          <span className="flex items-center gap-2">
                            <Eye className="h-3.5 w-3.5" />
                            {value}
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Lock className="h-3.5 w-3.5" />
                            {value}
                          </span>
                        )}
                      </span>
                    )}
                  />
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Source Types Breakdown */}
        {reportSize === "full" && (
          <div className="space-y-4">
            {/* Public Source Types */}
            {sources.public.types.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Eye className="h-4 w-4 text-blue-500" />
                  Public Source Types
                </h4>
                <div className="space-y-2">
                  {sources.public.types.map((type, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-blue-500/5 border border-blue-500/20"
                    >
                      <div className="flex items-center gap-2">
                        {sourceTypeIcons[type.type] || <FileText className="h-4 w-4" />}
                        <span className="text-sm">{type.type}</span>
                      </div>
                      <Badge variant="secondary">{type.count}</Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Confidential Source Types */}
            {sources.confidential.types.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Lock className="h-4 w-4 text-purple-500" />
                  Confidential Source Types
                </h4>
                <div className="space-y-2">
                  {sources.confidential.types.map((type, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (sources.public.types.length + index) * 0.05 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-purple-500/5 border border-purple-500/20"
                    >
                      <div className="flex items-center gap-2">
                        {sourceTypeIcons[type.type] || <Lock className="h-4 w-4" />}
                        <span className="text-sm">{type.type}</span>
                        <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                      <Badge variant="secondary">{type.count}</Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Transparency Note */}
        <div className="p-4 bg-muted/50 border border-border rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Transparency Note:</strong> Public sources are verifiable and accessible to anyone. 
            Confidential sources include internal testing and proprietary analysis that cannot be publicly disclosed 
            but contribute to the overall assessment accuracy.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
