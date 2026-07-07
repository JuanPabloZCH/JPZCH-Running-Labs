const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

const ALLOWED_ORIGINS = [
  'https://juanpablozch.github.io',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173'
];

function corsHeaders(origin) {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : 'https://juanpablozch.github.io';
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const headers = corsHeaders(origin);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405, headers: { ...headers, 'Content-Type': 'application/json' }
      });
    }

    try {
      const body = await request.json();
      const prompt = body.prompt;

      if (!prompt || typeof prompt !== 'string') {
        return new Response(JSON.stringify({ error: 'Missing prompt' }), {
          status: 400, headers: { ...headers, 'Content-Type': 'application/json' }
        });
      }

      const apiKey = env.GROQ_API_KEY || env.GEMINI_API_KEY;
      if (!apiKey) {
        return new Response(JSON.stringify({ error: 'Server config error' }), {
          status: 500, headers: { ...headers, 'Content-Type': 'application/json' }
        });
      }

      const groqRes = await fetch(GROQ_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.3,
          max_tokens: 4096
        })
      });

      const text = await groqRes.text();

      if (!groqRes.ok) {
        return new Response(JSON.stringify({
          error: 'Groq API error',
          detail: text.slice(0, 500)
        }), {
          status: groqRes.status,
          headers: { ...headers, 'Content-Type': 'application/json' }
        });
      }

      return new Response(text, {
        status: 200,
        headers: { ...headers, 'Content-Type': 'application/json' }
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500, headers: { ...headers, 'Content-Type': 'application/json' }
      });
    }
  }
};
