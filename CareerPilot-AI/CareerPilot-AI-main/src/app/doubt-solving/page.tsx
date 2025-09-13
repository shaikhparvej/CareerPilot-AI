'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import DoubtSolving from '@/pages/DoubtSolving';

export default function DoubtSolvingPage() {
  return (
    <ProtectedRoute>
      <DoubtSolving />
    </ProtectedRoute>
  );
}
