import { useState, useCallback } from 'react';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>(apiFunc: (...args: any[]) => Promise<T>) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (...args: any[]) => {
    setState({ data: null, loading: true, error: null });
    try {
      const data = await apiFunc(...args);
      setState({ data, loading: false, error: null });
      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'An unexpected error occurred';
      setState({ data: null, loading: false, error: errorMessage });
      throw err;
    }
  }, [apiFunc]);

  return {
    ...state,
    execute,
    reset: () => setState({ data: null, loading: false, error: null })
  };
}
