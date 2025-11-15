"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, ArrowRight, Send, BarChart3, Shield, Lock } from "lucide-react";

interface DataHandlingFlowchartProps {
  dataHandling: {
    storage: {
      location: string;
      regions: string[];
      cloudProvider?: string;
      encryptionAtRest: boolean;
    };
    transmission: {
      endpoints: string[];
      subProcessors: string[];
      encryptionInTransit: { tls: string; certVerified: boolean };
    };
    usage: {
      analytics: boolean;
      advertising: boolean;
      aiTraining: boolean;
      retentionPolicy: string;
      userCanDelete: boolean;
    };
  };
}

export function DataHandlingFlowchart({ dataHandling }: DataHandlingFlowchartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Handling & Flow</CardTitle>
        <CardDescription>How your data is stored, transmitted, and used</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Flow Diagram */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Storage */}
          <div className="flex-1 border rounded-lg p-4 bg-teal-500/5 border-teal-500/20">
            <div className="flex items-center gap-2 mb-3">
              <Database className="h-5 w-5 text-teal-500" />
              <h4 className="font-semibold">Storage</h4>
            </div>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Location:</span> {dataHandling.storage.location}</p>
              <p><span className="font-medium">Regions:</span> {dataHandling.storage.regions.join(', ')}</p>
              {dataHandling.storage.cloudProvider && (
                <p><span className="font-medium">Provider:</span> {dataHandling.storage.cloudProvider}</p>
              )}
              <div className="flex items-center gap-2 mt-2">
                {dataHandling.storage.encryptionAtRest ? (
                  <>
                    <Lock className="h-4 w-4 text-green-500" />
                    <span className="text-green-500 font-medium">Encrypted at Rest</span>
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 text-red-500" />
                    <span className="text-red-500 font-medium">Not Encrypted</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <ArrowRight className="h-8 w-8 text-muted-foreground hidden md:block" />

          {/* Transmission */}
          <div className="flex-1 border rounded-lg p-4 bg-blue-500/5 border-blue-500/20">
            <div className="flex items-center gap-2 mb-3">
              <Send className="h-5 w-5 text-blue-500" />
              <h4 className="font-semibold">Transmission</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <p className="font-medium mb-1">Endpoints:</p>
                <div className="flex flex-wrap gap-1">
                  {dataHandling.transmission.endpoints.map((endpoint) => (
                    <Badge key={endpoint} variant="secondary" className="text-xs">
                      {endpoint}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                {dataHandling.transmission.encryptionInTransit.certVerified ? (
                  <>
                    <Lock className="h-4 w-4 text-green-500" />
                    <span className="text-green-500 font-medium">
                      {dataHandling.transmission.encryptionInTransit.tls}
                    </span>
                  </>
                ) : (
                  <span className="text-yellow-500 font-medium">Unverified Cert</span>
                )}
              </div>
            </div>
          </div>

          <ArrowRight className="h-8 w-8 text-muted-foreground hidden md:block" />

          {/* Usage */}
          <div className="flex-1 border rounded-lg p-4 bg-purple-500/5 border-purple-500/20">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="h-5 w-5 text-purple-500" />
              <h4 className="font-semibold">Usage</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Badge variant={dataHandling.usage.analytics ? "default" : "secondary"}>
                  Analytics: {dataHandling.usage.analytics ? 'Yes' : 'No'}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={dataHandling.usage.advertising ? "destructive" : "secondary"}>
                  Ads: {dataHandling.usage.advertising ? 'Yes' : 'No'}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={dataHandling.usage.aiTraining ? "default" : "secondary"}>
                  AI Training: {dataHandling.usage.aiTraining ? 'Yes' : 'No'}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h5 className="font-semibold mb-2">Retention Policy</h5>
            <p className="text-sm text-muted-foreground">{dataHandling.usage.retentionPolicy}</p>
          </div>
          <div className="border rounded-lg p-4">
            <h5 className="font-semibold mb-2">User Control</h5>
            <p className="text-sm text-muted-foreground">
              {dataHandling.usage.userCanDelete 
                ? "✅ Users can delete their data" 
                : "❌ Limited data deletion options"}
            </p>
          </div>
        </div>

        {/* Sub-processors */}
        {dataHandling.transmission.subProcessors.length > 0 && (
          <div className="border rounded-lg p-4 bg-muted/20">
            <h5 className="font-semibold mb-2">Sub-processors</h5>
            <div className="flex flex-wrap gap-2">
              {dataHandling.transmission.subProcessors.map((processor) => (
                <Badge key={processor} variant="outline">
                  {processor}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
