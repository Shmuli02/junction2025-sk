'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { compareProducts } from '@/lib/api';
import { AssessmentResponse } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrustScoreCircle } from '@/components/assessment/trust-score-circle';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

function CompareContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<AssessmentResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadComparison() {
      try {
        const ids = searchParams.get('ids')?.split(',') || [];
        if (ids.length === 0) {
          setIsLoading(false);
          return;
        }
        const data = await compareProducts(ids);
        setProducts(data);
      } catch (error) {
        console.error('Failed to load comparison:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadComparison();
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Loading comparison...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">No Products Selected</h1>
        <p className="text-muted-foreground">
          Please select products from the history page to compare.
        </p>
      </div>
    );
  }

  const ComparisonRow = ({ 
    label, 
    values 
  }: { 
    label: string; 
    values: (string | number | boolean | React.ReactElement)[];
  }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border-b last:border-b-0">
      <div className="font-semibold text-muted-foreground">{label}</div>
      {values.map((value, index) => (
        <div key={index} className="flex items-center">
          {typeof value === 'boolean' ? (
            value ? (
              <CheckCircle2 className="h-5 w-5 text-[hsl(var(--success))]" />
            ) : (
              <XCircle className="h-5 w-5 text-destructive" />
            )
          ) : (
            value
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-primary/5 to-background py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-2">Product Comparison</h1>
            <p className="text-muted-foreground">
              Side-by-side security and compliance comparison
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Product Headers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="font-semibold text-muted-foreground hidden md:block">
            {/* Empty spacer for alignment */}
          </div>
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">{product.product.logo}</div>
                  <CardTitle>{product.product.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{product.product.vendor}</p>
                  <div className="flex justify-center mt-4">
                    <TrustScoreCircle score={product.trustScore.score} size="sm" />
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <Card>
          <CardHeader>
            <CardTitle>Security & Compliance Comparison</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ComparisonRow
              label="Category"
              values={products.map(p => p.product.category)}
            />
            <ComparisonRow
              label="Trust Score"
              values={products.map(p => (
                <span className={
                  p.trustScore.score >= 71 ? 'text-[hsl(var(--success))]' :
                  p.trustScore.score >= 41 ? 'text-[hsl(var(--warning))]' :
                  'text-destructive'
                }>
                  {p.trustScore.score}/100
                </span>
              ))}
            />
            <ComparisonRow
              label="Vendor Reputation"
              values={products.map(p => `${p.vendorReputation.score}/100`)}
            />
            <ComparisonRow
              label="CVEs (12 months)"
              values={products.map(p => p.vulnerabilities.cveCount)}
            />
            <ComparisonRow
              label="Critical CVEs"
              values={products.map(p => (
                <span className={p.vulnerabilities.severityBreakdown.critical > 0 ? 'text-destructive font-semibold' : ''}>
                  {p.vulnerabilities.severityBreakdown.critical}
                </span>
              ))}
            />
            <ComparisonRow
              label="CISA KEV Listed"
              values={products.map(p => 
                p.vulnerabilities.cisaKEV ? (
                  <Badge variant="destructive">Yes</Badge>
                ) : (
                  <Badge variant="outline">No</Badge>
                )
              )}
            />
            <ComparisonRow
              label="Security Incidents"
              values={products.map(p => p.incidents.count)}
            />
            <ComparisonRow
              label="Certifications"
              values={products.map(p => (
                <div className="flex flex-wrap gap-1">
                  {p.compliance.certifications.slice(0, 3).map(cert => (
                    <Badge key={cert} variant="outline" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                  {p.compliance.certifications.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{p.compliance.certifications.length - 3}
                    </Badge>
                  )}
                </div>
              ))}
            />
          </CardContent>
        </Card>

        {/* Admin Controls Comparison */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Admin Controls</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ComparisonRow
              label="SSO"
              values={products.map(p => p.adminControls.sso)}
            />
            <ComparisonRow
              label="MFA"
              values={products.map(p => p.adminControls.mfa)}
            />
            <ComparisonRow
              label="RBAC"
              values={products.map(p => p.adminControls.rbac)}
            />
            <ComparisonRow
              label="Audit Logs"
              values={products.map(p => p.adminControls.auditLogs)}
            />
            <ComparisonRow
              label="Data Export"
              values={products.map(p => p.adminControls.dataExport)}
            />
          </CardContent>
        </Card>

        {/* Security Dimensions Comparison */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Security Dimensions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ComparisonRow
              label="Authentication"
              values={products.map(p => `${p.securityPosture.dimensions.authentication}/100`)}
            />
            <ComparisonRow
              label="Data Protection"
              values={products.map(p => `${p.securityPosture.dimensions.dataProtection}/100`)}
            />
            <ComparisonRow
              label="Network Security"
              values={products.map(p => `${p.securityPosture.dimensions.networkSecurity}/100`)}
            />
            <ComparisonRow
              label="Incident Response"
              values={products.map(p => `${p.securityPosture.dimensions.incidentResponse}/100`)}
            />
            <ComparisonRow
              label="Compliance"
              values={products.map(p => `${p.securityPosture.dimensions.compliance}/100`)}
            />
            <ComparisonRow
              label="Vendor Trust"
              values={products.map(p => `${p.securityPosture.dimensions.vendorTrust}/100`)}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Loading comparison...</p>
      </div>
    }>
      <CompareContent />
    </Suspense>
  );
}
