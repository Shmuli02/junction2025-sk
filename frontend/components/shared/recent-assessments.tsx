'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AssessmentHistoryItem } from '@/lib/types';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';

interface RecentAssessmentsProps {
  assessments: AssessmentHistoryItem[];
}

export function RecentAssessments({ assessments }: RecentAssessmentsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 71) return 'text-[hsl(var(--success))]';
    if (score >= 41) return 'text-[hsl(var(--warning))]';
    return 'text-destructive';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Recent Assessments</h2>
        <Button variant="ghost" asChild>
          <Link href="/history">
            View All
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assessments.map((assessment, index) => (
          <motion.div
            key={assessment.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <Card className="hover:shadow-lg transition-all hover:scale-105">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{assessment.productName}</CardTitle>
                    <CardDescription>{assessment.vendor}</CardDescription>
                  </div>
                  <div className={`text-2xl font-bold ${getScoreColor(assessment.trustScore)}`}>
                    {assessment.trustScore}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Badge variant="outline">{assessment.category}</Badge>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {new Date(assessment.timestamp).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                    {assessment.cached && <Badge variant="secondary" className="text-xs">Cached</Badge>}
                  </div>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href={`/assess/${assessment.id}`}>
                      View Assessment
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
