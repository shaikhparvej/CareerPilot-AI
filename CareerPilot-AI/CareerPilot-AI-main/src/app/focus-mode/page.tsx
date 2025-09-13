'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import FocusMode from '@/pages/FocusMode';

export default function FocusModePage() {
  return (
    <ProtectedRoute>
      <FocusMode />
    </ProtectedRoute>
  );
}
