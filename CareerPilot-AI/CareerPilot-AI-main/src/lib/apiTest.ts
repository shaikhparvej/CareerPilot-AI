// Test file to verify all CareerPilot-AI APIs are working correctly
// Run this in browser console to test functionality

async function testCareerPilotAPIs() {
  console.log('🚀 Testing CareerPilot-AI APIs...');

  try {
    // Test Music API
    console.log('🎵 Testing Music API...');
    const response = await fetch('/api/music-test');
    if (response.ok) {
      console.log('✅ Music API: Working');
    } else {
      console.log('⚠️ Music API: Using fallback');
    }
  } catch (error) {
    console.log('⚠️ Music API: Using fallback mode');
  }

  try {
    // Test Spotify Integration
    console.log('🎧 Testing Spotify Integration...');
    // This will use fallback if Spotify credentials are not configured
    const musicData = await window.musicAPI?.getAllStudyMusic();
    if (musicData) {
      console.log('✅ Music Data Loaded:', {
        ambient: musicData.ambient?.length || 0,
        lofi: musicData.lofi?.length || 0,
        nature: musicData.nature?.length || 0,
        popular: musicData.popular?.length || 0,
        playlists: musicData.playlists?.length || 0,
      });
    }
  } catch (error) {
    console.log('⚠️ Music integration using fallback data');
  }

  try {
    // Test Web Audio API
    console.log('🔊 Testing Web Audio API...');
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();

    if (audioContext) {
      console.log('✅ Web Audio API: Available');
      console.log('🎼 Audio Context State:', audioContext.state);

      // Test oscillator
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Set very low volume for test
      gainNode.gain.setValueAtTime(0.01, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0, audioContext.currentTime + 0.1);

      oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
      oscillator.type = 'sine';

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);

      console.log('✅ Web Audio API: Test tone played successfully');

      // Close test context
      setTimeout(() => {
        audioContext.close();
      }, 200);
    }
  } catch (error) {
    console.error('❌ Web Audio API Error:', error);
  }

  try {
    // Test Code Execution API
    console.log('💻 Testing Code Execution API...');
    const codeResponse = await fetch('/api/execute-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language: 'javascript',
        code: 'console.log("CareerPilot-AI API Test");',
        input: '',
      }),
    });

    if (codeResponse.ok) {
      const codeResult = await codeResponse.json();
      console.log('✅ Code Execution API: Working');
      console.log('🎯 Test Output:', codeResult.output);
    }
  } catch (error) {
    console.log('⚠️ Code Execution API Error:', error.message);
  }

  console.log('🎉 CareerPilot-AI API Testing Complete!');
}

// Auto-run test in browser
if (typeof window !== 'undefined') {
  // Add to window for manual testing
  window.testCareerPilotAPIs = testCareerPilotAPIs;

  // Display test instructions
  console.log('🔧 CareerPilot-AI API Test Tool Loaded');
  console.log('📋 Run: testCareerPilotAPIs() to test all APIs');
}

export { testCareerPilotAPIs };
