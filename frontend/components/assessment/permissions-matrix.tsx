"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Info, CheckCircle } from "lucide-react";

interface PermissionsMatrixProps {
  permissions: {
    required: Array<{
      name: string;
      riskLevel: 'low' | 'medium' | 'high';
      justification: string;
    }>;
    optional: Array<{
      name: string;
      riskLevel: 'low' | 'medium' | 'high';
      justification: string;
    }>;
    overPermissioningRisk?: string;
  };
}

export function PermissionsMatrix({ permissions }: PermissionsMatrixProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-500', variant: 'destructive' as const };
      case 'medium': return { bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', text: 'text-yellow-500', variant: 'default' as const };
      case 'low': return { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-500', variant: 'secondary' as const };
      default: return { bg: 'bg-muted', border: 'border-muted', text: 'text-muted-foreground', variant: 'secondary' as const };
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium': return <Info className="h-4 w-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Permissions & Access Requirements</CardTitle>
        <CardDescription>What the application can access and why</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Required Permissions */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            Required Permissions
            <Badge variant="outline">{permissions.required.length}</Badge>
          </h4>
          <div className="space-y-2">
            {permissions.required.map((perm, index) => {
              const colors = getRiskColor(perm.riskLevel);
              return (
                <div
                  key={index}
                  className={`border rounded-lg p-4 ${colors.bg} ${colors.border}`}
                >
                  <div className="flex items-start gap-3">
                    {getRiskIcon(perm.riskLevel)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold">{perm.name}</h5>
                        <Badge variant={colors.variant} className="text-xs">
                          {perm.riskLevel.toUpperCase()} RISK
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{perm.justification}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Optional Permissions */}
        {permissions.optional.length > 0 && (
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              Optional Permissions
              <Badge variant="outline">{permissions.optional.length}</Badge>
            </h4>
            <div className="space-y-2">
              {permissions.optional.map((perm, index) => {
                const colors = getRiskColor(perm.riskLevel);
                return (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 ${colors.bg} ${colors.border}`}
                  >
                    <div className="flex items-start gap-3">
                      {getRiskIcon(perm.riskLevel)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold">{perm.name}</h5>
                          <Badge variant={colors.variant} className="text-xs">
                            {perm.riskLevel.toUpperCase()} RISK
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{perm.justification}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Over-permissioning Risk Warning */}
        {permissions.overPermissioningRisk && (
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <h5 className="font-semibold mb-1 text-orange-500">Over-Permissioning Risk</h5>
                <p className="text-sm text-muted-foreground">{permissions.overPermissioningRisk}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
