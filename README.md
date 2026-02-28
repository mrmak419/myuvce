
# MyUVCE - Modern Student Portal

The next generation of [myuvce.in](https://www.myuvce.in), rebuilt from the ground up using **Next.js 15**, **Tailwind CSS**, and the **Blogger API**.

## 🚀 Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v3
- **Icons:** Lucide React (Strict: No emojis in UI)
- **Deployment:** Cloudflare Pages (Edge Runtime)
- **Source Data:** Blogger API v3

## 🛠️ Getting Started

1. **Clone the repo:**
   ```bash
   git clone [https://github.com/mrmak419/myuvce.git](https://github.com/mrmak419/myuvce.git)
   cd myuvce

```

2. **Install dependencies:**
```bash
npm install

```


3. **Environment Variables:**
Create a `.env.local` file in the root directory. Ask @mrmak419 for the API keys.
```env
BLOGGER_BLOG_ID=your_id
BLOGGER_API_KEY=your_key

```


4. **Run Development Server:**
```bash
npm run dev

```



## 📐 Project Structure

* `/app`: App router pages and layouts.
* `/components`: Reusable UI components.
* `/lib`: API logic and helper functions.
* `/types`: TypeScript interfaces.

## 🤝 Contribution Guidelines

* **UI Consistency:** Use Lucide icons for all interactive elements.
* **Styling:** Follow the existing Tailwind patterns. Use `prose` classes for content rendering.
* **Workflow:** Create a new branch for every feature. Open a Pull Request (PR) to `main` for review.
* **Dark Mode:** Ensure all components are tested with `dark:` utility classes.


Built with ❤️ by the UVCE '29 Batch.

