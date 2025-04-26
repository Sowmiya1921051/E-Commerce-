export  interface Product {
  id: number
  name: string
  description: string
  price: number
  stock: number
  image: string
  category: string
  subcategory?: string
  brand?: string
  series?: string
  tags: string[]
  sold?: number
}

export interface Category {
  id: number
  name: string
  description?: string
  subcategories: string[]
}

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description: "Noise-cancelling wireless headphones with premium sound quality and 20-hour battery life.",
    price: 249.99,
    stock: 45,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200",
    category: "Electronics",
    subcategory: "Audio",
    brand: "SoundTech",
    series: "ProSound",
    tags: ["wireless", "noise-cancelling", "headphones"],
    sold: 125
  },
  {
    id: 2,
    name: "Ultra HD Smart TV",
    description: "55-inch Ultra HD Smart TV with HDR and built-in streaming apps.",
    price: 799.99,
    stock: 12,
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=200",
    category: "Electronics",
    subcategory: "TVs",
    brand: "VisualPro",
    series: "UltraVision",
    tags: ["smart tv", "4k", "hdr"],
    sold: 38
  },
  {
    id: 3,
    name: "Professional DSLR Camera",
    description: "24.1 Megapixel DSLR Camera with 18-55mm lens kit and WiFi connectivity.",
    price: 1299.99,
    stock: 8,
    image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=200",
    category: "Electronics",
    subcategory: "Cameras",
    brand: "OptiView",
    series: "ProShot",
    tags: ["camera", "dslr", "photography"],
    sold: 14
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    description: "Adjustable ergonomic office chair with lumbar support and breathable mesh back.",
    price: 199.99,
    stock: 35,
    image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?q=80&w=200",
    category: "Furniture",
    subcategory: "Office",
    brand: "ComfortPlus",
    series: "ErgoFit",
    tags: ["chair", "office", "ergonomic"],
    sold: 67
  },
  {
    id: 5,
    name: "Standing Desk",
    description: "Electric height-adjustable standing desk with memory settings and cable management.",
    price: 349.99,
    stock: 22,
    image: "https://images.unsplash.com/photo-1555438987-8267a219d1f0?q=80&w=200",
    category: "Furniture",
    subcategory: "Office",
    brand: "WorkWell",
    series: "FlexiDesk",
    tags: ["desk", "standing desk", "office"],
    sold: 29
  },
  {
    id: 6,
    name: "Leather Sofa",
    description: "Three-seater genuine leather sofa with oak legs and modern design.",
    price: 1299.99,
    stock: 5,
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=200",
    category: "Furniture",
    subcategory: "Living Room",
    brand: "LuxeHome",
    series: "Urban",
    tags: ["sofa", "leather", "living room"],
    sold: 8
  },
  {
    id: 7,
    name: "Running Shoes",
    description: "Lightweight breathable running shoes with responsive cushioning.",
    price: 129.99,
    stock: 67,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200",
    category: "Clothing",
    subcategory: "Footwear",
    brand: "SpeedRun",
    series: "AirFlex",
    tags: ["shoes", "running", "athletic"],
    sold: 135
  },
  {
    id: 8,
    name: "Waterproof Hiking Jacket",
    description: "Waterproof and windproof hiking jacket with sealed seams and adjustable hood.",
    price: 179.99,
    stock: 42,
    image: "https://images.unsplash.com/photo-1578948856697-db91d246b7a8?q=80&w=200",
    category: "Clothing",
    subcategory: "Outerwear",
    brand: "NatureTrail",
    series: "AllWeather",
    tags: ["jacket", "hiking", "waterproof"],
    sold: 56
  },
  {
    id: 9,
    name: "Digital Drawing Tablet",
    description: "Professional digital drawing tablet with pressure-sensitive pen and customizable shortcuts.",
    price: 399.99,
    stock: 18,
    image: "https://images.unsplash.com/photo-1563643021-fc79adce929a?q=80&w=200",
    category: "Electronics",
    subcategory: "Computer Accessories",
    brand: "CreativePro",
    series: "ArtTab",
    tags: ["drawing", "tablet", "digital art"],
    sold: 27
  },
  {
    id: 10,
    name: "French Press Coffee Maker",
    description: "Glass and stainless steel French press coffee maker, 34oz capacity.",
    price: 34.99,
    stock: 53,
    image: "https://images.unsplash.com/photo-1481473545629-95c6a5e51c2a?q=80&w=200",
    category: "Kitchen",
    subcategory: "Coffee & Tea",
    brand: "BrewMaster",
    series: "Classic",
    tags: ["coffee", "french press", "kitchen"],
    sold: 98
  },
  {
    id: 11,
    name: "Cast Iron Skillet",
    description: "Pre-seasoned 12-inch cast iron skillet for stovetop, oven, and campfire cooking.",
    price: 39.99,
    stock: 31,
    image: "https://images.unsplash.com/photo-1606174990897-10b4ffe9f362?q=80&w=200",
    category: "Kitchen",
    subcategory: "Cookware",
    brand: "IronChef",
    series: "Heritage",
    tags: ["cast iron", "skillet", "cookware"],
    sold: 72
  },
  {
    id: 12,
    name: "Robotic Vacuum Cleaner",
    description: "Smart robotic vacuum with mapping technology, app control, and automatic recharging.",
    price: 299.99,
    stock: 9,
    image: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?q=80&w=200",
    category: "Home Appliances",
    subcategory: "Vacuums",
    brand: "CleanTech",
    series: "RoboVac",
    tags: ["robot", "vacuum", "smart home"],
    sold: 43
  }
];

export const mockCategories: Category[] = [
  {
    id: 1,
    name: "Electronics",
    description: "Electronic devices and accessories",
    subcategories: ["Audio", "TVs", "Cameras", "Computer Accessories", "Smartphones", "Gaming"]
  },
  {
    id: 2,
    name: "Furniture",
    description: "Home and office furniture",
    subcategories: ["Office", "Living Room", "Bedroom", "Dining", "Outdoor"]
  },
  {
    id: 3,
    name: "Clothing",
    description: "Apparel and fashion items",
    subcategories: ["Footwear", "Outerwear", "Tops", "Bottoms", "Accessories"]
  },
  {
    id: 4,
    name: "Kitchen",
    description: "Kitchen appliances and utensils",
    subcategories: ["Cookware", "Small Appliances", "Coffee & Tea", "Utensils", "Bakeware"]
  },
  {
    id: 5,
    name: "Home Appliances",
    description: "Household appliances and devices",
    subcategories: ["Vacuums", "Laundry", "Air Conditioning", "Heating", "Cleaning"]
  }
];
 