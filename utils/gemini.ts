// Direct implementation using Gemini API
export async function getGeminiResponse(prompt: string) {
  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    console.error('Missing API key');
    return "Configuration error: API key not found. Please contact support.";
  }

  try {
    // Using Gemini API directly
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `You are PetPals Assistant, an AI specialized in pet care and services. You work for PetPals, a marketplace for pet services including dog walking, grooming, boarding, and training. Your responses should be helpful, concise, and focused on pet care.
                  
                  User question: ${prompt}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
            topP: 0.95,
            topK: 40
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_ONLY_HIGH"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_ONLY_HIGH"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_ONLY_HIGH"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_ONLY_HIGH"
            }
          ]
        })
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      console.error('API Error Response:', data);
      if (data.error?.message) {
        return `Sorry, I couldn't process that request: ${data.error.message}`;
      }
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }

    // Extract the response content from the API response
    if (data.candidates && data.candidates[0]?.content?.parts && data.candidates[0].content.parts[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else if (data.promptFeedback?.blockReason) {
      return "I apologize, but I cannot provide a response to that query due to content safety policies. Please try asking something else.";
    } else {
      console.error('Unexpected response format:', data);
      throw new Error('Unexpected API response format');
    }

  } catch (error: any) {
    console.error('Error calling Gemini API:', error);
    
    if (error.message?.includes('API key')) {
      return "Authentication error: Invalid API key. Please contact support.";
    } else if (error.message?.includes('network') || error.message?.includes('Failed to fetch')) {
      return "Network error: Please check your internet connection and try again.";
    } else if (error.message?.includes('429')) {
      return "Rate limit exceeded. Please try again in a few moments.";
    } else if (error.message?.includes('403')) {
      return "API access denied. Please check your API key configuration.";
    } else {
      return `Error: ${error.message}. Please try again.`;
    }
  }
} 