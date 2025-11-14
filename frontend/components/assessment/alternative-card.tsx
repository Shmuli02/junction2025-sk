'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alternative } from '@/lib/types';
import { TrustScoreCircle } from './trust-score-circle';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface AlternativeCardProps {
  alternative: Alternative;
}

export function AlternativeCard({ alternative }: AlternativeCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{alternative.logo}</span>
            <div>
              <CardTitle>{alternative.name}</CardTitle>
              <CardDescription>{alternative.vendor}</CardDescription>
            </div>
          </div>
          <TrustScoreCircle score={alternative.trustScore} size="sm" showLabel={false} animated={false} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{alternative.summary}</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/assess/${alternative.id}`}>
              View Assessment
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
