import { NextResponse } from 'next/server';

interface TestResult {
  success: boolean;
  trackCount?: number;
  sampleTrack?: {
    id: string;
    name: string;
    artist: string;
    source: string;
  } | null;
  allSources?: string[];
  error?: string;
  message?: string;
  hasResults?: boolean;
}

interface TestResults {
  timestamp: string;
  simpleMusicApiTest: TestResult | null;
  musicApiTests: Record<string, TestResult>;
  errors: string[];
  warnings: string[];
  summary?: {
    totalMusicApiTests: number;
    successfulMusicApiTests: number;
    successRate: string;
    simpleMusicWorking: boolean;
    allFallbacksWorking: boolean;
    status: string;
  };
}

export async function GET() {
  try {
    console.log('🧪 Starting comprehensive Simple Music API test...');

    const results: TestResults = {
      timestamp: new Date().toISOString(),
      simpleMusicApiTest: null,
      musicApiTests: {},
      errors: [],
      warnings: [],
    };

    // Test 1: Simple Music API Authentication
    try {
      console.log('🔐 Testing Simple Music API...');
      const response = await fetch('http://localhost:3001/api/spotify?action=test');
      const data = await response.json();

      if (data.success) {
        results.simpleMusicApiTest = {
          success: true,
          trackCount: data.totalTracks,
          message: 'Simple Music API working perfectly',
        };
        console.log('✅ Simple Music API test successful');
      } else {
        results.simpleMusicApiTest = {
          success: false,
          message: 'Simple Music API test failed',
        };
        results.warnings.push('Simple Music API not responding correctly');
      }
    } catch (error) {
      results.simpleMusicApiTest = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
      results.errors.push(`Simple Music API failed: ${error}`);
    }

    // Test 2: Music Categories Test
    const testCategories = ['ambient', 'focus', 'relaxing'];
    
    for (const category of testCategories) {
      try {
        console.log(`🎵 Testing ${category} music...`);
        const response = await fetch(`http://localhost:3001/api/spotify?action=tracks&category=${category}`);
        const data = await response.json();

        if (data.success && data.tracks.length > 0) {
          results.musicApiTests[category] = {
            success: true,
            trackCount: data.tracks.length,
            sampleTrack: {
              id: data.tracks[0].id,
              name: data.tracks[0].name,
              artist: data.tracks[0].artist,
              source: 'Simple Music Library'
            },
            hasResults: true,
          };
          console.log(`✅ ${category} music loaded: ${data.tracks.length} tracks`);
        } else {
          results.musicApiTests[category] = {
            success: false,
            message: `No ${category} tracks found`,
            hasResults: false,
          };
        }
      } catch (error) {
        results.musicApiTests[category] = {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          hasResults: false,
        };
        results.errors.push(`${category} test failed: ${error}`);
      }
    }
            }
    }

    // Summary
    const totalTests = Object.keys(results.musicApiTests).length;
    const successfulTests = Object.values(results.musicApiTests).filter(
      (test: TestResult) => test.success
    ).length;

    results.summary = {
      totalMusicApiTests: totalTests,
      successfulMusicApiTests: successfulTests,
      successRate: totalTests > 0 ? `${Math.round((successfulTests / totalTests) * 100)}%` : '0%',
      simpleMusicWorking: results.simpleMusicApiTest?.success || false,
      allFallbacksWorking: successfulTests === totalTests,
      status: results.simpleMusicApiTest?.success 
        ? '✅ Simple Music API is working perfectly!'
        : '⚠️ Simple Music API needs attention',
    };

    console.log('🎵 Simple Music API test completed!');
    console.log(`📊 Summary: ${successfulTests}/${totalTests} tests passed`);

    return NextResponse.json(results);
  } catch (error) {
    console.error('❌ Simple Music API test failed:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Simple Music API test failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
    ];

    for (const test of testMethods) {
      try {
        console.log(`🎵 Testing ${test.name}...`);
        const tracks = await test.method();

        results.musicApiTests[test.name] = {
          success: true,
          trackCount: tracks.length,
          sampleTrack: tracks[0]
            ? {
                id: tracks[0].id,
                name: tracks[0].name,
                artist: tracks[0].artist,
                source: tracks[0].id.startsWith('spotify:')
                  ? 'Spotify'
                  : 'Jamendo',
              }
            : null,
          allSources: [
            ...new Set(
              tracks.map(t =>
                t.id.startsWith('spotify:') ? 'Spotify' : 'Jamendo'
              )
            ),
          ],
        };

        console.log(
          `✅ ${test.name}: ${
            tracks.length
          } tracks from ${results.musicApiTests[test.name].allSources.join(
            ', '
          )}`
        );
      } catch (error) {
        results.musicApiTests[test.name] = {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
        results.errors.push(`${test.name} failed: ${error}`);
        console.error(`❌ ${test.name} failed:`, error);
      }
    }

    // Test 3: Spotify Web API Direct Call (if token available)
    if (results.spotifyAuthTest?.success) {
      try {
        console.log('🌐 Testing Spotify Web API direct call...');
        const searchResult = await spotifyAPI.fetchWebApi(
          'search?q=test&type=track&limit=1',
          'GET'
        );

        results.spotifyDirectCall = {
          success: true,
          hasResults: !!searchResult?.tracks?.items?.length,
          message: 'Direct API call successful',
        };
        console.log('✅ Spotify Web API direct call successful');
      } catch (error) {
        results.spotifyDirectCall = {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
        results.warnings.push(`Spotify direct call failed: ${error}`);
      }
    }

    // Summary
    const totalTests = Object.keys(results.musicApiTests).length;
    const successfulTests = Object.values(results.musicApiTests).filter(
      (test: TestResult) => test.success
    ).length;

    results.summary = {
      totalMusicApiTests: totalTests,
      successfulMusicApiTests: successfulTests,
      successRate: `${Math.round((successfulTests / totalTests) * 100)}%`,
      spotifyWorking: results.spotifyAuthTest?.success || false,
      allFallbacksWorking: successfulTests === totalTests,
      status:
        successfulTests === totalTests
          ? 'All systems operational'
          : 'Some issues detected',
    };

    console.log('🏁 Test complete:', results.summary);

    return NextResponse.json({
      success: true,
      message: 'Spotify and Music API test completed',
      results,
    });
  } catch (error) {
    console.error('🚨 Test suite error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Test suite failed to complete',
      },
      { status: 500 }
    );
  }
}
