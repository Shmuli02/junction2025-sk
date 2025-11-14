'use client';

import { useEffect, useState } from 'react';
import { getHistory } from '@/lib/api';
import { AssessmentHistoryItem } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Clock, ArrowUpDown } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HistoryPage() {
  const [assessments, setAssessments] = useState<AssessmentHistoryItem[]>([]);
  const [filteredAssessments, setFilteredAssessments] = useState<AssessmentHistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'score' | 'name'>('date');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      try {
        const data = await getHistory();
        setAssessments(data);
        setFilteredAssessments(data);
      } catch (error) {
        console.error('Failed to load history:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadHistory();
  }, []);

  useEffect(() => {
    let filtered = assessments.filter(a =>
      a.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        case 'score':
          return b.trustScore - a.trustScore;
        case 'name':
          return a.productName.localeCompare(b.productName);
        default:
          return 0;
      }
    });

    setFilteredAssessments(filtered);
  }, [searchQuery, sortBy, assessments]);

  const getScoreColor = (score: number) => {
    if (score >= 71) return 'text-[hsl(var(--success))]';
    if (score >= 41) return 'text-[hsl(var(--warning))]';
    return 'text-destructive';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-primary/5 to-background py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-2">Assessment History</h1>
            <p className="text-muted-foreground">
              View and manage all your past security assessments
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by product name, vendor, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-full md:w-48">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date (Newest)</SelectItem>
                  <SelectItem value="score">Trust Score</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading assessments...</p>
          </div>
        ) : filteredAssessments.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                {searchQuery ? 'No assessments found matching your search.' : 'No assessments yet. Start by searching for a product!'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredAssessments.length} assessment{filteredAssessments.length !== 1 ? 's' : ''}
            </p>
            {filteredAssessments.map((assessment, index) => (
              <motion.div
                key={assessment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Card className="hover:shadow-lg transition-all">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className={`text-4xl font-bold ${getScoreColor(assessment.trustScore)} min-w-[60px]`}>
                            {assessment.trustScore}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-1">
                              {assessment.productName}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {assessment.vendor}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline">{assessment.category}</Badge>
                              {assessment.cached && (
                                <Badge variant="secondary">Cached</Badge>
                              )}
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {new Date(assessment.timestamp).toLocaleString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="default" asChild>
                          <Link href={`/assess/${assessment.id}`}>
                            View Details
                          </Link>
                        </Button>
                        <Button variant="outline" asChild>
                          <Link href={`/compare?ids=${assessment.id}`}>
                            Compare
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
