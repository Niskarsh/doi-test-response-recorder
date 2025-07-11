import fetch from 'node-fetch';
import 'dotenv/config';

/**
 * Append one row to Google Sheets via NoCodeAPI.
 * Sheet tab must have columns:  Date ISO | Phone | Answer
 */
export async function addRow(dateISO: string, phone: string, answer: string) {
  const base = process.env.NOCODEAPI_BASE_URL;     // e.g. https://v1.nocodeapi.com/you/google_sheets/abcdef
  const tab  = process.env.NOCODEAPI_TAB_ID;       // e.g. Sheet1
  const key  = process.env.NOCODEAPI_KEY;

  if (!base || !tab || !key) {
    throw new Error('NoCodeAPI env vars missing');
  }

  const url  = `${base}?tabId=${encodeURIComponent(tab)}`;
  const body = [[dateISO, phone, answer]];          // 2-D as required by NoCodeAPI

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    //   'X-API-KEY': key
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    throw new Error(`NoCodeAPI error ${res.status}: ${await res.text()}`);
  }
}
