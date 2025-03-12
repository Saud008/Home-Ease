import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return Response.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Mock responses for testing
    const mockResponses = {
      greeting: "Hello! How can I help you with HomeEase services today?",
      services: "We offer various home services including cleaning, maintenance, and repairs. What specific service are you interested in?",
      pricing: "Our pricing varies depending on the service and scope of work. Could you tell me which service you're interested in?",
      booking: "You can book our services through our website or by chatting with me. What type of service would you like to book?",
      default: "I understand you're asking about our services. Could you please provide more details about what you're looking for?"
    };

    let reply = mockResponses.default;
    
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      reply = mockResponses.greeting;
    } else if (lowerMessage.includes('service')) {
      reply = mockResponses.services;
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      reply = mockResponses.pricing;
    } else if (lowerMessage.includes('book') || lowerMessage.includes('schedule')) {
      reply = mockResponses.booking;
    }

    return Response.json({ reply });

  } catch (error) {
    console.error('Chat Error:', error);
    return Response.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}
