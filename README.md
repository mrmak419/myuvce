# MyUVCE

The next generation of [myuvce.in](https://myuvce.in), rebuilt from the ground up to be the ultimate digital infrastructure for UVCE students. Engineered for speed and reliability, this platform utilizes a static MDX architecture and aggressive edge caching to deliver study materials, campus utilities, and updates—even on a spotty BMTC bus connection.

##  Architecture & Tech Stack

* **Framework:** Next.js 15 (App Router)
* **Styling:** Tailwind CSS v3 & `next-themes` (Dark Mode)
* **PWA & Offline:** `@ducanh2912/next-pwa` (Stale-While-Revalidate caching)
* **Icons:** Lucide React
* **Deployment:** Cloudflare Pages (Edge Runtime)
* **Content Delivery:** Pure `.mdx` local architecture
* **Analytics:** Google Analytics 4 (Async Injected)

##  Core Features

* **Offline-First Map:** The campus directory and UI shell are cached via Service Workers for zero-network availability.
* **Zero-Download Document Viewer:** Custom React components routing Google Drive streams via native secure iframes.
* **Markdown CMS:** Fast, statically generated blog and resource pages using modern `.mdx` parsing.
* **Edge Routing:** Cloudflare `_redirects` and Next.js `next.config.ts` mapping to preserve legacy SEO.

## Getting Started

1. **Clone the repo:**
```bash
git clone [https://github.com/mrmak419/myuvce.git](https://github.com/mrmak419/myuvce.git)
cd myuvce

```

2. **Install dependencies:**

```bash
npm install

```

3. **Run Development Server:**

```bash
npm run dev

```

## Project Structure

* `/app`: App router pages, layouts, SEO metadata, and PWA manifest injection.
* `/components`: Reusable Tailwind UI components.
* `/content`: Local `.mdx` files for campus updates, posts, and guides.
* `/lib`: MDX parsing logic and core utilities.
* `/public`: Static assets, PWA icons, offline fallback UI, and `robots.txt`.

---

Built with ❤️ by the **UVCE '29 Batch**.


