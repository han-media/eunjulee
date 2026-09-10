// ============================================================
// Renders artStories (from art-data.js) onto my-art.html
// using the shared renderStoryList() in main.js
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
  if (typeof artStories === "undefined") return;
  renderStoryList("story-list", "story-guide", artStories, {
    guideLabel: "Jump to a piece",
  });
});
