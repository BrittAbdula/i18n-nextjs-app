import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAIStream, OpenAIStreamPayload } from '@/lib/OpenAIStream'
import { insertEmojiComboLog } from '@/lib/emojicombolog';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const payload: OpenAIStreamPayload = req.body;
  
    try {
      const rawValue = await OpenAIStream(payload);
      console.log(rawValue);
      console.log(typeof rawValue);
      if (rawValue === undefined) {
        return res.status(500).json({ error: 'No data received from OpenAI API' });
      }
  
      const data = JSON.parse(rawValue);
  
      // Asynchronously insert the data into the database
      await insertEmojiComboLog(data);
  
      res.status(200).json(data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }