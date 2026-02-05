// ============================================
// BCN AI TERMINAL - API INTEGRATION
// Connect real crypto data sources
// ============================================

// ===================
// API CONFIGURATIONS
// ===================

const API_CONFIG = {
    coingecko: {
        baseUrl: 'https://api.coingecko.com/api/v3',
        rateLimit: 50, // calls per minute (free tier)
        requiresAuth: false
    },
    coinmarketcap: {
        baseUrl: 'https://pro-api.coinmarketcap.com/v1',
        rateLimit: 333, // calls per day (free tier)
        requiresAuth: true,
        apiKey: 'YOUR_CMC_API_KEY' // Replace with your key
    },
    binance: {
        baseUrl: 'https://api.binance.com/api/v3',
        rateLimit: 1200, // weight per minute
        requiresAuth: false
    },
    cryptocompare: {
        baseUrl: 'https://min-api.cryptocompare.com/data',
        requiresAuth: true,
        apiKey: 'YOUR_CRYPTOCOMPARE_KEY'
    }
};

// ===================
// COINGECKO API (Recommended - Free)
// ===================

class CoinGeckoAPI {
    constructor() {
        this.baseUrl = API_CONFIG.coingecko.baseUrl;
        this.cache = new Map();
        this.cacheDuration = 30000; // 30 seconds
    }

    async fetchPrices(coinIds = ['bitcoin', 'ethereum', 'solana']) {
        const cacheKey = 'prices_' + coinIds.join(',');
        const cached = this.getFromCache(cacheKey);
        if (cached) return cached;

        try {
            const ids = coinIds.join(',');
            const url = `${this.baseUrl}/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true&include_market_cap=true`;
            
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const data = await response.json();
            this.setCache(cacheKey, data);
            return data;
        } catch (error) {
            console.error('CoinGecko API Error:', error);
            return null;
        }
    }

    async fetchTopCoins(limit = 50) {
        const cacheKey = `top_coins_${limit}`;
        const cached = this.getFromCache(cacheKey);
        if (cached) return cached;

        try {
            const url = `${this.baseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false&price_change_percentage=24h`;
            
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const data = await response.json();
            this.setCache(cacheKey, data);
            return data;
        } catch (error) {
            console.error('CoinGecko API Error:', error);
            return null;
        }
    }

    async fetchCoinDetails(coinId) {
        try {
            const url = `${this.baseUrl}/coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false`;
            
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            return await response.json();
        } catch (error) {
            console.error('CoinGecko API Error:', error);
            return null;
        }
    }

    async fetchTrending() {
        try {
            const url = `${this.baseUrl}/search/trending`;
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            return await response.json();
        } catch (error) {
            console.error('CoinGecko API Error:', error);
            return null;
        }
    }

    getFromCache(key) {
        const cached = this.cache.get(key);
        if (!cached) return null;
        
        if (Date.now() - cached.timestamp > this.cacheDuration) {
            this.cache.delete(key);
            return null;
        }
        
        return cached.data;
    }

    setCache(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }
}

// ===================
// COINMARKETCAP API
// ===================

class CoinMarketCapAPI {
    constructor(apiKey) {
        this.baseUrl = API_CONFIG.coinmarketcap.baseUrl;
        this.apiKey = apiKey;
        this.cache = new Map();
        this.cacheDuration = 60000; // 1 minute
    }

    async fetchLatestListings(limit = 100) {
        try {
            const url = `${this.baseUrl}/cryptocurrency/listings/latest?limit=${limit}`;
            
            const response = await fetch(url, {
                headers: {
                    'X-CMC_PRO_API_KEY': this.apiKey,
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('CoinMarketCap API Error:', error);
            return null;
        }
    }

    async fetchQuotes(symbols = ['BTC', 'ETH', 'SOL']) {
        try {
            const symbolsStr = symbols.join(',');
            const url = `${this.baseUrl}/cryptocurrency/quotes/latest?symbol=${symbolsStr}`;
            
            const response = await fetch(url, {
                headers: {
                    'X-CMC_PRO_API_KEY': this.apiKey,
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('CoinMarketCap API Error:', error);
            return null;
        }
    }
}

// ===================
// BINANCE API (Real-time WebSocket)
// ===================

class BinanceWebSocket {
    constructor() {
        this.ws = null;
        this.streams = [];
        this.callbacks = new Map();
    }

    connect(symbols = ['btcusdt', 'ethusdt', 'solusdt']) {
        const streams = symbols.map(s => `${s}@ticker`).join('/');
        const url = `wss://stream.binance.com:9443/stream?streams=${streams}`;
        
        this.ws = new WebSocket(url);
        
        this.ws.onopen = () => {
            console.log('✅ Binance WebSocket Connected');
        };
        
        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.stream && data.data) {
                this.handleTicker(data.data);
            }
        };
        
        this.ws.onerror = (error) => {
            console.error('Binance WebSocket Error:', error);
        };
        
        this.ws.onclose = () => {
            console.log('Binance WebSocket Closed');
            // Auto-reconnect after 5 seconds
            setTimeout(() => this.connect(symbols), 5000);
        };
    }

    handleTicker(ticker) {
        const symbol = ticker.s; // e.g., "BTCUSDT"
        const data = {
            symbol: symbol.replace('USDT', ''),
            price: parseFloat(ticker.c),
            change24h: parseFloat(ticker.P),
            volume24h: parseFloat(ticker.v),
            high24h: parseFloat(ticker.h),
            low24h: parseFloat(ticker.l)
        };
        
        // Trigger callbacks
        const callback = this.callbacks.get(symbol);
        if (callback) callback(data);
        
        // Update global state
        this.updateAppState(data);
    }

    updateAppState(data) {
        const coin = AppState.cryptoData.find(c => c.symbol === data.symbol);
        if (coin) {
            coin.price = data.price;
            coin.change = data.change24h;
        }
    }

    subscribe(symbol, callback) {
        this.callbacks.set(symbol, callback);
    }

    disconnect() {
        if (this.ws) {
            this.ws.close();
        }
    }
}

// ===================
// INTEGRATION FUNCTIONS
// ===================

// Initialize APIs
let coinGeckoAPI;
let binanceWS;

function initializeAPIs() {
    console.log('🔌 Initializing API connections...');
    
    // CoinGecko for general data
    coinGeckoAPI = new CoinGeckoAPI();
    
    // Binance WebSocket for real-time prices
    binanceWS = new BinanceWebSocket();
    
    // Start real-time updates
    startRealTimeUpdates();
}

async function startRealTimeUpdates() {
    // Initial data fetch
    await updateCryptoData();
    
    // Connect to Binance WebSocket
    const symbols = AppState.cryptoData
        .map(c => c.symbol.toLowerCase() + 'usdt')
        .filter(s => ['btcusdt', 'ethusdt', 'solusdt', 'bnbusdt', 'adausdt', 'dogeusdt', 'maticusdt', 'dotusdt', 'linkusdt', 'avaxusdt'].includes(s));
    
    binanceWS.connect(symbols);
    
    // Periodic updates every 5 minutes
    setInterval(updateCryptoData, 300000);
}

async function updateCryptoData() {
    try {
        // Fetch top 50 coins from CoinGecko
        const topCoins = await coinGeckoAPI.fetchTopCoins(50);
        
        if (!topCoins) {
            console.warn('Failed to fetch crypto data');
            return;
        }
        
        // Map to our format
        AppState.cryptoData = topCoins.slice(0, 12).map(coin => ({
            symbol: coin.symbol.toUpperCase(),
            name: coin.name,
            price: coin.current_price,
            change: coin.price_change_percentage_24h || 0,
            volume: formatVolume(coin.total_volume),
            marketCap: formatMarketCap(coin.market_cap)
        }));
        
        // Update ticker
        renderTicker();
        
        console.log('✅ Crypto data updated');
    } catch (error) {
        console.error('Error updating crypto data:', error);
    }
}

function formatVolume(volume) {
    if (volume >= 1e9) return (volume / 1e9).toFixed(1) + 'B';
    if (volume >= 1e6) return (volume / 1e6).toFixed(1) + 'M';
    if (volume >= 1e3) return (volume / 1e3).toFixed(1) + 'K';
    return volume.toFixed(0);
}

function formatMarketCap(marketCap) {
    if (marketCap >= 1e12) return (marketCap / 1e12).toFixed(2) + 'T';
    if (marketCap >= 1e9) return (marketCap / 1e9).toFixed(1) + 'B';
    if (marketCap >= 1e6) return (marketCap / 1e6).toFixed(1) + 'M';
    return marketCap.toFixed(0);
}

// ===================
// ENHANCED RESPONSE GENERATION WITH REAL DATA
// ===================

async function generateResponseWithAPI(input) {
    const lower = input.toLowerCase();
    
    // Handle crypto queries with real data
    if (containsCryptoSymbol(lower)) {
        const symbol = extractCryptoSymbol(lower);
        const coinData = await fetchDetailedCoinData(symbol);
        
        if (coinData) {
            return formatRealCryptoResponse(coinData);
        }
    }
    
    // Fallback to regular response
    return generateResponse(input);
}

async function fetchDetailedCoinData(symbol) {
    try {
        // Convert symbol to CoinGecko ID
        const coinId = getCoinGeckoId(symbol);
        if (!coinId) return null;
        
        const data = await coinGeckoAPI.fetchCoinDetails(coinId);
        return data;
    } catch (error) {
        console.error('Error fetching coin data:', error);
        return null;
    }
}

function getCoinGeckoId(symbol) {
    const mapping = {
        'BTC': 'bitcoin',
        'ETH': 'ethereum',
        'SOL': 'solana',
        'BNB': 'binancecoin',
        'XRP': 'ripple',
        'DOGE': 'dogecoin',
        'ADA': 'cardano',
        'AVAX': 'avalanche-2',
        'DOT': 'polkadot',
        'LINK': 'chainlink',
        'MATIC': 'matic-network',
        'UNI': 'uniswap'
    };
    
    return mapping[symbol.toUpperCase()];
}

function formatRealCryptoResponse(coinData) {
    const market = coinData.market_data;
    const price = market.current_price.usd;
    const change24h = market.price_change_percentage_24h;
    const marketCap = market.market_cap.usd;
    const volume = market.total_volume.usd;
    const high24h = market.high_24h.usd;
    const low24h = market.low_24h.usd;
    const ath = market.ath.usd;
    const athDate = new Date(market.ath_date.usd).toLocaleDateString();
    
    return `
        <div class="space-y-3">
            <div class="text-lg font-bold text-white">${coinData.name} (${coinData.symbol.toUpperCase()})</div>
            
            <div class="text-3xl font-bold text-white">$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            
            <div class="${change24h >= 0 ? 'text-green-400' : 'text-red-400'} text-sm font-semibold">
                ${change24h >= 0 ? '▲' : '▼'} ${Math.abs(change24h).toFixed(2)}% (24h)
            </div>
            
            <div class="grid grid-cols-2 gap-3 text-xs">
                <div class="bg-gray-800/50 p-2 rounded-lg">
                    <div class="text-gray-400">Market Cap</div>
                    <div class="text-white font-bold">$${formatMarketCap(marketCap)}</div>
                </div>
                <div class="bg-gray-800/50 p-2 rounded-lg">
                    <div class="text-gray-400">24h Volume</div>
                    <div class="text-white font-bold">$${formatVolume(volume)}</div>
                </div>
                <div class="bg-gray-800/50 p-2 rounded-lg">
                    <div class="text-gray-400">24h High</div>
                    <div class="text-white font-bold">$${high24h.toLocaleString()}</div>
                </div>
                <div class="bg-gray-800/50 p-2 rounded-lg">
                    <div class="text-gray-400">24h Low</div>
                    <div class="text-white font-bold">$${low24h.toLocaleString()}</div>
                </div>
            </div>
            
            <div class="text-xs text-gray-400 pt-2 border-t border-gray-700">
                All-Time High: $${ath.toLocaleString()} (${athDate})
            </div>
        </div>
    `;
}

// ===================
// BACKEND PROXY (Recommended for Production)
// ===================

/*
// Create a Node.js/Express backend to proxy API calls
// This keeps your API keys secure and adds rate limiting

// backend/server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// CoinGecko proxy
app.get('/api/crypto/prices', async (req, res) => {
    try {
        const response = await axios.get(
            'https://api.coingecko.com/api/v3/simple/price',
            { params: req.query }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'API request failed' });
    }
});

// CoinMarketCap proxy (with API key)
app.get('/api/crypto/quotes', async (req, res) => {
    try {
        const response = await axios.get(
            'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
            {
                params: req.query,
                headers: {
                    'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'API request failed' });
    }
});

app.listen(3000, () => {
    console.log('API proxy running on port 3000');
});

// Then in your frontend:
async function fetchCryptoDataFromBackend() {
    const response = await fetch('http://localhost:3000/api/crypto/prices?ids=bitcoin,ethereum');
    return await response.json();
}
*/

// ===================
// USAGE EXAMPLES
// ===================

/*
// Example 1: Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeAPIs();
});

// Example 2: Fetch specific coin data
async function getCoinInfo(symbol) {
    const data = await fetchDetailedCoinData(symbol);
    console.log(data);
}

// Example 3: Subscribe to real-time updates
binanceWS.subscribe('BTCUSDT', (data) => {
    console.log('BTC Price Update:', data.price);
    updatePriceDisplay(data);
});

// Example 4: Get trending coins
async function showTrending() {
    const trending = await coinGeckoAPI.fetchTrending();
    console.log('Trending:', trending);
}
*/

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CoinGeckoAPI,
        CoinMarketCapAPI,
        BinanceWebSocket,
        initializeAPIs,
        updateCryptoData
    };
}

console.log('✅ API Integration Module Loaded');
