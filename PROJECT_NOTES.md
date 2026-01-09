# Aligned Apparel - Project Documentation

**Domain:** alignedapparel.co.za
**Client:** Marina / Aligned Apparel (Owner: Angela Tee)
**Developer:** Jonathan @ Hulahoops Web Dev
**Project Type:** Nuxt 3 + Shopify Storefront E-commerce Site
**Last Updated:** 2026-01-09

---

## Project Overview

Aligned Apparel is a custom e-commerce storefront built with Nuxt 3 that integrates with Shopify's Storefront API. The site features a modern, animated design with a "high vibe" aesthetic using animated 3D particle effects (orbs), Google Fonts, and Tailwind CSS.

**Tagline:** "HIGH VIBE DRIP. WEAR YOUR TRUTH - For those bold enough to Talk it, Walk it & Wear it."

---

## Architecture Overview

### Hybrid Shopify + Custom Storefront Architecture

This is NOT a standard Shopify theme. It's a **headless e-commerce** setup:

**Custom Frontend (This Project)**
- Nuxt 3 static site hosted on Netlify
- Custom design, animations, and user experience
- Pulls product data from Shopify via Storefront API
- URL: https://alignedapparel.co.za

**Shopify Backend**
- Product catalog management
- Inventory tracking
- Hosted checkout (secure payment processing)
- Order management
- Customer data storage
- URL: Admin dashboard only (not public-facing)

**Why This Approach?**
- ✅ Full design control (not limited by Shopify themes)
- ✅ Better performance (static site generation)
- ✅ Custom animations and branding
- ✅ Still leverages Shopify's robust e-commerce features
- ✅ PCI-compliant payment processing via Shopify + Yoco

**Data Flow:**
```
alignedapparel.co.za (Nuxt/Netlify)
    ↓ (GraphQL API)
Shopify Storefront API (product data)
    ↓
User adds to cart locally (localStorage)
    ↓
Checkout button → redirects to Shopify
    ↓
Shopify Checkout (hosted by Shopify)
    ↓
Yoco Payment Processing
    ↓
Order confirmed → return to custom site
```

---

## Client Account Access

### Master Gmail Account
**Email:** alignedapparelsa@gmail.com
**Purpose:** Main business account - central hub for all services

**Connected Services:**
- Shopify Admin (login via Google SSO)
- Yoco payment processor (credit/debit card payments)
- Email notifications and account recovery
- Professional email forwarding (hello@alignedapparel.co.za → Gmail)

### Shopify (Backend Only)
**Login:** Via Gmail account above (Google Single Sign-On)
**Admin URL:** [Your Shopify Admin URL]
**Purpose:**
- Product management (add/edit/delete products)
- Inventory tracking
- Order management
- Payment settings configuration
- Shipping rules
- Customer data

⚠️ **Important:** Shopify does NOT host the website. It's only used as a backend for:
- Product catalog (via Storefront API)
- Checkout process (redirects to Shopify-hosted checkout)
- Order processing

### Yoco (Payment Processor)
**Login:** alignedapparelsa@gmail.com
**Purpose:** South African payment gateway
**Features:**
- Credit/debit card processing
- Secure payment handling
- Automatic payouts to linked bank account
- Transaction reporting

### Website Hosting
**Platform:** Netlify (managed by Hulahoops Web Dev)
**Custom Storefront:** Built with Nuxt 3, not hosted on Shopify
**Live URL:** https://alignedapparel.co.za

---

## What Client Can Manage (No Developer Needed)

### Via Shopify Admin
✅ **Products**
- Add/edit/delete products
- Update product titles, descriptions, prices
- Upload product images
- Manage inventory quantities
- Set sale prices (compare at prices)
- Add product variants (sizes, colors, etc.)

✅ **Orders**
- View and manage customer orders
- Process refunds
- Print packing slips
- Update order status
- Contact customers

✅ **Customers**
- View customer information
- Export customer data
- Send marketing emails (if enabled)

✅ **Settings**
- Payment settings (Yoco configuration)
- Shipping rates and rules
- Tax settings
- Notification email templates
- Store policies (return, privacy, terms)

### Via Yoco Dashboard
✅ **Payments**
- View transaction history
- Check payout status
- Generate reports
- Manage refunds

## What Requires Developer (Hulahoops Web Dev)

### Frontend Changes
❌ Website design/layout changes
❌ Adding new pages
❌ Modifying animations or styling
❌ Changing fonts or colors
❌ Updating hero images or graphics
❌ Adding new features (wishlist, reviews, etc.)
❌ Code updates or bug fixes

### Technical Updates
❌ Domain/DNS changes
❌ SSL certificate issues
❌ API connection problems
❌ Performance optimization
❌ SEO configuration changes
❌ Analytics setup/changes

**Important:** Product changes in Shopify automatically reflect on the website (typically within minutes). No developer needed for product catalog updates.

---

## Technology Stack

### Core Framework
- **Nuxt 3** (v3.15.4) - Vue.js meta-framework
- **Vue 3** - Composition API
- **TypeScript** - Type safety

### Styling & UI
- **Tailwind CSS** (v6.14.0) - Utility-first CSS
- **Custom CSS Animations** - 3D orb particle effects
- **Google Fonts** - Raleway, Staatliches, Clicker Script, Quintessential, Moon Dance
- **tailwind-scrollbar-hide** - Scrollbar management

### E-commerce Integration
- **Shopify Storefront API** (2023-04) - Product data & checkout
- **GraphQL** - API queries

### Additional Features
- **@nuxt/image** - Image optimization
- **@nuxtjs/sitemap** - SEO sitemap generation
- **@vueuse/nuxt** - Vue composition utilities
- **embla-carousel** - Product image carousel
- **photoswipe** - Image lightbox gallery

### Deployment & Hosting
- **Netlify** - Static site hosting (A records: 52.52.192.191, 13.52.188.95)
- **Cloudflare** - DNS management & email routing

---

## Project Structure

```
angelatee/
├── assets/
│   └── css/
│       └── global.css          # 3D orb animations, body styles
├── components/
│   ├── CartItem.vue            # Individual cart item display
│   ├── Footer.vue              # Site footer
│   ├── HeroSection.vue         # Hero with background image & CTA
│   ├── NavBar.vue              # Navigation with cart icon
│   ├── ProductImageCarousel.vue # Mobile product image carousel (Embla)
│   └── SizeChartModal.vue      # Size guide modal
├── composables/
│   ├── useCart.ts              # Cart state management (localStorage)
│   └── useShopify.ts           # Shopify API integration
├── layouts/
│   └── default.vue             # Main layout with 3D orb effects
├── pages/
│   ├── index.vue               # Homepage with product grid
│   ├── cart.vue                # Shopping cart page
│   ├── contact.vue             # Contact page
│   └── products/
│       └── [handle].vue        # Dynamic product detail page
├── public/
│   ├── favicon.ico             # Site favicon
│   └── images/
│       └── hero_optimized.webp # Hero section background image
├── nuxt.config.ts              # Nuxt configuration
├── tailwind.config.js          # Tailwind customization
├── sitemap.config.ts           # Sitemap configuration
└── package.json                # Dependencies
```

---

## Key Features

### 1. 3D Animated Background (Orb Effects)
- **Location:** `layouts/default.vue` + `assets/css/global.css`
- **Description:** Two-layer 3D particle animation system with 200 particles (100 per layer)
- **Colors:** Gradient from amber/gold (30-50° hue) to white/silver (grayscale)
- **Animation:** 60s infinite orbital rotation with preserve-3d transforms
- **Performance:** Uses CSS transforms and GPU acceleration

### 2. Shopify Integration
- **API Version:** 2023-04
- **Authentication:** Storefront Access Token
- **Features:**
  - Product listing (first 10 products)
  - Product variants (sizes: XS, S, M, L, XL, XXL, XXXL)
  - Stock availability checking
  - Compare at pricing (sale prices)
  - Multi-image support per product

### 3. Shopping Cart
- **Storage:** localStorage (`angeltees_cart` key)
- **Features:**
  - Add to cart with animation (particle flies to cart icon)
  - Quantity management (increment/decrement)
  - Automatic cart clearing when returning from Shopify checkout
  - Cart persistence across sessions
  - Real-time total calculation

### 4. Product Pages
- **Mobile:** Embla carousel for images
- **Desktop:** Stacked vertical image layout
- **Features:**
  - Size selection with availability checking
  - "Out of stock" tooltip on unavailable sizes
  - Size guide modal
  - Animated "Add to Cart" button with state feedback
  - Toast notifications
  - "View Cart" shortcut after adding items

### 5. Performance Optimizations
- **Google Fonts:** Preload & preconnect enabled
- **Hero Image:** Optimized WebP format (`hero_optimized.webp`)
- **Font Strategy:** `display: swap` to reduce FOUT (Flash of Unstyled Text)
- **Image Module:** Lazy loading via @nuxt/image

### 6. SEO Features
- **Sitemap:** Auto-generated at `https://alignedapparel.co.za/sitemap.xml`
- **Excluded Routes:** `/checkout-success`
- **Credits Disabled:** Clean sitemap output

---

## Custom Tailwind Configuration

### Extended Fonts
- `font-raleway` - Primary body font
- `font-staatliches` - Hero headings
- `font-clickerscript` - Decorative script
- `font-moondance` - Decorative cursive
- `font-quintessential` - Elegant serif

### Custom Animations
```js
animate-pulse-once      // Single pulse animation (0.4s)
animate-fade-bounce-3   // Fade in with bounce effect (1s)
animate-spin            // Standard spin (1s linear infinite)
animate-spin-reverse    // Reverse spin (1s linear infinite)
animate-subtle-celebrate // Celebration pulse (0.3s)
```

### Text Shadow Utilities
- `text-shadow-sm`, `text-shadow`, `text-shadow-lg`, `text-shadow-xl`, `text-shadow-2xl`
- Custom shadow values with rgba(0,0,0,0.5)

### Animation Control Utilities
- `.animation-running` / `.animation-paused`
- `.animation-normal` / `.animation-reverse`

### Plugins
- `tailwind-scrollbar-hide` - Hide scrollbars while keeping scroll functionality

---

## Environment Variables

Required environment variables (create `.env` file):

```bash
# Shopify Configuration
SHOPIFY_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=your-storefront-access-token
SHOPIFY_STORE_URL=https://your-store.myshopify.com
```

**How to get tokens:**
1. Log in to Shopify Admin
2. Settings → Apps and sales channels → Develop apps
3. Create a custom app with Storefront API access
4. Copy Storefront Access Token

---

## Recent Changes (Current Session)

Based on git status, the following changes were made:

### Modified Files
1. **assets/css/global.css** - Added 3D orb animation styles, layering system
2. **components/HeroSection.vue** - Updated hero background to use optimized WebP image
3. **components/ProductImageCarousel.vue** - Minor carousel improvements
4. **layouts/default.vue** - Integrated 3D orb animation layers
5. **pages/index.vue** - Product grid styling adjustments
6. **pages/products/[handle].vue** - Enhanced product page with size chart modal, improved variant handling
7. **tailwind.config.js** - Added custom animations and text shadow utilities
8. **package.json** - Dependency updates

### New Files
9. **EMAIL_SETUP.md** - Email configuration documentation
10. **components/SizeChartModal.vue** - New size guide modal component

### Key Improvements
- ✅ Optimized hero image for faster load times (WebP format)
- ✅ Added Google Fonts preloading to reduce FOUT
- ✅ Implemented multi-layer 3D particle animation system
- ✅ Added size chart modal for customer guidance
- ✅ Enhanced product variant selection UI

---

## Email Setup (Critical for Client)

### Overview
**Professional Email:** hello@alignedapparel.co.za (customer-facing)
**Master Gmail:** alignedapparelsa@gmail.com (backend management)

### Email Flow
```
Customer emails hello@alignedapparel.co.za
    ↓
Cloudflare Email Routing (receives)
    ↓
Forwards to alignedapparelsa@gmail.com
    ↓
Client reads & replies from Gmail
    ↓
Gmail "Send As" makes it appear from hello@alignedapparel.co.za
```

### Current Configuration

#### DNS Provider: Cloudflare
- **Migration:** Nameservers moved from Netlify to Cloudflare
- **A Records Preserved:** Still pointing to Netlify hosting
  - 52.52.192.191
  - 13.52.188.95
- **MX Records:** Added for Cloudflare Email Routing

#### Email Receiving: Cloudflare Email Routing (FREE)
- Receives emails sent to `hello@alignedapparel.co.za`
- Forwards to client's personal Gmail account
- ⚠️ **Limitation:** No SMTP sending capability on free tier

#### Email Sending: Gmail "Send As" Configuration
- Gmail configured to send emails as `hello@alignedapparel.co.za`
- **SMTP Settings:**
  - Server: `smtp.gmail.com`
  - Port: `587` (TLS)
  - Authentication: Gmail App Password (generated in Google Account settings)
- Set as default send address in Gmail

### Result
- ✅ Professional email address active
- ✅ Can send and receive from `hello@alignedapparel.co.za`
- ✅ No impact on Netlify hosting
- ⚠️ Emails show "via gmail.com" tag (removable with Google Workspace upgrade - optional paid upgrade)

### Next Steps for Client
1. **Update Shopify notification settings:**
   - Go to Shopify Admin → Settings → Notifications
   - Change "Sender email" to `hello@alignedapparel.co.za`
   - Update email templates if needed

2. **Test email flow:**
   - Send a test order confirmation
   - Verify receipt at Gmail
   - Reply from Gmail to ensure sending works

3. **Optional Upgrade (if "via gmail.com" is problematic):**
   - Google Workspace (paid) - Removes "via" tag and provides full email hosting

---

## Development Workflow

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
# Runs on http://localhost:4000
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Generate Static Site (for Netlify)
```bash
npm run generate
# Outputs to .output/public/
```

---

## Deployment Process

### Current Hosting: Netlify

1. **Build Command:** `npm run generate`
2. **Publish Directory:** `.output/public`
3. **Environment Variables:** Set in Netlify dashboard (Settings → Build & Deploy → Environment)
   - `SHOPIFY_DOMAIN`
   - `SHOPIFY_STOREFRONT_TOKEN`
   - `SHOPIFY_STORE_URL`

### DNS Configuration (Cloudflare)
- **Type:** A Records pointing to Netlify
- **Cloudflare Proxy:** Orange cloud enabled (proxied)
- **SSL/TLS:** Full (strict) recommended

### Post-Deployment Checklist
- [ ] Verify Shopify API connection
- [ ] Test product loading
- [ ] Test cart functionality
- [ ] Test checkout redirect to Shopify
- [ ] Verify sitemap generation (`/sitemap.xml`)
- [ ] Check Google Fonts loading
- [ ] Verify hero image loads (WebP support)
- [ ] Test email notifications (after Shopify update)

---

## Important Notes

### Cart Behavior
- Cart clears automatically when user returns from `myshopify.com` (checkout completion)
- Cart persists in localStorage across sessions until cleared

### Checkout Flow
1. User adds items to cart on custom storefront (alignedapparel.co.za)
2. Cart page provides "Checkout" button
3. Redirects to Shopify-hosted checkout (secure.myshopify.com)
4. Customer enters shipping/billing info on Shopify
5. Payment processed through Yoco (credit/debit card)
6. Order confirmation sent via Shopify (from hello@alignedapparel.co.za)
7. After purchase, customer returns to custom storefront
8. Cart auto-clears on return (detected via referrer)

**Payment Flow:**
- Payments processed by Yoco (South African payment gateway)
- Funds deposited to client's linked bank account
- Transaction management in Yoco dashboard

### Browser Compatibility
- Modern browsers with CSS Grid, Flexbox, and CSS transforms support
- WebP image support (fallback may be needed for older browsers)
- localStorage required for cart functionality

### Performance Considerations
- 3D orb animations use CSS transforms (GPU accelerated)
- 200 particle elements in DOM - monitor performance on low-end devices
- Consider adding reduced-motion media query for accessibility

---

## Troubleshooting

### Products Not Loading
- Check environment variables in Netlify
- Verify Shopify Storefront API token is valid
- Check browser console for GraphQL errors

### Cart Not Persisting
- Ensure localStorage is enabled in browser
- Check for privacy mode/incognito (localStorage may be restricted)

### Hero Image Not Displaying
- Verify `/public/images/hero_optimized.webp` exists
- Check file permissions
- Test WebP browser support

### Email Not Sending/Receiving
- Verify Cloudflare Email Routing is active
- Check Gmail "Send As" configuration
- Regenerate Gmail App Password if needed

---

## Pending Client Tasks

### Google Search Console Submission
- **Status:** Pending client approval
- **Purpose:** Get website indexed in Google search results
- **Action Required:** Once client confirms they're happy with site content
- **Next Steps:**
  1. Set up Google Search Console account
  2. Verify domain ownership
  3. Submit sitemap (https://alignedapparel.co.za/sitemap.xml)
  4. Request indexing for key pages

### Post-Launch Checklist
- [ ] Client walkthrough/training (if needed)
- [ ] Verify all Shopify products are displaying correctly
- [ ] Test full checkout flow with real payment
- [ ] Configure Shopify notification emails (use hello@alignedapparel.co.za)
- [ ] Set up Google Analytics (recommended)
- [ ] Submit to Google Search Console (when client approves)
- [ ] Test email notifications from Shopify

---

## Future Considerations

### Potential Improvements
- [ ] Add customer reviews/testimonials section
- [ ] Implement product search functionality
- [ ] Add filtering by size/price
- [ ] Create blog/content section
- [ ] Add newsletter signup
- [ ] Implement wishlist feature
- [ ] Add product zoom/lightbox on desktop
- [ ] Consider reducing particle count for better mobile performance
- [ ] Add `prefers-reduced-motion` support for orb animations
- [ ] Implement proper error boundaries for API failures

### Analytics & Marketing
- [ ] Set up Google Analytics 4
- [ ] Configure Facebook Pixel (if using Meta ads)
- [ ] Set up Google Tag Manager
- [ ] Implement conversion tracking

### SEO Enhancements
- [ ] Add meta descriptions to all pages
- [ ] Implement structured data (JSON-LD) for products
- [ ] Add Open Graph tags for social sharing
- [ ] Create robots.txt file

---

## Contact & Support

**Client Contact:** Marina (Primary), Angela Tee (Owner)
**Business Email:** hello@alignedapparel.co.za
**Business Gmail:** alignedapparelsa@gmail.com
**Website:** https://alignedapparel.co.za

**Developer:** Jonathan @ Hulahoops Web Dev

**Support Notes:**
- Site is live and handed over to client
- Custom-built Nuxt 3 storefront (not Shopify-hosted)
- Ongoing support available as needed

**Developer Notes:**
- All changes committed to git before push
- Project uses standard Nuxt 3 conventions
- Well-structured composables for cart and Shopify logic
- Clean component separation
- TypeScript enabled but with some `@ts-ignore` for flexibility

---

## File Change Summary (Pre-Push Status)

```
Modified:
 M assets/css/global.css
 M components/HeroSection.vue
 M components/ProductImageCarousel.vue
 M layouts/default.vue
 M package-lock.json
 M package.json
 M pages/index.vue
 M pages/products/[handle].vue
 M tailwind.config.js

Untracked:
 ?? EMAIL_SETUP.md
 ?? components/SizeChartModal.vue
```

**Total Changes:** ~295 insertions, ~44 deletions across 9 files

---

*Documentation generated 2026-01-09 before pushing final client feedback changes.*
