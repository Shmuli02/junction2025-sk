"use client"

import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TrustScoreCircleProps {
  score: number;
  confidence: number;
  size?: "sm" | "md" | "lg";
}

export function TrustScoreCircle({ score, confidence, size = "lg" }: TrustScoreCircleProps) {
  const getScoreColor = (score: number) => {
    if (score >= 71) return { text: "text-green-500", bg: "bg-green-500", border: "border-green-500" };
    if (score >= 41) return { text: "text-yellow-500", bg: "bg-yellow-500", border: "border-yellow-500" };
    return { text: "text-red-500", bg: "bg-red-500", border: "border-red-500" };
  };

  const getScoreIcon = (score: number) => {
    if (score >= 71) return <CheckCircle2 className="h-8 w-8 text-green-500" />;
    if (score >= 41) return <AlertTriangle className="h-8 w-8 text-yellow-500" />;
    return <XCircle className="h-8 w-8 text-red-500" />;
  };

  const colors = getScoreColor(score);
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  const sizeClasses = {
    sm: { container: "w-24 h-24", text: "text-2xl", icon: "h-5 w-5" },
    md: { container: "w-32 h-32", text: "text-3xl", icon: "h-6 w-6" },
    lg: { container: "w-40 h-40", text: "text-4xl", icon: "h-8 w-8" }
  };

  return (
    <Card className="border-2">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="relative inline-flex items-center justify-center"
          >
            {/* Glow effect */}
            <div className={`absolute inset-0 rounded-full blur-2xl opacity-20 ${colors.bg}`}></div>
            
            {/* SVG Progress Circle */}
            <svg className={sizeClasses[size].container} viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-muted/20"
              />
              {/* Progress circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                className={colors.text}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{
                  strokeDasharray: circumference,
                  transform: "rotate(-90deg)",
                  transformOrigin: "50% 50%"
                }}
              />
            </svg>
            
            {/* Center content */}
            <div className="absolute flex flex-col items-center justify-center">
              {getScoreIcon(score)}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className={`${sizeClasses[size].text} font-bold ${colors.text}`}
              >
                {score}
              </motion.span>
            </div>
          </motion.div>
          
          <div className="text-center">
            <p className="text-sm font-semibold">Trust Score</p>
            <p className="text-xs text-muted-foreground">Confidence: {confidence}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
