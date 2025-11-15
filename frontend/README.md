# Security Assessor - React + Vite

A comprehensive third-party software security assessment platform built with **React 18**, **Vite**, and **TypeScript**.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📦 Tech Stack

- **React 18.3** - UI library
- **Vite 5** - Build tool & dev server
- **TypeScript** - Type safety
- **React Router 6** - Client-side routing
- **Tailwind CSS 3** - Styling
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **Radix UI** - Accessible components
- **Lucide React** - Icon library

## 🏗️ Project Structure

```
src/
├── main.tsx              # Application entry point
├── App.tsx               # Router configuration
├── pages/                # Route components
│   ├── HomePage.tsx      # Landing page with search
│   ├── AssessmentPage.tsx # Assessment detail view
│   ├── HistoryPage.tsx   # Assessment history
│   ├── ComparePage.tsx   # Product comparison
│   ├── DemoPage.tsx      # Component showcase
│   └── NotFoundPage.tsx  # 404 page
├── components/
│   ├── assessment/       # 20+ assessment components
│   ├── search/           # Search components
│   ├── shared/           # Shared components
│   └── ui/               # Base UI components (shadcn/ui)
├── lib/
│   ├── api.ts            # Mock API client
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Utility functions
└── globals.css           # Global styles & theme
```

## 🎨 Features

### Assessment Components (Phase 3 & 4)

✅ **Phase 3 Components**
- Trust Score Circle
- Security Radar Chart
- CVE Trend Chart
- CVE Severity Breakdown
- Incident Timeline
- Alternative Products
- Admin Controls Grid
- Comparison Cards
- Citation System
- Loading Skeletons

✅ **Phase 4 Components**
- Platform Support Grid
- Data Handling Flowchart
- Permissions Matrix
- Release Lifecycle Timeline
- AI Features Breakdown
- Sources Transparency
- Report Size Selector
- Disclaimer Banner
- Security Score Breakdown

### Application Features

- 🔍 **Real-time Search** with autocomplete
- 🌓 **Dark Mode** with system preference support
- 📊 **Data Visualizations** with Recharts
- ✨ **Smooth Animations** with Framer Motion
- 📱 **Fully Responsive** design
- ♿ **Accessible** UI components
- 🎯 **TypeScript** throughout
- ⚡ **Fast** Vite HMR

## 🗺️ Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero search |
| `/assess/:id` | Assessment detail page |
| `/history` | Assessment history |
| `/compare` | Product comparison |
| `/demo` | Component showcase |

## 🎯 Available Assessments

The application includes mock data for:
- **Slack** (Trust Score: 78) - `/assess/slack-001`
- **GitHub** (Trust Score: 88) - `/assess/github-001`

## 🎨 Design System

### Theme
- Light and dark mode support
- System preference detection
- Persistent theme selection

### Colors
- Primary Blue (#2563eb)
- Success Green (#10b981)
- Warning Yellow (#f59e0b)
- Danger Red (#ef4444)
- Gradient accents

### Typography
- Inter font family
- Responsive sizing
- Clear hierarchy
- Gradient text effects

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (port 3000) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript compiler |

## 🏗️ Building

```bash
npm run build
```

Output will be in the `dist/` directory:
- `index.html` - Entry HTML file
- `assets/` - Optimized CSS and JS bundles

## 🚀 Deployment

The built application is a static SPA that can be deployed to:
- **Netlify** - Drag & drop the `dist` folder
- **Vercel** - Connect GitHub repository
- **GitHub Pages** - Use GitHub Actions
- **AWS S3** - Upload to S3 bucket
- Any static hosting service

### Build Output
```
dist/
├── index.html        ~0.7 KB (gzipped: 0.42 KB)
├── assets/
│   ├── index.css    ~57 KB (gzipped: 9.67 KB)
│   └── index.js    ~896 KB (gzipped: 261 KB)
```

## 🔧 Configuration

### Vite Config
- React plugin enabled
- Path aliases: `@/*` → `./src/*`
- Dev server on port 3000

### Tailwind Config
- Custom theme tokens
- Dark mode support
- Custom animations
- shadcn/ui plugin

## 🧪 Development

### Hot Module Replacement
Vite provides instant HMR - changes appear immediately without full page reload.

### Type Safety
Full TypeScript support with strict mode enabled. No `any` types allowed.

### Component Library
Uses shadcn/ui components - customizable, accessible, and well-documented.

## 📚 Documentation

- [Getting Started Guide](./GETTING_STARTED.md)
- [Component Documentation](./components/assessment/README.md)
- [Type Definitions](./src/lib/types.ts)
- [API Documentation](./src/lib/api.ts)

## 🎉 Status

✅ **Phase 1**: Foundation & Core Setup - COMPLETE  
✅ **Phase 2**: Landing Page - COMPLETE  
✅ **Phase 3**: Assessment Components - COMPLETE  
✅ **Phase 4**: Framework Components - COMPLETE  
✅ **React Conversion**: Next.js → React + Vite - COMPLETE  

## 📄 License

This project is private and confidential.

---

**Ready to run!** Start with `npm run dev` 🚀
