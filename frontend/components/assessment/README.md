# Phase 4 Assessment Components

This directory contains the 8 new assessment components implementing Phase 4 of the Security Assessor frontend.

## Components

### 1. PlatformSupportGrid (`platform-support-grid.tsx`)
Displays platform support across macOS, Windows, Linux, iOS, Android, and Web with version indicators and security models.

**Features:**
- Visual platform badges with icons
- Version compatibility information
- Security model details (full report)
- Responsive grid layout
- Supports Small/Medium/Full report sizes

**Usage:**
```tsx
import { PlatformSupportGrid } from "@/components/assessment"

<PlatformSupportGrid 
  platformSupport={assessment.platformSupport}
  reportSize="medium"
/>
```

---

### 2. DataHandlingFlowchart (`data-handling-flowchart.tsx`)
Visual flowchart showing data flow through Storage → Transmission → Usage stages.

**Features:**
- Three-stage visual flow with icons
- Encryption status indicators
- Sub-processors and endpoints (full report)
- Color-coded status indicators
- Responsive design

**Usage:**
```tsx
import { DataHandlingFlowchart } from "@/components/assessment"

<DataHandlingFlowchart 
  dataHandling={assessment.dataHandling}
  reportSize="medium"
/>
```

---

### 3. PermissionsMatrix (`permissions-matrix.tsx`)
Risk-coded table showing required and optional permissions with justifications.

**Features:**
- Risk level indicators (Low/Medium/High)
- Required vs Optional distinction
- Justification for each permission
- Over-permissioning risk warnings
- Animated entry transitions

**Usage:**
```tsx
import { PermissionsMatrix } from "@/components/assessment"

<PermissionsMatrix 
  permissions={assessment.permissions}
  reportSize="medium"
/>
```

---

### 4. ReleaseLifecycleTimeline (`release-lifecycle-timeline.tsx`)
Version history timeline with patch cadence, EOL dates, and release frequency.

**Features:**
- Current version display
- Update frequency and patch cadence
- LTS version badges
- EOL version warnings
- Version history timeline with security fixes
- Visual timeline with dots

**Usage:**
```tsx
import { ReleaseLifecycleTimeline } from "@/components/assessment"

<ReleaseLifecycleTimeline 
  releaseLifecycle={assessment.releaseLifecycle}
  reportSize="medium"
/>
```

---

### 5. AIFeaturesBreakdown (`ai-features-breakdown.tsx`)
AI capabilities breakdown with data usage disclosure and processing location.

**Features:**
- AI feature cards with descriptions
- Data access indicators
- Training data usage warnings
- Opt-out availability
- Processing location (Local/Cloud/Hybrid)
- Handles products without AI features

**Usage:**
```tsx
import { AIFeaturesBreakdown } from "@/components/assessment"

<AIFeaturesBreakdown 
  aiFeatures={assessment.aiFeatures}
  reportSize="medium"
/>
```

---

### 6. SourcesBreakdown (`sources-breakdown.tsx`)
Public vs confidential sources visualization with pie chart and type breakdown.

**Features:**
- Public/Confidential source counts
- Interactive pie chart (Recharts)
- Source type breakdown (full report)
- Transparency notes
- Percentage calculations

**Usage:**
```tsx
import { SourcesBreakdown } from "@/components/assessment"

<SourcesBreakdown 
  sources={assessment.sources}
  reportSize="medium"
/>
```

---

### 7. ReportSizeSelector (`report-size-selector.tsx`)
Toggle component for switching between Small/Medium/Full detail levels.

**Features:**
- Three size options with read times
- Visual selection indicator
- Smooth animations
- Sticky positioning support
- Read time badges

**Usage:**
```tsx
import { ReportSizeSelector } from "@/components/assessment"
import { useState } from "react"

const [reportSize, setReportSize] = useState<ReportSize>("medium")

<ReportSizeSelector 
  currentSize={reportSize}
  onSizeChange={setReportSize}
/>
```

---

### 8. DisclaimerBanner (`disclaimer-banner.tsx`)
Accuracy warning banner with confidence level and assessment metadata.

**Features:**
- Confidence level display
- Assessment timestamp
- Source verification links
- Vendor security page links
- Expandable details (full report)
- Color-coded confidence indicators

**Usage:**
```tsx
import { DisclaimerBanner } from "@/components/assessment"

<DisclaimerBanner 
  assessment={assessment}
  reportSize="medium"
/>
```

---

## Report Size Support

All components support three report sizes:

- **Small** (`"small"`): Minimal information, 2-minute read
- **Medium** (`"medium"`): Standard detail, 5-minute read (default)
- **Full** (`"full"`): Complete information, 10-minute read

Components automatically adapt their content based on the `reportSize` prop.

## Design Features

- ✨ **Framer Motion** animations for smooth transitions
- 🎨 **Tailwind CSS** with custom color schemes
- 📱 **Responsive** layouts for all screen sizes
- 🌙 **Dark mode** support
- ♿ **Accessible** with proper ARIA labels and semantic HTML

## Integration Example

```tsx
"use client"

import { useState } from "react"
import { Assessment, ReportSize } from "@/lib/types"
import {
  PlatformSupportGrid,
  DataHandlingFlowchart,
  PermissionsMatrix,
  ReleaseLifecycleTimeline,
  AIFeaturesBreakdown,
  SourcesBreakdown,
  ReportSizeSelector,
  DisclaimerBanner,
} from "@/components/assessment"

export function AssessmentDetail({ assessment }: { assessment: Assessment }) {
  const [reportSize, setReportSize] = useState<ReportSize>("medium")

  return (
    <div className="space-y-6">
      {/* Report Size Selector */}
      <ReportSizeSelector 
        currentSize={reportSize}
        onSizeChange={setReportSize}
      />

      {/* Assessment Components */}
      <PlatformSupportGrid 
        platformSupport={assessment.platformSupport}
        reportSize={reportSize}
      />

      <DataHandlingFlowchart 
        dataHandling={assessment.dataHandling}
        reportSize={reportSize}
      />

      <PermissionsMatrix 
        permissions={assessment.permissions}
        reportSize={reportSize}
      />

      <ReleaseLifecycleTimeline 
        releaseLifecycle={assessment.releaseLifecycle}
        reportSize={reportSize}
      />

      <AIFeaturesBreakdown 
        aiFeatures={assessment.aiFeatures}
        reportSize={reportSize}
      />

      <SourcesBreakdown 
        sources={assessment.sources}
        reportSize={reportSize}
      />

      {/* Disclaimer */}
      <DisclaimerBanner 
        assessment={assessment}
        reportSize={reportSize}
      />
    </div>
  )
}
```

## Next Steps

These components are ready to be integrated into the assessment detail page (`/app/assess/[id]/page.tsx`) as part of Phase 5 implementation.
