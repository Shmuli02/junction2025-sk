"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Monitor, Smartphone, Globe } from "lucide-react";

interface PlatformSupportGridProps {
  platformSupport: {
    platforms: Array<{
      name: 'macOS' | 'Windows' | 'Linux' | 'iOS' | 'Android' | 'Web';
      supported: boolean;
      versions?: string;
      securityModel?: string;
    }>;
    versionDifferences?: string;
  };
}

export function PlatformSupportGrid({ platformSupport }: PlatformSupportGridProps) {
  const getPlatformIcon = (name: string) => {
    if (['macOS', 'Windows', 'Linux'].includes(name)) return <Monitor className="h-5 w-5" />;
    if (['iOS', 'Android'].includes(name)) return <Smartphone className="h-5 w-5" />;
    return <Globe className="h-5 w-5" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Support</CardTitle>
        <CardDescription>Operating systems and device compatibility</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {platformSupport.platforms.map((platform) => (
            <div
              key={platform.name}
              className={`border rounded-lg p-4 transition-all ${
                platform.supported
                  ? 'bg-green-500/5 border-green-500/20'
                  : 'bg-muted/20 border-muted opacity-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getPlatformIcon(platform.name)}
                  <span className="font-semibold">{platform.name}</span>
                </div>
                {platform.supported ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              
              {platform.supported && (
                <>
                  {platform.versions && (
                    <p className="text-sm text-muted-foreground mb-1">
                      <span className="font-medium">Versions:</span> {platform.versions}
                    </p>
                  )}
                  {platform.securityModel && (
                    <Badge variant="outline" className="text-xs mt-2">
                      {platform.securityModel}
                    </Badge>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {platformSupport.versionDifferences && (
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <p className="text-sm">
              <span className="font-semibold">Note:</span> {platformSupport.versionDifferences}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
