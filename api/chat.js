export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { messages } = req.body;
    const apiKey = process.env.MEGALLM_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Server configuration error: Missing API Key' });
    }

    try {
        const response = await fetch('https://ai.megallm.io/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages,
                model: 'openai-gpt-oss-20b'
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || 'Failed to fetch from MegaLLM');
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error('MegaLLM API Error:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
