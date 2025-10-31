export interface Request {
  id: number;
  date: string;
  time: string;
  description: string;
  location?: string;
  images?: string[];
}

// Mock data
export const mockRequests: Request[] = [
  {
    id: 1,
    date: "2025-10-30",
    time: "10:00 AM",
    description: "Office supplies request",
    location: "Head Office",
    images: [],
  },
  {
    id: 2,
    date: "2025-10-30",
    time: "11:00 AM",
    description: "Laptop repair",
    location: "Branch A",
    images: ["img1.jpg"],
  },
  {
    id: 3,
    date: "2025-10-30",
    time: "12:00 PM",
    description: "Projector repair",
    location: "Branch B",
    images: [],
  },
  {
    id: 4,
    date: "2025-10-30",
    time: "01:00 PM",
    description: "Office chairs request",
    location: "Head Office",
    images: ["img2.jpg", "img3.jpg"],
  },
  {
    id: 5,
    date: "2025-10-30",
    time: "01:00 PM",
    description: "Office chairs request",
    location: "Head Office",
    images: ["img2.jpg", "img3.jpg"],
  },
  {
    id: 6,
    date: "2025-10-30",
    time: "01:00 PM",
    description: "Office chairs request",
    location: "Head Office",
    images: ["img2.jpg", "img3.jpg"],
  },
  {
    id: 7,
    date: "2025-10-30",
    time: "01:00 PM",
    description: "Office chairs request",
    location: "Head Office",
    images: ["img2.jpg", "img3.jpg"],
  },
  {
    id: 8,
    date: "2025-10-30",
    time: "01:00 PM",
    description: "Office chairs request",
    location: "Head Office",
    images: ["img2.jpg", "img3.jpg"],
  },
  {
    id: 9,
    date: "2025-10-30",
    time: "01:00 PM",
    description: "Office chairs request",
    location: "Head Office",
    images: ["img2.jpg", "img3.jpg"],
  },
  {
    id: 10,
    date: "2025-10-30",
    time: "01:00 PM",
    description: "Office chairs request",
    location: "Head Office",
    images: ["img2.jpg", "img3.jpg"],
  },
];
