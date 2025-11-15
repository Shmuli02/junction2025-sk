"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, AlertTriangle, Shield, Info } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Incident {
  date: string;
  title: string;
  severity: string;
  description: string;
  impact: string;
  resolution: string;
  sources: Array<{ id: string; type: string; title: string; verified: boolean }>;
}

interface IncidentTimelineProps {
  incidents: {
    count: number;
    timeline: Incident[];
  };
}

export function IncidentTimeline({ incidents }: IncidentTimelineProps) {
  const [expandedIncidents, setExpandedIncidents] = useState<Set<number>>(new Set());

  const toggleIncident = (index: number) => {
    const newExpanded = new Set(expandedIncidents);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedIncidents(newExpanded);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'medium':
        return <Info className="h-5 w-5 text-yellow-500" />;
      default:
        return <Shield className="h-5 w-5 text-blue-500" />;
    }
  };

  if (incidents.count === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Security Incidents</CardTitle>
          <CardDescription>Historical security events and breaches</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Shield className="h-12 w-12 text-green-500 mx-auto mb-2" />
            <p className="text-lg font-semibold text-green-600">No Security Incidents Reported</p>
            <p className="text-sm text-muted-foreground mt-2">
              This product has a clean security record with no known breaches or major incidents.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Incidents</CardTitle>
        <CardDescription>
          {incidents.count} incident{incidents.count !== 1 ? 's' : ''} reported
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {incidents.timeline.map((incident, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  {getSeverityIcon(incident.severity)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{incident.title}</h4>
                      <Badge variant={getSeverityColor(incident.severity) as any}>
                        {incident.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {formatDate(incident.date)}
                    </p>
                    
                    {expandedIncidents.has(index) && (
                      <div className="mt-4 space-y-3 text-sm">
                        <div>
                          <p className="font-semibold mb-1">Description:</p>
                          <p className="text-muted-foreground">{incident.description}</p>
                        </div>
                        <div>
                          <p className="font-semibold mb-1">Impact:</p>
                          <p className="text-muted-foreground">{incident.impact}</p>
                        </div>
                        <div>
                          <p className="font-semibold mb-1">Resolution:</p>
                          <p className="text-muted-foreground">{incident.resolution}</p>
                        </div>
                        {incident.sources.length > 0 && (
                          <div>
                            <p className="font-semibold mb-1">Sources:</p>
                            <div className="flex flex-wrap gap-2">
                              {incident.sources.map((source) => (
                                <Badge key={source.id} variant="outline" className="text-xs">
                                  {source.title}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleIncident(index)}
                >
                  {expandedIncidents.has(index) ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
