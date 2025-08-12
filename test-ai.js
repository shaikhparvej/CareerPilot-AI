const axios = require('axios');

async function testAIResponse() {
  try {
    console.log('Testing AI response format...');

    const response = await axios.post('http://localhost:3004/api/gemini', {
      prompt: 'generate which type of job roll are available in branch Computer Science and Engineering,it include category,role in json formate'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Status:', response.status);
    console.log('Raw response data:', response.data);

    // The response should be the actual AI response text
    let responseText = response.data;

    console.log('Response text type:', typeof responseText);
    console.log('Response text:', responseText);

    // Clean the response text by removing markdown code blocks
    let cleanedText = responseText.toString().trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    console.log('Cleaned text:', cleanedText);

    const parsedResult = JSON.parse(cleanedText);
    console.log('Parsed result:', JSON.stringify(parsedResult, null, 2));

    // Check the structure
    const firstKey = Object.keys(parsedResult)[0];
    console.log('First key:', firstKey);
    console.log('Is array?', Array.isArray(parsedResult[firstKey]));
    if (Array.isArray(parsedResult[firstKey])) {
      console.log('First item:', parsedResult[firstKey][0]);
    }

  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testAIResponse();
