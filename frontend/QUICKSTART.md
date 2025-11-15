# 🚀 Quick Start Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Installation

```bash
cd frontend
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The app will be available at **http://localhost:3000**

### Hot Module Replacement (HMR)
Vite provides instant feedback - save any file and see changes immediately in the browser without refresh.

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

Serves the production build locally for testing.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript compiler |

## Testing the Application

### 1. Landing Page
Visit http://localhost:3000
- Should see animated hero section with shield icon
- Search bar with placeholder text
- Recent assessments grid
- Features showcase

### 2. Search Functionality
Type in the search bar:
- "Slack" → should show in suggestions
- "GitHub" → should show in suggestions
- Click any suggestion to navigate to assessment page

### 3. Assessment Pages
Direct URLs to try:
- http://localhost:3000/assess/slack-001 (Trust Score: 78)
- http://localhost:3000/assess/github-001 (Trust Score: 88)

### 4. Demo Page
Visit http://localhost:3000/demo
- Showcases all 10+ Phase 3 components
- Interactive examples with sample data

### 5. Other Pages
- http://localhost:3000/history - History placeholder
- http://localhost:3000/compare - Compare placeholder
- http://localhost:3000/invalid-route - 404 page

### 6. Theme Toggle
Click the sun/moon icon in the top right to toggle between light and dark mode.

## Project Structure

```
frontend/
├── src/
│   ├── main.tsx              # App entry point
│   ├── App.tsx               # Router setup
│   ├── pages/                # Route components
│   ├── components/           # UI components
│   │   ├── assessment/       # 20+ assessment components
│   │   ├── search/           # Search components
│   │   ├── shared/           # Shared components
│   │   └── ui/               # Base UI components
│   ├── lib/
│   │   ├── api.ts            # Mock API
│   │   ├── types.ts          # TypeScript types
│   │   └── utils.ts          # Utilities
│   └── globals.css           # Global styles
├── public/                   # Static assets
├── dist/                     # Production build (after npm run build)
├── index.html                # HTML entry point
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript config
└── package.json              # Dependencies
```

## Key Features

### 🎨 Design
- Modern, clean interface
- Smooth animations with Framer Motion
- Responsive design (mobile, tablet, desktop)
- Dark mode support

### 🔍 Search
- Real-time suggestions
- Autocomplete dropdown
- Popular searches shortcut

### 📊 Visualizations
- Trust score circles with animations
- Security radar charts
- CVE trend charts
- Incident timelines
- And more...

### 🛡️ Assessment Components
- 20+ specialized components
- Interactive charts and graphs
- Color-coded risk levels
- Citation system
- Detailed breakdowns

## Troubleshooting

### Port Already in Use
If port 3000 is busy:
```bash
# Kill process on port 3000
npx kill-port 3000

# Or run on different port
npm run dev -- --port 3001
```

### Dependencies Not Installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clean build and rebuild
rm -rf dist
npm run build
```

### TypeScript Errors
```bash
# Check for type errors
npm run type-check
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

### Development
- **Cold start**: ~136ms
- **HMR**: <100ms
- **Memory**: ~150MB

### Production
- **Bundle size**: 896 KB (minified)
- **Gzipped**: 261 KB
- **Load time**: <2s on 3G

## What's Included

✅ 20+ assessment components  
✅ Full routing with React Router  
✅ Dark mode with system detection  
✅ Responsive design  
✅ TypeScript throughout  
✅ Framer Motion animations  
✅ Recharts visualizations  
✅ Mock API with sample data  
✅ Loading states  
✅ Error handling  
✅ 404 page  

## Next Steps

1. ✅ Install dependencies
2. ✅ Run dev server
3. ✅ Test all routes
4. ✅ Check responsive design
5. ✅ Build for production
6. 🎯 Deploy to hosting

## Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [React Router](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)

## Support

For issues or questions, check:
- `REACT_CONVERSION_README.md` - Detailed conversion guide
- `CONVERSION_COMPLETE.md` - Full conversion summary
- `README.md` - Project overview

---

**Happy coding!** 🚀
