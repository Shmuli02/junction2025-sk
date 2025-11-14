'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getAssessmentById } from '@/lib/api';
import { AssessmentResponse } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrustScoreCircle } from '@/components/assessment/trust-score-circle';
import { SecurityRadarChart } from '@/components/assessment/security-radar-chart';
import { CVETrendChart } from '@/components/assessment/cve-trend-chart';
import { CVESeverityBreakdown } from '@/components/assessment/cve-severity-breakdown';
import { IncidentTimeline } from '@/components/assessment/incident-timeline';
import { AlternativeCard } from '@/components/assessment/alternative-card';
import { CitationBadge } from '@/components/shared/citation-badge';
import { AssessmentSkeleton } from '@/components/shared/loading-skeleton';
import { CheckCircle2, XCircle, ExternalLink, AlertTriangle, FileText, Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AssessmentPage() {
  const params = useParams();
  const [assessment, setAssessment] = useState<AssessmentResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAssessment() {
      try {
        const data = await getAssessmentById(params.id as string);
        setAssessment(data);
      } catch (err) {
        setError('Failed to load assessment');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadAssessment();
  }, [params.id]);

  if (isLoading) {
    return <AssessmentSkeleton />;
  }

  if (error || !assessment) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Assessment Not Found</h1>
        <p className="text-muted-foreground">The requested assessment could not be loaded.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div
        className="bg-gradient-to-b from-primary/5 to-background py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-5xl">{assessment.product.logo}</span>
                    <div>
                      <CardTitle className="text-3xl">{assessment.product.name}</CardTitle>
                      <CardDescription className="text-lg">
                        {assessment.product.vendor} • {assessment.product.category}
                      </CardDescription>
                    </div>
                  </div>
                  {assessment.cached && (
                    <Badge variant="secondary" className="mt-2">
                      Cached • {new Date(assessment.timestamp).toLocaleString()}
                    </Badge>
                  )}
                </div>
                <div className="flex flex-col items-center gap-2">
                  <TrustScoreCircle score={assessment.trustScore.score} size="lg" />
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export PDF
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-muted-foreground">{assessment.product.description}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Usage Context</h4>
                  <p className="text-muted-foreground">{assessment.product.usage}</p>
                </div>
                {assessment.product.website && (
                  <a
                    href={assessment.product.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Visit Website
                  </a>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trust Score Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Confidence Level</span>
                    <span className="text-muted-foreground">{assessment.trustScore.confidence}%</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${assessment.trustScore.confidence}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Rationale</h4>
                  <p className="text-muted-foreground">{assessment.trustScore.rationale}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vendor Reputation</CardTitle>
                <CardDescription>Score: {assessment.vendorReputation.score}/100</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{assessment.vendorReputation.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {assessment.vendorReputation.sources.map((source) => (
                    <CitationBadge key={source.id} citation={source} />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Facts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Total CVEs (12 months)</span>
                    <p className="text-xl font-semibold">{assessment.vulnerabilities.cveCount}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Security Incidents</span>
                    <p className="text-xl font-semibold">{assessment.incidents.count}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Certifications</span>
                    <p className="text-xl font-semibold">{assessment.compliance.certifications.length}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">CISA KEV Listed</span>
                    <p className="text-xl font-semibold">{assessment.vulnerabilities.cisaKEV ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <SecurityRadarChart dimensions={assessment.securityPosture.dimensions} />

            <Card>
              <CardHeader>
                <CardTitle>Admin Controls</CardTitle>
                <CardDescription>Enterprise security features and administrative capabilities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(assessment.adminControls).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      {value ? (
                        <CheckCircle2 className="h-5 w-5 text-[hsl(var(--success))]" />
                      ) : (
                        <XCircle className="h-5 w-5 text-destructive" />
                      )}
                      <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Claims</CardTitle>
                <CardDescription>Vendor and third-party verified security capabilities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {assessment.securityPosture.claims.map((claim, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    {claim.verified ? (
                      <CheckCircle2 className="h-5 w-5 text-[hsl(var(--success))] mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-[hsl(var(--warning))] mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{claim.claim}</p>
                      <div className="mt-1">
                        <CitationBadge citation={claim.source} />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Incidents</CardTitle>
                <CardDescription>
                  Historical security incidents and breaches
                </CardDescription>
              </CardHeader>
              <CardContent>
                <IncidentTimeline incidents={assessment.incidents.timeline} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vulnerabilities Tab */}
          <TabsContent value="vulnerabilities" className="space-y-6">
            {assessment.vulnerabilities.cisaKEV && (
              <Card className="border-destructive">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                    <div>
                      <CardTitle className="text-destructive">CISA KEV Alert</CardTitle>
                      <CardDescription>
                        This product has vulnerabilities listed in CISA's Known Exploited Vulnerabilities catalog
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            )}

            <CVETrendChart 
              data={assessment.vulnerabilities.trendData} 
              totalCVEs={assessment.vulnerabilities.cveCount}
            />

            <CVESeverityBreakdown severityBreakdown={assessment.vulnerabilities.severityBreakdown} />

            <Card>
              <CardHeader>
                <CardTitle>Recent CVEs</CardTitle>
                <CardDescription>Most recent Common Vulnerabilities and Exposures</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {assessment.vulnerabilities.recentCVEs.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No recent CVEs reported</p>
                ) : (
                  assessment.vulnerabilities.recentCVEs.map((cve) => (
                    <Card key={cve.id} className="border-l-4" style={{ 
                      borderLeftColor: cve.severity === 'critical' ? 'hsl(var(--destructive))' :
                                       cve.severity === 'high' ? 'hsl(25, 95%, 53%)' :
                                       cve.severity === 'medium' ? 'hsl(var(--warning))' :
                                       'hsl(var(--success))'
                    }}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{cve.id}</h4>
                            <p className="text-sm text-muted-foreground">{cve.summary}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold">{cve.cvssScore}</div>
                            <Badge variant={
                              cve.severity === 'critical' ? 'destructive' :
                              cve.severity === 'high' ? 'destructive' :
                              cve.severity === 'medium' ? 'secondary' : 'outline'
                            }>
                              {cve.severity}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{new Date(cve.publishedDate).toLocaleDateString()}</span>
                          {cve.fixedVersion && (
                            <span className="text-[hsl(var(--success))]">Fixed in {cve.fixedVersion}</span>
                          )}
                          {cve.inCISAKEV && (
                            <Badge variant="destructive">CISA KEV</Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Certifications & Standards</CardTitle>
                <CardDescription>Industry compliance certifications and standards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {assessment.compliance.certifications.map((cert) => (
                    <Badge key={cert} variant="outline" className="text-sm py-2 px-4">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-[hsl(var(--success))]" />
                      {cert}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Handling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{assessment.compliance.dataHandling}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Processing Agreement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  {assessment.compliance.dpa ? (
                    <>
                      <CheckCircle2 className="h-6 w-6 text-[hsl(var(--success))]" />
                      <span className="font-medium">DPA Available</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-6 w-6 text-destructive" />
                      <span className="font-medium">No DPA Information</span>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {assessment.compliance.sources.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Evidence & Documentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {assessment.compliance.sources.map((source) => (
                      <CitationBadge key={source.id} citation={source} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Alternatives Tab */}
          <TabsContent value="alternatives" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Alternatives</CardTitle>
                <CardDescription>
                  Similar products you may want to consider
                </CardDescription>
              </CardHeader>
            </Card>

            {assessment.alternatives.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No alternatives currently available
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {assessment.alternatives.map((alt) => (
                  <AlternativeCard key={alt.id} alternative={alt} />
                ))}
              </div>
            )}

            <Card>
              <CardContent className="py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Compare Products</h4>
                    <p className="text-sm text-muted-foreground">
                      See a detailed side-by-side comparison
                    </p>
                  </div>
                  <Button>
                    View Comparison
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
