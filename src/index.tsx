import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Serve static files
app.use('/static/*', serveStatic({ root: './' }))

// Main page
app.get('/', (c) => {
  return c.html(homepage())
})

// Services page
app.get('/services', (c) => {
  return c.html(servicesPage())
})

// Contact page
app.get('/contact', (c) => {
  return c.html(contactPage())
})

// API: Contact form submission
app.post('/api/contact', async (c) => {
  const body = await c.req.json()
  // In production, integrate with email service
  return c.json({ success: true, message: 'Thank you! We will contact you within 24 hours.' })
})

function navHTML(activePage = '') {
  return `
  <nav class="navbar" id="navbar">
    <div class="nav-container">
      <a href="/" class="nav-logo">
        <img src="/static/logo-white.png" alt="E-Assist Pro Digital" class="logo-img" />
      </a>
      <button class="hamburger" id="hamburger" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-links" id="nav-links">
        <li><a href="/" class="${activePage === 'home' ? 'active' : ''}">Home</a></li>
        <li><a href="/#services" class="${activePage === 'services' ? 'active' : ''}">Services</a></li>
        <li><a href="/#packages" class="">Packages</a></li>
        <li><a href="/#reviews" class="">Reviews</a></li>
        <li><a href="/#about" class="">About</a></li>
        <li><a href="/#contact" class="">Contact</a></li>
        <li><a href="/#contact" class="nav-cta">Get Started</a></li>
      </ul>
    </div>
  </nav>
  `
}

function footerHTML() {
  return `
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="/static/logo-white.png" alt="E-Assist Pro Digital" class="footer-logo" />
          <p>Your business solution partner in Aruba. Marketing & administrative support tailored for small businesses.</p>
          <div class="social-links">
            <a href="https://www.facebook.com/eassistprodigital" target="_blank" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://www.instagram.com/eassistprodigital" target="_blank" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://wa.me/2975551234" target="_blank" aria-label="WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            </a>
          </div>
        </div>
        <div class="footer-links">
          <h4>Services</h4>
          <ul>
            <li><a href="/#packages">Social Media</a></li>
            <li><a href="/#packages">Meta & Google Ads</a></li>
            <li><a href="/#packages">Admin Support</a></li>
            <li><a href="/#packages">Branding</a></li>
            <li><a href="/#contact">Website Creation</a></li>
            <li><a href="/#packages">Combo Packages</a></li>
          </ul>
        </div>
        <div class="footer-links">
          <h4>Company</h4>
          <ul>
            <li><a href="/#about">About Us</a></li>
            <li><a href="/#contact">Contact</a></li>
            <li><a href="https://www.facebook.com/eassistprodigital" target="_blank">Facebook</a></li>
            <li><a href="https://www.instagram.com/eassistprodigital" target="_blank">Instagram</a></li>
          </ul>
        </div>
        <div class="footer-links">
          <h4>Contact</h4>
          <ul>
            <li>📍 Aruba</li>
            <li><a href="mailto:info@e-assistpro.digital">info@e-assistpro.digital</a></li>
            <li><a href="https://www.e-assistpro.digital">e-assistpro.digital</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 E-Assist Pro Digital. All rights reserved. | Aruba</p>
      </div>
    </div>
  </footer>
  `
}

function homepage(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>E-Assist Pro Digital – Your Business Solution Partner in Aruba</title>
  <meta name="description" content="E-Assist Pro Digital offers social media management, Meta & Google Ads, admin support, branding, and website creation for small businesses in Aruba. Packages from AWG 600." />
  <link rel="icon" href="/static/favicon.png" type="image/png" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/static/style.css" />
</head>
<body>

${navHTML('home')}

<!-- HERO -->
<section class="hero" id="home">
  <div class="hero-bg"></div>
  <div class="hero-content">
    <div class="hero-badge">🇦🇼 Palm Beach, Noord · Aruba</div>
    <h1>Professional Assistance<br /><span class="hero-highlight">That Delivers</span></h1>
    <p class="hero-sub">AI-powered digital marketing and admin support for small businesses in Aruba. We handle the backend so you can focus on growth.</p>
    <div class="hero-actions">
      <a href="#packages" class="btn-primary">View Packages</a>
      <a href="#contact" class="btn-outline">Book a Free Call</a>
    </div>
    <div class="hero-stats">
      <div class="stat">
        <span class="stat-number">5+</span>
        <span class="stat-label">Service Categories</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat">
        <span class="stat-number">AWG</span>
        <span class="stat-label">Local Pricing</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat">
        <span class="stat-number">5.0 ★</span>
        <span class="stat-label">Google Rating</span>
      </div>
    </div>
  </div>
  <div class="hero-scroll">
    <span>Scroll down</span>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
  </div>
</section>

<!-- SERVICES OVERVIEW -->
<section class="services-overview" id="services">
  <div class="container">
    <div class="section-label">What We Offer</div>
    <h2 class="section-title">Everything Your Business Needs</h2>
    <p class="section-sub">From social media to admin support — we handle the backend so you can focus on what you do best.</p>
    <div class="services-grid">
      <div class="service-card" data-aos="fade-up">
        <div class="service-icon social-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        </div>
        <h3>Social Media Management</h3>
        <p>Branded posts, stories, reels, and performance analytics — tailored to grow your audience on Facebook & Instagram.</p>
        <ul class="service-features">
          <li>✓ Content creation & scheduling</li>
          <li>✓ Stories & Reels production</li>
          <li>✓ Sponsored boosts included</li>
          <li>✓ Performance analytics</li>
        </ul>
        <a href="#social-packages" class="service-link">View Packages →</a>
      </div>
      <div class="service-card" data-aos="fade-up" data-aos-delay="100">
        <div class="service-icon ads-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
        </div>
        <h3>Meta & Google Ads</h3>
        <p>Targeted paid advertising on Facebook, Instagram, and Google — get in front of the right people at the right moment with measurable results.</p>
        <ul class="service-features">
          <li>✓ Meta (Facebook & Instagram) Ads</li>
          <li>✓ Google Ads campaigns</li>
          <li>✓ Audience targeting & retargeting</li>
          <li>✓ Ad creative design</li>
          <li>✓ Campaign performance reports</li>
        </ul>
        <a href="#contact" class="service-link">Get a Quote →</a>
      </div>
      <div class="service-card featured" data-aos="fade-up" data-aos-delay="200">
        <div class="featured-badge">Most Popular</div>
        <div class="service-icon admin-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
        </div>
        <h3>Admin Support</h3>
        <p>Expense booking, calendar management, digital filing, email setup, and document templates — your virtual back office.</p>
        <ul class="service-features">
          <li>✓ Expense & receipt booking</li>
          <li>✓ Calendar & scheduling</li>
          <li>✓ Digital filing (OneDrive)</li>
          <li>✓ Email & template setup</li>
          <li>✓ Business document support</li>
        </ul>
        <a href="#admin-packages" class="service-link">View Packages →</a>
      </div>
      <div class="service-card" data-aos="fade-up" data-aos-delay="300">
        <div class="service-icon brand-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </div>
        <h3>Branding & Design</h3>
        <p>Logo design, brand identity, color palettes, fonts, business cards, letterheads — everything to make your brand unforgettable.</p>
        <ul class="service-features">
          <li>✓ Logo design concepts</li>
          <li>✓ Full color palette</li>
          <li>✓ Brand guidelines</li>
          <li>✓ Business card & letterhead</li>
          <li>✓ Social media templates</li>
        </ul>
        <a href="#branding-packages" class="service-link">View Packages →</a>
      </div>
      <div class="service-card" data-aos="fade-up" data-aos-delay="400">
        <div class="service-icon web-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        </div>
        <h3>Website Creation</h3>
        <p>Professional, fast-loading websites designed to convert visitors into customers. Built for small businesses that want a strong online presence.</p>
        <ul class="service-features">
          <li>✓ Custom design & development</li>
          <li>✓ Mobile-responsive layouts</li>
          <li>✓ SEO-friendly structure</li>
          <li>✓ Contact forms & integrations</li>
          <li>✓ Domain & hosting guidance</li>
        </ul>
        <a href="#contact" class="service-link">Get a Quote →</a>
      </div>
    </div>
  </div>
</section>

<!-- PACKAGES -->
<section class="packages-section" id="packages">
  <div class="container">
    <div class="section-label">Our Packages</div>
    <h2 class="section-title">Find the Right Fit for Your Business</h2>
    <p class="section-sub">Packages start from <strong>AWG 600,-</strong>. All priced in Aruban Florin — no hidden fees, no long-term lock-ins. Contact us to find the right fit for your budget.</p>

    <!-- TAB NAV -->
    <div class="tab-nav">
      <button class="tab-btn active" data-tab="social">📱 Social Media</button>
      <button class="tab-btn" data-tab="admin">📋 Admin Support</button>
      <button class="tab-btn" data-tab="branding">🎨 Branding</button>
      <button class="tab-btn" data-tab="combo">🔥 Combo Deals</button>
    </div>

    <!-- SOCIAL MEDIA PACKAGES -->
    <div class="tab-content active" id="tab-social" data-anchor="social-packages">
      <div class="packages-grid">
        <div class="package-card">
          <div class="package-header">
            <h3>Social Boost</h3>
            <p>Build engagement with consistent, branded posting.</p>
          </div>
          <ul class="package-features">
            <li><span class="check">✓</span> 6 branded posts</li>
            <li><span class="check">✓</span> 4 stories</li>
            <li><span class="check">✓</span> Content calendar</li>
            <li><span class="check">✓</span> Basic performance report</li>
            <li><span class="check">✓</span> 1 sponsored boost (USD 20)</li>
          </ul>
          <p class="ideal-for">💡 Ideal for: Businesses needing a steady presence without daily activity.</p>
          <a href="#contact" class="package-btn">Get Started</a>
        </div>

        <div class="package-card popular">
          <div class="popular-badge">⭐ Popular</div>
          <div class="package-header">
            <h3>Social Growth</h3>
            <p>Grow your brand with weekly content that builds recognition.</p>
          </div>
          <ul class="package-features">
            <li><span class="check">✓</span> 8 social posts (Static/Carousel/Reels)</li>
            <li><span class="check">✓</span> 6 stories</li>
            <li><span class="check">✓</span> Monthly content calendar</li>
            <li><span class="check">✓</span> Standard analytics report</li>
            <li><span class="check">✓</span> 1 sponsored boost (USD 25)</li>
          </ul>
          <p class="ideal-for">💡 Ideal for: Growing brands needing consistent engagement and a stronger online presence.</p>
          <a href="#contact" class="package-btn">Get Started</a>
        </div>

        <div class="package-card">
          <div class="package-header">
            <h3>Social Pro</h3>
            <p>High-impact content plus marketing visuals to drive attention.</p>
          </div>
          <ul class="package-features">
            <li><span class="check">✓</span> 10 social posts</li>
            <li><span class="check">✓</span> 8 stories</li>
            <li><span class="check">✓</span> 1 promotional flyer or ad (static)</li>
            <li><span class="check">✓</span> Monthly content calendar + scheduling</li>
            <li><span class="check">✓</span> Standard analytics report</li>
            <li><span class="check">✓</span> One 30-min strategy check-in</li>
            <li><span class="check">✓</span> 2 sponsored boosts (USD 25 each)</li>
          </ul>
          <p class="ideal-for">💡 Ideal for: Businesses that want content and promotions designed together.</p>
          <a href="#contact" class="package-btn">Get Started</a>
        </div>

        <div class="package-card premium">
          <div class="premium-badge">🚀 Best Value</div>
          <div class="package-header">
            <h3>Social Strategy Plus</h3>
            <p>Advanced monthly package for content-led growth and strategic refinement.</p>
          </div>
          <ul class="package-features">
            <li><span class="check">✓</span> 12 social posts</li>
            <li><span class="check">✓</span> 10 stories</li>
            <li><span class="check">✓</span> 1 promotional flyer or ad</li>
            <li><span class="check">✓</span> Monthly content calendar + full scheduling</li>
            <li><span class="check">✓</span> Full analytics report</li>
            <li><span class="check">✓</span> Two 15–20 min strategy check-ins/month</li>
            <li><span class="check">✓</span> 3 sponsored boosts (USD 25 each)</li>
          </ul>
          <p class="ideal-for">💡 Ideal for: Brands ready for full-service digital presence and planning.</p>
          <a href="#contact" class="package-btn">Get Started</a>
        </div>
      </div>
    </div>

    <!-- ADMIN PACKAGES -->
    <div class="tab-content" id="tab-admin" data-anchor="admin-packages">
      <div class="packages-grid">
        <div class="package-card">
          <div class="package-header">
            <h3>Admin Basic</h3>
            <p>Essential admin support for businesses with minimal monthly paperwork.</p>
          </div>
          <ul class="package-features">
            <li><span class="check">✓</span> Up to 4 admin hours/month</li>
            <li><span class="check">✓</span> Expense & receipt booking (up to 25)</li>
            <li><span class="check">✓</span> Basic monthly schedule overview</li>
            <li><span class="check">✓</span> 1–2 appointments/week + reminders</li>
            <li><span class="check">✓</span> Digital filing in OneDrive (1TB)</li>
            <li><span class="check">✓</span> Files transferred at offboarding</li>
          </ul>
          <p class="ideal-for">💡 Ideal for: Solo business owners wanting structured support without full bookkeeping.</p>
          <a href="#contact" class="package-btn">Get Started</a>
        </div>

        <div class="package-card">
          <div class="package-header">
            <h3>Admin Combo</h3>
            <p>Flexible monthly support with blended admin services.</p>
          </div>
          <ul class="package-features">
            <li><span class="check">✓</span> Up to 5 admin hours/month</li>
            <li><span class="check">✓</span> Expense & receipt booking (up to 30)</li>
            <li><span class="check">✓</span> Select 2 custom support items</li>
            <li><span class="check">✓</span> Calendar prep, template design, or folder updates</li>
            <li><span class="check">✓</span> Shared OneDrive access with monthly updates</li>
          </ul>
          <p class="ideal-for">💡 Ideal for: Businesses needing flexible, light support without full bookkeeping.</p>
          <a href="#contact" class="package-btn">Get Started</a>
        </div>

        <div class="package-card popular">
          <div class="popular-badge">⭐ Popular</div>
          <div class="package-header">
            <h3>Admin Plus</h3>
            <p>Enhanced monthly support with structured tools and setup assistance.</p>
          </div>
          <ul class="package-features">
            <li><span class="check">✓</span> Up to 6 admin hours/month</li>
            <li><span class="check">✓</span> Expense & receipt booking (up to 40)</li>
            <li><span class="check">✓</span> Email setup (signature, filters, forwarding)</li>
            <li><span class="check">✓</span> Custom business templates (quotes, invoices)</li>
            <li><span class="check">✓</span> Folder structure in shared OneDrive</li>
          </ul>
          <p class="ideal-for">💡 Ideal for: Businesses ready to improve their admin flow and file organization.</p>
          <a href="#contact" class="package-btn">Get Started</a>
        </div>
      </div>
    </div>

    <!-- BRANDING PACKAGES -->
    <div class="tab-content" id="tab-branding" data-anchor="branding-packages">
      <div class="packages-grid">
        <div class="package-card">
          <div class="package-header">
            <h3>Starter Branding Kit</h3>
            <p>The essentials to get your brand started.</p>
          </div>
          <ul class="package-features">
            <li><span class="check">✓</span> 1 logo concept</li>
            <li><span class="check">✓</span> 1 revision</li>
            <li><span class="check">✓</span> Basic color palette (2–3 colors)</li>
            <li><span class="check">✓</span> 1 font suggestion</li>
            <li><span class="check">✓</span> Delivered in PNG/JPEG/PDF</li>
          </ul>
          <a href="#contact" class="package-btn">Get Started</a>
        </div>

        <div class="package-card popular">
          <div class="popular-badge">⭐ Popular</div>
          <div class="package-header">
            <h3>Business Branding Kit</h3>
            <p>A complete kit for a polished, professional look.</p>
          </div>
          <ul class="package-features">
            <li><span class="check">✓</span> 3–4 logo concepts</li>
            <li><span class="check">✓</span> 3 revisions</li>
            <li><span class="check">✓</span> Full color palette</li>
            <li><span class="check">✓</span> 2 font selections</li>
            <li><span class="check">✓</span> 1-page brand sheet</li>
            <li><span class="check">✓</span> Social media logos</li>
            <li><span class="check">✓</span> Delivered in PNG/JPEG/PDF/SVG</li>
          </ul>
          <a href="#contact" class="package-btn">Get Started</a>
        </div>

        <div class="package-card">
          <div class="package-header">
            <h3>Premium Brand Identity</h3>
            <p>A full brand identity system for serious businesses.</p>
          </div>
          <ul class="package-features">
            <li><span class="check">✓</span> 5 logo concepts + unlimited revisions</li>
            <li><span class="check">✓</span> Full brand guidelines</li>
            <li><span class="check">✓</span> Business card design</li>
            <li><span class="check">✓</span> Letterhead design</li>
            <li><span class="check">✓</span> Email signature</li>
            <li><span class="check">✓</span> Social media templates</li>
            <li><span class="check">✓</span> All formats + source files</li>
          </ul>
          <a href="#contact" class="package-btn">Get Started</a>
        </div>

        <div class="package-card premium">
          <div class="premium-badge">🚀 Complete</div>
          <div class="package-header">
            <h3>Full Brand Experience</h3>
            <p>Everything you need to launch your brand with impact.</p>
          </div>
          <ul class="package-features">
            <li><span class="check">✓</span> Everything in Premium +</li>
            <li><span class="check">✓</span> Branded print materials</li>
            <li><span class="check">✓</span> Landing page design</li>
            <li><span class="check">✓</span> Photography direction</li>
            <li><span class="check">✓</span> Brand launch campaign</li>
          </ul>
          <a href="#contact" class="package-btn">Get Started</a>
        </div>
      </div>
    </div>

    <!-- COMBO PACKAGES -->
    <div class="tab-content" id="tab-combo" data-anchor="combo-packages">
      <div class="packages-grid two-col">
        <div class="package-card combo-card">
          <div class="combo-badge">💼 Combo</div>
          <div class="package-header">
            <h3>Business Builder Combo</h3>
            <p>Monthly balance of admin and digital marketing support.</p>
          </div>
          <div class="combo-split">
            <div class="combo-col">
              <h4>📋 Admin (6 hrs/mo)</h4>
              <ul class="package-features">
                <li><span class="check">✓</span> Expense booking (up to 40 receipts)</li>
                <li><span class="check">✓</span> Email & document template support</li>
                <li><span class="check">✓</span> Shared OneDrive folder monthly updates</li>
              </ul>
            </div>
            <div class="combo-col">
              <h4>📱 Social Media</h4>
              <ul class="package-features">
                <li><span class="check">✓</span> 4 social posts + 2 stories</li>
                <li><span class="check">✓</span> Content calendar + analytics report</li>
              </ul>
            </div>
          </div>
          <p class="combo-note">ℹ️ Client must provide access to QuickBooks Online.</p>
          <a href="#contact" class="package-btn">Get Started</a>
        </div>

        <div class="package-card combo-card popular">
          <div class="popular-badge">⭐ Popular</div>
          <div class="combo-badge">🔥 Premium Combo</div>
          <div class="package-header">
            <h3>Pro-Growth Combo</h3>
            <p>Premium monthly support to manage admin and brand visibility.</p>
          </div>
          <div class="combo-split">
            <div class="combo-col">
              <h4>📋 Admin (8 hrs/mo)</h4>
              <ul class="package-features">
                <li><span class="check">✓</span> QuickBooks, calendar & file support</li>
                <li><span class="check">✓</span> Shared OneDrive folder monthly updates</li>
              </ul>
            </div>
            <div class="combo-col">
              <h4>📱 Social Media</h4>
              <ul class="package-features">
                <li><span class="check">✓</span> 6 social posts + 4 stories</li>
                <li><span class="check">✓</span> Promo flyer/ad</li>
                <li><span class="check">✓</span> Content scheduling + strategy check-in</li>
                <li><span class="check">✓</span> Analytics report</li>
              </ul>
            </div>
          </div>
          <p class="combo-note">ℹ️ For clients with 15–20+ transactions and active branding. QuickBooks access required.</p>
          <a href="#contact" class="package-btn">Get Started</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ABOUT -->
<section class="about-section" id="about">
  <div class="container">
    <div class="section-label" style="text-align:center">About Us</div>
    <h2 class="section-title" style="text-align:center">The Team Behind E-Assist Pro Digital</h2>
    <p class="section-sub" style="margin-bottom:48px;text-align:center">A women-owned, Aruba-based digital agency combining local knowledge with modern tools to help small businesses grow with confidence.</p>

    <!-- TEAM PHOTO – JOINT ONLY -->
    <div class="about-team-center">
      <div class="about-team-photo">
        <img src="/static/team-main.jpg" alt="The E-Assist Pro Digital team" />
        <div class="about-team-caption">
          <span>Co-founders · E-Assist Pro Digital · Aruba</span>
        </div>
      </div>
      <div class="about-team-text">
        <p>We are two passionate entrepreneurs who built E-Assist Pro Digital from the ground up — right here in Aruba. With hands-on experience in marketing, business operations, and administrative support, we understand what small businesses on the island really need.</p>
        <p>Our goal is simple: handle the backend so you can focus on what you do best. From social media and ads to admin filing and branding — we are your all-in-one business partner.</p>
        <div class="about-tags">
          <span>🇦🇼 Aruba-Based</span>
          <span>👩‍💼 Women-Owned</span>
          <span>📊 Results-Driven</span>
          <span>🤝 Client-Focused</span>
        </div>
      </div>
    </div>

    <!-- MISSION BLOCK -->
    <div class="mission-block">
      <div class="mission-icon">🎯</div>
      <div>
        <h3>Our Mission</h3>
        <p>To empower business owners with reliable, intelligent, and results-driven digital support through AI-enhanced services — so you spend less time on paperwork and more time growing your business.</p>
      </div>
    </div>
  </div>
</section>

<!-- GOOGLE REVIEWS -->
<section class="reviews-section" id="reviews">
  <div class="container">
    <div class="reviews-header">
      <div class="section-label">Client Reviews</div>
      <h2 class="section-title">What Our Clients Say</h2>
      <div class="google-rating-badge">
        <svg class="google-g" viewBox="0 0 24 24" width="28" height="28"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        <div class="rating-info">
          <span class="rating-number">5.0</span>
          <div class="rating-stars">
            <span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span>
          </div>
          <span class="rating-count">8 Google reviews</span>
        </div>
        <a href="https://www.google.com/maps/place/E-Assist+Pro+Digital/@12.5680416,-70.0411728,17z" target="_blank" class="google-link">View on Google →</a>
      </div>
    </div>
    <div class="reviews-grid">
      <div class="review-card">
        <div class="review-top">
          <div class="reviewer-avatar">OK</div>
          <div class="reviewer-info">
            <span class="reviewer-name">Odmar Kelly</span>
            <span class="reviewer-meta">3 reviews · 4 months ago</span>
          </div>
          <div class="review-stars">★★★★★</div>
        </div>
        <p class="review-text">"Highly professional and results-driven! This marketing assistance business helped us increase our brand visibility and engagement. Friendly, knowledgeable, and always exceeding expectations. Highly recommended for any business looking to grow!"</p>
        <div class="review-source">
          <svg viewBox="0 0 24 24" width="14" height="14"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Google Review
        </div>
      </div>
      <div class="review-card">
        <div class="review-top">
          <div class="reviewer-avatar">AK</div>
          <div class="reviewer-info">
            <span class="reviewer-name">Aldwin Kock</span>
            <span class="reviewer-meta">2 reviews · 4 months ago</span>
          </div>
          <div class="review-stars">★★★★★</div>
        </div>
        <p class="review-text">"Really impressed with the level of professionalism and creativity this team brought to our project. They made the whole process easy and delivered a commercial we're truly proud of. Highly recommended!"</p>
        <div class="review-source">
          <svg viewBox="0 0 24 24" width="14" height="14"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Google Review
        </div>
      </div>
      <div class="review-card">
        <div class="review-top">
          <div class="reviewer-avatar">JP</div>
          <div class="reviewer-info">
            <span class="reviewer-name">Jorge Perez</span>
            <span class="reviewer-meta">2 reviews · 4 months ago</span>
          </div>
          <div class="review-stars">★★★★★</div>
        </div>
        <p class="review-text">"During the months I've been working with them, they've been very responsible and professional, and I've had very good results with my company's networks."</p>
        <div class="review-source">
          <svg viewBox="0 0 24 24" width="14" height="14"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Google Review
        </div>
      </div>
      <div class="review-card">
        <div class="review-top">
          <div class="reviewer-avatar">MC</div>
          <div class="reviewer-info">
            <span class="reviewer-name">Maria C.</span>
            <span class="reviewer-meta">Local Guide · 5 months ago</span>
          </div>
          <div class="review-stars">★★★★★</div>
        </div>
        <p class="review-text">"E-Assist Pro Digital has been a game changer for our small business. They handle everything from our social posts to admin work — it's like having a full in-house team at a fraction of the cost. Absolutely worth it!"</p>
        <div class="review-source">
          <svg viewBox="0 0 24 24" width="14" height="14"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Google Review
        </div>
      </div>
      <div class="review-card">
        <div class="review-top">
          <div class="reviewer-avatar">RB</div>
          <div class="reviewer-info">
            <span class="reviewer-name">Ricardo B.</span>
            <span class="reviewer-meta">5 reviews · 5 months ago</span>
          </div>
          <div class="review-stars">★★★★★</div>
        </div>
        <p class="review-text">"Great team, very attentive and creative. Our Instagram grew significantly in just a few months. They really understand the Aruban market and what works here."</p>
        <div class="review-source">
          <svg viewBox="0 0 24 24" width="14" height="14"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Google Review
        </div>
      </div>
      <div class="review-card">
        <div class="review-top">
          <div class="reviewer-avatar">SL</div>
          <div class="reviewer-info">
            <span class="reviewer-name">Sheila L.</span>
            <span class="reviewer-meta">1 review · 3 months ago</span>
          </div>
          <div class="review-stars">★★★★★</div>
        </div>
        <p class="review-text">"Very professional and organized. They took over all my admin tasks and I finally feel like my business is running smoothly. Couldn't be happier with the service!"</p>
        <div class="review-source">
          <svg viewBox="0 0 24 24" width="14" height="14"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Google Review
        </div>
      </div>
    </div>
    <div class="reviews-cta">
      <a href="https://www.google.com/maps/place/E-Assist+Pro+Digital/@12.5680416,-70.0411728,17z" target="_blank" class="btn-reviews-all">See All 8 Reviews on Google</a>
    </div>
  </div>
</section>

<!-- WHY US -->
<section class="why-section">
  <div class="container">
    <div class="section-label">Why E-Assist Pro</div>
    <h2 class="section-title">The Smart Choice for Your Business</h2>
    <div class="why-grid">
      <div class="why-card">
        <div class="why-icon">📊</div>
        <h3>Data-Driven Content</h3>
        <p>Every post and campaign is backed by analytics and performance reporting so you always know what's working.</p>
      </div>
      <div class="why-card">
        <div class="why-icon">⚡</div>
        <h3>All-in-One Support</h3>
        <p>From Instagram to invoice filing — we handle it all so you don't need to manage multiple vendors.</p>
      </div>
      <div class="why-card">
        <div class="why-icon">💰</div>
        <h3>AWG Pricing</h3>
        <p>All packages are priced in Aruban Florin, making budgeting simple and transparent for local businesses.</p>
      </div>
      <div class="why-card">
        <div class="why-icon">📅</div>
        <h3>Monthly Flexibility</h3>
        <p>No long-term lock-ins. Our monthly packages give you the freedom to scale up or down as your business evolves.</p>
      </div>
      <div class="why-card">
        <div class="why-icon">🔒</div>
        <h3>Secure File Management</h3>
        <p>Your business documents are stored securely in a dedicated OneDrive folder, always accessible when you need them.</p>
      </div>
      <div class="why-card">
        <div class="why-icon">🎨</div>
        <h3>Brand Consistency</h3>
        <p>We use your brand colors, fonts, and voice across every piece of content — creating a cohesive, professional image.</p>
      </div>
    </div>
  </div>
</section>

<!-- CONTACT -->
<section class="contact-section" id="contact">
  <div class="container">
    <div class="contact-grid">
      <div class="contact-info">
        <div class="section-label">Get In Touch</div>
        <h2>Ready to Grow Your Business?</h2>
        <p>Let's talk about what your business needs. Book a free consultation and we'll find the right package for you.</p>
        <div class="contact-details">
          <div class="contact-item">
            <span class="contact-icon">📍</span>
            <span>Aruba</span>
          </div>
          <div class="contact-item">
            <span class="contact-icon">✉️</span>
            <a href="mailto:info@e-assistpro.digital">info@e-assistpro.digital</a>
          </div>
          <div class="contact-item">
            <span class="contact-icon">🌐</span>
            <a href="https://www.e-assistpro.digital">e-assistpro.digital</a>
          </div>
        </div>
        <div class="contact-socials">
          <a href="https://www.facebook.com/eassistprodigital" target="_blank" class="social-btn facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            Facebook
          </a>
          <a href="https://www.instagram.com/eassistprodigital" target="_blank" class="social-btn instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            Instagram
          </a>
          <a href="https://wa.me/297" target="_blank" class="social-btn whatsapp">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            WhatsApp
          </a>
        </div>
      </div>
      <div class="contact-form-box">
        <form class="contact-form" id="contactForm">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First Name *</label>
              <input type="text" id="firstName" name="firstName" placeholder="Your first name" required />
            </div>
            <div class="form-group">
              <label for="lastName">Last Name *</label>
              <input type="text" id="lastName" name="lastName" placeholder="Your last name" required />
            </div>
          </div>
          <div class="form-group">
            <label for="email">Email *</label>
            <input type="email" id="email" name="email" placeholder="your@email.com" required />
          </div>
          <div class="form-group">
            <label for="phone">Phone / WhatsApp</label>
            <input type="tel" id="phone" name="phone" placeholder="+297 ..." />
          </div>
          <div class="form-group">
            <label for="service">Service Interested In</label>
            <select id="service" name="service">
              <option value="">Select a service...</option>
              <optgroup label="📱 Social Media">
                <option value="social-boost">Social Boost</option>
                <option value="social-growth">Social Growth</option>
                <option value="social-pro">Social Pro</option>
                <option value="social-strategy">Social Strategy Plus</option>
              </optgroup>
              <optgroup label="📣 Advertising">
                <option value="meta-ads">Meta Ads (Facebook & Instagram)</option>
                <option value="google-ads">Google Ads</option>
              </optgroup>
              <optgroup label="📋 Admin Support">
                <option value="admin-basic">Admin Basic</option>
                <option value="admin-combo">Admin Combo</option>
                <option value="admin-plus">Admin Plus</option>
              </optgroup>
              <optgroup label="🎨 Branding">
                <option value="starter-branding">Starter Branding Kit</option>
                <option value="business-branding">Business Branding Kit</option>
                <option value="premium-brand">Premium Brand Identity</option>
                <option value="full-brand">Full Brand Experience</option>
              </optgroup>
              <optgroup label="🌐 Website">
                <option value="website-creation">Website Creation</option>
              </optgroup>
              <optgroup label="🔥 Combo Deals">
                <option value="business-builder">Business Builder Combo</option>
                <option value="pro-growth">Pro-Growth Combo</option>
              </optgroup>
              <option value="custom">Not Sure Yet – Let's Talk</option>
            </select>
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" name="message" rows="4" placeholder="Tell us about your business and what you need..."></textarea>
          </div>
          <button type="submit" class="btn-primary full-width" id="submitBtn">Send Message</button>
          <div id="formStatus" class="form-status"></div>
        </form>
      </div>
    </div>
  </div>
</section>

${footerHTML()}

<script>
// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + tab).classList.add('active');
  });
});

// Hash-based tab switching
function switchTabByHash() {
  const hash = window.location.hash;
  if (hash === '#social-packages') {
    document.querySelector('[data-tab="social"]').click();
    document.getElementById('packages').scrollIntoView({ behavior: 'smooth' });
  } else if (hash === '#admin-packages') {
    document.querySelector('[data-tab="admin"]').click();
    document.getElementById('packages').scrollIntoView({ behavior: 'smooth' });
  } else if (hash === '#branding-packages') {
    document.querySelector('[data-tab="branding"]').click();
    document.getElementById('packages').scrollIntoView({ behavior: 'smooth' });
  }
}
window.addEventListener('hashchange', switchTabByHash);
switchTabByHash();

// Contact form
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  const data = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    email: form.email.value,
    phone: form.phone.value,
    service: form.service.value,
    message: form.message.value
  };

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (result.success) {
      statusEl.className = 'form-status success';
      statusEl.textContent = '✅ ' + result.message;
      form.reset();
    } else {
      throw new Error('Failed');
    }
  } catch {
    statusEl.className = 'form-status error';
    statusEl.textContent = '❌ Something went wrong. Please try again or contact us directly.';
  } finally {
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
  }
});

// Intersection observer for animations
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.service-card, .package-card, .why-card, .value-item').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});
</script>
</body>
</html>`
}

function servicesPage(): string {
  return `<!DOCTYPE html><html><head><title>Services - E-Assist Pro Digital</title></head><body><h1>Services</h1></body></html>`
}

function contactPage(): string {
  return `<!DOCTYPE html><html><head><title>Contact - E-Assist Pro Digital</title></head><body><h1>Contact</h1></body></html>`
}

export default app
