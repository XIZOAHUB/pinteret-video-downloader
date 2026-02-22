# 📌 PinSave — Pinterest Video Downloader
### ☁️ Built for Cloudflare Pages (Free Hosting)

> Free Pinterest video, GIF & image downloader — 100% serverless on Cloudflare's global edge network.

---

## 📁 Project Structure

```
pinsave-cloudflare/
├── functions/
│   └── api/
│       ├── download.js    ← POST /api/download  (media extraction)
│       ├── proxy.js       ← GET  /api/proxy     (file streaming)
│       └── health.js      ← GET  /api/health    (status check)
├── public/
│   ├── index.html         ← Frontend (single file, fully self-contained)
│   ├── _headers           ← Cloudflare security & cache headers
│   ├── _redirects         ← URL routing rules
│   ├── robots.txt         ← SEO
│   └── sitemap.xml        ← SEO
├── wrangler.toml          ← Cloudflare config
└── .gitignore
```

**Cloudflare Pages Functions** = serverless backend (no Node.js server needed!)  
Everything runs on Cloudflare's global edge — ultra fast, free tier is very generous.

---

## 🚀 Deploy to Cloudflare Pages (Step-by-Step)

### Method 1: GitHub + Cloudflare Dashboard (Recommended)

**Step 1 — Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit: PinSave Pinterest Downloader"
git branch -M main
git remote add origin https://github.com/YOURUSERNAME/pinsave.git
git push -u origin main
```

**Step 2 — Connect to Cloudflare Pages**
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Click **Workers & Pages** → **Create application** → **Pages**
3. Click **Connect to Git** → Select your GitHub repo
4. Configure build settings:
   - **Framework preset:** `None`
   - **Build command:** *(leave empty)*
   - **Build output directory:** `public`
5. Click **Save and Deploy** ✅

Your site will be live at: `https://pinsave.pages.dev` (or your custom domain)

---

### Method 2: Wrangler CLI (Advanced)

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
wrangler pages deploy public --project-name=pinsave
```

---

## 🌐 Add Custom Domain

1. In Cloudflare Pages → Your Project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain (e.g., `pinsave.com`)
4. Follow the DNS instructions (if domain is on Cloudflare, it's automatic!)

---

## ⚙️ How It Works (Cloudflare Pages Functions)

Unlike traditional servers, this project uses **Cloudflare Pages Functions** which run as edge workers:

| File | Route | Method | What it does |
|------|-------|--------|-------------|
| `functions/api/download.js` | `/api/download` | POST | Fetches Pinterest page, extracts video/image URLs |
| `functions/api/proxy.js` | `/api/proxy` | GET | Proxies Pinterest CDN files to trigger download |
| `functions/api/health.js` | `/api/health` | GET | Health check endpoint |

No servers to manage. No cold starts. Free for millions of requests/month!

---

## 📈 SEO Checklist (To Rank on Google)

After deploying, do these to rank for "Pinterest video downloader":

- [ ] Replace `yourdomain.com` in `public/index.html` (canonical URL, OG tags)
- [ ] Replace `yourdomain.com` in `public/sitemap.xml`
- [ ] Add Google Search Console → submit sitemap
- [ ] Add an OG image at `/og-image.jpg` (1200×630px)
- [ ] Set up Cloudflare Analytics (free) to track traffic
- [ ] Share on Reddit r/webdev, Product Hunt, Twitter for backlinks

---

## 🆓 Cloudflare Pages Free Tier Limits

| Resource | Free Limit |
|----------|-----------|
| Requests/month | 100,000 |
| Bandwidth | Unlimited |
| Functions invocations | 100,000/day |
| Build minutes | 500/month |
| Custom domains | Unlimited |

More than enough to start. Upgrade only if you get massive traffic.

---

## ⚠️ Legal

For personal use only. Respect copyright and Pinterest ToS. Not affiliated with Pinterest, Inc.

---

<p align="center">⭐ Star this repo if it helped you!</p>
