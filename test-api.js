const { GoogleGenerativeAI } = require('@google/generative-ai');

// Test the API key directly
const apiKey = 'AIzaSyDOAtf0gqqMJpu5nVaSEbutTOpK_GZN7mo';
console.log('Testing API key:', apiKey.substring(0, 8) + '...');

const genAI = new GoogleGenerativeAI(apiKey);

async function testAPI() {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent('Hello, test message');
    const response = await result.response;
    console.log('✅ API key is working!');
    console.log('Response:', response.text());
  } catch (error) {
    console.error('❌ API key test failed:');
    console.error('Error details:', error.message);
    if (error.message.includes('API_KEY_INVALID')) {
      console.error('The API key appears to be invalid or expired');
    }
    if (error.message.includes('PERMISSION_DENIED')) {
      console.error('Permission denied - check API key permissions');
    }
  }
}

testAPI();
