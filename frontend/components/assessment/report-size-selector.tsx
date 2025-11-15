"use client"

import { motion } from "framer-motion"
import { FileText, Clock, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ReportSize } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ReportSizeSelectorProps {
  currentSize: ReportSize
  onSizeChange: (size: ReportSize) => void
  className?: string
}

const sizeConfig = {
  small: {
    label: "Small",
    description: "Executive summary",
    readTime: "2 min",
    icon: FileText,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
  },
  medium: {
    label: "Medium",
    description: "Standard detail",
    readTime: "5 min",
    icon: FileText,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
  },
  full: {
    label: "Full",
    description: "Deep dive",
    readTime: "10 min",
    icon: FileText,
    color: "from-teal-500 to-emerald-500",
    bgColor: "bg-teal-500/10",
    borderColor: "border-teal-500/30",
  },
}

export function ReportSizeSelector({ currentSize, onSizeChange, className }: ReportSizeSelectorProps) {
  return (
    <Card className={cn("sticky top-4 z-10", className)}>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">Report Detail Level</span>
            <Badge variant="outline" className="text-xs">
              {sizeConfig[currentSize].readTime} read
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(sizeConfig) as ReportSize[]).map((size) => {
              const config = sizeConfig[size]
              const Icon = config.icon
              const isSelected = currentSize === size

              return (
                <motion.button
                  key={size}
                  onClick={() => onSizeChange(size)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "relative p-3 rounded-lg border-2 transition-all text-left",
                    isSelected
                      ? `${config.bgColor} ${config.borderColor} shadow-md`
                      : "bg-muted/50 border-border hover:border-primary/50"
                  )}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="selectedSize"
                      className={cn(
                        "absolute inset-0 rounded-lg bg-gradient-to-br opacity-10",
                        config.color
                      )}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  <div className="relative">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className={cn(
                        "h-4 w-4",
                        isSelected ? "text-primary" : "text-muted-foreground"
                      )} />
                      <span className={cn(
                        "text-xs font-semibold capitalize",
                        isSelected ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {config.label}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {config.description}
                      </span>
                      {isSelected && (
                        <ChevronRight className="h-3 w-3 text-primary" />
                      )}
                    </div>
                    <div className="mt-1.5 flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {config.readTime}
                      </span>
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>

          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground">
              Adjust detail level to control how much information is displayed. 
              Your preference will be saved.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
