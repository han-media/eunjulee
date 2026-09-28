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
    images: ["images/art/IMG_0875.jpg"],
    alt: "Courtyard Entrance",
    title: "Courtyard Entrance",
    text: "Test",
  },
  {
    images: ["images/art/IMG_0874.jpg"],
    alt: "Scene of Rocky Valley",
    title: "Scene of Rocky Valley",
    text: "Test",
  },
  {
    images: ["images/art/IMG_0870.jpg"],
    alt: "Landscape of Woods",
    title: "Landscape of Woods",
    text: "Test",
  },
  {
    images: ["images/art/IMG_0868.jpg"],
    alt: "Childhood at Sunset Beach",
    title: "Childhood at Sunset Beach",
    text: "Test",
  },
  {
    images: ["images/art/IMG_0866.jpg"],
    alt: "A Girl on a Stormy Beach",
    title: "A Girl on a Stormy Beach",
    text: "Test",
  },
  {
    images: ["images/art/IMG_0857.jpg"],
    alt: "(Birch Tree in Woods)",
    title: "숲속의 자작나무 (Birch Tree in Woods)",
    text: "미국 플로리다로 이민 온 후 한국의 해질녘 숲을 뗘올리며 이 그림을 그렸습니다. 솔나무 숲속에 한 그루의 하얀 자작나무는 고향 땅을 떠올리게 합니다. 평화로 왔던 숲속에 새소리와 솔잎 바람소리들이 들리는 것 같습니다. 작가는 평온한 해질녘의 숲속을 오롯이 이 그림 속에 담고자 하였습니다. 이 그림은 붓과 나이프를 사용하여 그림의 생생함을 담고자 하였으며, 마음속의 고향에 대한 그리움을 표현하고자 하였습니다.",
  },
  {
    images: ["images/art/IMG_0859.jpg"],
    alt: "Moss-covered big tree in Sunlit Forest",
    title: "햇살에 비친 이끼낀 고목 (Moss-Covered Big Tree in Sunlit Forest)",
    text: "숲속에 이끼가 덮인 고목은 세월의 고독함과 시련을 견디며 서 있습니다. 작가는 숲속에서 마주한 이끼 낀 고목이 주는 설렘과 그 그리움이 짙은 햇살을 맞아 생생하게 다시 살아나는 순간을 표현하고자 했습니다. 생생한 나무 숲 사이로 새어 나온 햇살은 고독한 이끼 낀 고목을 생생히 비추며, 여린 새 나뭇가지는 고목나무의 새로운 시작의 설렘을 표현합니다. 나이프를 이용하여 숲의 생생함을 표현하고자 하였습니다.",
  },
    {
    images: ["images/art/IMG_0860.jpg"],
    alt: "Landscape of a Pebbled Riverbed",
    title: "자갈 강변의 풍경 (Landscape of a Pebbled Riverbed)",
    text: "어릴 적 고향 강변에서 뛰어놀던 기억을 떠올리며 이 그림을 그렸습니다. 자그마한 물고기들이 숨어 있는 돌들을 들추며 웃으며 놀던 그 시절이 떠오릅니다. 가을녘의 강변은 자갈들로 덮여 이젠 쓸쓸하게 보이지만 작가의 동심 속의 그 강변은 물고기를 잡으며 뛰어놀던 아름다운 추억으로 가득 차 있습니다. 가을의 시골 강변의 고요함은 작가의 추억을 회상하게 하며 지친 마음을 위로하게 합니다. 이 그림은 붓터치를 이용하여 고요함과 그리움을 표현하고자 하였습니다.",
  },
    {
    images: ["images/art/IMG_0861.jpg"],
    alt: "눈 덮인 산의 일출 (Sunrise in the Winter Mountains)",
    title: "눈 덮인 산의 일출 (Sunrise in the Winter Mountains)",
    text: "멀리 높은 눈 덮인 산 위로 떠오르는 해살은  이어진 눈 덮인 언덕 사이를 흐르는 강물을 발갛게 물들입니다. 작가는 겨울산의 해돋이를 생생하게 표현하며 시골 고향의 겨울날의 그리움을 표현하고자 하였습니다. 눈 덮인 산속과 흐르는 강물은 새로운 일출을 맞아 얼어붙은 겨울날의 추억을 떠올리게 합니다. 작가는 붓터치를 이용하여 겨울날의 해돋이 잔상을 생생하게 표현하고자 하였습니다.",
  },
    {
    images: ["images/art/IMG_0863.jpg"],
    alt: "겨울의 잔상 (Winter Image)",
    title: "겨울의 잔상 (Winter Image)",
    text: "눈 덮인 시골 고향의 겨울을 떠올리며 이 그림을 그렸습니다. 발이 푹푹 빠지며 걸었던 시골 고향의 겨울, 이 그림은 추웠던 그 시절의 혹독한 기억들을 떠올리게 합니다. 앙상한 겨울 나무들은 외로이 겨울의 추위를 견디며 서 있습니다, 고향의 겨울은 너무나 추웠습니다. 발목까지 빠지며 걸었던 그날의 겨울은 이제 그리운 겨울 추억의 잔상이 되어 남아 있습니다. 작가는 붓터치를 이용하여 세밀하게 그 겨울을 화폭에 담아 보고자 하였습니다.",
  },
];
