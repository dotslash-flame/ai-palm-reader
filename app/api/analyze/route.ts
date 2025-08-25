import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { imageData } = await request.json();

    if (!imageData || typeof imageData !== 'string') {
      return NextResponse.json({ error: 'Image data is required.' }, { status: 400 });
    }

    const prompt = buildPrompt();

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Convert base64 image data to the format Gemini expects
    const imagePart = {
      inlineData: {
        data: imageData.split(',')[1], // Remove data:image/jpeg;base64, prefix
        mimeType: 'image/jpeg',
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response =  result.response;
    const message = response.text() || 'Could not generate a valid response. Please try again.';

    console.log('📜 Reading generated:', message);
    return NextResponse.json({ reading: message });
  } catch (error) {
    console.error('❌ Error in Gemini generation:', error);
    return NextResponse.json({ error: 'Internal server error generating reading.' }, { status: 500 });
  }
}

function buildPrompt(): string {
  return `You are a mystical palm reader with ancient wisdom. I'm showing you an image of someone's palm. Please analyze the palm lines, mounts, and other features visible in the image to provide an insightful palm reading.

Look for these key elements in the palm:
- Heart line (love and relationships)
- Head line (intellect and decision-making)
- Life line (vitality and life path)
- Fate line (career and destiny)
- Palm mounts (personality traits)
- Hand shape and finger characteristics

Provide a unique and personalized palm reading covering love, career, health, and future prospects. Be imaginative and specific, avoiding generic phrases. Use a warm, empathetic tone with mystical flair.

Your response should be 180-200 words, complete, and end with an uplifting conclusion. Include relevant emojis to add magical ambiance. ✨🔮`;
}
