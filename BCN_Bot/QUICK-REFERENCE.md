# BCN AI Terminal - Developer Quick Reference

## 🎨 Brand Colors (Copy-Paste Ready)

```css
/* Primary */
#BD00FF  /* Electric Purple - Main brand */
#00F0FF  /* Cyber Blue - Secondary */
#050505  /* Onyx - Background */

/* Accents */
#FFD700  /* Gold - Money moments */
#C8C8C8  /* Soft Silver - Text */

/* Functional */
#00FF88  /* Success - Gains */
#FF3366  /* Error - Losses */
#FFB800  /* Warning */
```

---

## 📝 Typography

```css
/* Space Grotesk - Headlines */
font-family: 'Space Grotesk', sans-serif;

/* Orbitron - Data */
font-family: 'Orbitron', monospace;

/* Inter - Body */
font-family: 'Inter', sans-serif;
```

---

## 🎯 Quick Commands

```bash
# Deploy
1. Upload bcn-ai-terminal-branded.html
2. Upload bcn-ai-terminal-branded.js
3. Access in browser

# Embed
<iframe src="bcn-ai-terminal-branded.html" 
        style="width:100%;height:600px;border:none;"></iframe>

# Test locally
Open bcn-ai-terminal-branded.html in browser
```

---

## 🔧 Common Customizations

### Change Primary Color
```css
/* In HTML */
:root {
    --electric-purple: #YOUR_COLOR;
}

/* In JS */
BrandColors.purple.primary = '#YOUR_COLOR';
```

### Add New Agent
```javascript
// In bcn-ai-terminal-branded.js
AgentConfig.custom = {
    name: 'Custom Agent',
    icon: 'fa-star',
    color: 'orange',
    colorCode: '#FF6B00',
    description: 'Description'
};
```

### Adjust Font Sizes
```css
.font-headline { font-size: 2rem; }    /* 32px */
.font-data { font-size: 1.5rem; }      /* 24px */
.font-body { font-size: 0.875rem; }    /* 14px */
```

---

## 🎨 Glow Effect Templates

```css
/* Purple Glow */
box-shadow: 0 0 20px rgba(189, 0, 255, 0.3);

/* Blue Glow */
box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);

/* Gold Glow */
box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);

/* Dual Glow */
box-shadow: 0 0 20px rgba(189, 0, 255, 0.3),
            0 0 40px rgba(0, 240, 255, 0.2);
```

---

## 🎭 Glass Effect Template

```css
.glass-premium {
    background: rgba(5, 5, 5, 0.6);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

## 🔄 Animation Templates

```css
/* Standard Transition */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Hover Lift */
transform: translateY(-4px) scale(1.02);

/* Pulse */
@keyframes pulse-premium {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}
```

---

## 📱 Breakpoints

```css
/* Mobile */
@media (max-width: 640px) { }

/* Tablet */
@media (max-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }
```

---

## 🎯 Agent Colors

```javascript
general:     #BD00FF  // Purple
whale:       #00F0FF  // Cyan
technician:  #3B82F6  // Blue
sherlock:    #FFD700  // Gold
news:        #EF4444  // Red
defi:        #00FF88  // Green
```

---

## 🔌 API Integration

```javascript
// Add real data (Option 1: Client-side)
<script src="bcn-api-integration.js"></script>
<script>initializeAPIs();</script>

// Add AI responses (Option 2: Backend)
// See bcn-claude-integration.js
```

---

## 📊 Component Patterns

### Button
```html
<button class="glass-premium border-2 border-purple-500 
               rounded-xl px-6 py-3 font-body font-semibold
               hover:scale-105 transition-all">
    Click Me
</button>
```

### Input
```html
<input class="glass-premium border-2 border-purple-900/50
              rounded-xl px-4 py-3 font-body
              focus:border-purple-500 transition-all" />
```

### Card
```html
<div class="glass-premium border border-white/10 
            rounded-2xl p-4">
    Content
</div>
```

---

## 🐛 Debug Mode

```javascript
// In browser console
console.log(AppState);        // Check state
console.log(BrandColors);     // Check colors
console.log(AgentConfig);     // Check agents
```

---

## ⚡ Performance Tips

```css
/* GPU Acceleration */
transform: translateZ(0);
will-change: transform;

/* Optimize Blur */
backdrop-filter: blur(20px);  /* Not too high */

/* Reduce Repaints */
transform: translateY(-4px);  /* Instead of top: -4px */
```

---

## 🎨 Brand Compliance Checklist

- [ ] Using Space Grotesk for headlines
- [ ] Using Orbitron for numbers/data
- [ ] Using Inter for body text
- [ ] Purple (#BD00FF) as primary
- [ ] Blue (#00F0FF) as secondary
- [ ] Gold (#FFD700) only for money moments
- [ ] Glass effects use backdrop-filter
- [ ] Glow effects on important elements
- [ ] Smooth animations (60fps)
- [ ] Responsive on all devices

---

## 📁 File Structure

```
/your-site/
├── bcn-ai-terminal-branded.html    [Main file]
├── bcn-ai-terminal-branded.js      [Logic]
├── bcn-api-integration.js          [Optional]
├── bcn-claude-integration.js       [Optional]
├── BRAND-GUIDE.md                  [Reference]
└── README.md                       [Docs]
```

---

## 🚀 Deploy Checklist

- [ ] Upload HTML file
- [ ] Upload JS file
- [ ] Test on mobile
- [ ] Test on desktop
- [ ] Check all agent buttons
- [ ] Test commands (/price, /help)
- [ ] Verify ticker animates
- [ ] Check input focus state
- [ ] Test message sending
- [ ] Verify responsive design

---

## 💡 Pro Tips

1. **Keep it simple** - Don't add too many custom colors
2. **Test mobile first** - 60% of users are mobile
3. **Use gold sparingly** - Only for high-value moments
4. **Monitor performance** - Keep animations at 60fps
5. **Stay consistent** - Use the design system
6. **Document changes** - Update BRAND-GUIDE.md

---

## 🆘 Common Issues

### Ticker not animating
```javascript
// Check in console
console.log(AppState.cryptoData);
// Should show array of coin data
```

### Fonts not loading
```html
<!-- Add to <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
```

### Colors not showing
```css
/* Check CSS variables are defined */
:root {
    --electric-purple: #BD00FF;
}
```

### Messages not sending
```javascript
// Check input element exists
console.log(document.getElementById('userInput'));
```

---

## 📞 Support Resources

- `BRAND-GUIDE.md` - Complete design system
- `README.md` - Technical documentation
- `QUICKSTART.md` - 5-minute deployment
- `TRANSFORMATION.md` - Before/after comparison

---

## 🎯 Key Metrics to Track

```javascript
// Analytics events to track
- chat_message_sent
- agent_switched
- command_used
- user_session_duration
- mobile_vs_desktop_usage
```

---

## 🔗 CDN Resources

```html
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Font Awesome -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
```

---

## 🎨 Quick Color Picker

**Need to match a color?**
- Primary action: `#BD00FF`
- Secondary action: `#00F0FF`
- Success state: `#00FF88`
- Error state: `#FF3366`
- Warning state: `#FFB800`
- Neutral text: `#C8C8C8`
- Background: `#050505`

---

## ⌨️ Keyboard Shortcuts

```
Ctrl/Cmd + K  → Focus input
Escape        → Clear input
Enter         → Send message
```

---

## 🎬 Animation Timing

```javascript
Fast:     150-200ms  // Micro-interactions
Standard: 300ms      // Normal transitions
Premium:  400ms      // Smooth, polished
Slow:     600ms      // Dramatic effects
```

---

**Keep this file handy for quick reference!**

Version 1.0 | Last Updated: February 2026
