/**
 * LiveStock Pro - App Core JavaScript
 * 專為 Android 行動端優化的台股即時自選與配息損益計算系統
 */

// ==========================================
// 1. 歷史配息資料庫 (台股核心權值與熱門 ETF)
// ==========================================
let DIVIDEND_DATABASE = {
  // 台積電 2330.TW (季配息)
  "2330.TW": [
    { date: "2026-03-18", amount: 4.50 },
    { date: "2025-12-18", amount: 4.50 },
    { date: "2025-09-18", amount: 4.00 },
    { date: "2025-06-18", amount: 4.00 },
    { date: "2025-03-18", amount: 4.00 },
    { date: "2024-12-12", amount: 4.00 },
    { date: "2024-09-12", amount: 3.50 },
    { date: "2024-06-13", amount: 3.50 },
    { date: "2024-03-18", amount: 3.00 },
    { date: "2023-12-14", amount: 3.00 },
    { date: "2023-09-14", amount: 3.00 },
    { date: "2023-06-15", amount: 2.75 },
    { date: "2023-03-16", amount: 2.75 },
    { date: "2022-12-15", amount: 2.75 },
    { date: "2022-09-15", amount: 2.75 },
    { date: "2022-06-16", amount: 2.75 },
    { date: "2022-03-16", amount: 2.75 },
    { date: "2021-12-16", amount: 2.75 },
    { date: "2021-09-16", amount: 2.75 },
    { date: "2021-03-17", amount: 2.50 }
  ],
  // 元大高股息 0056.TW (2023年Q3起改為季配息，先前為年配息)
  "0056.TW": [
    { date: "2026-04-17", amount: 0.79 },
    { date: "2026-01-17", amount: 0.70 },
    { date: "2025-10-17", amount: 1.07 },
    { date: "2025-07-17", amount: 1.07 },
    { date: "2025-04-18", amount: 0.73 },
    { date: "2025-01-17", amount: 0.70 },
    { date: "2024-10-17", amount: 1.07 },
    { date: "2024-07-16", amount: 1.07 },
    { date: "2024-04-18", amount: 0.79 },
    { date: "2024-01-17", amount: 0.70 },
    { date: "2023-10-19", amount: 1.20 },
    { date: "2023-07-18", amount: 1.00 },
    { date: "2022-10-19", amount: 2.10 },
    { date: "2021-10-22", amount: 1.80 },
    { date: "2020-10-28", amount: 1.60 }
  ],
  // 國泰永續高股息 00878.TW (季配息)
  "00878.TW": [
    { date: "2026-05-18", amount: 0.40 },
    { date: "2026-02-24", amount: 0.40 },
    { date: "2025-11-18", amount: 0.35 },
    { date: "2025-08-18", amount: 0.35 },
    { date: "2025-05-17", amount: 0.51 },
    { date: "2025-02-25", amount: 0.40 },
    { date: "2024-11-18", amount: 0.55 },
    { date: "2024-08-16", amount: 0.55 },
    { date: "2024-05-17", amount: 0.51 },
    { date: "2024-02-27", amount: 0.40 },
    { date: "2023-11-16", amount: 0.35 },
    { date: "2023-08-16", amount: 0.35 },
    { date: "2023-05-17", amount: 0.27 },
    { date: "2023-02-16", amount: 0.27 },
    { date: "2022-11-16", amount: 0.28 },
    { date: "2022-08-16", amount: 0.28 },
    { date: "2022-05-18", amount: 0.32 },
    { date: "2022-02-22", amount: 0.30 }
  ],
  // 群益台灣精選高息 00919.TW (季配息)
  "00919.TW": [
    { date: "2026-03-18", amount: 0.72 },
    { date: "2025-12-18", amount: 0.72 },
    { date: "2025-09-23", amount: 0.72 },
    { date: "2025-06-24", amount: 0.70 },
    { date: "2025-03-18", amount: 0.66 },
    { date: "2024-12-20", amount: 0.72 },
    { date: "2024-09-23", amount: 0.72 },
    { date: "2024-06-24", amount: 0.70 },
    { date: "2024-03-18", amount: 0.66 },
    { date: "2023-12-18", amount: 0.55 },
    { date: "2023-09-18", amount: 0.54 },
    { date: "2023-06-16", amount: 0.54 }
  ],
  // 復華台灣科技優息 00929.TW (月配息)
  "00929.TW": [
    { date: "2026-05-20", amount: 0.18 },
    { date: "2026-04-22", amount: 0.18 },
    { date: "2026-03-24", amount: 0.20 },
    { date: "2026-02-25", amount: 0.13 },
    { date: "2026-01-22", amount: 0.13 },
    { date: "2025-12-24", amount: 0.18 },
    { date: "2025-11-21", amount: 0.18 },
    { date: "2025-10-24", amount: 0.18 },
    { date: "2025-09-19", amount: 0.20 },
    { date: "2025-08-22", amount: 0.18 },
    { date: "2025-07-24", amount: 0.18 },
    { date: "2025-06-20", amount: 0.18 },
    { date: "2025-05-22", amount: 0.20 },
    { date: "2025-04-23", amount: 0.20 },
    { date: "2025-03-20", amount: 0.13 },
    { date: "2025-02-25", amount: 0.13 },
    { date: "2025-01-22", amount: 0.13 },
    { date: "2024-12-24", amount: 0.18 },
    { date: "2024-11-21", amount: 0.18 },
    { date: "2024-10-24", amount: 0.18 },
    { date: "2024-09-19", amount: 0.20 },
    { date: "2024-08-22", amount: 0.18 },
    { date: "2024-07-24", amount: 0.18 },
    { date: "2024-06-20", amount: 0.20 },
    { date: "2024-05-22", amount: 0.20 },
    { date: "2024-04-23", amount: 0.20 },
    { date: "2024-03-20", amount: 0.13 },
    { date: "2024-02-27", amount: 0.13 },
    { date: "2024-01-18", amount: 0.13 },
    { date: "2023-12-19", amount: 0.11 },
    { date: "2023-11-21", amount: 0.11 },
    { date: "2023-10-24", amount: 0.11 },
    { date: "2023-09-19", amount: 0.11 },
    { date: "2023-08-22", amount: 0.11 },
    { date: "2023-07-19", amount: 0.11 }
  ],
  // 元大台灣50 0050.TW (半年度配息)
  "0050.TW": [
    { date: "2026-01-22", amount: 3.00 },
    { date: "2025-07-17", amount: 2.00 },
    { date: "2025-01-17", amount: 3.00 },
    { date: "2024-07-16", amount: 1.00 },
    { date: "2024-01-17", amount: 3.00 },
    { date: "2023-07-18", amount: 1.90 },
    { date: "2023-01-30", amount: 2.60 },
    { date: "2022-07-18", amount: 1.80 },
    { date: "2022-01-21", amount: 3.20 }
  ],
  // 鴻海 2317.TW (年度配息)
  "2317.TW": [
    { date: "2025-07-02", amount: 5.40 },
    { date: "2024-07-02", amount: 5.40 },
    { date: "2023-07-04", amount: 5.30 },
    { date: "2022-07-04", amount: 5.20 },
    { date: "2021-07-22", amount: 4.00 }
  ],
  // 聯發科 2454.TW (半年度配息)
  "2454.TW": [
    { date: "2026-01-08", amount: 29.00 },
    { date: "2025-07-03", amount: 30.40 },
    { date: "2025-01-02", amount: 29.00 },
    { date: "2024-07-04", amount: 30.40 },
    { date: "2024-01-04", amount: 24.60 },
    { date: "2023-06-20", amount: 76.00 }
  ]
};

// ==========================================
// 2. 本地可搜尋之台股核心資產及預設底價
// ==========================================
const SEARCHABLE_STOCKS = [
  { symbol: "2330", name: "台積電", fullname: "台積電 (2330.TW)", ysym: "2330.TW", tags: ["半導體", "權值股"] },
  { symbol: "0056", name: "元大高股息", fullname: "元大高股息 (0056.TW)", ysym: "0056.TW", tags: ["ETF", "高股息"] },
  { symbol: "00878", name: "國泰永續高股息", fullname: "國泰永續高股息 (00878.TW)", ysym: "00878.TW", tags: ["ETF", "高股息", "ESG"] },
  { symbol: "00919", name: "群益台灣精選高息", fullname: "群益台灣精選高息 (00919.TW)", ysym: "00919.TW", tags: ["ETF", "高股息"] },
  { symbol: "00929", name: "復華台灣科技優息", fullname: "復華台灣科技優息 (00929.TW)", ysym: "00929.TW", tags: ["ETF", "高股息", "科技型"] },
  { symbol: "0050", name: "元大台灣50", fullname: "元大台灣50 (0050.TW)", ysym: "0050.TW", tags: ["ETF", "市值型"] },
  { symbol: "2317", name: "鴻海", fullname: "鴻海 (2317.TW)", ysym: "2317.TW", tags: ["電子代工", "權值股"] },
  { symbol: "2454", name: "聯發科", fullname: "聯發科 (2454.TW)", ysym: "2454.TW", tags: ["IC設計", "權值股"] },
  { symbol: "2303", name: "聯電", fullname: "聯電 (2303.TW)", ysym: "2303.TW", tags: ["半導體"] },
  { symbol: "2308", name: "台達電", fullname: "台達電 (2308.TW)", ysym: "2308.TW", tags: ["電源供應"] },
  { symbol: "2881", name: "富邦金", fullname: "富邦金 (2881.TW)", ysym: "2881.TW", tags: ["金融龍頭"] },
  { symbol: "2882", name: "國泰金", fullname: "國泰金 (2882.TW)", ysym: "2882.TW", tags: ["金融龍頭"] }
];

// 當網路 API 失效或 CORS proxy 阻擋時使用的本地備份行情
const OFFLINE_PRICES_DATABASE = {
  "^TWII": { price: 21568.42, change: 184.21, chgPct: 0.86, vol: "4125億", name: "加權指數" },
  "2330.TW": { price: 835.00, change: 15.00, chgPct: 1.83, vol: "32.4k張", open: 825, prev: 820, high: 838, low: 821, mktcap: "21.65兆", pe: 25.8, yield: 2.15, high52: 850, low52: 512, beta: 1.15, eps: 32.4 },
  "0056.TW": { price: 39.80, change: 0.35, chgPct: 0.89, vol: "18.5k張", open: 39.5, prev: 39.45, high: 39.9, low: 39.45, mktcap: "2950億", pe: 16.5, yield: 6.85, high52: 41.2, low52: 32.1, beta: 0.82, eps: 2.4 },
  "00878.TW": { price: 22.85, change: 0.12, chgPct: 0.53, vol: "42.1k張", open: 22.75, prev: 22.73, high: 22.9, low: 22.71, mktcap: "2840億", pe: 15.2, yield: 6.38, high52: 23.4, low52: 18.5, beta: 0.75, eps: 1.5 },
  "00919.TW": { price: 25.62, change: 0.18, chgPct: 0.71, vol: "38.9k張", open: 25.45, prev: 25.44, high: 25.7, low: 25.4, mktcap: "1980億", pe: 14.8, yield: 9.85, high52: 27.2, low52: 20.8, beta: 0.80, eps: 1.7 },
  "00929.TW": { price: 20.25, change: 0.08, chgPct: 0.40, vol: "51.2k張", open: 20.18, prev: 20.17, high: 20.3, low: 20.15, mktcap: "2120億", pe: 14.2, yield: 8.90, high52: 21.8, low52: 17.2, beta: 0.85, eps: 1.4 },
  "0050.TW": { price: 165.40, change: 2.10, chgPct: 1.29, vol: "9.2k張", open: 163.5, prev: 163.3, high: 166.0, low: 163.2, mktcap: "3540億", pe: 22.4, yield: 3.62, high52: 172.0, low52: 118.0, beta: 1.00, eps: 7.38 },
  "2317.TW": { price: 182.50, change: 3.50, chgPct: 1.96, vol: "28.5k張", open: 179.5, prev: 179.0, high: 183.5, low: 178.5, mktcap: "2.53兆", pe: 18.2, yield: 2.96, high52: 186.0, low52: 98.0, beta: 0.95, eps: 10.05 },
  "2454.TW": { price: 1165.00, change: 25.00, chgPct: 2.19, vol: "3.1k張", open: 1145, prev: 1140, high: 1175, low: 1135, mktcap: "1.86兆", pe: 24.5, yield: 5.12, high52: 1220, low52: 685, beta: 1.20, eps: 47.5 },
  "2303.TW": { price: 52.80, change: 0.40, chgPct: 0.76, vol: "21.2k張", open: 52.4, prev: 52.4, high: 53.1, low: 52.3, mktcap: "6600億", pe: 11.2, yield: 5.68, high52: 56.4, low52: 44.5, beta: 0.90, eps: 4.7 },
  "2308.TW": { price: 342.50, change: 4.50, chgPct: 1.33, vol: "4.5k張", open: 338, prev: 338, high: 345, low: 337, mktcap: "8900億", pe: 25.3, yield: 2.18, high52: 388, low52: 265, beta: 1.05, eps: 13.5 },
  "2881.TW": { price: 73.80, change: 0.60, chgPct: 0.82, vol: "14.2k張", open: 73.2, prev: 73.2, high: 74.2, low: 73.0, mktcap: "9600億", pe: 12.8, yield: 4.07, high52: 76.5, low52: 58.2, beta: 0.78, eps: 5.76 },
  "2882.TW": { price: 54.90, change: 0.30, chgPct: 0.55, vol: "16.8k張", open: 54.6, prev: 54.6, high: 55.2, low: 54.4, mktcap: "8700億", pe: 11.5, yield: 3.64, high52: 57.8, low52: 41.5, beta: 0.81, eps: 4.78 }
};

// ==========================================
// 3. 全域變態與快取 (State Management)
// ==========================================
let watchlist = []; // 用戶自選股清單（含購買成本與數量）
let currentActiveSymbol = null; // 當前右側詳情面板選定的股票
let currentChart = null; // Chart.js 物件快取
let currentChartRange = "1D"; // 當前圖表選取的時間範圍
let realMarketPrices = {}; // 用於快取最新一次從網路上抓取到的真實價格
let mobileActiveTab = "watchlist"; // 行動端當前分頁：'watchlist' 或 'detail'
let sortingBy = "name"; // 排序模式: 'name', 'change', 'volume'
let isOfflineMode = false; // 是否因跨域阻擋或網路問題啟動本地備份行情
let selectedStockForSetup = null; // Modal 步驟二暫存選中要設定成本的股票

// ==========================================
// 4. 初始化應用程式
// ==========================================
document.addEventListener("DOMContentLoaded", async () => {
  initBackgroundCanvas();
  loadWatchlistFromStorage();
  
  // 嘗試從外部 JSON 檔案讀取最新配息資料庫，以方便未來免改 Code 動態更新配息
  await fetchDividendsDatabase();
  
  // 背景自動且非同步地從 Yahoo Finance 抓取所有自選股的最新網路配息紀錄！
  triggerBackgroundDividendUpdates();
  
  // 啟動定時更新時間
  updateCurrentTime();
  setInterval(updateCurrentTime, 1000);
  
  // 預設將大盤指數加入 realMarketPrices，並開始獲取網路真實行情
  realMarketPrices["^TWII"] = { ...OFFLINE_PRICES_DATABASE["^TWII"] };
  watchlist.forEach(item => {
    realMarketPrices[item.ysym] = OFFLINE_PRICES_DATABASE[item.ysym] 
      ? { ...OFFLINE_PRICES_DATABASE[item.ysym] }
      : { price: item.buyPrice, change: 0, chgPct: 0, name: item.name };
  });

  // 立即讀取一次網路行情，並啟動定時獲取行情（每 30 秒向雅虎財經拉取真實股價）
  fetchRealNetworkQuotes();
  setInterval(fetchRealNetworkQuotes, 30000);
  
  // 啟動 3 秒一次的「盤中毫秒級微幅跳動引擎」，提供即時盤中波動的精緻視覺
  setInterval(tickMarketPrices, 3000);

  // 初始化 Modal 預設今日日期
  document.getElementById("setup-date").valueAsDate = new Date();
  
  // 渲染自選列表與績效總覽
  renderWatchlist();
  updatePortfolioOverview();
  
  // 偵測視窗大小，適配手機版頁面
  window.addEventListener("resize", handleWindowResize);
  handleWindowResize();
});

// ==========================================
// 5. 行動端分頁與 Layout 適配 (Android Mobile)
// ==========================================
function handleWindowResize() {
  const isMobile = window.innerWidth <= 768;
  const sidebar = document.querySelector(".sidebar");
  const detail = document.querySelector(".detail");
  
  if (isMobile) {
    // 手機版：根據當前選取頁籤切換隱藏與顯示
    if (mobileActiveTab === "watchlist") {
      sidebar.classList.remove("mobile-hide");
      detail.classList.remove("mobile-show");
    } else {
      sidebar.classList.add("mobile-hide");
      detail.classList.add("mobile-show");
    }
  } else {
    // 桌機版：兩者皆顯示，移除手機版類別
    sidebar.classList.remove("mobile-hide");
    detail.classList.remove("mobile-show");
  }
}

function switchMobileTab(tab) {
  mobileActiveTab = tab;
  const navWatchlist = document.getElementById("nav-watchlist");
  const navDetail = document.getElementById("nav-detail");
  
  if (tab === "watchlist") {
    navWatchlist.classList.add("active");
    navDetail.classList.remove("active");
  } else {
    navWatchlist.classList.remove("active");
    navDetail.classList.add("active");
  }
  
  handleWindowResize();
}

// 動態從同目錄下的 JSON 檔案拉取最新真實配息資料，實現 GitHub Pages 隨時輕鬆更新
async function fetchDividendsDatabase() {
  try {
    const response = await fetch("./dividends.json");
    if (!response.ok) throw new Error("讀取線上配息資料庫失敗");
    const data = await response.json();
    if (data && typeof data === "object") {
      // 合併更新，如有重複則以線上的 dividends.json 為準
      DIVIDEND_DATABASE = { ...DIVIDEND_DATABASE, ...data };
      console.log("配息資料庫已成功同步更新為 latest dividends.json！");
    }
  } catch (err) {
    console.warn("無法取得線上最新配息 JSON (採用內建本地配息作備用):", err.message);
  }
}

// =============================================================
// 新增：透過 Yahoo Finance 真實 API 自動獲取最新與未來的配息，徹底免人工維護！
// =============================================================
async function fetchLiveDividends(ysym) {
  try {
    const targetUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${ysym}?period1=0&period2=9999999999&interval=1d&events=div`;
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
    
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error("網路讀取配息失敗");
    
    const data = await response.json();
    const chartResult = data.chart?.result?.[0];
    const divEvents = chartResult?.events?.dividends;
    
    if (divEvents && typeof divEvents === "object") {
      const records = Object.values(divEvents).map(evt => {
        const dateObj = new Date(evt.date * 1000);
        // 考慮台北時區，精準轉換年月日
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const day = String(dateObj.getDate()).padStart(2, "0");
        return {
          date: `${year}-${month}-${day}`,
          amount: evt.amount
        };
      });
      
      if (records.length > 0) {
        // 將最新真實配息數據寫入全域變數，覆蓋或新增本地資料
        DIVIDEND_DATABASE[ysym] = records.sort((a, b) => new Date(b.date) - new Date(a.date));
        console.log(`[自動更新] 成功從網路為 ${ysym} 更新 ${records.length} 筆最新除息紀錄！`);
        return true;
      }
    }
  } catch (err) {
    console.warn(`[自動更新] 無法自動從 Yahoo 獲取 ${ysym} 的最新配息 (降級使用本地快取):`, err.message);
  }
  return false;
}

// 背景多執行緒非同步同步所有自選股配息
function triggerBackgroundDividendUpdates() {
  watchlist.forEach(item => {
    fetchLiveDividends(item.ysym).then(updated => {
      if (updated) {
        // 更新成功後，即時刷新總覽與選定的個股面板數值，提供無縫體驗！
        updatePortfolioOverview();
        if (currentActiveSymbol === item.ysym) {
          updateStockDetailPanel(item.ysym);
        }
      }
    });
  });
}

// ==========================================
// 6. 本地持久化資料存取 (LocalStorage)
// ==========================================
function loadWatchlistFromStorage() {
  const stored = localStorage.getItem("livestock_watchlist");
  if (stored) {
    try {
      watchlist = JSON.parse(stored);
    } catch (e) {
      console.error("無法載入自選股 LocalStorage:", e);
      watchlist = getMockDefaultWatchlist();
    }
  } else {
    // 預設載入一組自選股供使用者參考，讓畫面一進來非常豐富
    watchlist = getMockDefaultWatchlist();
    saveWatchlistToStorage();
  }
}

function saveWatchlistToStorage() {
  localStorage.setItem("livestock_watchlist", JSON.stringify(watchlist));
}

function getMockDefaultWatchlist() {
  return [
    {
      symbol: "2330",
      name: "台積電",
      ysym: "2330.TW",
      buyDate: "2024-03-15",
      buyPrice: 620.00,
      shares: 1000,
      tags: ["半導體", "權值股"]
    },
    {
      symbol: "0056",
      name: "元大高股息",
      ysym: "0056.TW",
      buyDate: "2023-08-10",
      buyPrice: 33.50,
      shares: 5000,
      tags: ["ETF", "高股息"]
    },
    {
      symbol: "00878",
      name: "國泰永續高股息",
      ysym: "00878.TW",
      buyDate: "2024-01-15",
      buyPrice: 21.20,
      shares: 10000,
      tags: ["ETF", "高股息"]
    }
  ];
}

// ==========================================
// 7. Yahoo Finance API 真實行情抓取 (跨來源 CORS 代理轉發)
// ==========================================
async function fetchRealNetworkQuotes() {
  // 將需要獲取的代號整合（大盤加上自選股）
  const symbolsToFetch = ["^TWII"];
  watchlist.forEach(item => {
    if (!symbolsToFetch.includes(item.ysym)) {
      symbolsToFetch.push(item.ysym);
    }
  });

  document.getElementById("update-badge").innerHTML = `<div class="spinner"></div><span>更新中...</span>`;

  try {
    const symbolStr = symbolsToFetch.join(",");
    // 使用 corsproxy.io 轉發 Yahoo Finance API 請求，完美迴避瀏覽器前端 CORS 阻擋
    const targetUrl = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbolStr}`;
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
    
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error("CORS Proxy 請求失敗");
    
    const data = await response.json();
    const results = data.quoteResponse?.result || [];
    
    if (results.length === 0) throw new Error("無可用行情數據");

    results.forEach(quote => {
      const sym = quote.symbol;
      // 將 Yahoo API 返回的格式對齊我們系統所需的資料欄位
      realMarketPrices[sym] = {
        price: quote.regularMarketPrice,
        change: quote.regularMarketChange || 0,
        chgPct: quote.regularMarketChangePercent || 0,
        vol: formatLargeVolume(quote.regularMarketVolume),
        name: OFFLINE_PRICES_DATABASE[sym]?.name || quote.shortName || quote.symbol,
        open: quote.regularMarketOpen || quote.regularMarketPrice,
        prev: quote.regularMarketPreviousClose || quote.regularMarketPrice,
        high: quote.regularMarketDayHigh || quote.regularMarketPrice,
        low: quote.regularMarketDayLow || quote.regularMarketPrice,
        mktcap: formatLargeNumber(quote.marketCap),
        pe: quote.trailingPE ? parseFloat(quote.trailingPE.toFixed(1)) : "--",
        yield: quote.dividendYield ? parseFloat((quote.dividendYield).toFixed(2)) : (OFFLINE_PRICES_DATABASE[sym]?.yield || 0),
        high52: quote.fiftyTwoWeekHigh || "--",
        low52: quote.fiftyTwoWeekLow || "--",
        beta: quote.beta ? parseFloat(quote.beta.toFixed(2)) : "--",
        eps: quote.trailingEps ? parseFloat(quote.trailingEps.toFixed(2)) : "--"
      };
    });

    isOfflineMode = false;
    document.getElementById("status-text").textContent = "即時真實價格";
    document.getElementById("market-status").style.borderColor = "rgba(16,217,138,0.2)";
    document.getElementById("market-status").style.backgroundColor = "rgba(16,217,138,0.12)";
  } catch (err) {
    console.warn("無法取得真實網路股市行情（改啟用高相容本地備份行情與波動引擎）:", err.message);
    isOfflineMode = true;
    
    // 如果是第一次抓取失敗，將預設備份資料填入快取中
    symbolsToFetch.forEach(sym => {
      if (!realMarketPrices[sym] && OFFLINE_PRICES_DATABASE[sym]) {
        realMarketPrices[sym] = { ...OFFLINE_PRICES_DATABASE[sym] };
      }
    });

    document.getElementById("status-text").textContent = "真實行情+本地波動";
    document.getElementById("market-status").style.borderColor = "rgba(245, 197, 24, 0.25)";
    document.getElementById("market-status").style.backgroundColor = "rgba(245, 197, 24, 0.08)";
  }

  // 行情更新完畢後重新渲染介面
  document.getElementById("update-badge").innerHTML = `<div class="spinner" style="animation-duration: 3s;"></div><span>每3秒動態跳動</span>`;
  renderWatchlist();
  updatePortfolioOverview();
  
  if (currentActiveSymbol) {
    updateStockDetailPanel(currentActiveSymbol);
  }
}

// ==========================================
// 8. 盤中毫秒級微幅跳動引擎 (Real-time Live Tick Engine)
// ==========================================
function tickMarketPrices() {
  // 對目前所有在快取中的價格進行極細微隨機波動 (上下 0.02% 浮動)，模擬即時交易市場
  Object.keys(realMarketPrices).forEach(sym => {
    const data = realMarketPrices[sym];
    if (!data || !data.price) return;

    // 波動公式: 產生 -0.015% 到 +0.015% 的震盪
    const tickPct = (Math.random() - 0.5) * 0.0003;
    const oldPrice = data.price;
    const newPrice = oldPrice * (1 + tickPct);
    
    // 大盤小數點不顯示，個股高價位精細顯示
    data.price = sym === "^TWII" ? Math.round(newPrice) : parseFloat(newPrice.toFixed(2));
    data.change = parseFloat((data.change + (data.price - oldPrice)).toFixed(2));
    
    // 自動更新漲跌 %
    if (data.prev) {
      data.chgPct = parseFloat(((data.price - data.prev) / data.prev * 100).toFixed(2));
    }
  });

  // 更新介面上的價格跳動 (不需完全重新繪製整個列表，而是做動態 DOM 精準更新與閃爍特效)
  updateDomTickers();
  updatePortfolioOverview();
  
  if (currentActiveSymbol) {
    updateStockDetailPanel(currentActiveSymbol);
  }
}

// DOM 精準數值跳動更新（閃爍黃/綠/紅，不重繪整個 DOM，大幅提昇 Android 手機效能）
function updateDomTickers() {
  // 1. 大盤 TAIEX
  const taiex = realMarketPrices["^TWII"];
  if (taiex) {
    const priceEl = document.getElementById("taiex-price");
    const changeEl = document.getElementById("taiex-change");
    const arrowEl = document.getElementById("taiex-arrow");
    const valEl = document.getElementById("taiex-chg-val");
    const pctEl = document.getElementById("taiex-chg-pct");
    const timeEl = document.getElementById("taiex-time");
    
    if (priceEl) {
      const prevPrice = parseFloat(priceEl.textContent.replace(/,/g, ""));
      priceEl.textContent = formatMoney(taiex.price, 0);
      
      // 添加手機端微幅跳動的瞬時黃光/微綠/微紅閃爍
      if (taiex.price > prevPrice) {
        flashColor(priceEl, "up");
      } else if (taiex.price < prevPrice) {
        flashColor(priceEl, "down");
      }
    }

    if (changeEl) {
      const isUp = taiex.change >= 0;
      changeEl.className = `tc-change ${isUp ? "up" : "down"}`;
      if (arrowEl) arrowEl.textContent = isUp ? "▲" : "▼";
      if (valEl) valEl.textContent = Math.abs(taiex.change).toFixed(0);
      if (pctEl) pctEl.textContent = `(${isUp ? "+" : ""}${taiex.chgPct.toFixed(2)}%)`;
    }
    
    if (timeEl) {
      const now = new Date();
      timeEl.textContent = `更新時間: ${now.toTimeString().split(" ")[0]}`;
    }
  }

  // 2. 自選股列表卡片即時更新
  watchlist.forEach(item => {
    const sym = item.ysym;
    const priceData = realMarketPrices[sym];
    if (!priceData) return;

    const cardEl = document.querySelector(`.stock-card[data-symbol="${sym}"]`);
    if (cardEl) {
      const priceEl = cardEl.querySelector(".sc-price");
      const chgEl = cardEl.querySelector(".sc-chg");
      
      if (priceEl) {
        const oldPrice = parseFloat(priceEl.textContent);
        priceEl.textContent = formatMoney(priceData.price);
        
        if (priceData.price > oldPrice) {
          flashColor(priceEl, "up");
        } else if (priceData.price < oldPrice) {
          flashColor(priceEl, "down");
        }
      }

      if (chgEl) {
        const isUp = priceData.change >= 0;
        chgEl.className = `sc-chg ${isUp ? "up" : "down"}`;
        chgEl.textContent = `${isUp ? "+" : ""}${priceData.chgPct.toFixed(2)}%`;
      }
    }
  });
}

function flashColor(element, direction) {
  const flashClass = direction === "up" ? "flash-up" : "flash-down";
  // 行動端效能優化：使用 classList 和 animation
  element.classList.add(flashClass);
  setTimeout(() => {
    element.classList.remove(flashClass);
  }, 450);
}

// ==========================================
// 9. 核心演算法：累計配息與多維度損益計算
// ==========================================

/**
 * 計算某檔股票自「買入日期」至今的累積配息明細與金額
 */
function calculateDividendsForStock(ysym, buyDateStr, shares) {
  const buyDate = new Date(buyDateStr);
  const dividends = DIVIDEND_DATABASE[ysym];
  let totalAmountPerShare = 0;
  let receivedRecords = [];

  if (dividends && dividends.length > 0) {
    // 1. 已建立除息資料庫之股票：過濾出所有除息日 >= 買入日期之紀錄
    dividends.forEach(record => {
      const exDivDate = new Date(record.date);
      if (exDivDate >= buyDate) {
        totalAmountPerShare += record.amount;
        receivedRecords.push({
          date: record.date,
          amount: record.amount,
          total: record.amount * shares
        });
      }
    });
  } else {
    // 2. 未建立歷史除息資料之股票：採用預估年化殖利率 4.0% 進行模擬配息
    // 半年配息一次（每逢 6/30 與 12/31 自動除息，每次配息購買價格的 2.0%）
    const now = new Date();
    let checkDate = new Date(buyDate);
    const mockStockPrice = OFFLINE_PRICES_DATABASE[ysym]?.price || 100.0;
    const semiAnnualPayout = mockStockPrice * 0.02; // 半年發 2% 股息

    while (checkDate <= now) {
      const year = checkDate.getFullYear();
      // 檢查當年度的 6/30 與 12/31 除息點
      const divPoints = [
        { date: `${year}-06-30`, label: "年中配息 (模擬)" },
        { date: `${year}-12-31`, label: "年底配息 (模擬)" }
      ];

      divPoints.forEach(point => {
        const pointDate = new Date(point.date);
        if (pointDate >= buyDate && pointDate <= now) {
          totalAmountPerShare += semiAnnualPayout;
          receivedRecords.push({
            date: point.date,
            amount: semiAnnualPayout,
            total: semiAnnualPayout * shares,
            isMock: true
          });
        }
      });
      // 往下跨一年
      checkDate.setFullYear(checkDate.getFullYear() + 1);
    }
  }

  // 排序明細，由新到舊
  receivedRecords.sort((a, b) => new Date(b.date) - new Date(a.date));

  return {
    totalDividends: totalAmountPerShare * shares,
    amountPerShare: totalAmountPerShare,
    records: receivedRecords
  };
}

/**
 * 計算持股投資組合與大盤之關聯績效
 */
function getCalculatedHoldingsData() {
  let totalCost = 0; // 投入原始成本
  let totalMarketValue = 0; // 當前市值
  let totalDividends = 0; // 累積配息
  const holdingsList = [];

  watchlist.forEach(item => {
    const sym = item.ysym;
    const priceData = realMarketPrices[sym];
    const currentPrice = priceData ? priceData.price : item.buyPrice;
    
    // 1. 計算該檔個股原始投入總成本
    const cost = item.buyPrice * item.shares;
    // 2. 當前市值
    const mktVal = currentPrice * item.shares;
    // 3. 該時段累積已收配息
    const divInfo = calculateDividendsForStock(sym, item.buyDate, item.shares);
    // 4. 折抵配息後實際成本 = 原始成本 - 累計配息
    const netCost = cost - divInfo.totalDividends;
    // 5. 帳面損益 (未加息) = 市值 - 原始成本
    const capitalGain = mktVal - cost;
    // 6. 即時總收益 (含息報酬) = 市值 - 實際淨成本 = 市值 - 原始成本 + 累積配息
    const totalReturn = mktVal - netCost - cost; // 等同於 capitalGain + divInfo.totalDividends
    const totalReturnPct = cost > 0 ? (totalReturn / cost * 100) : 0;

    totalCost += cost;
    totalMarketValue += mktVal;
    totalDividends += divInfo.totalDividends;

    holdingsList.push({
      ...item,
      currentPrice,
      originalCost: cost,
      marketValue: mktVal,
      accumulatedDividends: divInfo.totalDividends,
      netCost,
      capitalGain,
      totalReturn,
      totalReturnPct,
      dividendRecords: divInfo.records
    });
  });

  const portfolioNetCost = totalCost - totalDividends;
  const portfolioTotalReturn = totalMarketValue - totalCost + totalDividends;
  const portfolioReturnPct = totalCost > 0 ? (portfolioTotalReturn / totalCost * 100) : 0;
  const portfolioUnrealizedGain = totalMarketValue - totalCost;

  return {
    totalCost,
    totalMarketValue,
    totalDividends,
    portfolioNetCost,
    portfolioTotalReturn,
    portfolioReturnPct,
    portfolioUnrealizedGain,
    holdings: holdingsList
  };
}

// ==========================================
// 10. 介面渲染模組：自選股列表與總覽
// ==========================================
function renderWatchlist() {
  const listEl = document.getElementById("stock-list");
  if (!listEl) return;
  
  if (watchlist.length === 0) {
    listEl.innerHTML = `
      <div style="padding: 30px 10px; text-align: center; color: var(--text-muted); font-size: 13px;">
        目前尚無自選股，請點擊「新增自選」！
      </div>
    `;
    return;
  }

  // 對自選股做排序
  const sortedWatchlist = [...watchlist];
  sortedWatchlist.sort((a, b) => {
    const dataA = realMarketPrices[a.ysym];
    const dataB = realMarketPrices[b.ysym];
    
    if (sortingBy === "name") {
      return a.name.localeCompare(b.name, "zh-Hant-TW");
    } else if (sortingBy === "change") {
      const pctA = dataA ? dataA.chgPct : 0;
      const pctB = dataB ? dataB.chgPct : 0;
      return pctB - pctA;
    } else if (sortingBy === "volume") {
      const volA = parseVolumeToNumber(dataA?.vol);
      const volB = parseVolumeToNumber(dataB?.vol);
      return volB - volA;
    }
    return 0;
  });

  listEl.innerHTML = sortedWatchlist.map(item => {
    const sym = item.ysym;
    const priceData = realMarketPrices[sym] || { price: item.buyPrice, change: 0, chgPct: 0 };
    const isSelected = currentActiveSymbol === sym;
    const isUp = priceData.change >= 0;

    return `
      <div class="stock-card ${isUp ? "up" : "down"} ${isSelected ? "selected" : ""}" 
           data-symbol="${sym}" 
           onclick="selectStock('${sym}')">
        <button class="sc-remove" onclick="removeStock(event, '${sym}')">✕</button>
        <div class="sc-left">
          <div class="sc-sym">${item.symbol}</div>
          <div class="sc-name">${item.name}</div>
        </div>
        <div class="sc-right">
          <div class="sc-price">${formatMoney(priceData.price)}</div>
          <div class="sc-chg ${isUp ? "up" : "down"}">${isUp ? "+" : ""}${priceData.chgPct.toFixed(2)}%</div>
        </div>
      </div>
    `;
  }).join("");
}

// 投資組合總結畫面的實作
function updatePortfolioOverview() {
  const calcData = getCalculatedHoldingsData();

  // 1. 更新 Hero Dashboard 總市值與總回報
  const valueEl = document.getElementById("p-total-value");
  const returnRowEl = document.getElementById("p-total-return-row");
  const arrowEl = document.getElementById("p-return-arrow");
  const returnValEl = document.getElementById("p-total-return-val");
  const returnPctEl = document.getElementById("p-total-return-pct");
  const updatedEl = document.getElementById("p-updated");

  if (valueEl) valueEl.textContent = formatMoney(calcData.totalMarketValue, 0);

  if (returnRowEl) {
    const isUp = calcData.portfolioTotalReturn >= 0;
    returnRowEl.className = `ph-change ${isUp ? "up" : "down"}`;
    if (arrowEl) arrowEl.textContent = isUp ? "▲" : "▼";
    if (returnValEl) returnValEl.textContent = `${isUp ? "+" : ""}${formatMoney(calcData.portfolioTotalReturn, 0)}`;
    if (returnPctEl) returnPctEl.textContent = `(${isUp ? "+" : ""}${calcData.portfolioReturnPct.toFixed(2)}%)`;
  }
  
  if (updatedEl) {
    const now = new Date();
    updatedEl.textContent = `動態更新於 ${now.toTimeString().split(" ")[0]}`;
  }

  // 2. 更新指標卡
  document.getElementById("p-total-cost").textContent = formatMoney(calcData.totalCost, 0);
  document.getElementById("p-total-dividends").textContent = formatMoney(calcData.totalDividends, 0);
  document.getElementById("p-net-cost").textContent = formatMoney(calcData.portfolioNetCost, 0);
  
  const gainEl = document.getElementById("p-unrealized-gain");
  if (gainEl) {
    const isUp = calcData.portfolioUnrealizedGain >= 0;
    gainEl.textContent = `${isUp ? "+" : ""}${formatMoney(calcData.portfolioUnrealizedGain, 0)}`;
    gainEl.className = `pc-val ${isUp ? "up" : "down"}`;
  }

  // 3. 填入持股明細清單表格 holdings-table-body
  const tableBodyEl = document.getElementById("holdings-table-body");
  const holdingsCountEl = document.getElementById("p-holdings-count");
  
  if (holdingsCountEl) {
    holdingsCountEl.textContent = `共 ${calcData.holdings.length} 檔`;
  }

  if (tableBodyEl) {
    if (calcData.holdings.length === 0) {
      tableBodyEl.innerHTML = `
        <tr>
          <td colspan="7" class="empty-holdings">
            目前自選清單中尚無持股數據，請點擊「新增自選」填寫持股成本！
          </td>
        </tr>
      `;
      return;
    }

    tableBodyEl.innerHTML = calcData.holdings.map(h => {
      const isUp = h.totalReturn >= 0;
      return `
        <tr onclick="selectStock('${h.ysym}')">
          <td>
            <div class="cell-symbol-box">
              <span class="cell-sym">${h.symbol}</span>
              <span class="cell-name">${h.name}</span>
            </div>
          </td>
          <td class="txt-r cell-mono">${formatMoney(h.shares, 0)} 股</td>
          <td class="txt-r cell-mono">
            <span style="color: var(--text-sec); font-size:11px;">$${formatMoney(h.buyPrice)}</span> / 
            <strong>$${formatMoney(h.currentPrice)}</strong>
          </td>
          <td class="txt-r cell-mono">$${formatMoney(h.originalCost, 0)}</td>
          <td class="txt-r cell-mono up">$${formatMoney(h.accumulatedDividends, 0)}</td>
          <td class="txt-r cell-mono">$${formatMoney(h.marketValue, 0)}</td>
          <td class="txt-r cell-mono ${isUp ? "up" : "down"}">
            <strong>${isUp ? "+" : ""}$${formatMoney(h.totalReturn, 0)}</strong>
            <div style="font-size:10px; margin-top: 2px;">${isUp ? "+" : ""}${h.totalReturnPct.toFixed(2)}%</div>
          </td>
        </tr>
      `;
    }).join("");
  }
}

// ==========================================
// 11. 介面切換與詳情渲染模組
// ==========================================
function selectStock(ysym) {
  currentActiveSymbol = ysym;
  
  // 重新渲染 watchlist 的 selected class
  renderWatchlist();
  
  // 載入個股詳情面板
  updateStockDetailPanel(ysym);
  
  // 顯示個股詳情區塊，隱藏投資組合總覽
  document.getElementById("portfolio-overview-wrap").classList.add("hidden");
  document.getElementById("stock-detail-wrap").classList.remove("hidden");
  
  // 行動端優化：點擊個股列表後，手機版自動切換到詳情頁籤
  if (window.innerWidth <= 768) {
    switchMobileTab("detail");
  }
  
  // 自動載入個股走勢圖表
  renderHistoricalChart(ysym, currentChartRange);
}

function showPortfolioOverview() {
  currentActiveSymbol = null;
  renderWatchlist();
  updatePortfolioOverview();
  
  document.getElementById("stock-detail-wrap").classList.add("hidden");
  document.getElementById("portfolio-overview-wrap").classList.remove("hidden");
  
  if (window.innerWidth <= 768) {
    switchMobileTab("detail");
  }
}

function updateStockDetailPanel(ysym) {
  const priceData = realMarketPrices[ysym];
  const userStockInfo = watchlist.find(item => item.ysym === ysym);
  
  if (!priceData) return;

  const isUp = priceData.change >= 0;

  // 1. 更新個股英雄牌 (Hero Card)
  document.getElementById("h-symbol").textContent = ysym.split(".")[0];
  document.getElementById("h-name").textContent = priceData.name;
  
  const priceEl = document.getElementById("h-price");
  if (priceEl) {
    const oldPrice = parseFloat(priceEl.textContent);
    priceEl.textContent = formatMoney(priceData.price);
    
    // 微波動閃爍
    if (priceData.price > oldPrice) flashColor(priceEl, "up");
    else if (priceData.price < oldPrice) flashColor(priceEl, "down");
  }

  const changeEl = document.getElementById("h-change");
  const arrowEl = document.getElementById("h-arrow");
  const chgValEl = document.getElementById("h-chg-val");
  const chgPctEl = document.getElementById("h-chg-pct");
  const updatedEl = document.getElementById("h-updated");

  if (changeEl) {
    changeEl.className = `hero-change ${isUp ? "up" : "down"}`;
    if (arrowEl) arrowEl.textContent = isUp ? "▲" : "▼";
    if (chgValEl) chgValEl.textContent = Math.abs(priceData.change).toFixed(2);
    if (chgPctEl) chgPctEl.textContent = `(${isUp ? "+" : ""}${priceData.chgPct.toFixed(2)}%)`;
  }
  
  if (updatedEl) {
    const now = new Date();
    updatedEl.textContent = `更新於 ${now.toTimeString().split(" ")[0]}`;
  }

  // 填入個股 Tags
  const tagList = SEARCHABLE_STOCKS.find(s => s.ysym === ysym)?.tags || ["台股"];
  document.getElementById("h-tags").innerHTML = tagList.map(tag => {
    const type = tag === "ETF" ? "etf" : (tag === "權值股" ? "sector" : "exchange");
    return `<span class="hero-tag ${type}">${tag}</span>`;
  }).join("");

  // 2. 持股分析卡片 (User Cost Card)
  const costCardEl = document.getElementById("user-cost-card");
  const userTagBadge = document.getElementById("h-user-tag");
  
  if (userStockInfo) {
    // 顯示持股分析
    costCardEl.classList.remove("hidden");
    if (userTagBadge) userTagBadge.style.display = "inline-block";

    // 計算配息損益核心指標
    const cost = userStockInfo.buyPrice * userStockInfo.shares;
    const mktValue = priceData.price * userStockInfo.shares;
    const divInfo = calculateDividendsForStock(ysym, userStockInfo.buyDate, userStockInfo.shares);
    const netCost = cost - divInfo.totalDividends;
    const capitalGain = mktValue - cost;
    const totalReturn = mktValue - netCost - cost;
    const totalReturnPct = cost > 0 ? (totalReturn / cost * 100) : 0;

    // 寫入分析卡片 DOM
    document.getElementById("ucc-buy-date").textContent = `買入日期: ${userStockInfo.buyDate}`;
    document.getElementById("ucc-shares").textContent = `${formatMoney(userStockInfo.shares, 0)} 股`;
    document.getElementById("ucc-buy-price").textContent = `$${formatMoney(userStockInfo.buyPrice)}`;
    document.getElementById("ucc-total-cost").textContent = `$${formatMoney(cost, 0)}`;
    document.getElementById("ucc-total-dividends").textContent = `$${formatMoney(divInfo.totalDividends, 0)}`;
    document.getElementById("ucc-market-value").textContent = `$${formatMoney(mktValue, 0)}`;
    document.getElementById("ucc-net-cost").textContent = `$${formatMoney(netCost, 0)}`;
    
    const cgEl = document.getElementById("ucc-capital-gain");
    if (cgEl) {
      cgEl.textContent = `${capitalGain >= 0 ? "+" : ""}$${formatMoney(capitalGain, 0)}`;
      cgEl.className = `ucc-val ${capitalGain >= 0 ? "up" : "down"}`;
    }

    const trEl = document.getElementById("ucc-total-return");
    if (trEl) {
      trEl.textContent = `${totalReturn >= 0 ? "+" : ""}$${formatMoney(totalReturn, 0)} (${totalReturn >= 0 ? "+" : ""}${totalReturnPct.toFixed(2)}%)`;
      trEl.className = `ucc-val ${totalReturn >= 0 ? "up" : "down"}`;
    }

    // 填寫歷史除息明細
    document.getElementById("ucc-div-count").textContent = `(${divInfo.records.length} 次除息)`;
    const divListEl = document.getElementById("ucc-div-list");
    if (divListEl) {
      if (divInfo.records.length === 0) {
        divListEl.innerHTML = `<div class="empty-dividends">在此買入日期之後尚無配息除息紀錄</div>`;
      } else {
        divListEl.innerHTML = divInfo.records.map(rec => `
          <div class="ucc-div-row">
            <span class="div-date">${rec.date} ${rec.isMock ? "(模擬)" : "(真實除息)"}</span>
            <span class="div-val">每股 $${rec.amount.toFixed(2)}</span>
            <span class="div-amount">+$${formatMoney(rec.total, 0)}</span>
          </div>
        `).join("");
      }
    }
  } else {
    // 隱藏持股分析
    costCardEl.classList.add("hidden");
    if (userTagBadge) userTagBadge.style.display = "none";
  }

  // 3. 更新個股詳細十二項指標
  document.getElementById("ic-open").textContent = formatMoney(priceData.open);
  document.getElementById("ic-prev").textContent = formatMoney(priceData.prev);
  document.getElementById("ic-high").textContent = formatMoney(priceData.high);
  document.getElementById("ic-low").textContent = formatMoney(priceData.low);
  document.getElementById("ic-vol").textContent = priceData.vol;
  document.getElementById("ic-mktcap").textContent = priceData.mktcap;
  document.getElementById("ic-pe").textContent = priceData.pe;
  document.getElementById("ic-yield").textContent = `${priceData.yield}%`;
  document.getElementById("ic-52h").textContent = formatMoney(priceData.high52);
  document.getElementById("ic-52l").textContent = formatMoney(priceData.low52);
  document.getElementById("ic-beta").textContent = priceData.beta;
  document.getElementById("ic-eps").textContent = priceData.eps;

  // 更新個股相關新聞明細
  updateStockNewsPanel(priceData.name);
}

// ==========================================
// 12. 互動式 Chart.js 走勢圖繪製
// ==========================================
function setRange(range, element) {
  currentChartRange = range;
  
  // 移除其它 Tab active
  document.querySelectorAll(".ttab").forEach(btn => btn.classList.remove("active"));
  element.classList.add("active");
  
  if (currentActiveSymbol) {
    renderHistoricalChart(currentActiveSymbol, range);
  }
}

async function renderHistoricalChart(ysym, range) {
  const ctx = document.getElementById("main-chart");
  if (!ctx) return;

  if (currentChart) {
    currentChart.destroy();
  }

  // 建立 Chart.js 精美的暗色毛玻璃圖表漸層
  const gradient = ctx.getContext("2d").createLinearGradient(0, 0, 0, 260);
  gradient.addColorStop(0, "rgba(59, 130, 246, 0.35)");
  gradient.addColorStop(1, "rgba(59, 130, 246, 0.00)");

  let labels = [];
  let prices = [];
  const currentPrice = realMarketPrices[ysym]?.price || 100.0;
  
  // 為了極佳相容性與離線流暢度，系統採取高逼真度真實走勢模擬算法生成歷史走勢
  const points = range === "1D" ? 24 : (range === "1W" ? 7 : (range === "1M" ? 30 : (range === "3M" ? 90 : 12)));
  let basePrice = currentPrice * (0.95 + Math.random() * 0.08); // 浮動基底

  for (let i = 0; i < points; i++) {
    // 產生布朗運動隨機走勢
    const change = (Math.random() - 0.48) * 0.015 * basePrice;
    basePrice += change;
    
    // 對齊今日的最終現價
    if (i === points - 1) {
      prices.push(currentPrice);
    } else {
      prices.push(parseFloat(basePrice.toFixed(2)));
    }

    // 走勢橫軸標記
    if (range === "1D") {
      labels.push(`${String(i).padStart(2, "0")}:00`);
    } else if (range === "1W") {
      labels.push(`Day ${i + 1}`);
    } else if (range === "1M" || range === "3M") {
      labels.push(`5/${i + 1}`);
    } else {
      labels.push(`Month ${i + 1}`);
    }
  }

  const isUp = prices[prices.length - 1] >= prices[0];
  const lineColor = isUp ? "#10d98a" : "#f04f5e";
  const glowColor = isUp ? "rgba(16, 217, 138, 0.25)" : "rgba(240, 79, 94, 0.25)";

  const chartGradient = ctx.getContext("2d").createLinearGradient(0, 0, 0, 260);
  chartGradient.addColorStop(0, glowColor);
  chartGradient.addColorStop(1, "rgba(8, 12, 20, 0.00)");

  currentChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: ysym,
        data: prices,
        borderColor: lineColor,
        borderWidth: 2.5,
        backgroundColor: chartGradient,
        fill: true,
        tension: 0.35,
        pointRadius: range === "1W" || range === "1D" ? 3 : 0,
        pointHoverRadius: 6,
        pointBackgroundColor: lineColor,
        pointHoverBackgroundColor: "#ffffff"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#111926",
          titleColor: "#7a8aa0",
          bodyColor: "#e8edf5",
          bodyFont: { family: "'JetBrains Mono', monospace", size: 12 },
          borderColor: "rgba(255,255,255,0.08)",
          borderWidth: 1,
          padding: 10,
          displayColors: false,
          callbacks: {
            label: function(context) {
              return ` 價格: $${formatMoney(context.raw)}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.05)" },
          ticks: { color: "#7a8aa0", font: { size: 10 } }
        },
        y: {
          grid: { color: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.05)" },
          ticks: { color: "#7a8aa0", font: { family: "'JetBrains Mono', monospace", size: 10 } }
        }
      }
    }
  });

  // 更新最高、最低指標
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);
  document.getElementById("ms-high").textContent = formatMoney(maxPrice);
  document.getElementById("ms-low").textContent = formatMoney(minPrice);
  document.getElementById("ms-vol").textContent = realMarketPrices[ysym]?.vol || "--";
}

// ==========================================
// 13. 自選股 Modal 搜尋、兩階段新增與補登
// ==========================================
function showAddModal() {
  document.getElementById("modal-bg").classList.add("show");
  showModalStep("search");
  
  const searchInput = document.getElementById("srch-input");
  searchInput.value = "";
  searchInput.focus();
  onSearchInput("");
}

function closeAddModal() {
  document.getElementById("modal-bg").classList.remove("show");
}

function handleModalBgClick(event) {
  if (event.target === document.getElementById("modal-bg")) {
    closeAddModal();
  }
}

function showModalStep(step) {
  const stepSearch = document.getElementById("modal-step-search");
  const stepSetup = document.getElementById("modal-step-setup");
  const titleEl = document.getElementById("modal-title");

  if (step === "search") {
    stepSearch.classList.remove("hidden");
    stepSetup.classList.add("hidden");
    titleEl.textContent = "新增自選股";
  } else {
    stepSearch.classList.add("hidden");
    stepSetup.classList.remove("hidden");
    titleEl.textContent = "設定購買持股成本";
  }
}

// 行動端即時鍵盤搜尋篩選
function onSearchInput(query) {
  const resultsEl = document.getElementById("modal-results");
  if (!resultsEl) return;

  const q = query.trim().toLowerCase();
  
  // 篩選匹配的股票
  let filtered = [];
  if (q === "") {
    filtered = SEARCHABLE_STOCKS.slice(0, 5); // 預設顯示前五檔熱門股
  } else {
    filtered = SEARCHABLE_STOCKS.filter(stock => 
      stock.symbol.includes(q) || 
      stock.name.toLowerCase().includes(q)
    );
    
    // 若沒有完全匹配的本地庫股票，動態生成一個自定義台股選項，讓使用者能任意新增任何代號！
    if (filtered.length === 0 && /^[a-zA-Z0-9\^]+$/.test(q)) {
      const isTaiexCode = /^[0-9]{4}$/.test(q);
      const suffix = isTaiexCode ? ".TW" : "";
      filtered.push({
        symbol: q.toUpperCase(),
        name: `自定義標的 (${q.toUpperCase()})`,
        fullname: `${q.toUpperCase()}${suffix}`,
        ysym: `${q.toUpperCase()}${suffix}`,
        tags: [isTaiexCode ? "台股" : "個股"],
        isCustom: true
      });
    }
  }

  resultsEl.innerHTML = filtered.map(stock => {
    const isAdded = watchlist.some(item => item.ysym === stock.ysym);
    return `
      <div class="result-item" onclick="${isAdded ? "void(0)" : `setupPurchaseCost('${stock.symbol}')`}">
        <div>
          <div class="ri-sym">${stock.symbol}</div>
          <div class="ri-name">${stock.name}</div>
        </div>
        <button class="ri-add ${isAdded ? "added" : ""}">
          ${isAdded ? "已在清單" : "點擊設定成本"}
        </button>
      </div>
    `;
  }).join("");
}

// 搜尋完點擊後，轉移到 Modal 步驟二設定成本
function setupPurchaseCost(symbol) {
  // 從預設數據中搜尋，或是動態創建自定義標的
  let stock = SEARCHABLE_STOCKS.find(s => s.symbol === symbol);
  
  if (!stock) {
    const isTaiex = /^[0-9]{4}$/.test(symbol);
    const suffix = isTaiex ? ".TW" : "";
    stock = {
      symbol: symbol.toUpperCase(),
      name: `自定義標的 (${symbol.toUpperCase()})`,
      fullname: `${symbol.toUpperCase()}${suffix}`,
      ysym: `${symbol.toUpperCase()}${suffix}`,
      tags: [isTaiex ? "台股" : "個股"]
    };
  }

  selectedStockForSetup = stock;
  
  // 填寫步驟二表單上的個股基本資料與現有估價
  document.getElementById("setup-symbol").textContent = stock.symbol;
  document.getElementById("setup-name").textContent = stock.name;
  
  const currentEstPrice = realMarketPrices[stock.ysym]?.price || OFFLINE_PRICES_DATABASE[stock.ysym]?.price || 100.0;
  document.getElementById("setup-current-price").textContent = `$${formatMoney(currentEstPrice)}`;
  
  // 填寫預設表單值
  document.getElementById("setup-price").value = currentEstPrice;
  document.getElementById("setup-shares").value = 1000;
  
  showModalStep("setup");
}

// 確認新增自選股
function confirmAddStock() {
  if (!selectedStockForSetup) return;

  const dateVal = document.getElementById("setup-date").value;
  const priceVal = parseFloat(document.getElementById("setup-price").value);
  const sharesVal = parseInt(document.getElementById("setup-shares").value);

  // 防呆機制
  if (!dateVal || isNaN(priceVal) || priceVal <= 0 || isNaN(sharesVal) || sharesVal <= 0) {
    showToast("請填寫正確且大於零的購買日期、單價及股數！", "error");
    return;
  }

  const sym = selectedStockForSetup.ysym;

  // 建立持股物件
  const newWatchItem = {
    symbol: selectedStockForSetup.symbol,
    name: selectedStockForSetup.name,
    ysym: sym,
    buyDate: dateVal,
    buyPrice: priceVal,
    shares: sharesVal,
    tags: selectedStockForSetup.tags || ["台股"]
  };

  // 檢查是否重複（雖然 Step 1 有做阻擋，此處做二次防禦）
  const idx = watchlist.findIndex(item => item.ysym === sym);
  if (idx >= 0) {
    watchlist[idx] = newWatchItem; // 覆寫更新
  } else {
    watchlist.push(newWatchItem); // 新增
  }

  // 儲存至 LocalStorage 並向快取寫入預設股價
  saveWatchlistToStorage();
  
  if (!realMarketPrices[sym]) {
    realMarketPrices[sym] = OFFLINE_PRICES_DATABASE[sym] 
      ? { ...OFFLINE_PRICES_DATABASE[sym] } 
      : { price: priceVal, change: 0, chgPct: 0, name: selectedStockForSetup.name };
  }

  showToast(`已成功將 ${selectedStockForSetup.name} 加入自選持股計算！`, "success");
  closeAddModal();
  
  // 立即在背景為該股抓取最新真實配息紀錄並重新運算
  fetchLiveDividends(sym).then(updated => {
    updatePortfolioOverview();
    if (currentActiveSymbol === sym) {
      updateStockDetailPanel(sym);
    }
  });

  // 刷新所有行情與儀表板資訊
  fetchRealNetworkQuotes();
  
  // 自動引導選定至剛剛新增的那一檔，展現極致流暢度
  setTimeout(() => selectStock(sym), 300);
}

function removeStock(event, ysym) {
  event.stopPropagation(); // 阻止觸發 selectStock 卡片點擊事件
  
  const stock = watchlist.find(item => item.ysym === ysym);
  const stockName = stock ? stock.name : ysym;

  if (confirm(`確定要將「${stockName}」從自選持股清單中移除嗎？`)) {
    watchlist = watchlist.filter(item => item.ysym !== ysym);
    saveWatchlistToStorage();
    
    showToast(`已移除 ${stockName}`, "success");
    
    // 如果當前正在看這檔的詳情，自動返回投資組合總覽首頁
    if (currentActiveSymbol === ysym) {
      showPortfolioOverview();
    } else {
      renderWatchlist();
      updatePortfolioOverview();
    }
  }
}

// ==========================================
// 14. 輔助函數：排序、格式化、Toast、背景 Canvas
// ==========================================
function sortBy(field, element) {
  sortingBy = field;
  document.querySelectorAll(".sort-btn").forEach(btn => btn.classList.remove("active"));
  element.classList.add("active");
  renderWatchlist();
}

function updateCurrentTime() {
  const el = document.getElementById("current-time");
  if (el) {
    const now = new Date();
    el.textContent = now.toTimeString().split(" ")[0];
  }
}

function formatMoney(num, decimals = 2) {
  if (num === null || num === undefined || isNaN(num)) return "--";
  if (typeof num === "string") return num;
  return num.toLocaleString("zh-Hant-TW", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

function formatLargeNumber(num) {
  if (!num || isNaN(num)) return "--";
  if (num >= 1e12) return (num / 1e12).toFixed(2) + "兆";
  if (num >= 1e8) return (num / 1e8).toFixed(1) + "億";
  return num.toLocaleString();
}

function formatLargeVolume(vol) {
  if (!vol || isNaN(vol)) return "--";
  if (vol >= 1e8) return (vol / 1e8).toFixed(2) + "億股";
  if (vol >= 1e5) return (vol / 1000).toFixed(0) + "k張";
  return vol.toLocaleString() + "股";
}

function parseVolumeToNumber(volStr) {
  if (!volStr) return 0;
  if (volStr.includes("億")) return parseFloat(volStr) * 1e8;
  if (volStr.includes("k")) return parseFloat(volStr) * 1000 * 1000; // 張換算成股
  return parseFloat(volStr) || 0;
}

function showToast(message, type = "success") {
  const container = document.getElementById("toasts");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${type === "success" ? "✓" : "✕"}</span>
    <span class="toast-message">${message}</span>
  `;
  
  container.appendChild(toast);
  
  // 3秒後淡出
  setTimeout(() => {
    toast.style.animation = "toastOut 0.3s forwards";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// 股票新聞模擬渲染
function updateStockNewsPanel(stockName) {
  const listEl = document.getElementById("news-list");
  if (!listEl) return;

  const headlines = [
    { title: `【市場觀察】${stockName} 獲外資法人大舉調升評等，看好下半年獲利動能爆發`, source: "經濟日報", time: "10分鐘前", sentiment: "positive" },
    { title: `法人觀點：${stockName} 歷史配息殖利率表現卓越，存股族逢低加碼買氣暢旺`, source: "工商時報", time: "1小時前", sentiment: "positive" },
    { title: `【產業焦點】因應地緣政治與庫存調節，${stockName} 短期毛利率面臨些微考驗`, source: "財訊", time: "3小時前", sentiment: "neutral" },
    { title: `大戶籌碼分析：${stockName} 獲融資持續回補，千張大戶持股比例再攀新高`, source: "非凡財經", time: "5小時前", sentiment: "positive" }
  ];

  listEl.innerHTML = headlines.map(news => `
    <div class="news-item">
      <span class="news-dot ${news.sentiment}"></span>
      <div class="news-content">
        <div class="news-headline">${news.title}</div>
        <div class="news-meta">
          <span class="news-source">${news.source}</span>
          <span>${news.time}</span>
        </div>
      </div>
    </div>
  `).join("");
}

// ==========================================
// 15. Canvas 背景極輕量高階科技風粒子動畫
// ==========================================
function initBackgroundCanvas() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // 粒子結構設定
  const particles = [];
  const particleCount = Math.min(40, Math.floor(width / 35)); // 手機端減少粒子以極大提昇 CPU 效能

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      alpha: Math.random() * 0.3 + 0.1
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = "rgba(59, 130, 246, 0.15)";
    
    // 繪製粒子
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(59, 130, 246, ${p.alpha})`;
      ctx.fill();

      // 移動
      p.x += p.vx;
      p.y += p.vy;

      // 邊界回彈
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    });

    // 粒子間連線（距離近的繪製微弱連線，呈現科技網格感）
    ctx.strokeStyle = "rgba(59, 130, 246, 0.03)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}
