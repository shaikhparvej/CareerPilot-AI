'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import MockInterview from '@/pages/MockInterview';

export default function MockInterviewPage() {
  return (
    <ProtectedRoute>
      <MockInterview />
    </ProtectedRoute>
  );
}
