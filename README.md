# Mahmud Patwary (MP) — Premium 3D Portfolio

A cinematic, 3D animated personal website for **Mahmud Patwary** — Programmer, Web Developer & Graphics Designer from Dhaka, Bangladesh.

Built with **React + Vite + Tailwind CSS + Three.js + Framer Motion**.

The build output is **one single `index.html` file**. All code and styles are inside it, so it works on **any** host and **any** URL path (`username.github.io/any-repo-name/`) without extra configuration.

---

## 🚀 Deploy — choose ONE method

### ✅ Method 1 — Automatic GitHub Pages (recommended)

The site rebuilds and publishes itself every time you push.

1. Create a new repository on GitHub (for example `Mahmud-Patwary_M.P`).
2. Upload **all files of this project** to the repository (including the hidden `.github` folder).
   ```bash
   git init
   git add .
   git commit -m "Premium 3D portfolio"
   git branch -M main
   git remote add origin https://github.com/HlMahmud763/YOUR-REPO-NAME.git
   git push -u origin main
   ```
3. On GitHub, open **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **GitHub Actions**.
5. Open the **Actions** tab and wait about 1–2 minutes for the green ✔.
6. Your site is live at:
   `https://hlmahmud763.github.io/YOUR-REPO-NAME/`

After that, **every push to `main` updates the site automatically.**

> If the first run failed because Pages was not enabled yet, go to **Actions → Deploy to GitHub Pages → Run workflow**.

---

### ⚡ Method 2 — Upload one file (no tools needed)

1. Build once on your computer: `npm install` then `npm run build`
   *(or download the ready `index.html` from the latest Actions run artifact)*.
2. Take the file **`dist/index.html`**.
3. Upload that single file to any repo → **Settings → Pages → Source: Deploy from a branch → `main` / root**.

This also works on **Netlify Drop** (drag and drop at https://app.netlify.com/drop), **Vercel**, cPanel hosting, or Google Drive or any static host.

---

### ▲ Method 3 — Netlify / Vercel (connect the repo)

| Setting           | Value           |
| ----------------- | --------------- |
| Build command     | `npm run build` |
| Output directory  | `dist`          |
| Node version      | 18 or 20        |

---

## 💻 Run locally

```bash
npm install
npm run dev       # development server → http://localhost:5173
npm run build     # production build → dist/index.html
npm run preview   # preview the production build
```

---

## ✏️ Edit your content

Text, links and images are in **one file**:

```
src/data/content.ts
```

- `site` → name, email, WhatsApp, location, availability, social links
- `projects`, `liveWebsites` → portfolio and live website cards
- `graphics` → calligraphy designs
- `certificates`, `achievements`, `about`

Images load from the original repo:
`https://raw.githubusercontent.com/HlMahmud763/Mahmud-Patwary_M.P/main/...`
To change an image, upload the new one to that repo, or put it inside the `public/` folder and use `"./your-image.jpg"`.

---

## 🇧🇩 বাংলায় সহজ নির্দেশনা

**সবচেয়ে সহজ উপায় (অটোমেটিক):**

1. GitHub-এ একটি নতুন repository বানান।
2. এই প্রজেক্টের **সব ফাইল** (লুকানো `.github` ফোল্ডারসহ) সেখানে আপলোড/push করুন।
3. Repository → **Settings → Pages** এ যান।
4. **Source** থেকে **GitHub Actions** সিলেক্ট করুন।
5. **Actions** ট্যাবে ১–২ মিনিট অপেক্ষা করুন। সবুজ ✔ দেখালে কাজ শেষ।
6. আপনার ওয়েবসাইট লাইভ: `https://hlmahmud763.github.io/রিপোর-নাম/`

এরপর যেকোনো পরিবর্তন push করলে ওয়েবসাইট **নিজে থেকেই আপডেট** হবে।

**আরও সহজ উপায় (একটি ফাইল):**
`npm run build` চালালে `dist/index.html` নামে **একটি মাত্র ফাইল** তৈরি হবে। পুরো ওয়েবসাইট এই এক ফাইলের ভিতরে আছে। এটা যেকোনো GitHub repo-তে বা Netlify Drop-এ আপলোড করলেই ওয়েবসাইট চালু হয়ে যাবে।

**কন্টেন্ট পরিবর্তন:** নাম, ইমেইল, লিংক, ছবি সব `src/data/content.ts` ফাইলে আছে।

---

© 2026 Mahmud Patwary (MP). All Rights Reserved.
