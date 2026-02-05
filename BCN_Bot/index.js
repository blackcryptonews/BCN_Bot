// ============================================
// BCN AI TERMINAL - BRANDED VERSION
// BlackCryptoNews.com - Official Design System
// Colors: Electric Purple (#BD00FF) + Cyber Blue (#00F0FF)
// Typography: Space Grotesk + Orbitron + Inter
// ============================================

// ===================
// STATE MANAGEMENT
// ===================

const AppState = {
    currentAgent: 'general',
    isTyping: false,
    messageHistory: [],
    cryptoData: [
        { symbol: 'BTC', name: 'Bitcoin', price: 64231.45, change: 2.4, volume: '28.4B', marketCap: '1.25T' },
        { symbol: 'ETH', name: 'Ethereum', price: 3452.12, change: -1.2, volume: '15.2B', marketCap: '415B' },
        { symbol: 'SOL', name: 'Solana', price: 145.67, change: 5.7, volume: '3.8B', marketCap: '65B' },
        { symbol: 'BNB', name: 'BNB', price: 412.30, change: 0.8, volume: '1.2B', marketCap: '63B' },
        { symbol: 'XRP', name: 'Ripple', price: 0.62, change: -0.5, volume: '2.1B', marketCap: '34B' },
        { symbol: 'DOGE', name: 'Dogecoin', price: 0.16, change: 12.3, volume: '1.8B', marketCap: '23B' },
        { symbol: 'ADA', name: 'Cardano', price: 0.58, change: 1.1, volume: '890M', marketCap: '20B' },
        { symbol: 'AVAX', name: 'Avalanche', price: 37.45, change: -3.2, volume: '650M', marketCap: '14B' },
        { symbol: 'DOT', name: 'Polkadot', price: 7.82, change: 0.4, volume: '420M', marketCap: '11B' },
        { symbol: 'LINK', name: 'Chainlink', price: 18.45, change: 4.5, volume: '780M', marketCap: '11B' },
        { symbol: 'MATIC', name: 'Polygon', price: 0.89, change: 2.1, volume: '560M', marketCap: '8.2B' },
        { symbol: 'UNI', name: 'Uniswap', price: 12.34, change: -1.8, volume: '340M', marketCap: '7.5B' }
    ]
};

// BCN Brand Colors
const BrandColors = {
    purple: {
        primary: '#BD00FF',
        light: '#E066FF',
        dark: '#8B00CC',
        glow: 'rgba(189, 0, 255, 0.3)'
    },
    cyan: {
        primary: '#00F0FF',
        light: '#66F6FF',
        dark: '#00B8CC',
        glow: 'rgba(0, 240, 255, 0.3)'
    },
    gold: '#FFD700',
    silver: '#C8C8C8',
    success: '#00FF88',
    error: '#FF3366'
};

// Agent Configuration with Brand Colors
const AgentConfig = {
    general: {
        name: 'General AI',
        icon: 'fa-brain',
        color: 'purple',
        colorCode: BrandColors.purple.primary,
        description: 'General crypto intelligence and analysis'
    },
    whale: {
        name: 'Whale Tracker',
        icon: 'fa-water',
        color: 'cyan',
        colorCode: BrandColors.cyan.primary,
        description: 'Monitor large wallet movements and whale activities'
    },
    technician: {
        name: 'Technical Analyst',
        icon: 'fa-chart-line',
        color: 'blue',
        colorCode: '#3B82F6',
        description: 'Advanced technical analysis and chart patterns'
    },
    sherlock: {
        name: 'Alpha Hunter',
        icon: 'fa-search-dollar',
        color: 'yellow',
        colorCode: '#EAB308',
        description: 'Discover hidden gems and alpha opportunities'
    },
    news: {
        name: 'News Agent',
        icon: 'fa-newspaper',
        color: 'red',
        colorCode: '#EF4444',
        description: 'Real-time crypto news and market updates'
    },
    defi: {
        name: 'DeFi Specialist',
        icon: 'fa-coins',
        color: 'green',
        colorCode: BrandColors.success,
        description: 'DeFi protocols, yields, and opportunities'
    }
};

// DOM Elements
const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const tickerElement = document.getElementById('cryptoTicker');

// ===================
// INITIALIZATION
// ===================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    console.log('%c🚀 BCN AI Terminal Initializing...', 'color: #BD00FF; font-weight: bold; font-size: 14px;');
    console.log('%c⚡ Using Official BCN Design System', 'color: #00F0FF; font-size: 12px;');
    
    // Initialize ticker
    initTicker();
    
    // Focus input
    userInput.focus();
    
    // Setup event listeners
    setupEventListeners();
    
    // Start price updates
    setInterval(updateTickerPrices, 5000);
    
    // Add keyboard shortcuts
    setupKeyboardShortcuts();
    
    console.log('%c✅ BCN AI Terminal Ready', 'color: #00FF88; font-weight: bold; font-size: 14px;');
}

function setupEventListeners() {
    // Enter key to send message
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !AppState.isTyping) {
            sendMessage();
        }
    });
    
    // Prevent form submission
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    });
}

function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K to focus input
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            userInput.focus();
        }
        
        // Escape to clear input
        if (e.key === 'Escape') {
            userInput.value = '';
            userInput.blur();
        }
    });
}

// ===================
// TICKER FUNCTIONALITY
// ===================

function initTicker() {
    renderTicker();
}

function renderTicker() {
    // Triple the data for seamless infinite scroll
    const displayData = [...AppState.cryptoData, ...AppState.cryptoData, ...AppState.cryptoData];
    
    const tickerHTML = displayData.map(coin => {
        const colorClass = coin.change >= 0 ? 'price-up' : 'price-down';
        const arrow = coin.change >= 0 ? '▲' : '▼';
        const formattedPrice = coin.price < 1 ? coin.price.toFixed(4) : coin.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        
        return `
            <div class="ticker-item">
                <span class="font-bold text-white">${coin.symbol}</span>
                <span class="mx-2" style="color: ${BrandColors.silver}">$${formattedPrice}</span>
                <span class="${colorClass} text-xs font-bold">${arrow} ${Math.abs(coin.change).toFixed(2)}%</span>
            </div>
        `;
    }).join('');
    
    tickerElement.innerHTML = tickerHTML;
}

function updateTickerPrices() {
    // Simulate realistic price movements
    AppState.cryptoData.forEach(coin => {
        const volatilityPercent = coin.price > 1000 ? 0.003 : coin.price > 100 ? 0.005 : 0.008;
        const maxChange = coin.price * volatilityPercent;
        const change = (Math.random() * maxChange * 2) - maxChange;
        
        coin.price = Math.max(0.0001, coin.price + change);
        
        if (Math.random() > 0.85) {
            const changeAdjustment = (Math.random() - 0.5) * 2;
            coin.change = parseFloat((coin.change + changeAdjustment).toFixed(2));
        }
    });
    
    renderTicker();
}

// ===================
// AGENT SYSTEM
// ===================

function activateAgent(agentType) {
    if (!AgentConfig[agentType]) {
        console.error('Invalid agent:', agentType);
        return;
    }
    
    AppState.currentAgent = agentType;
    
    // Update UI
    document.querySelectorAll('.agent-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`agent-${agentType}`)?.classList.add('active');
    
    // Add system message
    const config = AgentConfig[agentType];
    const systemMsg = `<span style="color: ${config.colorCode}">🔄 Switched to <strong>${config.name}</strong></span><br><span class="text-gray-400 text-xs">${config.description}</span>`;
    
    addMessage(systemMsg, 'system');
    
    // Auto-response from agent
    setTimeout(() => {
        const greeting = getAgentGreeting(agentType);
        addMessage(greeting, 'bot', agentType);
    }, 800);
}

function getAgentGreeting(agentType) {
    const greetings = {
        general: `<span style="color: ${BrandColors.purple.primary}">🧠 <strong>General AI Agent Activated</strong></span><br>I can help you with crypto analysis, market insights, and answer any questions about the crypto ecosystem.`,
        whale: `<span style="color: ${BrandColors.cyan.primary}">🐋 <strong>Whale Tracker Online</strong></span><br>Monitoring large wallet movements and institutional activity. Ask me about whale alerts or major transactions.`,
        technician: `<span style="color: #3B82F6">📊 <strong>Technical Analysis Ready</strong></span><br>I specialize in chart patterns, indicators, and price action analysis. Request analysis for any crypto asset.`,
        sherlock: `<span style="color: ${BrandColors.gold}">🔍 <strong>Alpha Hunter Deployed</strong></span><br>Searching for undervalued projects and emerging opportunities. Ask me to find alpha signals or analyze specific tokens.`,
        news: `<span style="color: #EF4444">⚡ <strong>News Feed Active</strong></span><br>Real-time crypto news aggregation enabled. I can provide breaking news, market updates, and regulatory developments.`,
        defi: `<span style="color: ${BrandColors.success}">💎 <strong>DeFi Specialist Ready</strong></span><br>Expert in DeFi protocols, yield farming, and liquidity strategies. Ask about APYs, protocols, or DeFi opportunities.`
    };
    
    return greetings[agentType] || 'Agent activated.';
}

// ===================
// MESSAGE HANDLING
// ===================

function sendMessage() {
    const text = userInput.value.trim();
    
    if (!text || AppState.isTyping) return;
    
    // Add user message
    addMessage(text, 'user');
    AppState.messageHistory.push({ role: 'user', content: text });
    
    // Clear input
    userInput.value = '';
    
    // Show typing indicator
    showTyping();
    
    // Generate response
    const responseDelay = 1200 + Math.random() * 800;
    setTimeout(() => {
        removeTyping();
        const response = generateResponse(text);
        addMessage(response, 'bot', AppState.currentAgent);
        AppState.messageHistory.push({ role: 'bot', content: response, agent: AppState.currentAgent });
    }, responseDelay);
}

function addMessage(text, sender, agentType = null) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'flex gap-3 animate-fade-in-up';
    
    if (sender === 'user') {
        messageDiv.classList.add('flex-row-reverse');
        messageDiv.innerHTML = `
            <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500/30 to-purple-900/50 flex items-center justify-center border border-purple-500/40 flex-shrink-0 shadow-lg" style="box-shadow: 0 0 15px ${BrandColors.purple.glow}">
                <i class="fas fa-user text-purple-300 text-sm"></i>
            </div>
            <div class="msg-user p-3.5 rounded-l-2xl rounded-br-2xl max-w-[85%] text-sm text-white font-body shadow-2xl border border-purple-500/20">
                ${escapeHtml(text)}
            </div>
        `;
    } else if (sender === 'system') {
        messageDiv.innerHTML = `
            <div class="w-full text-center">
                <div class="inline-block glass-premium px-4 py-2 rounded-full text-xs font-body border border-purple-900/50">
                    ${text}
                </div>
            </div>
        `;
    } else {
        // Bot message with agent styling
        const agent = agentType || AppState.currentAgent;
        const config = AgentConfig[agent] || AgentConfig.general;
        
        const colorMap = {
            purple: { bg: 'from-purple-500/20 to-purple-900/20', border: 'border-purple-500/40', icon: 'text-purple-400' },
            cyan: { bg: 'from-cyan-500/20 to-cyan-900/20', border: 'border-cyan-500/40', icon: 'text-cyan-400' },
            blue: { bg: 'from-blue-500/20 to-blue-900/20', border: 'border-blue-500/40', icon: 'text-blue-400' },
            yellow: { bg: 'from-yellow-500/20 to-yellow-900/20', border: 'border-yellow-500/40', icon: 'text-yellow-400' },
            red: { bg: 'from-red-500/20 to-red-900/20', border: 'border-red-500/40', icon: 'text-red-400' },
            green: { bg: 'from-green-500/20 to-green-900/20', border: 'border-green-500/40', icon: 'text-green-400' }
        };
        
        const colors = colorMap[config.color] || colorMap.purple;
        
        messageDiv.innerHTML = `
            <div class="w-9 h-9 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center border ${colors.border} flex-shrink-0" style="box-shadow: 0 0 15px rgba(189, 0, 255, 0.15)">
                <i class="fas ${config.icon} ${colors.icon} text-sm"></i>
            </div>
            <div class="msg-bot p-4 rounded-r-2xl rounded-bl-2xl max-w-[90%] sm:max-w-[85%] text-sm leading-relaxed font-body shadow-2xl border border-white/10" style="color: ${BrandColors.silver}">
                ${text}
            </div>
        `;
    }
    
    chatContainer.appendChild(messageDiv);
    scrollToBottom();
}

function showTyping() {
    AppState.isTyping = true;
    
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typingIndicator';
    typingDiv.className = 'flex gap-3 mb-4';
    typingDiv.innerHTML = `
        <div class="w-9 h-9 rounded-xl glass-premium flex items-center justify-center border border-purple-900/50 flex-shrink-0">
            <i class="fas fa-robot text-purple-400/60 text-sm"></i>
        </div>
        <div class="glass-premium p-3.5 rounded-2xl border border-purple-900/30">
            <div class="flex gap-1.5">
                <div class="w-2 h-2 rounded-full loading-dot" style="background: ${BrandColors.purple.primary}"></div>
                <div class="w-2 h-2 rounded-full loading-dot" style="background: ${BrandColors.cyan.primary}"></div>
                <div class="w-2 h-2 rounded-full loading-dot" style="background: ${BrandColors.purple.primary}"></div>
            </div>
        </div>
    `;
    
    chatContainer.appendChild(typingDiv);
    scrollToBottom();
}

function removeTyping() {
    AppState.isTyping = false;
    const typingEl = document.getElementById('typingIndicator');
    if (typingEl) typingEl.remove();
}

function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===================
// RESPONSE GENERATION
// ===================

function generateResponse(input) {
    const lower = input.toLowerCase();
    const agent = AppState.currentAgent;
    
    // Command parsing
    if (lower.startsWith('/')) {
        return handleCommand(lower);
    }
    
    // Crypto-specific queries
    if (containsCryptoSymbol(lower)) {
        return generateCryptoAnalysis(lower);
    }
    
    // Agent-specific responses
    return getAgentResponse(agent, lower);
}

function handleCommand(command) {
    const parts = command.split(' ');
    const cmd = parts[0];
    const args = parts.slice(1);
    
    switch(cmd) {
        case '/price':
            if (args.length === 0) return `<span style="color: ${BrandColors.error}">⚠️ Usage:</span> <code class="font-data">/price [SYMBOL]</code><br>Example: <code class="font-data">/price BTC</code>`;
            return getPriceInfo(args[0].toUpperCase());
            
        case '/help':
            return getHelpInfo();
            
        case '/clear':
            setTimeout(() => {
                chatContainer.innerHTML = '';
                addMessage('Chat cleared. How can I assist you?', 'bot');
            }, 100);
            return 'Clearing chat...';
            
        case '/agent':
            if (args.length === 0) return `<span style="color: ${BrandColors.error}">⚠️ Usage:</span> <code class="font-data">/agent [type]</code><br>Types: general, whale, technician, sherlock, news, defi`;
            const agentType = args[0].toLowerCase();
            if (AgentConfig[agentType]) {
                activateAgent(agentType);
                return '';
            }
            return `<span style="color: ${BrandColors.error}">⚠️ Unknown agent:</span> ${args[0]}`;
            
        case '/market':
            return getMarketOverview();
            
        case '/top':
            return getTopMovers();
            
        default:
            return `<span style="color: ${BrandColors.error}">⚠️ Unknown command:</span> <code class="font-data">${cmd}</code><br>Type <code class="font-data">/help</code> for available commands`;
    }
}

function getPriceInfo(symbol) {
    const coin = AppState.cryptoData.find(c => c.symbol === symbol);
    
    if (!coin) {
        return `<span style="color: ${BrandColors.error}">⚠️ Coin not found:</span> <code class="font-data">${symbol}</code><br><span class="text-gray-400 text-xs">Available: ${AppState.cryptoData.map(c => c.symbol).join(', ')}</span>`;
    }
    
    const changeColor = coin.change >= 0 ? BrandColors.success : BrandColors.error;
    const arrow = coin.change >= 0 ? '▲' : '▼';
    const formattedPrice = coin.price < 1 ? coin.price.toFixed(4) : coin.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    return `
        <div class="space-y-2">
            <div class="text-base font-headline font-bold text-white">${coin.name} <span class="font-data" style="color: ${BrandColors.purple.primary}">(${coin.symbol})</span></div>
            <div class="text-2xl font-data font-bold text-white">$${formattedPrice}</div>
            <div class="text-sm font-data font-bold" style="color: ${changeColor}">${arrow} ${Math.abs(coin.change).toFixed(2)}% <span class="text-xs opacity-60">(24h)</span></div>
            <div class="grid grid-cols-2 gap-2 mt-3 text-xs font-body">
                <div class="glass-premium p-2 rounded-lg border border-purple-900/30">
                    <div style="color: ${BrandColors.silver}; opacity: 0.6;">Volume</div>
                    <div class="text-white font-data font-semibold">${coin.volume}</div>
                </div>
                <div class="glass-premium p-2 rounded-lg border border-purple-900/30">
                    <div style="color: ${BrandColors.silver}; opacity: 0.6;">Market Cap</div>
                    <div class="text-white font-data font-semibold">${coin.marketCap}</div>
                </div>
            </div>
        </div>
    `;
}

function getMarketOverview() {
    const totalUp = AppState.cryptoData.filter(c => c.change > 0).length;
    const totalDown = AppState.cryptoData.filter(c => c.change < 0).length;
    const avgChange = (AppState.cryptoData.reduce((sum, c) => sum + c.change, 0) / AppState.cryptoData.length).toFixed(2);
    
    return `
        <div class="space-y-2">
            <div class="text-base font-headline font-bold text-white mb-3">📊 Market Overview</div>
            <div class="grid grid-cols-3 gap-3 text-center text-xs">
                <div class="glass-premium border border-green-500/30 rounded-lg p-2" style="box-shadow: 0 0 15px rgba(0, 255, 136, 0.1)">
                    <div class="font-data font-bold text-lg" style="color: ${BrandColors.success}">${totalUp}</div>
                    <div class="font-body" style="color: ${BrandColors.silver}; opacity: 0.6;">Gainers</div>
                </div>
                <div class="glass-premium border border-red-500/30 rounded-lg p-2" style="box-shadow: 0 0 15px rgba(255, 51, 102, 0.1)">
                    <div class="font-data font-bold text-lg" style="color: ${BrandColors.error}">${totalDown}</div>
                    <div class="font-body" style="color: ${BrandColors.silver}; opacity: 0.6;">Losers</div>
                </div>
                <div class="glass-premium border border-purple-500/30 rounded-lg p-2" style="box-shadow: 0 0 15px ${BrandColors.purple.glow}">
                    <div class="font-data font-bold text-lg text-white">${avgChange}%</div>
                    <div class="font-body" style="color: ${BrandColors.silver}; opacity: 0.6;">Avg Change</div>
                </div>
            </div>
            <div class="text-xs font-body mt-3" style="color: ${BrandColors.silver}; opacity: 0.6;">
                Market sentiment: ${avgChange > 0 ? `<span style="color: ${BrandColors.success}">Bullish 🚀</span>` : `<span style="color: ${BrandColors.error}">Bearish 🐻</span>`}
            </div>
        </div>
    `;
}

function getTopMovers() {
    const sorted = [...AppState.cryptoData].sort((a, b) => Math.abs(b.change) - Math.abs(a.change)).slice(0, 5);
    
    const moversHTML = sorted.map(coin => {
        const color = coin.change >= 0 ? BrandColors.success : BrandColors.error;
        const arrow = coin.change >= 0 ? '▲' : '▼';
        return `
            <div class="flex justify-between items-center py-2 border-b border-purple-900/20 last:border-0">
                <div>
                    <span class="font-data font-bold text-white">${coin.symbol}</span>
                    <span class="font-body text-xs ml-2" style="color: ${BrandColors.silver}; opacity: 0.6;">${coin.name}</span>
                </div>
                <div class="font-data font-bold" style="color: ${color}">${arrow} ${Math.abs(coin.change).toFixed(2)}%</div>
            </div>
        `;
    }).join('');
    
    return `
        <div class="space-y-2">
            <div class="text-base font-headline font-bold text-white mb-3">🔥 Top Movers (24h)</div>
            ${moversHTML}
        </div>
    `;
}

function getHelpInfo() {
    return `
        <div class="space-y-3">
            <div class="text-base font-headline font-bold text-white">💡 Available Commands</div>
            
            <div class="space-y-2 text-xs">
                <div class="code-block">
                    <div class="font-headline font-bold mb-1" style="color: ${BrandColors.purple.primary}">Price & Market</div>
                    <div class="font-body" style="color: ${BrandColors.silver}"><code class="font-data">/price [SYMBOL]</code> - Get price info</div>
                    <div class="font-body" style="color: ${BrandColors.silver}"><code class="font-data">/market</code> - Market overview</div>
                    <div class="font-body" style="color: ${BrandColors.silver}"><code class="font-data">/top</code> - Top movers</div>
                </div>
                
                <div class="code-block">
                    <div class="font-headline font-bold mb-1" style="color: ${BrandColors.cyan.primary}">Agents</div>
                    <div class="font-body" style="color: ${BrandColors.silver}"><code class="font-data">/agent general</code> - General AI</div>
                    <div class="font-body" style="color: ${BrandColors.silver}"><code class="font-data">/agent whale</code> - Whale tracker</div>
                    <div class="font-body" style="color: ${BrandColors.silver}"><code class="font-data">/agent technician</code> - TA specialist</div>
                    <div class="font-body" style="color: ${BrandColors.silver}"><code class="font-data">/agent sherlock</code> - Alpha hunter</div>
                    <div class="font-body" style="color: ${BrandColors.silver}"><code class="font-data">/agent news</code> - News feed</div>
                    <div class="font-body" style="color: ${BrandColors.silver}"><code class="font-data">/agent defi</code> - DeFi specialist</div>
                </div>
                
                <div class="code-block">
                    <div class="font-headline font-bold mb-1" style="color: ${BrandColors.gold}">Utility</div>
                    <div class="font-body" style="color: ${BrandColors.silver}"><code class="font-data">/clear</code> - Clear chat</div>
                    <div class="font-body" style="color: ${BrandColors.silver}"><code class="font-data">/help</code> - Show this help</div>
                </div>
            </div>
            
            <div class="font-body text-xs mt-3" style="color: ${BrandColors.silver}; opacity: 0.6;">
                💡 <strong>Tip:</strong> You can also ask questions naturally without commands!
            </div>
        </div>
    `;
}

function containsCryptoSymbol(text) {
    const symbols = AppState.cryptoData.map(c => c.symbol.toLowerCase());
    return symbols.some(symbol => text.includes(symbol));
}

function generateCryptoAnalysis(query) {
    const coin = AppState.cryptoData.find(c => 
        query.includes(c.symbol.toLowerCase()) || query.includes(c.name.toLowerCase())
    );
    
    if (!coin) return getAgentResponse(AppState.currentAgent, query);
    
    const agent = AppState.currentAgent;
    
    if (agent === 'whale') {
        return generateWhaleAnalysis(coin);
    } else if (agent === 'technician') {
        return generateTechnicalAnalysis(coin);
    } else if (agent === 'sherlock') {
        return generateAlphaAnalysis(coin);
    } else if (agent === 'news') {
        return generateNewsAnalysis(coin);
    } else if (agent === 'defi') {
        return generateDeFiAnalysis(coin);
    }
    
    return getPriceInfo(coin.symbol);
}

function generateWhaleAnalysis(coin) {
    const scenarios = [
        `<span style="color: ${BrandColors.cyan.primary}">🐋 <strong>WHALE ALERT: ${coin.symbol}</strong></span><br><br>
        <strong class="font-headline">Recent Activity:</strong><br>
        <span class="font-body">• 3 large wallets accumulated ${(Math.random() * 10000).toFixed(0)} ${coin.symbol}<br>
        • Total value: <span class="font-data">$${(Math.random() * 50 + 10).toFixed(1)}M</span><br>
        • Exchange inflow: ${Math.random() > 0.5 ? '<span style="color: ' + BrandColors.error + '">Decreasing</span>' : '<span style="color: ' + BrandColors.success + '">Increasing</span>'}<br><br>
        <strong class="font-headline">Analysis:</strong> ${Math.random() > 0.5 ? 'Bullish accumulation pattern detected.' : 'Watch for potential sell pressure.'}</span>`,
        
        `<span style="color: ${BrandColors.cyan.primary}">🐋 <strong>${coin.symbol} Whale Movement</strong></span><br><br>
        <strong class="font-headline">Top Holder Activity:</strong><br>
        <span class="font-body">• Wallet <code class="font-data">0x${Math.random().toString(36).substring(7)}...</code><br>
        • Moved <span class="font-data">${(Math.random() * 5000).toFixed(0)} ${coin.symbol}</span> to cold storage<br>
        • Suggests long-term holding strategy<br><br>
        <strong class="font-headline">Confidence:</strong> <span class="font-data">${(Math.random() * 30 + 65).toFixed(0)}%</span></span>`
    ];
    
    return scenarios[Math.floor(Math.random() * scenarios.length)];
}

function generateTechnicalAnalysis(coin) {
    const rsi = (Math.random() * 40 + 30).toFixed(0);
    const support = (coin.price * (0.95 - Math.random() * 0.05)).toFixed(2);
    const resistance = (coin.price * (1.05 + Math.random() * 0.05)).toFixed(2);
    
    return `
        <span style="color: #3B82F6">📊 <strong class="font-headline">TECHNICAL ANALYSIS: ${coin.symbol}/USD</strong></span><br><br>
        <span class="font-body"><strong>Current Price:</strong> <span class="font-data">$${coin.price.toFixed(2)}</span><br>
        <strong>24h Change:</strong> <span class="${coin.change >= 0 ? 'price-up' : 'price-down'} font-data">${coin.change >= 0 ? '▲' : '▼'} ${Math.abs(coin.change).toFixed(2)}%</span><br><br>
        
        <strong class="font-headline">Key Levels:</strong><br>
        • Support: <span class="font-data">$${support}</span><br>
        • Resistance: <span class="font-data">$${resistance}</span><br><br>
        
        <strong class="font-headline">Indicators:</strong><br>
        • RSI(14): <span class="font-data">${rsi}</span> ${rsi < 40 ? '(Oversold)' : rsi > 60 ? '(Overbought)' : '(Neutral)'}<br>
        • MACD: ${Math.random() > 0.5 ? 'Bullish crossover' : 'Bearish divergence'}<br>
        • Volume: ${Math.random() > 0.5 ? 'Above average' : 'Below average'}<br><br>
        
        <strong class="font-headline">Pattern:</strong> ${['Ascending triangle', 'Bull flag', 'Head & shoulders', 'Double bottom', 'Consolidation'][Math.floor(Math.random() * 5)]}<br>
        <strong class="font-headline">Outlook:</strong> ${Math.random() > 0.5 ? '<span style="color: ' + BrandColors.success + '">🟢 Bullish</span>' : '<span style="color: ' + BrandColors.error + '">🔴 Bearish</span>'}</span>
    `;
}

function generateAlphaAnalysis(coin) {
    return `
        <span style="color: ${BrandColors.gold}">🔍 <strong class="font-headline">ALPHA SIGNAL: ${coin.symbol}</strong></span><br><br>
        <span class="font-body"><strong class="font-headline">Discovery:</strong><br>
        • Smart money accumulating on dips<br>
        • Developer activity increased 45% this week<br>
        • Upcoming partnership rumors<br><br>
        <strong class="font-headline">Opportunity Score:</strong> <span class="font-data" style="color: ${BrandColors.gold}">${(Math.random() * 30 + 60).toFixed(0)}/100</span><br>
        <strong class="font-headline">Risk Level:</strong> ${['<span style="color: ' + BrandColors.success + '">Low</span>', '<span style="color: ' + BrandColors.purple.primary + '">Medium</span>', '<span style="color: ' + BrandColors.error + '">High</span>'][Math.floor(Math.random() * 3)]}<br><br>
        💡 <em>Early accumulation phase detected</em></span>
    `;
}

function generateNewsAnalysis(coin) {
    return `
        <span style="color: #EF4444">⚡ <strong class="font-headline">${coin.symbol} NEWS UPDATE</strong></span><br><br>
        <span class="font-body"><strong class="font-headline">Breaking Headlines:</strong><br><br>
        📰 ${coin.name} announces major partnership with Fortune 500 company<br>
        <span class="text-xs" style="color: ${BrandColors.silver}; opacity: 0.5;">2 hours ago • CoinDesk</span><br><br>
        📰 Network upgrade successfully deployed<br>
        <span class="text-xs" style="color: ${BrandColors.silver}; opacity: 0.5;">5 hours ago • ${coin.symbol} Official</span><br><br>
        📰 Trading volume surges 120% amid positive sentiment<br>
        <span class="text-xs" style="color: ${BrandColors.silver}; opacity: 0.5;">1 day ago • CryptoSlate</span><br><br>
        <strong class="font-headline">Sentiment:</strong> <span style="color: ${BrandColors.success}">Bullish 🚀</span></span>
    `;
}

function generateDeFiAnalysis(coin) {
    const apy = (Math.random() * 150 + 5).toFixed(2);
    const tvl = (Math.random() * 500 + 50).toFixed(1);
    
    return `
        <span style="color: ${BrandColors.success}">💎 <strong class="font-headline">DeFi ANALYSIS: ${coin.symbol}</strong></span><br><br>
        <span class="font-body"><strong class="font-headline">Protocol Metrics:</strong><br>
        • TVL: <span class="font-data">$${tvl}M</span> ${Math.random() > 0.5 ? '📈' : '📉'}<br>
        • 24h Volume: <span class="font-data">$${(Math.random() * 50 + 10).toFixed(1)}M</span><br>
        • Active Users: <span class="font-data">${(Math.random() * 50000 + 10000).toFixed(0)}</span><br><br>
        
        <strong class="font-headline">Yield Opportunities:</strong><br>
        • Staking APY: <span class="font-data" style="color: ${BrandColors.gold}">${apy}%</span><br>
        • Liquidity Mining: <span class="font-data" style="color: ${BrandColors.gold}">${(Math.random() * 80 + 20).toFixed(2)}%</span><br>
        • Impermanent Loss Risk: ${['<span style="color: ' + BrandColors.success + '">Low</span>', '<span style="color: ' + BrandColors.purple.primary + '">Medium</span>', '<span style="color: ' + BrandColors.error + '">High</span>'][Math.floor(Math.random() * 3)]}<br><br>
        
        💡 <strong class="font-headline">Recommendation:</strong> ${Math.random() > 0.5 ? 'Consider staking for passive income' : 'Monitor protocol developments'}</span>
    `;
}

function getAgentResponse(agent, query) {
    const responses = {
        general: [
            `I can help you analyze <strong>${query}</strong>. Would you like price information, technical analysis, or recent news?`,
            `That's an interesting query about <strong>${query}</strong>. Let me provide you with the latest market insights.`
        ],
        whale: [
            `<span style="color: ${BrandColors.cyan.primary}">Scanning whale wallets for activity related to your query...</span>`,
            `<span style="color: ${BrandColors.cyan.primary}">Large transaction detection systems are monitoring the relevant addresses.</span>`
        ],
        technician: [
            `<span style="color: #3B82F6">Analyzing chart patterns and technical indicators...</span>`,
            `<span style="color: #3B82F6">Let me examine the price action and volume data.</span>`
        ],
        sherlock: [
            `<span style="color: ${BrandColors.gold}">Searching for alpha signals and hidden opportunities...</span>`,
            `<span style="color: ${BrandColors.gold}">Analyzing on-chain data for unusual patterns.</span>`
        ],
        news: [
            `<span style="color: #EF4444">Fetching the latest news and market updates...</span>`,
            `<span style="color: #EF4444">Aggregating breaking news from multiple sources.</span>`
        ],
        defi: [
            `<span style="color: ${BrandColors.success}">Checking DeFi protocols and yield opportunities...</span>`,
            `<span style="color: ${BrandColors.success}">Analyzing TVL, APYs, and protocol health metrics.</span>`
        ]
    };
    
    const agentResponses = responses[agent] || responses.general;
    return agentResponses[Math.floor(Math.random() * agentResponses.length)];
}

// Export for debugging
window.AppState = AppState;
window.AgentConfig = AgentConfig;
window.BrandColors = BrandColors;

console.log('%c✅ BCN AI Terminal - Branded JavaScript Loaded', 'color: #00FF88; font-weight: bold; font-size: 14px;');
console.log('%c⚡ Official BCN Design System Active', 'color: #BD00FF; font-size: 12px;');
