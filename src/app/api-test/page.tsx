'use client';

import { useState } from 'react';
import { checkApiHealth, contestApi } from '@/lib/api';

export default function ApiTestPage() {
  const [healthResult, setHealthResult] = useState<unknown>(null);
  const [leaderboardResult, setLeaderboardResult] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  const testHealth = async () => {
    setLoading(true);
    try {
      const result = await checkApiHealth();
      setHealthResult(result);
      console.log('Health check result:', result);
    } catch (error) {
      console.error('Health check error:', error);
      setHealthResult({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  const testLeaderboard = async () => {
    setLoading(true);
    try {
      const result = await contestApi.getLeaderboard();
      setLeaderboardResult(result);
      console.log('Leaderboard result:', result);
    } catch (error) {
      console.error('Leaderboard error:', error);
      setLeaderboardResult({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">API Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Health Check Test */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Health Check Test</h2>
            <button
              onClick={testHealth}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Test Health API'}
            </button>
            
            {healthResult && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <h3 className="font-semibold mb-2">Result:</h3>
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(healthResult, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Leaderboard Test */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Leaderboard Test</h2>
            <button
              onClick={testLeaderboard}
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Test Leaderboard API'}
            </button>
            
            {leaderboardResult && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <h3 className="font-semibold mb-2">Result:</h3>
                <pre className="text-sm overflow-auto max-h-64">
                  {JSON.stringify(leaderboardResult, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">Debug Info:</h3>
          <p className="text-sm text-yellow-700">
            Check the browser console for detailed API logs and configuration info.
          </p>
        </div>
      </div>
    </div>
  );
}
