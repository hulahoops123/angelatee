# Next Session: SEO & Search Engine Optimization

## Priority Tasks

### 1. Meta Tags & SEO Basics
- [ ] Add page titles to all pages (homepage, products, cart, contact)
- [ ] Add meta descriptions for each page
- [ ] Add Open Graph tags for social media sharing
- [ ] Add Twitter Card tags

### 2. Product SEO
- [ ] Fetch product metafields from Shopify (if set in Shopify admin)
- [ ] Add dynamic product page meta tags (title, description, OG image)
- [ ] Implement Product schema markup (JSON-LD) for rich snippets
- [ ] Show price, availability, ratings in Google search results

### 3. Sitemap & Robots.txt
- [ ] Configure sitemap to include dynamic product pages
- [ ] Customize robots.txt properly (allow/disallow rules)
- [ ] Add sitemap reference to robots.txt

### 4. Google Integration
- [ ] Set up Google Search Console
- [ ] Submit sitemap to GSC
- [ ] Verify site ownership
- [ ] Check for indexing issues

### 5. Analytics (Optional)
- [ ] Decide on analytics platform (Google Analytics, Plausible, etc.)
- [ ] Implement tracking
- [ ] Set up conversion goals

## Technical Notes
- Custom Nuxt storefront = we control ALL SEO (Shopify's metatags don't auto-apply)
- Need to fetch metafields from Shopify API if we want to use them
- Use `useSeoMeta()` and `useHead()` composables in Nuxt pages

---
**Created:** 2026-01-09
