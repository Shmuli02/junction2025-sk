"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface AlternativeCardProps {
  alternatives: Array<{
    name: string;
    vendor: string;
    trustScore: number;
    summary: string;
    whyBetter?: string;
  }>;
  currentScore: number;
}

export function AlternativeCard({ alternatives, currentScore }: AlternativeCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 71) return 'text-green-500';
    if (score >= 41) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alternative Solutions</CardTitle>
        <CardDescription>
          Similar products you might consider
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alternatives.map((alt, index) => {
            const isBetter = alt.trustScore > currentScore;
            
            return (
              <div
                key={index}
                className={`border rounded-lg p-4 transition-all hover:shadow-md ${
                  isBetter ? 'bg-green-500/5 border-green-500/20' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-lg">{alt.name}</h4>
                      {isBetter && (
                        <Badge variant="secondary" className="gap-1">
                          <TrendingUp className="h-3 w-3" />
                          Higher Score
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">by {alt.vendor}</p>
                  </div>
                  
                  <div className="text-center ml-4">
                    <div className={`text-2xl font-bold ${getScoreColor(alt.trustScore)}`}>
                      {alt.trustScore}
                    </div>
                    <p className="text-xs text-muted-foreground">Trust Score</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{alt.summary}</p>

                {alt.whyBetter && (
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-md p-3 mb-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">
                        <span className="font-semibold">Why consider:</span> {alt.whyBetter}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href={`/assess/${alt.name.toLowerCase().replace(/\s+/g, '-')}-001`}>
                      View Assessment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {alternatives.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No alternatives available at this time.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
