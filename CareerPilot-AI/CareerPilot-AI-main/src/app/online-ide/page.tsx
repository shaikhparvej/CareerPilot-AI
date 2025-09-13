'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import OnlineIde from '@/pages/OnlineIde';

export default function OnlineIdePage() {
  return (
    <ProtectedRoute>
      <OnlineIde />
    </ProtectedRoute>
  );
}
