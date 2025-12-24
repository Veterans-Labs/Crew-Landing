'use client';

import { useEffect } from 'react';
import { ErrorFallback } from './ErrorFallback';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  return <ErrorFallback error={error.message} reset={reset} />;
}