// ============================================
// BCN AI TERMINAL - CLAUDE API INTEGRATION
// Connect to Anthropic's Claude for real AI responses
// ============================================

/*
WARNING: Never expose API keys in frontend code!
This file shows CLIENT-SIDE implementation for demo purposes.
For PRODUCTION, always use a backend proxy to secure your API key.
*/

// ===================
// CONFIGURATION
// ===================

const CLAUDE_CONFIG = {
    // DO NOT expose your real API key here!
    // Use environment variables in your backend
    apiKey: 'YOUR_ANTHROPIC_API_KEY',
    apiUrl: 'https://api.anthropic.com/v1/messages',
    model: 'claude-sonnet-4-5-20250929',
    maxTokens: 1024,
    temperature: 0.7
};

// ===================
// CLAUDE API CLIENT
// ===================

class ClaudeAPIClient {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.conversationHistory = [];
    }

    async sendMessage(userMessage, systemPrompt = null) {
        try {
            // Build messages array
            const messages = [
                ...this.conversationHistory,
                {
                    role: 'user',
                    content: userMessage
                }
            ];

            // Make API request
            const response = await fetch(CLAUDE_CONFIG.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.apiKey,
                    'anthropic-version': '2023-06-01'
                },
                body: JSON.stringify({
                    model: CLAUDE_CONFIG.model,
                    max_tokens: CLAUDE_CONFIG.maxTokens,
                    temperature: CLAUDE_CONFIG.temperature,
                    system: systemPrompt || this.getDefaultSystemPrompt(),
                    messages: messages
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(`API Error: ${error.error?.message || response.statusText}`);
            }

            const data = await response.json();
            const assistantMessage = data.content[0].text;

            // Update conversation history
            this.conversationHistory.push(
                { role: 'user', content: userMessage },
                { role: 'assistant', content: assistantMessage }
            );

            // Keep only last 10 messages to avoid token limits
            if (this.conversationHistory.length > 20) {
                this.conversationHistory = this.conversationHistory.slice(-20);
            }

            return assistantMessage;

        } catch (error) {
            console.error('Claude API Error:', error);
            throw error;
        }
    }

    getDefaultSystemPrompt() {
        return `You are an expert cryptocurrency analyst and AI assistant for BlackCryptoNews.
        
Your role is to provide:
- Real-time market analysis and insights
- Technical analysis of crypto assets
- News interpretation and market sentiment
- DeFi protocol analysis
- Whale activity interpretation
- Investment perspectives (educational, not financial advice)

Guidelines:
- Be concise but informative
- Use bullet points for clarity
- Include relevant data when available
- Stay objective and balanced
- Acknowledge uncertainty when appropriate
- Never provide financial advice, only educational information
- Format responses with appropriate emojis and structure for a chat interface

Current context: You are the "${AppState.currentAgent}" agent.`;
    }

    getAgentSystemPrompt(agent) {
        const prompts = {
            general: `You are a general cryptocurrency AI assistant. Provide comprehensive analysis across all aspects of crypto markets, technology, and news.`,
            
            whale: `You are a Whale Tracker agent specialized in analyzing large wallet movements and institutional crypto activity. Focus on:
- Identifying significant on-chain transactions
- Interpreting whale accumulation/distribution patterns
- Analyzing exchange inflows/outflows
- Assessing market impact of large movements
- Tracking smart money behavior`,
            
            technician: `You are a Technical Analysis specialist. Focus on:
- Chart patterns and formations
- Technical indicators (RSI, MACD, MA, etc.)
- Support and resistance levels
- Volume analysis
- Trend identification
- Price action interpretation
- Trading signals and setups`,
            
            sherlock: `You are an Alpha Hunter agent specialized in finding hidden opportunities. Focus on:
- Identifying undervalued projects
- Spotting emerging trends early
- Analyzing tokenomics and fundamentals
- Discovering narrative plays
- Finding asymmetric risk/reward opportunities
- Early-stage project analysis`,
            
            news: `You are a News Agent providing real-time crypto market updates. Focus on:
- Breaking news and announcements
- Regulatory developments
- Major partnerships and integrations
- Market-moving events
- Sentiment analysis from news
- Impact assessment of news on prices`,
            
            defi: `You are a DeFi specialist. Focus on:
- Protocol analysis and comparisons
- Yield farming opportunities
- Liquidity pool strategies
- Risk assessment (smart contract, impermanent loss)
- TVL and usage metrics
- New DeFi innovations
- Cross-chain DeFi strategies`
        };

        return prompts[agent] || prompts.general;
    }

    async sendMessageWithAgent(userMessage, agent) {
        const systemPrompt = this.getAgentSystemPrompt(agent);
        return await this.sendMessage(userMessage, systemPrompt);
    }

    clearHistory() {
        this.conversationHistory = [];
    }

    getHistory() {
        return this.conversationHistory;
    }
}

// ===================
// INTEGRATION WITH EXISTING APP
// ===================

// Initialize Claude client
let claudeClient;

function initializeClaudeAPI() {
    if (!CLAUDE_CONFIG.apiKey || CLAUDE_CONFIG.apiKey === 'YOUR_ANTHROPIC_API_KEY') {
        console.warn('⚠️ Claude API key not configured. Using mock responses.');
        return false;
    }

    try {
        claudeClient = new ClaudeAPIClient(CLAUDE_CONFIG.apiKey);
        console.log('✅ Claude API initialized');
        return true;
    } catch (error) {
        console.error('Failed to initialize Claude API:', error);
        return false;
    }
}

// Enhanced sendMessage function with Claude API
async function sendMessageWithClaude() {
    const text = userInput.value.trim();
    
    if (!text || AppState.isTyping) return;
    
    // Add user message
    addMessage(text, 'user');
    AppState.messageHistory.push({ role: 'user', content: text });
    
    // Clear input
    userInput.value = '';
    
    // Show typing indicator
    showTyping();
    
    try {
        // Check if Claude API is available
        if (claudeClient) {
            // Get response from Claude
            const response = await claudeClient.sendMessageWithAgent(
                text,
                AppState.currentAgent
            );
            
            removeTyping();
            addMessage(response, 'bot', AppState.currentAgent);
            AppState.messageHistory.push({ 
                role: 'bot', 
                content: response, 
                agent: AppState.currentAgent 
            });
        } else {
            // Fallback to mock responses
            setTimeout(() => {
                removeTyping();
                const response = generateResponse(text);
                addMessage(response, 'bot', AppState.currentAgent);
                AppState.messageHistory.push({ 
                    role: 'bot', 
                    content: response, 
                    agent: AppState.currentAgent 
                });
            }, 1500);
        }
    } catch (error) {
        removeTyping();
        addMessage(
            '⚠️ Sorry, I encountered an error processing your request. Please try again.',
            'bot'
        );
        console.error('Error:', error);
    }
}

// ===================
// PRODUCTION BACKEND PROXY (Recommended)
// ===================

/*
IMPORTANT: For production, create a backend proxy to secure your API key.

Example Node.js/Express backend:

// backend/server.js
const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

const app = express();
app.use(express.json());

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

app.post('/api/chat', async (req, res) => {
    try {
        const { message, agent, history } = req.body;
        
        // Get system prompt based on agent
        const systemPrompt = getAgentSystemPrompt(agent);
        
        // Build messages
        const messages = history.map(msg => ({
            role: msg.role,
            content: msg.content
        }));
        
        messages.push({
            role: 'user',
            content: message
        });
        
        // Call Claude API
        const response = await anthropic.messages.create({
            model: 'claude-sonnet-4-5-20250929',
            max_tokens: 1024,
            system: systemPrompt,
            messages: messages
        });
        
        res.json({
            response: response.content[0].text
        });
        
    } catch (error) {
        console.error('Claude API Error:', error);
        res.status(500).json({ error: 'Failed to get AI response' });
    }
});

app.listen(3000, () => {
    console.log('Backend running on port 3000');
});

// Then in your frontend:
async function sendMessageViaBackend(message) {
    const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: message,
            agent: AppState.currentAgent,
            history: AppState.messageHistory
        })
    });
    
    const data = await response.json();
    return data.response;
}
*/

// ===================
// ENHANCED FEATURES
// ===================

// Streaming responses (for better UX)
class ClaudeStreamingClient extends ClaudeAPIClient {
    async sendMessageStreaming(userMessage, systemPrompt = null, onChunk) {
        try {
            const messages = [
                ...this.conversationHistory,
                { role: 'user', content: userMessage }
            ];

            const response = await fetch(CLAUDE_CONFIG.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.apiKey,
                    'anthropic-version': '2023-06-01'
                },
                body: JSON.stringify({
                    model: CLAUDE_CONFIG.model,
                    max_tokens: CLAUDE_CONFIG.maxTokens,
                    system: systemPrompt || this.getDefaultSystemPrompt(),
                    messages: messages,
                    stream: true
                })
            });

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let fullResponse = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') continue;

                        try {
                            const parsed = JSON.parse(data);
                            if (parsed.delta?.text) {
                                fullResponse += parsed.delta.text;
                                onChunk(parsed.delta.text);
                            }
                        } catch (e) {
                            // Skip malformed JSON
                        }
                    }
                }
            }

            // Update history
            this.conversationHistory.push(
                { role: 'user', content: userMessage },
                { role: 'assistant', content: fullResponse }
            );

            return fullResponse;

        } catch (error) {
            console.error('Streaming Error:', error);
            throw error;
        }
    }
}

// Usage example with streaming
async function sendMessageWithStreaming() {
    const text = userInput.value.trim();
    if (!text || AppState.isTyping) return;

    addMessage(text, 'user');
    userInput.value = '';
    
    showTyping();
    
    // Create message container
    const messageDiv = document.createElement('div');
    messageDiv.className = 'flex gap-3 animate-fade-in-up';
    messageDiv.innerHTML = `
        <div class="w-9 h-9 rounded-full bg-gradient-to-br from-green-500/20 to-green-900/50 flex items-center justify-center border border-green-500/40 flex-shrink-0">
            <i class="fas fa-robot text-green-400"></i>
        </div>
        <div class="msg-bot p-4 rounded-r-2xl rounded-bl-2xl max-w-[85%] text-sm leading-relaxed text-gray-300 shadow-2xl border border-gray-800/50">
            <span id="streamingContent"></span><span class="typing-cursor"></span>
        </div>
    `;
    
    removeTyping();
    chatContainer.appendChild(messageDiv);
    scrollToBottom();
    
    const contentEl = document.getElementById('streamingContent');
    
    try {
        const streamingClient = new ClaudeStreamingClient(CLAUDE_CONFIG.apiKey);
        
        await streamingClient.sendMessageStreaming(
            text,
            streamingClient.getAgentSystemPrompt(AppState.currentAgent),
            (chunk) => {
                // Append each chunk
                contentEl.textContent += chunk;
                scrollToBottom();
            }
        );
        
        // Remove cursor after done
        document.querySelector('.typing-cursor')?.remove();
        
    } catch (error) {
        contentEl.textContent = '⚠️ Error: ' + error.message;
    }
}

// ===================
// RATE LIMITING & CACHING
// ===================

class RateLimiter {
    constructor(maxRequests, timeWindow) {
        this.maxRequests = maxRequests;
        this.timeWindow = timeWindow;
        this.requests = [];
    }

    async checkLimit() {
        const now = Date.now();
        
        // Remove old requests outside time window
        this.requests = this.requests.filter(
            time => now - time < this.timeWindow
        );
        
        if (this.requests.length >= this.maxRequests) {
            const oldestRequest = this.requests[0];
            const waitTime = this.timeWindow - (now - oldestRequest);
            
            throw new Error(
                `Rate limit exceeded. Please wait ${Math.ceil(waitTime / 1000)} seconds.`
            );
        }
        
        this.requests.push(now);
    }
}

// Usage
const rateLimiter = new RateLimiter(50, 60000); // 50 requests per minute

async function sendMessageWithRateLimit() {
    try {
        await rateLimiter.checkLimit();
        await sendMessageWithClaude();
    } catch (error) {
        addMessage(
            `⚠️ ${error.message}`,
            'bot'
        );
    }
}

// ===================
// INITIALIZATION
// ===================

// Add to your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    // ... existing initialization ...
    
    // Initialize Claude API if key is configured
    if (initializeClaudeAPI()) {
        // Replace existing sendMessage function
        window.sendMessage = sendMessageWithClaude;
        console.log('✅ Using Claude API for responses');
    } else {
        console.log('ℹ️ Using mock responses (Claude API not configured)');
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ClaudeAPIClient,
        ClaudeStreamingClient,
        RateLimiter,
        initializeClaudeAPI
    };
}

console.log('✅ Claude API Integration Module Loaded');
