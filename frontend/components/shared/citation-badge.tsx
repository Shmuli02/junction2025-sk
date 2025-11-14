'use client';

import { Badge } from '@/components/ui/badge';
import { Citation } from '@/lib/types';
import { CheckCircle2, FileText, Shield, Building2, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface CitationBadgeProps {
  citation: Citation;
  showDialog?: boolean;
}

export function CitationBadge({ citation, showDialog = true }: CitationBadgeProps) {
  const getIcon = () => {
    switch (citation.type) {
      case 'vendor-stated':
        return <Building2 className="h-3 w-3" />;
      case 'independent':
        return <CheckCircle2 className="h-3 w-3" />;
      case 'cve-database':
        return <Shield className="h-3 w-3" />;
      case 'compliance-cert':
        return <FileText className="h-3 w-3" />;
      default:
        return <FileText className="h-3 w-3" />;
    }
  };

  const getVariant = () => {
    switch (citation.type) {
      case 'vendor-stated':
        return 'secondary';
      case 'independent':
        return 'default';
      case 'cve-database':
        return 'destructive';
      case 'compliance-cert':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const badge = (
    <Badge variant={getVariant()} className="gap-1 cursor-pointer hover:opacity-80">
      {getIcon()}
      <span className="text-xs">{citation.type.replace('-', ' ')}</span>
      {citation.verified && <CheckCircle2 className="h-3 w-3" />}
    </Badge>
  );

  if (!showDialog) {
    return badge;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {badge}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Citation Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">Source</p>
            <p className="text-sm text-muted-foreground">{citation.source}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Type</p>
            <div className="flex items-center gap-2 mt-1">
              {getIcon()}
              <p className="text-sm text-muted-foreground capitalize">{citation.type.replace('-', ' ')}</p>
            </div>
          </div>
          {citation.verified && (
            <div className="flex items-center gap-2 text-sm text-[hsl(var(--success))]">
              <CheckCircle2 className="h-4 w-4" />
              <span>Verified</span>
            </div>
          )}
          {citation.date && (
            <div>
              <p className="text-sm font-medium">Date</p>
              <p className="text-sm text-muted-foreground">{new Date(citation.date).toLocaleDateString()}</p>
            </div>
          )}
          {citation.url && (
            <a
              href={citation.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              View Source
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
