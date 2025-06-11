export const PRODUCTS = [
  {
    id: "1",
    name: "Classic White Shirt",
    price: 79,
    brand: "Ralph Lauren",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop",
    inStock: true,
  },
  {
    id: "2",
    name: "Slim Fit Chinos",
    price: 89,
    brand: "Banana Republic",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop",
    inStock: true,
  },
  {
    id: "3",
    name: "Leather Watch",
    price: 199,
    brand: "Fossil",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&h=500&fit=crop",
    inStock: false,
  },
  {
    id: "4",
    name: "Oxford Shoes",
    price: 159,
    brand: "Allen Edmonds",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=500&fit=crop",
    inStock: true,
  },
  {
    id: "5",
    name: "Wool Tie",
    price: 65,
    brand: "Brooks Brothers",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=500&fit=crop",
    inStock: true,
  },
];

export const LOOKS = [
  {
    id: "1",
    title: "Business Professional",
    creator: "Michael Scott",
    creatorAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop",
    isSponsored: true,
    media: [
      {
        id: "1-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
        annotations: [
          { id: "a1", x: 35, y: 25, product: PRODUCTS[0] },
          { id: "a2", x: 45, y: 65, product: PRODUCTS[1] },
          { id: "a3", x: 55, y: 85, product: PRODUCTS[3] },
        ],
      },
      {
        id: "1-2",
        type: "video",
        url: "/video.mp4",
        duration: 7,
        annotations: [],
      },
      {
        id: "1-3",
        type: "image",
        url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=600&fit=crop",
        annotations: [
          { id: "a4", x: 40, y: 30, product: PRODUCTS[2] },
          { id: "a5", x: 50, y: 70, product: PRODUCTS[4] },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Smart Casual",
    creator: "David Chen",
    creatorAvatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop",
    isSponsored: false,
    media: [
      {
        id: "2-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
        annotations: [
          { id: "a6", x: 30, y: 20, product: PRODUCTS[0] },
          { id: "a7", x: 60, y: 40, product: PRODUCTS[2] },
        ],
      },
      {
        id: "2-2",
        type: "video",
        url: "/video.mp4",
        duration: 7,
        annotations: [],
      },
    ],
  },
  {
    id: "3",
    title: "Executive Style",
    creator: "James Wilson",
    creatorAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop",
    isSponsored: false,
    media: [
      {
        id: "3-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=600&fit=crop",
        annotations: [
          { id: "a8", x: 45, y: 35, product: PRODUCTS[1] },
          { id: "a9", x: 55, y: 80, product: PRODUCTS[3] },
        ],
      },
      {
        id: "3-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
        annotations: [{ id: "a10", x: 40, y: 50, product: PRODUCTS[4] }],
      },
    ],
  },
];
