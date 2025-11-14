'use client';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SecurityRadarChartProps {
  dimensions: {
    authentication: number;
    dataProtection: number;
    networkSecurity: number;
    incidentResponse: number;
    compliance: number;
    vendorTrust: number;
  };
}

export function SecurityRadarChart({ dimensions }: SecurityRadarChartProps) {
  const data = [
    { subject: 'Authentication', value: dimensions.authentication, fullMark: 100 },
    { subject: 'Data Protection', value: dimensions.dataProtection, fullMark: 100 },
    { subject: 'Network Security', value: dimensions.networkSecurity, fullMark: 100 },
    { subject: 'Incident Response', value: dimensions.incidentResponse, fullMark: 100 },
    { subject: 'Compliance', value: dimensions.compliance, fullMark: 100 },
    { subject: 'Vendor Trust', value: dimensions.vendorTrust, fullMark: 100 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Dimensions</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={data}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
            />
            <Radar
              name="Security Score"
              dataKey="value"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          {Object.entries(dimensions).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
              <span className="font-medium">{value}/100</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
