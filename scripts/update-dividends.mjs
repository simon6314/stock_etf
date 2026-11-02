// 每天由 GitHub Actions 執行：從 Yahoo Finance 抓取 dividends.json 裡每檔股票的除息紀錄，合併後寫回檔案
// 在 GitHub 伺服器上執行，不受瀏覽器 CORS 限制。新增股票：在 dividends.json 加一個 "代號.TW": [] 即可。
import fs from 'node:fs';

const FILE = 'dividends.json';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';
const dateFmt = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Taipei', year: 'numeric', month: '2-digit', day: '2-digit' });

async function fetchDividendEvents(sym) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}?period1=0&period2=${Math.floor(Date.now() / 1000)}&interval=1d&events=div`;
  const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept': 'application/json' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  const divs = json?.chart?.result?.[0]?.events?.dividends;
  if (!divs) return [];
  return Object.values(divs).map(e => ({
    date: dateFmt.format(new Date(e.date * 1000)), // 台北日期 yyyy-mm-dd
    amount: Number(e.amount)
  }));
}

function mergeRecords(existing, incoming) {
  const map = new Map();
  for (const r of [...(existing || []), ...incoming]) {
    if (!r || !r.date || !Number.isFinite(Number(r.amount))) continue;
    map.set(r.date, { date: r.date, amount: Number(r.amount) }); // 同一天以 Yahoo 的資料為準
  }
  return [...map.values()].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

const db = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const before = JSON.stringify(db);
const failed = [];

for (const sym of Object.keys(db)) {
  try {
    const events = await fetchDividendEvents(sym);
    if (events.length === 0) { failed.push(`${sym}（Yahoo 沒有配息資料）`); continue; }
    db[sym] = mergeRecords(db[sym], events);
    console.log(`${sym}: ${db[sym].length} 筆，最新 ${db[sym][0]?.date}`);
  } catch (err) {
    failed.push(`${sym}（${err.message}）`);
  }
  await new Promise(r => setTimeout(r, 800)); // 間隔一下，避免被 Yahoo 限流
}

if (JSON.stringify(db) !== before) {
  fs.writeFileSync(FILE, JSON.stringify(db, null, 2) + '\n');
  console.log('dividends.json 已更新');
} else {
  console.log('沒有新的配息紀錄');
}
if (failed.length) console.log('以下股票未更新：\n- ' + failed.join('\n- '));
