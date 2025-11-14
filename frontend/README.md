# Security Assessor Frontend

A modern, comprehensive web application for evaluating the security posture, vulnerabilities, and compliance of third-party software products.

## Features

### 🛡️ Comprehensive Security Analysis
- **Trust Scores**: Data-driven security ratings (0-100) based on multiple security factors
- **CVE Tracking**: Real-time vulnerability monitoring with severity analysis and trend tracking
- **Compliance Verification**: Verify certifications (SOC 2, ISO 27001, GDPR, etc.)
- **Vendor Reputation**: Independent vendor trust scores and ratings
- **Incident Timeline**: Historical security incidents and breaches
- **Security Posture**: Multi-dimensional radar charts showing security capabilities

### 📊 Interactive Visualizations
- Animated trust score circles with color-coded risk levels
- CVE trend line charts showing vulnerability patterns
- Severity breakdown pie charts
- Security dimension radar charts
- Interactive tooltips and data exploration

### 🔍 Search & History
- Fast product search with suggestions
- Assessment history with filtering and sorting
- Cached results for quick access
- Comparison view for side-by-side product analysis

### 🎨 Modern UI/UX
- Beautiful, responsive design with Tailwind CSS
- Smooth animations with Framer Motion
- Dark mode support with theme toggle
- Skeleton loading states
- Professional color scheme (Blue/Green/Yellow/Red for risk levels)

## Tech Stack

- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe development
- **shadcn/ui** - High-quality UI components
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Data visualization
- **Framer Motion** - Smooth animations
- **Lucide Icons** - Modern icon library

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Landing page with hero search
│   ├── assess/[id]/         # Assessment detail pages
│   ├── compare/             # Product comparison page
│   ├── history/             # Assessment history page
│   ├── layout.tsx           # Root layout with navigation
│   └── globals.css          # Global styles and theme
├── components/
│   ├── assessment/          # Assessment-specific components
│   │   ├── trust-score-circle.tsx
│   │   ├── security-radar-chart.tsx
│   │   ├── cve-trend-chart.tsx
│   │   ├── cve-severity-breakdown.tsx
│   │   ├── incident-timeline.tsx
│   │   └── alternative-card.tsx
│   ├── search/              # Search components
│   │   └── hero-search.tsx
│   ├── shared/              # Shared components
│   │   ├── navigation.tsx
│   │   ├── citation-badge.tsx
│   │   ├── stats-overview.tsx
│   │   ├── recent-assessments.tsx
│   │   └── loading-skeleton.tsx
│   └── ui/                  # shadcn/ui base components
├── lib/
│   ├── api.ts              # Mock API client
│   ├── types.ts            # TypeScript interfaces
│   └── utils.ts            # Utility functions
└── public/                 # Static assets
```

## Key Pages

### Landing Page (`/`)
- Hero section with animated security shield
- Prominent search bar with suggestions
- Stats overview with count-up animations
- Recent assessments carousel
- Feature highlights

### Assessment Detail Page (`/assess/[id]`)
- Product header with trust score
- Five comprehensive tabs:
  - **Overview**: Product info, trust analysis, vendor reputation
  - **Security**: Radar chart, admin controls, security claims, incidents
  - **Vulnerabilities**: CVE trends, severity breakdown, recent CVEs, CISA KEV alerts
  - **Compliance**: Certifications, data handling, DPA status
  - **Alternatives**: Recommended alternative products

### History Page (`/history`)
- Search and filter assessments
- Sort by date, score, or name
- Quick access to view or compare assessments

### Comparison Page (`/compare`)
- Side-by-side product comparison
- Trust scores, CVEs, certifications
- Admin controls matrix
- Security dimensions comparison

## API Integration

Currently using mock data for development. The API client is located in `lib/api.ts`.

To integrate with a real backend:
1. Update the API endpoints in `lib/api.ts`
2. Remove mock data and replace with actual API calls
3. Update the `AssessmentResponse` interface in `lib/types.ts` if needed

## Design System

### Color Palette
- **Primary Blue (#2563eb)**: Trust, security, primary actions
- **Success Green (#10b981)**: High trust scores (71-100)
- **Warning Yellow (#f59e0b)**: Medium risk (41-70)
- **Danger Red (#ef4444)**: High risk (0-40)
- **Neutral Grays**: Professional backgrounds and text

### Trust Score Ranges
- **71-100**: High Trust (Green)
- **41-70**: Moderate Risk (Yellow)
- **0-40**: High Risk (Red)

## Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark mode with theme toggle
- ✅ Smooth animations and transitions
- ✅ Interactive charts and visualizations
- ✅ Citation transparency with source verification
- ✅ Loading states with skeleton screens
- ✅ Error handling and fallbacks
- ✅ Accessible keyboard navigation
- ✅ SEO optimized metadata

## Future Enhancements

- [ ] Real API integration
- [ ] PDF export functionality
- [ ] User authentication
- [ ] Saved assessments and favorites
- [ ] Email alerts for new vulnerabilities
- [ ] Advanced filtering and search
- [ ] Historical trend analysis
- [ ] Multi-product bulk assessments

## License

This project is part of the Security Assessor application.
