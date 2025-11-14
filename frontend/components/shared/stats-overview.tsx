'use client';

import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, Package, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

interface StatsOverviewProps {
  stats: {
    totalAssessments: number;
    averageTrustScore: number;
    productsTracked: number;
    lastUpdated: string;
  };
}

function CountUpAnimation({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(end * percentage));
      
      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const statItems = [
    {
      icon: Package,
      label: 'Products Tracked',
      value: stats.productsTracked,
      color: 'text-primary',
    },
    {
      icon: Shield,
      label: 'Assessments Run',
      value: stats.totalAssessments,
      color: 'text-[hsl(var(--success))]',
    },
    {
      icon: TrendingUp,
      label: 'Avg Trust Score',
      value: stats.averageTrustScore,
      suffix: '/100',
      color: 'text-[hsl(var(--warning))]',
    },
    {
      icon: Clock,
      label: 'Last Updated',
      value: new Date(stats.lastUpdated).toLocaleDateString(),
      isText: true,
      color: 'text-muted-foreground',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-primary/10 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {stat.isText ? (
                      stat.value
                    ) : (
                      <>
                        <CountUpAnimation end={stat.value as number} />
                        {stat.suffix}
                      </>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
