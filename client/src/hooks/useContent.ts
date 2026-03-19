import { useState, useEffect } from 'react';
import { contentService } from '../services/api';

export function useContent<T>(page: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await contentService.get<T>(page);
      setData(result);
      setError(null);
    } catch {
      setError('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return { data, loading, error, refetch: fetchData };
}
