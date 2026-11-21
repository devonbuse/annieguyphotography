# Annie Guy Photography: website setup guide

**What this is:** a fast static photography site with a slow-fading photo slideshow, galleries, a blog, and
contact options on every page. Annie edits it from her phone at `yoursite/admin`.
Hosting is free on Cloudflare Pages, and the content is stored in a free GitHub repo.

**How updates work:** Annie opens `/admin` on her phone, adds photos or a post, and taps Save. The editor
saves the change to GitHub, and Cloudflare rebuilds the live site automatically in about 1–3 minutes.

Cost: $0. A custom domain (e.g. annieguyphotography.com) is optional, about $10–15 a year.

---

## 1. Put the code on GitHub
1. Create a free GitHub account **for Annie**, so she owns her site.
2. Create a new **private** repo called `annieguyphotography`.
3. Upload this folder (everything except `node_modules`, `dist`, `.astro`):
   ```bash
   git init && git add . && git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/USERNAME/annieguyphotography.git
   git push -u origin main
   ```

## 2. Change two settings
- `public/admin/config.yml`: set `repo: USERNAME/annieguyphotography`, plus `site_url` and `display_url`.
- `astro.config.mjs`: set `site:` to the real address.

## 3. Host it free on Cloudflare Pages
1. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git** and pick the repo.
2. Framework preset: **Astro**. Build command: `npm run build`. Output directory: `dist`.
3. Deploy. The site will be at something like `https://annieguyphotography.pages.dev`.
4. Optional: use the **Custom domains** tab to connect a domain she buys.

## 4. Set up Annie's phone (about 5 minutes)
1. On her phone, go to `https://<site>/admin`.
2. Tap **Sign In with Token**. The dialog links to GitHub with the right permissions already selected
   (Contents: read & write). Generate the token, copy it, and paste it in.
3. In Safari or Chrome, tap **Share → Add to Home Screen** so the editor opens like an app.

Tokens expire. When that happens, she makes a new one the same way.
*Optional, no tokens:* deploy the free Sveltia CMS Authenticator (https://github.com/sveltia/sveltia-cms-auth)
on Cloudflare Workers and set `base_url:` in `public/admin/config.yml` to its address.

## 5. Turn on lead capture (important)
In **Site Settings** on her phone:
- **Phone.** When filled in, "Call" buttons appear in the mobile contact bar, the "Let's connect" section, the contact page, and the footer.
- **Contact form → her Google Form.** The form on the site keeps the site's look, and every inquiry goes into
  her Google Form's responses and its linked Sheet. One-time setup (about 10 minutes, easiest on a computer):
  1. Go to https://forms.new and create a form called "Website inquiries" with these **5 short-answer questions**:
     Name, Email, Phone, Session type, Message.
     - Use **Short answer** for every one, including Session type. A Dropdown would reject any answer
       that doesn't exactly match its options.
     - Leave them all **not required**. The website already requires name and email, and a required
       question left blank makes Google discard the whole entry.
  2. Click **⋮ (top right) → Get pre-filled link**. Type these exact placeholder answers:
     `NAME`, `EMAIL`, `PHONE`, `SESSION`, `MESSAGE` → **Get link** → **Copy link**.
  3. Paste that link into **Site Settings → Google Form pre-filled link** and Save.
     (It must be the long docs.google.com link, not a forms.gle short link.)
  4. In the Google Form: **Responses → ⋮ → Get email notifications for new responses**.
     Optional: **Link to Sheets** to keep a running lead list.
  5. Send yourself a test message from the live site and check that it shows up under Responses.

  If the link is missing or can't be read, the form spots show "Message on Facebook" instead, so no visitor hits a dead end.
  **One limitation:** Google doesn't confirm to the website that an entry was saved. Visitors see
  "Thank you" as long as the message left their browser. That's why the test in step 5 matters, and why
  a recheck makes sense any time the Google Form is edited.

Where visitors can reach her (nothing pops up on its own):
- A **Book** button in the header on every page.
- **View galleries** and **Let's connect** buttons on the home page photo, visible before scrolling.
- A **Let's connect** section with a short form and call link at the bottom of every page.
- On phones, a small **Call | Message | Inquire** bar slides in after scrolling.
  It hides itself when the form is already on screen.

---

## Annie's cheat sheet
- **New gallery:** Galleries → New → Title → Category → Cover photo → **Photos** (tap once and select
  as many as you want from the camera roll) → **Save**. The date fills in automatically.
- **New blog post:** Blog → New → Title → write a few lines → optionally add **Photos** → **Save**.
  The date and the preview text for Google/Facebook fill in automatically.
- **Home page slideshow:** Site Settings → *Home page slideshow photos*. 3–6 photos is ideal.
  Each one shows for 7 seconds and then fades slowly into the next.
- **The round buttons under the slideshow** (Seniors, Sportraits…) are in Site Settings, and each one opens that gallery category.
- **Packages & prices, "How it works" steps:** Site Settings. Changes show up everywhere on the site, including the form's session-type list.
- **Client reviews:** Site Settings → *Kind words*. The section stays hidden until the first review is added.
- **Hide something without deleting it:** turn on "Hide for now".
- Uploads shrink automatically: in testing, 2–10 MB phone photos saved at about 450–860 KB.
- Changes appear on the live site in 1–3 minutes.

## Before launch
- Replace the 12 placeholder photos (`sample-01.jpg` to `sample-12.jpg`) and delete the 3 sample galleries and the sample post.
- Paste in the Google Form pre-filled link (step 5). Email is set to annielynnpotter@gmail.com; the phone is intentionally left blank for now.
- Check the wording on the home page and About section. It came from her Pixieset site.

---

## Speed: what was tested and how
Tested with Lighthouse 13 against the built site. Hero slideshow photos were real phone photos
(iPhone and Nokia, 3–10 MB originals), shrunk the same way her uploads will be.

| | Performance score | Hero photo on screen (LCP) |
|---|---|---|
| Phone, simulated slow 4G + budget phone | 98–99 | 2.0–2.4 s |
| Desktop | 97–100 | 0.6–1.3 s |

Accessibility, SEO, and best-practice scores are 100 on every page.

**The test conditions are deliberately harsh.** Lighthouse's phone test simulates a budget Android on a
slow 4G connection. On that setting, the hero photo lands at 2.0–2.4 s (Google rates under 2.5 s as
"good"). Text and buttons appear at about 0.6 s. Typical phones on LTE or Wi-Fi should load faster,
but that hasn't been measured on a live deployment yet. After launch, run the live address through
https://pagespeed.web.dev to get real numbers.

How it's kept fast:
- Only the first slideshow photo loads at first. The other slides wait until the page has finished loading.
- Phones get a portrait crop of each slide (about 90–100 KB) instead of a large landscape file.
  The crop centers on the interesting part of the photo.
- Every image is resized into several sizes, and only the size the screen needs is downloaded. Below-the-fold photos load as you scroll.
- The fonts are self-hosted and trimmed (about 53 KB in total), and page styles are built into the page itself.
- Images and fonts are cached for a year (`public/_headers`).

## Limits to know about
- A GitHub repo is comfortable up to about 1 GB, which is roughly 1,000–2,000 uploaded photos.
  This site is for her portfolio; keep using Pixieset to deliver full client galleries.
- Cloudflare Pages free plan: 500 builds a month (each Save is one build).
- Builds get slower as the number of photos grows.

## Local development
```bash
npm install
npm run dev     # http://localhost:4321
npm run build   # outputs to dist/
```
