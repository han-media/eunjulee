# Eun Ju Lee Gallery

A simple, static personal site: a home page (currently just "Still
under construction"), a My Art page with alternating photo/story rows,
a "jump to" guide, and scroll fade-ins, and an About Me page.

No build tools, frameworks, or installs required — it's plain HTML,
CSS, and JavaScript, which makes it a good fit for free hosting on
GitHub Pages.

## File structure

```
index.html               Home page ("Still under construction")
my-art.html               My Art
about.html                About Me

css/style.css              All site styling

js/main.js                 Nav, scroll fade-ins, and the shared
                            story-list renderer (guide + rows + photo
                            cross-fade) used by My Art
js/art-data.js              ← My Art content lives here
js/render-art.js            Loads art-data.js onto my-art.html

images/art/                 My Art photos
images/about/                About Me portrait
```

Every image is currently a placeholder that says "Replace this
placeholder" — swap in real photos before you publish, keeping the
same filenames (or update the paths in the relevant HTML/JS file if
you rename them).

## Site structure

The nav is flat: **Home**, **My Art**, **About Me**, and a **Related**
dropdown in the top right (not a link itself — it opens a small menu;
currently holds one placeholder link, edit or add more inside
`site-nav__related-panel` in each HTML file).

## Adding your own content

**Home page:** currently just the "Still under construction" line in
`index.html`, inside `<section class="under-construction">`. Replace
that whenever the site is ready to launch — a hero photo, an
introduction, links to your other pages, whatever fits. (The rest of
this site's styling — like the hero/parallax treatment other pages
here use — can act as a starting point if you want a similar look.)

**My Art:** open `js/art-data.js`. Each entry is one piece:

```js
{
  images: ["images/art/piece-01.jpg"],
  alt: "A description of the piece, for accessibility",
  meta: "Medium, Year",
  title: "Piece title",
  text: "The story behind the piece.",
},
```

To add a new one: drop your photo into `images/art/`, copy one of
these blocks, paste it into the list, and update the fields. It
appears on the page automatically — alternating sides with the entry
before it, added to the "Jump to" guide, and fading in as visitors
scroll to it. No HTML editing required.

Photos display in a square frame and are never cropped — a tall or
wide photo just shows in full with a little breathing room on the
sides rather than filling every corner of the square.

**Cross-fading photos:** `images` takes a list, not a single filename.
Give an entry 2–3 photos instead of 1 and they'll cross-fade into each
other automatically, about every 4 seconds, staggered so multiple
entries on the page don't change at the same moment.

**About Me:** edit `about.html` directly — replace
`images/about/portrait.jpg` with a photo and rewrite the bio
paragraphs in `<div class="about-layout__body">`.

## The "Jump to" guide

My Art has a guide listing every piece's title. On desktop it's a
sidebar on the left; on mobile it collapses into a small floating
button in the bottom-right corner that stays put as you scroll, so you
can jump to any section from anywhere on the page — tap it to open the
list, tap a title to go there.

Clicking a title scrolls straight to that piece and briefly darkens it
so it's easy to spot when it lands, whichever direction the jump goes.
The guide also highlights whichever piece is currently in view as you
scroll past it, including snapping to the last one once you reach the
bottom of the page.

## Your name and email

A find-and-replace across the HTML files handles these:

- `Eun Ju Lee` / `Eun Ju Lee Gallery` → your name (as it should read in
  the nav, footer, and page titles)
- `you@example.com` → your email address

## Previewing locally

Open `index.html` directly in a browser, or, for the most accurate
preview (some browsers restrict local file access), run a tiny local
server from this folder:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

## Publishing with GitHub Pages

1. Create a new repository on GitHub (e.g. `your-username.github.io` for a
   root domain, or any name like `my-site` for a project site).
2. Upload all the files in this folder to that repository, keeping the
   folder structure intact.
3. In the repository, go to **Settings → Pages**.
4. Under "Build and deployment," set **Source** to "Deploy from a branch,"
   choose the `main` branch and the `/ (root)` folder, then save.
5. GitHub will give you a URL (usually within a minute or two) — that's
   your live site.

Whenever you want to add new content, edit the relevant file as
described above, commit, and push — GitHub Pages updates automatically
within a minute or so.
