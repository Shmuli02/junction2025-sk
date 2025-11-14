// Mock API client for Security Assessor

import { AssessmentResponse, AssessmentHistoryItem } from './types';

// Mock data for development
const mockAssessments: Record<string, AssessmentResponse> = {
  'slack': {
    id: 'assessment-slack-001',
    timestamp: new Date().toISOString(),
    cached: false,
    product: {
      name: 'Slack',
      vendor: 'Salesforce',
      category: 'Team Communication',
      description: 'Slack is a cloud-based team collaboration platform that offers chat, file sharing, and integrations with numerous third-party services. Used by organizations worldwide for internal communications.',
      usage: 'Team messaging, file sharing, integrations, video calls',
      website: 'https://slack.com',
      logo: '💬'
    },
    trustScore: {
      score: 78,
      rationale: 'Slack demonstrates strong security controls with SOC 2 Type II certification, regular security audits, and enterprise-grade features. However, past security incidents and dependencies on third-party integrations present moderate risk.',
      confidence: 85
    },
    vendorReputation: {
      score: 82,
      summary: 'Salesforce (owner of Slack) is a well-established enterprise software company with a strong track record in security and compliance. The company regularly publishes security updates and maintains transparency with customers.',
      sources: [
        {
          id: 'src-1',
          source: 'Salesforce Trust Center',
          url: 'https://trust.salesforce.com',
          type: 'vendor-stated',
          verified: true
        },
        {
          id: 'src-2',
          source: 'Gartner Peer Insights',
          type: 'independent',
          verified: true
        }
      ]
    },
    vulnerabilities: {
      cveCount: 8,
      trendData: [
        { month: '2024-01', count: 0 },
        { month: '2024-02', count: 1 },
        { month: '2024-03', count: 0 },
        { month: '2024-04', count: 2 },
        { month: '2024-05', count: 1 },
        { month: '2024-06', count: 0 },
        { month: '2024-07', count: 1 },
        { month: '2024-08', count: 0 },
        { month: '2024-09', count: 2 },
        { month: '2024-10', count: 1 },
        { month: '2024-11', count: 0 },
        { month: '2024-12', count: 0 }
      ],
      recentCVEs: [
        {
          id: 'CVE-2024-41234',
          cvssScore: 7.5,
          severity: 'high',
          summary: 'Cross-site scripting vulnerability in message rendering',
          publishedDate: '2024-09-15',
          fixedVersion: '4.35.2',
          inCISAKEV: false
        },
        {
          id: 'CVE-2024-38901',
          cvssScore: 5.3,
          severity: 'medium',
          summary: 'Information disclosure through API endpoint',
          publishedDate: '2024-09-02',
          fixedVersion: '4.35.0',
          inCISAKEV: false
        },
        {
          id: 'CVE-2024-32145',
          cvssScore: 6.1,
          severity: 'medium',
          summary: 'Session fixation in mobile app',
          publishedDate: '2024-07-20',
          fixedVersion: '4.33.1',
          inCISAKEV: false
        }
      ],
      cisaKEV: false,
      severityBreakdown: {
        critical: 0,
        high: 2,
        medium: 5,
        low: 1
      }
    },
    incidents: {
      count: 2,
      timeline: [
        {
          id: 'inc-1',
          date: '2022-12-31',
          title: 'Unauthorized access to private channels',
          description: 'A vulnerability was discovered that allowed unauthorized users to access private channel messages under specific conditions. The issue was promptly addressed and affected users were notified.',
          severity: 'high',
          resolved: true,
          source: {
            id: 'src-inc-1',
            source: 'Slack Security Bulletin',
            url: 'https://slack.com/security',
            type: 'vendor-stated',
            verified: true
          }
        },
        {
          id: 'inc-2',
          date: '2021-07-15',
          title: 'Service outage due to infrastructure issue',
          description: 'Major service disruption affecting workspace availability for approximately 4 hours. Root cause was identified as cloud infrastructure misconfiguration.',
          severity: 'medium',
          resolved: true,
          source: {
            id: 'src-inc-2',
            source: 'Slack Status Page',
            type: 'vendor-stated',
            verified: true
          }
        }
      ]
    },
    compliance: {
      certifications: ['SOC 2 Type II', 'ISO 27001', 'GDPR', 'HIPAA', 'FedRAMP'],
      dataHandling: 'Data encrypted in transit (TLS 1.2+) and at rest (AES-256). Data residency options available for enterprise customers.',
      dpa: true,
      sources: [
        {
          id: 'comp-1',
          source: 'Slack Compliance Center',
          url: 'https://slack.com/trust/compliance',
          type: 'compliance-cert',
          verified: true
        }
      ]
    },
    adminControls: {
      sso: true,
      mfa: true,
      rbac: true,
      auditLogs: true,
      dataExport: true
    },
    securityPosture: {
      dimensions: {
        authentication: 85,
        dataProtection: 80,
        networkSecurity: 75,
        incidentResponse: 70,
        compliance: 90,
        vendorTrust: 82
      },
      claims: [
        {
          claim: 'Enterprise Key Management (EKM) available',
          verified: true,
          source: {
            id: 'claim-1',
            source: 'Slack Enterprise Features',
            type: 'vendor-stated',
            verified: true
          }
        },
        {
          claim: 'Real-time security monitoring and alerts',
          verified: true,
          source: {
            id: 'claim-2',
            source: 'Slack Security Documentation',
            type: 'vendor-stated',
            verified: true
          }
        },
        {
          claim: '99.99% uptime SLA for Enterprise Grid',
          verified: true,
          source: {
            id: 'claim-3',
            source: 'Slack SLA Agreement',
            type: 'vendor-stated',
            verified: true
          }
        }
      ]
    },
    alternatives: [
      {
        id: 'alt-1',
        name: 'Microsoft Teams',
        vendor: 'Microsoft',
        trustScore: 85,
        summary: 'Enterprise communication platform with deeper Microsoft 365 integration and stronger compliance certifications.',
        category: 'Team Communication',
        logo: '🟦'
      },
      {
        id: 'alt-2',
        name: 'Mattermost',
        vendor: 'Mattermost Inc.',
        trustScore: 72,
        summary: 'Open-source alternative with self-hosting options, providing greater control over data and security.',
        category: 'Team Communication',
        logo: '💙'
      }
    ],
    allCitations: [
      {
        id: 'src-1',
        source: 'Salesforce Trust Center',
        url: 'https://trust.salesforce.com',
        type: 'vendor-stated',
        verified: true
      },
      {
        id: 'src-2',
        source: 'Gartner Peer Insights',
        type: 'independent',
        verified: true
      },
      {
        id: 'comp-1',
        source: 'Slack Compliance Center',
        url: 'https://slack.com/trust/compliance',
        type: 'compliance-cert',
        verified: true
      }
    ]
  },
  'github': {
    id: 'assessment-github-001',
    timestamp: new Date().toISOString(),
    cached: true,
    product: {
      name: 'GitHub',
      vendor: 'Microsoft (GitHub Inc.)',
      category: 'DevOps & Version Control',
      description: 'GitHub is a web-based platform for version control and collaboration using Git. It provides source code hosting, project management, CI/CD pipelines, and security features for software development.',
      usage: 'Source code hosting, version control, CI/CD, code review, project management',
      website: 'https://github.com',
      logo: '🐙'
    },
    trustScore: {
      score: 88,
      rationale: 'GitHub demonstrates excellent security practices with comprehensive compliance certifications, strong security features, and regular security audits. Backed by Microsoft with extensive security resources.',
      confidence: 92
    },
    vendorReputation: {
      score: 90,
      summary: 'GitHub, owned by Microsoft, is the worlds leading software development platform with a strong reputation for security and reliability. The platform hosts critical infrastructure code for numerous enterprises.',
      sources: [
        {
          id: 'gh-src-1',
          source: 'GitHub Security',
          url: 'https://github.com/security',
          type: 'vendor-stated',
          verified: true
        }
      ]
    },
    vulnerabilities: {
      cveCount: 3,
      trendData: [
        { month: '2024-01', count: 0 },
        { month: '2024-02', count: 0 },
        { month: '2024-03', count: 1 },
        { month: '2024-04', count: 0 },
        { month: '2024-05', count: 0 },
        { month: '2024-06', count: 0 },
        { month: '2024-07', count: 1 },
        { month: '2024-08', count: 0 },
        { month: '2024-09', count: 0 },
        { month: '2024-10', count: 1 },
        { month: '2024-11', count: 0 },
        { month: '2024-12', count: 0 }
      ],
      recentCVEs: [
        {
          id: 'CVE-2024-45001',
          cvssScore: 4.3,
          severity: 'medium',
          summary: 'Improper access control in Actions workflow',
          publishedDate: '2024-10-12',
          fixedVersion: 'Patched server-side',
          inCISAKEV: false
        }
      ],
      cisaKEV: false,
      severityBreakdown: {
        critical: 0,
        high: 0,
        medium: 2,
        low: 1
      }
    },
    incidents: {
      count: 1,
      timeline: [
        {
          id: 'gh-inc-1',
          date: '2023-03-08',
          title: 'RSA SSH host key rotation',
          description: 'GitHub rotated RSA SSH host key due to potential exposure. This was a precautionary measure with no evidence of compromise.',
          severity: 'medium',
          resolved: true,
          source: {
            id: 'gh-inc-src',
            source: 'GitHub Blog',
            url: 'https://github.blog',
            type: 'vendor-stated',
            verified: true
          }
        }
      ]
    },
    compliance: {
      certifications: ['SOC 2 Type II', 'ISO 27001', 'GDPR', 'FedRAMP High', 'PCI DSS'],
      dataHandling: 'Data encrypted in transit and at rest. Secret scanning and security advisories built-in.',
      dpa: true,
      sources: []
    },
    adminControls: {
      sso: true,
      mfa: true,
      rbac: true,
      auditLogs: true,
      dataExport: true
    },
    securityPosture: {
      dimensions: {
        authentication: 95,
        dataProtection: 90,
        networkSecurity: 88,
        incidentResponse: 85,
        compliance: 95,
        vendorTrust: 90
      },
      claims: [
        {
          claim: 'Advanced Security features (secret scanning, dependency review)',
          verified: true,
          source: {
            id: 'gh-claim-1',
            source: 'GitHub Advanced Security',
            type: 'independent',
            verified: true
          }
        }
      ]
    },
    alternatives: [
      {
        id: 'gh-alt-1',
        name: 'GitLab',
        vendor: 'GitLab Inc.',
        trustScore: 84,
        summary: 'Complete DevOps platform with built-in CI/CD and security scanning. Self-hosted option available.',
        category: 'DevOps & Version Control',
        logo: '🦊'
      }
    ],
    allCitations: []
  }
};

const mockHistory: AssessmentHistoryItem[] = [
  {
    id: 'assessment-slack-001',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    cached: false,
    productName: 'Slack',
    vendor: 'Salesforce',
    category: 'Team Communication',
    trustScore: 78
  },
  {
    id: 'assessment-github-001',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    cached: true,
    productName: 'GitHub',
    vendor: 'Microsoft',
    category: 'DevOps & Version Control',
    trustScore: 88
  },
  {
    id: 'assessment-zoom-001',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    cached: true,
    productName: 'Zoom',
    vendor: 'Zoom Video Communications',
    category: 'Video Conferencing',
    trustScore: 65
  }
];

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function searchProduct(query: string): Promise<string[]> {
  await delay(300);
  
  const products = Object.keys(mockAssessments).map(key => 
    mockAssessments[key].product.name
  );
  
  return products.filter(p => 
    p.toLowerCase().includes(query.toLowerCase())
  );
}

export async function assessProduct(query: string): Promise<AssessmentResponse> {
  await delay(1500); // Simulate API call
  
  const key = query.toLowerCase();
  
  if (mockAssessments[key]) {
    return mockAssessments[key];
  }
  
  // Return default assessment if not found
  throw new Error('Product not found. Please try another search.');
}

export async function getAssessmentById(id: string): Promise<AssessmentResponse> {
  await delay(500);
  
  const assessment = Object.values(mockAssessments).find(a => a.id === id);
  
  if (assessment) {
    return assessment;
  }
  
  throw new Error('Assessment not found');
}

export async function getHistory(): Promise<AssessmentHistoryItem[]> {
  await delay(300);
  return mockHistory;
}

export async function compareProducts(ids: string[]): Promise<AssessmentResponse[]> {
  await delay(800);
  
  return Promise.all(ids.map(id => getAssessmentById(id)));
}

// Stats for landing page
export interface AssessmentStats {
  totalAssessments: number;
  averageTrustScore: number;
  productsTracked: number;
  lastUpdated: string;
}

export async function getStats(): Promise<AssessmentStats> {
  await delay(300);
  
  return {
    totalAssessments: 1247,
    averageTrustScore: 74,
    productsTracked: 856,
    lastUpdated: new Date().toISOString()
  };
}
