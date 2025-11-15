"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';

interface SecurityRadarChartProps {
  assessment: {
    adminControls: any;
    vulnerabilities: { cveCount: number };
    compliance: { certifications: string[] };
    incidents: { count: number };
    trustScore: { score: number };
  };
}

export function SecurityRadarChart({ assessment }: SecurityRadarChartProps) {
  // Calculate scores for each dimension
  const adminScore = Object.values(assessment.adminControls).filter(Boolean).length * 16.67; // 6 controls
  const vulnScore = Math.max(0, 100 - (assessment.vulnerabilities.cveCount * 5));
  const complianceScore = Math.min(100, assessment.compliance.certifications.length * 20);
  const incidentScore = Math.max(0, 100 - (assessment.incidents.count * 15));
  const overallScore = assessment.trustScore.score;

  const data = [
    { dimension: 'Admin Controls', score: Math.round(adminScore), fullMark: 100 },
    { dimension: 'Vulnerability Mgmt', score: Math.round(vulnScore), fullMark: 100 },
    { dimension: 'Compliance', score: Math.round(complianceScore), fullMark: 100 },
    { dimension: 'Incident Response', score: Math.round(incidentScore), fullMark: 100 },
    { dimension: 'Overall Trust', score: overallScore, fullMark: 100 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Posture Radar</CardTitle>
        <CardDescription>Multi-dimensional security analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={data}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis 
              dataKey="dimension" 
              tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
            />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
            <Radar
              name="Security Score"
              dataKey="score"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.5}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--popover))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
