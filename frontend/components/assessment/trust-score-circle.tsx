'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

interface TrustScoreCircleProps {
  score: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
}

export function TrustScoreCircle({ 
  score, 
  size = 'md', 
  showLabel = true,
  animated = true 
}: TrustScoreCircleProps) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    if (animated) {
      let currentScore = 0;
      const increment = score / 50; // Animate over ~50 frames
      const timer = setInterval(() => {
        currentScore += increment;
        if (currentScore >= score) {
          setDisplayScore(score);
          clearInterval(timer);
        } else {
          setDisplayScore(Math.floor(currentScore));
        }
      }, 20);
      return () => clearInterval(timer);
    } else {
      setDisplayScore(score);
    }
  }, [score, animated]);

  const getColor = (score: number) => {
    if (score >= 71) return 'text-[hsl(var(--success))]';
    if (score >= 41) return 'text-[hsl(var(--warning))]';
    return 'text-destructive';
  };

  const getSize = () => {
    switch (size) {
      case 'sm': return { outer: 80, inner: 60, text: 'text-2xl' };
      case 'lg': return { outer: 200, inner: 160, text: 'text-6xl' };
      default: return { outer: 140, inner: 110, text: 'text-5xl' };
    }
  };

  const dimensions = getSize();
  const radius = (dimensions.outer - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: dimensions.outer, height: dimensions.outer }}>
        <svg
          className="transform -rotate-90"
          width={dimensions.outer}
          height={dimensions.outer}
        >
          {/* Background circle */}
          <circle
            cx={dimensions.outer / 2}
            cy={dimensions.outer / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            fill="none"
            className="text-muted"
          />
          {/* Progress circle */}
          <motion.circle
            cx={dimensions.outer / 2}
            cy={dimensions.outer / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={animated ? circumference : strokeDashoffset}
            className={score >= 71 ? 'text-[hsl(var(--success))]' : score >= 41 ? 'text-[hsl(var(--warning))]' : 'text-destructive'}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className={`font-bold ${dimensions.text} ${getColor(displayScore)}`}
            initial={animated ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {displayScore}
          </motion.span>
        </div>
      </div>
      {showLabel && (
        <motion.div
          className="text-center"
          initial={animated ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <p className="text-sm font-medium text-muted-foreground">Trust Score</p>
          <p className={`text-xs ${getColor(displayScore)}`}>
            {score >= 71 ? 'High Trust' : score >= 41 ? 'Moderate Risk' : 'High Risk'}
          </p>
        </motion.div>
      )}
    </div>
  );
}
