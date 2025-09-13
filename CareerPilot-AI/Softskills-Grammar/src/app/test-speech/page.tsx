import SafeSpeechRecognitionExample from '@/components/SafeSpeechRecognitionExample';
import SafeGrammarCheckClient from '@/components/grammar-check/SafeGrammarCheckClient';
import RobustSpeechRecognitionDemo from '@/components/RobustSpeechRecognitionDemo';
import EnhancedGrammarCheckClient from '@/components/grammar-check/EnhancedGrammarCheckClient';

export default function TestSpeechPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Speech Recognition Solutions Showcase
      </h1>
      
      <div className="space-y-12">
        {/* Enhanced Grammar Check with Robust Speech Recognition */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-green-600">
            🔥 1. Enhanced Grammar Check (Production Ready)
          </h2>
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 text-sm">
              <strong>✅ RECOMMENDED:</strong> This version handles "no-speech" errors gracefully, 
              prevents infinite loops, and provides the best user experience.
            </p>
          </div>
          <EnhancedGrammarCheckClient />
        </section>

        {/* Robust Speech Recognition Demo */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            🛠️ 2. Robust Speech Recognition Demo
          </h2>
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-blue-800 text-sm">
              <strong>🔧 CONFIGURABLE:</strong> Advanced demo with customizable retry settings, 
              confidence scoring, and comprehensive error handling.
            </p>
          </div>
          <RobustSpeechRecognitionDemo />
        </section>

        {/* Basic Safe Speech Recognition Example */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">
            📝 3. Basic Safe Speech Recognition
          </h2>
          <div className="mb-4 p-4 bg-purple-50 border border-purple-200 rounded-md">
            <p className="text-purple-800 text-sm">
              <strong>📚 EDUCATIONAL:</strong> Simple example showing the basic safe patterns 
              for speech recognition without complex features.
            </p>
          </div>
          <SafeSpeechRecognitionExample />
        </section>

        {/* Original Safe Grammar Check */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-orange-600">
            🔄 4. Original Safe Grammar Check
          </h2>
          <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-md">
            <p className="text-orange-800 text-sm">
              <strong>🔄 REFERENCE:</strong> The original safe implementation that fixed 
              the "recognition has already started" error.
            </p>
          </div>
          <SafeGrammarCheckClient />
        </section>
      </div>

      {/* Implementation Guide */}
      <div className="mt-16 space-y-8">
        <h2 className="text-2xl font-semibold text-center">Implementation Guide</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg bg-green-50">
            <h3 className="font-semibold text-green-800 mb-3">🎯 For Production Use</h3>
            <p className="text-sm text-green-700 mb-3">
              Use the <strong>Enhanced Grammar Check Client</strong> which includes:
            </p>
            <ul className="text-sm text-green-600 space-y-1">
              <li>• Robust "no-speech" error handling</li>
              <li>• Automatic retry with exponential backoff</li>
              <li>• Cooldown periods to prevent infinite loops</li>
              <li>• Real-time confidence scoring</li>
              <li>• Comprehensive error messages</li>
            </ul>
          </div>
          
          <div className="p-6 border rounded-lg bg-blue-50">
            <h3 className="font-semibold text-blue-800 mb-3">🧩 For Custom Implementation</h3>
            <p className="text-sm text-blue-700 mb-3">
              Use the <strong>useRobustSpeechRecognition</strong> hook with:
            </p>
            <ul className="text-sm text-blue-600 space-y-1">
              <li>• Configurable retry limits and delays</li>
              <li>• Customizable error handling</li>
              <li>• Flexible restart strategies</li>
              <li>• Real-time status monitoring</li>
              <li>• Production-ready error recovery</li>
            </ul>
          </div>
        </div>

        <div className="p-6 border rounded-lg bg-gray-50">
          <h3 className="font-semibold text-gray-800 mb-3">🚀 Quick Implementation</h3>
          <pre className="text-sm bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
{`import { useRobustSpeechRecognition } from '@/hooks/useRobustSpeechRecognition';

const MyComponent = () => {
  const {
    isListening,
    transcript,
    error,
    noSpeechCount,
    startListening,
    stopListening,
  } = useRobustSpeechRecognition({
    maxNoSpeechRetries: 3,
    retryDelay: 1500,
    autoRestart: true,
  });

  const handleToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening({ lang: 'en-US', continuous: true });
    }
  };

  return (
    <div>
      <button onClick={handleToggle}>
        {isListening ? 'Stop' : 'Start'} Listening
      </button>
      {transcript && <p>Transcript: {transcript}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};`}
          </pre>
        </div>
      </div>
    </div>
  );
}
