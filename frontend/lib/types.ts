// TypeScript interfaces for Security Assessor

export interface Citation {
  id: string;
  source: string;
  url?: string;
  type: 'vendor-stated' | 'independent' | 'cve-database' | 'compliance-cert';
  date?: string;
  verified: boolean;
}

export interface CVE {
  id: string;
  cvssScore: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  summary: string;
  publishedDate: string;
  fixedVersion?: string;
  inCISAKEV: boolean;
}

export interface Incident {
  id: string;
  date: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  resolved: boolean;
  source: Citation;
}

export interface Alternative {
  id: string;
  name: string;
  vendor: string;
  trustScore: number;
  summary: string;
  category: string;
  logo?: string;
}

export interface AssessmentResponse {
  id: string;
  timestamp: string;
  cached: boolean;
  
  product: {
    name: string;
    vendor: string;
    category: string;
    description: string;
    usage: string;
    website?: string;
    logo?: string;
  };
  
  trustScore: {
    score: number; // 0-100
    rationale: string;
    confidence: number; // 0-100
  };
  
  vendorReputation: {
    score: number;
    summary: string;
    sources: Citation[];
  };
  
  vulnerabilities: {
    cveCount: number;
    trendData: { month: string; count: number }[];
    recentCVEs: CVE[];
    cisaKEV: boolean;
    severityBreakdown: {
      critical: number;
      high: number;
      medium: number;
      low: number;
    };
  };
  
  incidents: {
    count: number;
    timeline: Incident[];
  };
  
  compliance: {
    certifications: string[];
    dataHandling: string;
    dpa: boolean;
    sources: Citation[];
  };
  
  adminControls: {
    sso: boolean;
    mfa: boolean;
    rbac: boolean;
    auditLogs: boolean;
    dataExport: boolean;
  };

  securityPosture: {
    dimensions: {
      authentication: number;
      dataProtection: number;
      networkSecurity: number;
      incidentResponse: number;
      compliance: number;
      vendorTrust: number;
    };
    claims: Array<{
      claim: string;
      verified: boolean;
      source: Citation;
    }>;
  };
  
  alternatives: Alternative[];
  
  allCitations: Citation[];
}

export interface AssessmentHistoryItem {
  id: string;
  timestamp: string;
  cached: boolean;
  productName: string;
  vendor: string;
  category: string;
  trustScore: number;
}
