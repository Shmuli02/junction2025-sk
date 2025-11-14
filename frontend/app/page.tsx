'use client';

import { useEffect, useState } from 'react';
import { HeroSearch } from '@/components/search/hero-search';
import { StatsOverview } from '@/components/shared/stats-overview';
import { RecentAssessments } from '@/components/shared/recent-assessments';
import { getStats, getHistory } from '@/lib/api';
import { AssessmentStats } from '@/lib/api';
import { AssessmentHistoryItem } from '@/lib/types';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const [stats, setStats] = useState<AssessmentStats | null>(null);
  const [recentAssessments, setRecentAssessments] = useState<AssessmentHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, historyData] = await Promise.all([
          getStats(),
          getHistory()
        ]);
        setStats(statsData);
        setRecentAssessments(historyData.slice(0, 3));
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/5 to-background pt-20 pb-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <motion.div
                className="p-4 bg-primary/10 rounded-full"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Shield className="h-16 w-16 text-primary" />
              </motion.div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Security Assessor
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Evaluate the security posture, vulnerabilities, and compliance of third-party software products with comprehensive trust scores.
            </p>
          </motion.div>

          <HeroSearch />
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 -mt-16 mb-16">
        {stats && <StatsOverview stats={stats} />}
      </section>

      {/* Recent Assessments Section */}
      <section className="container mx-auto px-4 pb-20">
        {recentAssessments.length > 0 && (
          <RecentAssessments assessments={recentAssessments} />
        )}
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Comprehensive Security Analysis</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Make informed decisions about third-party software with detailed security assessments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Trust Scores',
                description: 'Data-driven security ratings based on multiple factors including vulnerabilities, compliance, and vendor reputation.',
                icon: '🛡️'
              },
              {
                title: 'CVE Tracking',
                description: 'Real-time monitoring of Common Vulnerabilities and Exposures with severity analysis and trend tracking.',
                icon: '🔍'
              },
              {
                title: 'Compliance Verification',
                description: 'Verify certifications and compliance status including SOC 2, ISO 27001, GDPR, and more.',
                icon: '✅'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-card p-6 rounded-lg border shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
