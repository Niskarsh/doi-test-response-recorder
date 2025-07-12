import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import { addRow } from './lib/spreadsheet.js';

const app = express();
app.use(cors());          // CORS for all origins
app.use(express.json());  // parse JSON bodies

// Health probe
app.get('/health', (_req: Request, res: Response) => res.sendStatus(200));

// Webhook endpoint
app.post('/webhook', async (req: Request, res: Response) => {
  try {
    // MSG91 payload format → contacts[0].wa_id & messages[0].interactive.button_reply.title
    const waId = req.body?.mobile;
    let button = JSON.parse(req.body?.button);
    let title = button?.payload;


    // if (!waId || !title) {
    //   return res.status(400).json({ error: 'Invalid payload: missing wa_id or button title' });
    // }
    if (title) {
      title = title.trim().toLowerCase();
    }
    await addRow(new Date().toISOString(), waId, title, JSON.stringify(req.body));
    return res.sendStatus(200);
  } catch (err) {
    console.error('[webhook] error:', err);
    return res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server listening on ${PORT}`));
