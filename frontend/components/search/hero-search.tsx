'use client';

import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { assessProduct } from '@/lib/api';

export function HeroSearch() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const result = await assessProduct(query);
      router.push(`/assess/${result.id}`);
    } catch (error) {
      console.error('Search error:', error);
      alert('Product not found. Please try another search.');
    } finally {
      setIsLoading(false);
    }
  }, [query, isLoading, router]);

  return (
    <motion.div
      className="w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for any software product (e.g., Slack, GitHub, Zoom)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 pr-32 h-14 text-lg"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="lg"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Assessing...
              </>
            ) : (
              'Assess'
            )}
          </Button>
        </div>
      </form>
      <motion.p
        className="mt-4 text-center text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Try: <button 
          onClick={() => setQuery('Slack')} 
          className="text-primary hover:underline"
        >
          Slack
        </button>, <button 
          onClick={() => setQuery('GitHub')} 
          className="text-primary hover:underline"
        >
          GitHub
        </button>, or any software product
      </motion.p>
    </motion.div>
  );
}
