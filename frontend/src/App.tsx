import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/shared/theme-provider'
import { Navigation } from '@/components/shared/navigation'
import HomePage from '@/pages/HomePage'
import AssessmentPage from '@/pages/AssessmentPage'
import HistoryPage from '@/pages/HistoryPage'
import ComparePage from '@/pages/ComparePage'
import DemoPage from '@/pages/DemoPage'
import NotFoundPage from '@/pages/NotFoundPage'

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Navigation />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/assess/:id" element={<AssessmentPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </ThemeProvider>
  )
}

export default App
