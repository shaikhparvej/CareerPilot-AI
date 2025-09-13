import { AppLayout } from '@/components/layout/AppLayout';
import { GrammarCheckClient } from '@/components/grammar-check/GrammarCheckClient';
import SafeGrammarCheckClient from '@/components/grammar-check/SafeGrammarCheckClient';

export default function GrammarCheckPage() {
  // Toggle between old and new implementation
  const useSafeImplementation = true; // Set to false to use original implementation

  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        {useSafeImplementation ? (
          <div>
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-800 text-sm">
                <strong>✅ Using Safe Implementation:</strong> This version prevents the "recognition has already started" error.
              </p>
            </div>
            <SafeGrammarCheckClient />
          </div>
        ) : (
          <div>
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-yellow-800 text-sm">
                <strong>⚠️ Using Original Implementation:</strong> This may have speech recognition issues.
              </p>
            </div>
            <GrammarCheckClient />
          </div>
        )}
      </div>
    </AppLayout>
  );
}
