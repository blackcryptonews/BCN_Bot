# BCN AI Terminal - Official Brand Guide

## 🎨 Design System Overview

Your AI terminal now implements the **official BlackCryptoNews design system** - the same visual language used by elite fintech platforms like Stripe, Notion, and Bloomberg Terminal.

---

## 📐 Visual Foundation

### Color Palette (FINALIZED)

#### Primary Colors
```css
--onyx: #050505           /* Deep black background */
--electric-purple: #BD00FF /* Primary brand accent */
--cyber-blue: #00F0FF      /* Secondary brand accent */
```

#### Accent Colors
```css
--gold: #FFD700           /* Money moments & highlights */
--soft-silver: #C8C8C8    /* Body text & secondary elements */
```

#### Functional Colors
```css
--success: #00FF88        /* Positive data, gains */
--warning: #FFB800        /* Caution states */
--error: #FF3366          /* Negative data, losses */
```

### Color Usage Guidelines

**Electric Purple (#BD00FF)**
- Primary CTAs and buttons
- Active states
- Headlines and emphasis
- Primary glow effects
- Main brand moments

**Cyber Blue (#00F0FF)**
- Secondary CTAs
- Data highlights
- Hover states
- Complementary glow effects
- Technical elements

**Gold (#FFD700)**
- Money moments ONLY
- High-value notifications
- Premium features
- Special achievements
- Alpha signals

**Soft Silver (#C8C8C8)**
- Body text
- Secondary information
- Subtle UI elements
- Disabled states

---

## 📝 Typography Stack (Institutional Grade)

### Font Hierarchy

```css
/* Headlines & Titles */
font-family: 'Space Grotesk', sans-serif;
Use for: H1-H6, section titles, brand text

/* Data & Numbers */
font-family: 'Orbitron', monospace;
Use for: Prices, percentages, statistics, terminal commands, timestamps

/* Body & UI */
font-family: 'Inter', sans-serif;
Use for: Paragraphs, descriptions, labels, buttons, forms
```

### Font Weight Scale

```css
/* Space Grotesk */
400 - Regular (body headlines)
500 - Medium (section headers)
600 - Semibold (emphasis)
700 - Bold (primary headlines)

/* Orbitron */
400 - Regular (small data)
600 - Semibold (prices)
700 - Bold (large numbers)
800 - Extrabold (hero numbers)

/* Inter */
300 - Light (supporting text)
400 - Regular (body copy)
500 - Medium (labels)
600 - Semibold (buttons)
700 - Bold (emphasis)
```

### Type Scale
```css
H1: 2rem (32px) - Space Grotesk Bold
H2: 1.5rem (24px) - Space Grotesk Semibold
H3: 1.25rem (20px) - Space Grotesk Medium
H4: 1rem (16px) - Space Grotesk Medium
Body: 0.875rem (14px) - Inter Regular
Small: 0.75rem (12px) - Inter Regular
Tiny: 0.625rem (10px) - Inter Medium
```

---

## 🎭 Visual Effects

### Glow Effects (Premium Touch)

```css
/* Purple Glow - Primary elements */
box-shadow: 0 0 20px rgba(189, 0, 255, 0.3);
text-shadow: 0 0 20px rgba(189, 0, 255, 0.3);

/* Blue Glow - Secondary elements */
box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);

/* Gold Glow - Money moments */
box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
```

### Glass Morphism

```css
/* Premium glass effect */
background: rgba(5, 5, 5, 0.6);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

### Scanline Effect

```css
/* CRT terminal aesthetic */
background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.1) 1px,
    transparent 1px,
    transparent 2px
);
opacity: 0.3;
```

---

## 🎯 Component Styling

### Buttons

```css
/* Primary Button */
background: linear-gradient(135deg, #BD00FF, #00F0FF);
border: 2px solid #BD00FF;
box-shadow: 0 0 20px rgba(189, 0, 255, 0.3);
font-family: 'Inter', sans-serif;
font-weight: 600;

/* Secondary Button */
background: rgba(189, 0, 255, 0.1);
border: 2px solid rgba(189, 0, 255, 0.3);
color: #BD00FF;

/* Hover States */
transform: translateY(-2px);
box-shadow: 0 4px 30px rgba(189, 0, 255, 0.4);
```

### Input Fields

```css
background: rgba(5, 5, 5, 0.6);
backdrop-filter: blur(20px);
border: 2px solid rgba(189, 0, 255, 0.3);
font-family: 'Inter', sans-serif;
color: #FFFFFF;

/* Focus State */
border-color: #BD00FF;
box-shadow: 0 0 0 2px rgba(189, 0, 255, 0.3),
            0 0 30px rgba(189, 0, 255, 0.2);
```

### Cards

```css
background: linear-gradient(135deg, 
    rgba(0, 240, 255, 0.08), 
    rgba(255, 255, 255, 0.03)
);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 16px;
```

---

## 🎬 Animations

### Transitions
```css
/* Standard */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Premium */
transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

/* Fast */
transition: all 0.2s ease-out;
```

### Hover Effects
```css
/* Lift on hover */
transform: translateY(-4px) scale(1.02);

/* Glow on hover */
box-shadow: 0 8px 40px rgba(189, 0, 255, 0.4);

/* Color shift on hover */
filter: brightness(1.2);
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
@media (max-width: 640px) {   /* Small phones */
@media (max-width: 768px) {   /* Tablets */
@media (max-width: 1024px) {  /* Small laptops */
@media (min-width: 1280px) {  /* Desktop */
@media (min-width: 1536px) {  /* Large desktop */
```

---

## 🎨 Agent Color Coding

Each AI agent has a unique color scheme:

```javascript
general:     Electric Purple (#BD00FF)
whale:       Cyber Blue (#00F0FF)
technician:  Blue (#3B82F6)
sherlock:    Gold (#FFD700)
news:        Red (#EF4444)
defi:        Success Green (#00FF88)
```

---

## 🔧 Customization Guide

### Changing Primary Brand Color

Find and replace in `bcn-ai-terminal-branded.html`:

```css
:root {
    --electric-purple: #BD00FF; /* Change this */
}
```

Then update in `bcn-ai-terminal-branded.js`:

```javascript
BrandColors.purple.primary = '#YOUR_COLOR_HERE';
```

### Adding New Typography

Add font import in HTML `<head>`:

```html
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@400;600;700&display=swap');
```

Update CSS:

```css
.font-headline {
    font-family: 'YourFont', sans-serif;
}
```

### Custom Glow Color

```css
.custom-glow {
    box-shadow: 0 0 20px rgba(YOUR_R, YOUR_G, YOUR_B, 0.3),
                0 0 40px rgba(YOUR_R, YOUR_G, YOUR_B, 0.2);
}
```

### New Agent Theme

In JavaScript:

```javascript
AgentConfig.custom = {
    name: 'Custom Agent',
    icon: 'fa-star',
    color: 'orange',
    colorCode: '#FF6B00',
    description: 'Your custom agent'
};
```

In HTML, add button:

```html
<button onclick="activateAgent('custom')" class="agent-btn..." id="agent-custom">
    <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-900/20...">
        <i class="fas fa-star text-orange-400"></i>
    </div>
    <span>Custom</span>
</button>
```

---

## 💎 Premium Design Patterns

### Gradient Borders

```css
.gradient-border {
    position: relative;
}

.gradient-border::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(135deg, #BD00FF, #00F0FF);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, 
                  linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
}
```

### Animated Pulse

```css
@keyframes pulse-premium {
    0%, 100% { 
        opacity: 1; 
        box-shadow: 0 0 10px rgba(189, 0, 255, 0.3);
    }
    50% { 
        opacity: 0.5; 
        box-shadow: 0 0 20px rgba(189, 0, 255, 0.3);
    }
}

.status-pulse {
    animation: pulse-premium 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

---

## 📊 Data Visualization Colors

### Price Movement
```css
Positive: #00FF88 (Success Green)
Negative: #FF3366 (Error Red)
Neutral:  #C8C8C8 (Soft Silver)
```

### Market Sentiment
```css
Bullish:      #00FF88
Bearish:      #FF3366
Sideways:     #FFB800
High Volume:  #00F0FF
```

### Risk Levels
```css
Low:     #00FF88
Medium:  #BD00FF
High:    #FF3366
```

---

## 🎯 Best Practices

### DO ✅
- Use Space Grotesk for all headlines
- Use Orbitron for all numbers and data
- Use Inter for all body text
- Keep gradients subtle (10-20% opacity)
- Use gold sparingly for high-value moments
- Maintain 4.5:1 contrast ratio minimum
- Use backdrop-filter for glass effects
- Apply glow effects to important elements

### DON'T ❌
- Mix fonts within same category
- Overuse gold (reserve for money moments)
- Create busy gradients (keep it subtle)
- Ignore mobile breakpoints
- Skip loading states
- Use pure white (#FFFFFF) excessively
- Create low-contrast text
- Apply glow to everything

---

## 🚀 Performance Tips

### Optimize Fonts
```html
<!-- Preload critical fonts -->
<link rel="preload" href="path/to/font.woff2" as="font" type="font/woff2" crossorigin>
```

### Reduce Repaints
```css
/* Use transform instead of top/left */
transform: translateY(-4px);

/* Use opacity for fade effects */
opacity: 0.8;
```

### Optimize Animations
```css
/* GPU acceleration */
transform: translateZ(0);
will-change: transform;
```

---

## 📚 Design References

This design system draws inspiration from:

**Stripe** - Clean typography, minimal color palette
**Notion** - Subtle backgrounds, premium feel
**Bloomberg Terminal** - Data-focused, high contrast
**Cyberpunk 2077** - Neon accents, futuristic aesthetic
**Apple** - Attention to detail, smooth animations

---

## 🎓 Typography Hierarchy Examples

```html
<!-- Headline (Space Grotesk) -->
<h1 class="font-headline text-3xl font-bold text-white glow-purple">
    Bitcoin Analysis
</h1>

<!-- Data (Orbitron) -->
<div class="font-data text-2xl font-bold text-white">
    $64,231.45
</div>

<!-- Body (Inter) -->
<p class="font-body text-sm text-soft-silver">
    Market analysis indicates strong support at current levels.
</p>
```

---

## 🎨 Color Combination Examples

### Primary CTA
```css
background: linear-gradient(135deg, #BD00FF, #00F0FF);
color: #FFFFFF;
```

### Secondary Element
```css
background: rgba(189, 0, 255, 0.1);
border: 1px solid rgba(189, 0, 255, 0.3);
color: #BD00FF;
```

### Data Card
```css
background: rgba(0, 240, 255, 0.05);
border: 1px solid rgba(0, 240, 255, 0.2);
color: #C8C8C8;
```

### Alert/Highlight
```css
background: rgba(255, 215, 0, 0.1);
border: 1px solid rgba(255, 215, 0, 0.3);
color: #FFD700;
```

---

## 🔍 Quality Checklist

Before shipping:

- [ ] All headlines use Space Grotesk
- [ ] All numbers/data use Orbitron
- [ ] All body text uses Inter
- [ ] Purple/Blue gradient applied consistently
- [ ] Gold used only for money moments
- [ ] Proper contrast ratios (4.5:1 minimum)
- [ ] Responsive on mobile/tablet/desktop
- [ ] Smooth animations (60fps)
- [ ] Glass effects use backdrop-filter
- [ ] Loading states implemented
- [ ] Error states styled properly
- [ ] Hover effects smooth and consistent
- [ ] No font weight jumps on state changes
- [ ] Accessibility standards met

---

## 📖 Related Documentation

- `README.md` - Technical documentation
- `QUICKSTART.md` - Deployment guide
- `bcn-api-integration.js` - API integration
- `bcn-claude-integration.js` - AI integration

---

**Design System Version**: 1.0  
**Last Updated**: February 2026  
**Status**: Production Ready ✅

---

*This is the official BlackCryptoNews design system. Maintain consistency across all digital properties for maximum brand impact.*
