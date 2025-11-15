"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Database, Cloud, Server, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

interface AIFeaturesBreakdownProps {
  aiFeatures: {
    hasAI: boolean;
    features: Array<{
      name: string;
      description: string;
      dataAccess: string[];
    }>;
    dataUsedForTraining: boolean;
    canOptOut: boolean;
    processingLocation: 'local' | 'cloud' | 'hybrid';
  };
}

export function AIFeaturesBreakdown({ aiFeatures }: AIFeaturesBreakdownProps) {
  if (!aiFeatures.hasAI) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Features</CardTitle>
          <CardDescription>Artificial intelligence capabilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-2 opacity-50" />
            <p className="text-lg font-semibold text-muted-foreground">No AI Features</p>
            <p className="text-sm text-muted-foreground mt-2">
              This product does not utilize artificial intelligence or machine learning.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getProcessingIcon = () => {
    switch (aiFeatures.processingLocation) {
      case 'local': return <Server className="h-5 w-5 text-green-500" />;
      case 'cloud': return <Cloud className="h-5 w-5 text-blue-500" />;
      case 'hybrid': return <Database className="h-5 w-5 text-purple-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-500" />
          AI Features
        </CardTitle>
        <CardDescription>How AI is used and what data it accesses</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key AI Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              {getProcessingIcon()}
              <h5 className="font-semibold text-sm">Processing</h5>
            </div>
            <p className="text-sm text-muted-foreground capitalize">
              {aiFeatures.processingLocation}
            </p>
          </div>

          <div className={`border rounded-lg p-4 ${
            aiFeatures.dataUsedForTraining 
              ? 'bg-yellow-500/10 border-yellow-500/20' 
              : 'bg-green-500/10 border-green-500/20'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {aiFeatures.dataUsedForTraining ? (
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              )}
              <h5 className="font-semibold text-sm">Training Data</h5>
            </div>
            <p className="text-sm text-muted-foreground">
              {aiFeatures.dataUsedForTraining 
                ? 'Used for training' 
                : 'Not used for training'}
            </p>
          </div>

          <div className={`border rounded-lg p-4 ${
            aiFeatures.canOptOut 
              ? 'bg-green-500/10 border-green-500/20' 
              : 'bg-red-500/10 border-red-500/20'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {aiFeatures.canOptOut ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <h5 className="font-semibold text-sm">Opt-Out</h5>
            </div>
            <p className="text-sm text-muted-foreground">
              {aiFeatures.canOptOut 
                ? 'Opt-out available' 
                : 'No opt-out option'}
            </p>
          </div>
        </div>

        {/* AI Features List */}
        <div>
          <h5 className="font-semibold mb-3">AI Capabilities</h5>
          <div className="space-y-3">
            {aiFeatures.features.map((feature, index) => (
              <div key={index} className="border rounded-lg p-4 bg-purple-500/5 border-purple-500/20">
                <div className="flex items-start gap-3">
                  <Brain className="h-5 w-5 text-purple-500 mt-0.5" />
                  <div className="flex-1">
                    <h6 className="font-semibold mb-1">{feature.name}</h6>
                    <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                    
                    <div>
                      <p className="text-xs font-semibold mb-2 text-muted-foreground">Data Access:</p>
                      <div className="flex flex-wrap gap-2">
                        {feature.dataAccess.map((data) => (
                          <Badge key={data} variant="secondary" className="text-xs">
                            {data}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Warning */}
        {aiFeatures.dataUsedForTraining && !aiFeatures.canOptOut && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <h5 className="font-semibold mb-1 text-red-500">Privacy Concern</h5>
                <p className="text-sm text-muted-foreground">
                  Your data may be used for AI training without an opt-out option. Review privacy policies carefully.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
