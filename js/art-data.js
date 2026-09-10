// ============================================================
// MY ART — content data
//
// HOW TO ADD A NEW PIECE:
// 1. Add your photo(s) to /images/art/  (e.g. piece-03.jpg)
// 2. Copy one of the objects below and paste it into the array
// 3. Update images, alt, meta, title, and text
// 4. Save — the new entry appears on the page automatically:
//    it alternates sides, gets added to the "Jump to" guide, and
//    fades in as visitors scroll to it.
//
// "images" is a list, not a single photo — give it 1 photo for a
// still image, or 2–3 photos to have them cross-fade into each
// other automatically every few seconds.
//
// "meta" is a short line above the title — medium and/or date
// work well (e.g. "Oil on canvas — 2024").
// ============================================================

const artStories = [
  {
    images: [
      "images/art/piece-01.jpg",
      "images/art/piece-01b.jpg",
      "images/art/piece-01c.jpg",
    ],
    alt: "Replace with a description of this piece for screen readers",
    meta: "Medium, Year",
    title: "Piece title goes here",
    text: "Write about this piece — what it is, what went into making it, and what it means to you. A few sentences is plenty; let the image carry the rest.",
  },
  {
    images: ["images/art/piece-02.jpg"],
    alt: "Replace with a description of this piece for screen readers",
    meta: "Medium, Year",
    title: "Piece title goes here",
    text: "Write about this piece — what it is, what went into making it, and what it means to you. A few sentences is plenty; let the image carry the rest.",
  },
];
