"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { FileText, Lock, Globe, Shield } from "lucide-react";

interface SourcesBreakdownProps {
  sources: {
    public: {
      count: number;
      types: Array<{ type: string; count: number }>;
    };
    confidential: {
      count: number;
      types: Array<{ type: string; count: number }>;
    };
  };
}

export function SourcesBreakdown({ sources }: SourcesBreakdownProps) {
  const totalSources = sources.public.count + sources.confidential.count;
  
  const pieData = [
    { name: 'Public Sources', value: sources.public.count, color: '#10b981' },
    { name: 'Confidential Sources', value: sources.confidential.count, color: '#6366f1' }
  ];

  const publicPercentage = ((sources.public.count / totalSources) * 100).toFixed(0);
  const confidentialPercentage = ((sources.confidential.count / totalSources) * 100).toFixed(0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Information Sources</CardTitle>
        <CardDescription>
          Transparency report: {totalSources} total sources analyzed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Source Type Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Stats */}
          <div className="flex flex-col justify-center gap-4">
            <div className="border rounded-lg p-4 bg-green-500/10 border-green-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="h-5 w-5 text-green-500" />
                <h5 className="font-semibold">Public Sources</h5>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-green-500">{sources.public.count}</span>
                <span className="text-sm text-muted-foreground">({publicPercentage}%)</span>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-indigo-500/10 border-indigo-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-5 w-5 text-indigo-500" />
                <h5 className="font-semibold">Confidential Sources</h5>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-indigo-500">{sources.confidential.count}</span>
                <span className="text-sm text-muted-foreground">({confidentialPercentage}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Public Source Types */}
        <div>
          <h5 className="font-semibold mb-3 flex items-center gap-2">
            <Globe className="h-4 w-4 text-green-500" />
            Public Source Breakdown
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sources.public.types.map((source, index) => (
              <div key={index} className="flex items-center justify-between border rounded-lg p-3">
                <span className="text-sm font-medium">{source.type}</span>
                <Badge variant="secondary">{source.count}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Confidential Source Types */}
        {sources.confidential.count > 0 && (
          <div>
            <h5 className="font-semibold mb-3 flex items-center gap-2">
              <Lock className="h-4 w-4 text-indigo-500" />
              Confidential Source Breakdown
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sources.confidential.types.map((source, index) => (
                <div key={index} className="flex items-center justify-between border rounded-lg p-3">
                  <span className="text-sm font-medium">{source.type}</span>
                  <Badge variant="secondary">{source.count}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Source Type Legend */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <h5 className="font-semibold mb-2">Source Types Explained</h5>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><strong>Public:</strong> Vendor documentation, CVE databases, compliance reports, security blogs</p>
                <p><strong>Confidential:</strong> Internal testing, pentesting reports, private security assessments</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
