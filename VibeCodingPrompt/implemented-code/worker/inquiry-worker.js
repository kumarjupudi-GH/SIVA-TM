/**
 * SIVA Techno Mart: inquiry receiver (Cloudflare Worker).
 * Appends each form submission as one row to data/SIVATM-Inquiry.csv in the GitHub repo.
 *
 * Settings (Cloudflare > Workers > this worker > Settings):
 *   GITHUB_TOKEN   (Secret)  fine-grained token, ONLY this repo, permission "Contents: Read and write"
 *   REPO           (Variable) kumarjupudi-GH/SIVA-TM
 *   BRANCH         (Variable) inquiries   <- keep off main so the site is not rebuilt per inquiry
 *   ALLOWED_ORIGIN (Variable) https://siva-tm.technomarketplace.workers.dev
 */
const PATH = 'data/SIVATM-Inquiry.csv';
const HEADER = 'Received,Type,Name,Email,Interest,Idea title,Assistance requested,Message,Source page\n';
const LIMITS = { name: 120, email: 200, interest: 100, title: 200, assistance: 100, message: 5000, page: 100 };

export function clean(v, max) {
  let s = v == null ? '' : String(v);
  s = s.replace(/\r\n/g, '\n').trim().slice(0, max);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}
export function csvCell(s) { return '"' + String(s).replace(/"/g, '""') + '"'; }

export function buildRow(d, now = new Date()) {
  if (d.website) return { skip: true };
  if (!['inquiry', 'idea'].includes(d.kind)) return { error: 'Bad request' };
  const name = clean(d.name, LIMITS.name), email = clean(d.email, LIMITS.email), message = clean(d.message, LIMITS.message);
  const interest = clean(d.interest, LIMITS.interest), title = clean(d.title, LIMITS.title), assistance = clean(d.assistance, LIMITS.assistance);
  if (name.length < 2) return { error: 'Name is required' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'Valid email is required' };
  if (message.length < 10) return { error: 'Message is required' };
  if (d.kind === 'inquiry' && !interest) return { error: 'Interest is required' };
  if (d.kind === 'idea' && (title.length < 3 || !assistance)) return { error: 'Idea title and assistance are required' };
  const received = now.toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
  return { row: [received, d.kind, name, email, interest, title, assistance, message, clean(d.page, LIMITS.page)].map(csvCell).join(',') + '\n' };
}

const b64 = (s) => btoa(String.fromCharCode(...new TextEncoder().encode(s)));
const unb64 = (b) => new TextDecoder().decode(Uint8Array.from(atob(b.replace(/\n/g, '')), (c) => c.charCodeAt(0)));

export async function appendToRepo(env, row, fetchFn = fetch) {
  const url = `https://api.github.com/repos/${env.REPO}/contents/${PATH}`;
  const h = { Authorization: `Bearer ${env.GITHUB_TOKEN}`, 'User-Agent': 'siva-tm-inquiry', Accept: 'application/vnd.github+json' };
  for (let attempt = 0; attempt < 4; attempt++) {
    const g = await fetchFn(`${url}?ref=${env.BRANCH}`, { headers: h });
    let text = HEADER, sha;
    if (g.ok) { const j = await g.json(); text = unb64(j.content); sha = j.sha; }
    else if (g.status !== 404) throw new Error('read ' + g.status);
    const body = { message: 'New inquiry', branch: env.BRANCH, content: b64(text + row) };
    if (sha) body.sha = sha;
    const p = await fetchFn(url, { method: 'PUT', headers: h, body: JSON.stringify(body) });
    if (p.ok) return true;
    if (p.status !== 409 && p.status !== 422) throw new Error('write ' + p.status); // 409/422 = file changed, retry
  }
  throw new Error('conflict');
}

export default {
  async fetch(req, env) {
    const cors = { 'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Content-Type': 'application/json' };
    const reply = (ok, message, status = 200) => new Response(JSON.stringify(message ? { ok, message } : { ok }), { status, headers: cors });
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (req.method === 'GET') return reply(true, 'SIVA-TM inquiry endpoint is running');
    if (req.method !== 'POST') return reply(false, 'Bad request', 405);
    try {
      const raw = await req.text();
      if (!raw || raw.length > 20000) return reply(false, 'Bad request', 400);
      const r = buildRow(JSON.parse(raw));
      if (r.skip) return reply(true);
      if (r.error) return reply(false, r.error, 400);
      await appendToRepo(env, r.row);
      return reply(true);
    } catch (e) { return reply(false, 'Server error', 500); }
  },
};
