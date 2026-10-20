import { connectToDatabase } from '@/lib/mongodb';
import { Product } from '@/models/Product';
import { Settings } from '@/models/Settings';
import { CommunityText } from '@/models/CommunityText';

// Sample product data — Originalfit inspirations
const sampleProducts = [
  {
    name: "Sneakers sport",
    description: "Visuel d’inspiration : sneakers sport. Prix et disponibilité confirmés sur demande avec Originalfit.",
    price: 0,
    images: [
      {
        original: "/images/originalfit/sneakers.jpg",
        thumbnail: "/images/originalfit/sneakers.jpg",
        medium: "/images/originalfit/sneakers.jpg",
        large: "/images/originalfit/sneakers.jpg",
      }
    ],
    sizes: ["39", "40", "41", "42", "43", "44"],
    category: "Accessoires",
    isCustomizable: false,
    customPrice: 0,
    isActive: true,
    stock: 0,
    tags: ["sneakers", "chaussures", "sport", "inspiration"],
  },
  {
    name: "T-shirt training",
    description: "Visuel d’inspiration : t-shirt training essentiel. Prix et disponibilité confirmés sur demande avec Originalfit.",
    price: 0,
    images: [
      {
        original: "/images/originalfit/tshirt.jpg",
        thumbnail: "/images/originalfit/tshirt.jpg",
        medium: "/images/originalfit/tshirt.jpg",
        large: "/images/originalfit/tshirt.jpg",
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    category: "Hauts",
    isCustomizable: false,
    customPrice: 0,
    isActive: true,
    stock: 0,
    tags: ["t-shirt", "training", "haut", "inspiration"],
  },
  {
    name: "Veste sport",
    description: "Visuel d’inspiration : veste sport layering. Prix et disponibilité confirmés sur demande avec Originalfit.",
    price: 0,
    images: [
      {
        original: "/images/originalfit/jacket.jpg",
        thumbnail: "/images/originalfit/jacket.jpg",
        medium: "/images/originalfit/jacket.jpg",
        large: "/images/originalfit/jacket.jpg",
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    category: "Hauts",
    isCustomizable: false,
    customPrice: 0,
    isActive: true,
    stock: 0,
    tags: ["veste", "sport", "layering", "haut", "inspiration"],
  },
  {
    name: "Sac crossbody",
    description: "Visuel d’inspiration : sac crossbody accessoire. Prix et disponibilité confirmés sur demande avec Originalfit.",
    price: 0,
    images: [
      {
        original: "/images/originalfit/bag.jpg",
        thumbnail: "/images/originalfit/bag.jpg",
        medium: "/images/originalfit/bag.jpg",
        large: "/images/originalfit/bag.jpg",
      }
    ],
    sizes: ["Unique"],
    category: "Accessoires",
    isCustomizable: false,
    customPrice: 0,
    isActive: true,
    stock: 0,
    tags: ["sac", "accessoire", "crossbody", "inspiration"],
  },
  {
    name: "Short training",
    description: "Visuel d’inspiration : short training bas. Prix et disponibilité confirmés sur demande avec Originalfit.",
    price: 0,
    images: [
      {
        original: "/images/originalfit/shorts.jpg",
        thumbnail: "/images/originalfit/shorts.jpg",
        medium: "/images/originalfit/shorts.jpg",
        large: "/images/originalfit/shorts.jpg",
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    category: "Bas",
    isCustomizable: false,
    customPrice: 0,
    isActive: true,
    stock: 0,
    tags: ["short", "training", "bas", "inspiration"],
  },
  {
    name: "Hoodie sport",
    description: "Visuel d’inspiration : hoodie sport daily fit. Prix et disponibilité confirmés sur demande avec Originalfit.",
    price: 0,
    images: [
      {
        original: "/images/originalfit/hoodie.jpg",
        thumbnail: "/images/originalfit/hoodie.jpg",
        medium: "/images/originalfit/hoodie.jpg",
        large: "/images/originalfit/hoodie.jpg",
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    category: "Hauts",
    isCustomizable: false,
    customPrice: 0,
    isActive: true,
    stock: 0,
    tags: ["hoodie", "sport", "daily fit", "haut", "inspiration"],
  },
];

// Sample settings data
const sampleSettings = {
  productPrices: new Map([
    ["Sneakers sport", 0],
    ["T-shirt training", 0],
    ["Veste sport", 0],
    ["Sac crossbody", 0],
    ["Short training", 0],
    ["Hoodie sport", 0],
  ]),
  customTextPrice: 0,
  shippingFees: new Map([
    ["Tetouan", 0],
    ["Casablanca", 25],
    ["Rabat", 20],
    ["Marrakech", 30],
    ["Fez", 25],
    ["Agadir", 35],
    ["Tangier", 15],
    ["Meknes", 25],
    ["Oujda", 30],
    ["Kenitra", 20],
    ["Safi", 30],
    ["Mohammedia", 25],
    ["Khouribga", 25],
    ["Beni Mellal", 30],
    ["El Jadida", 30],
    ["Taza", 25],
    ["Nador", 30],
    ["Settat", 25],
    ["Larache", 20],
    ["Ksar El Kebir", 20],
  ]),
  discountCodes: [],
  isOrderingEnabled: false,
  maintenanceMode: false,
  contactInfo: {
    whatsappNumber: "+212 6XX XXX XXX",
    email: "contact@originalfit.ma",
    address: "Maroc",
  },
  socialMedia: {
    instagram: "@originalfit.ma",
    facebook: "Originalfit",
    twitter: "@originalfit_ma",
  },
};

// Sample community texts
const sampleCommunityTexts = [
  {
    text: "Stay Offline, Stay Real",
    category: "motivational",
    isApproved: true,
    submittedBy: "anon_seed_001",
    usageCount: 15
  },
  {
    text: "Digital Detox Mode",
    category: "minimalist",
    isApproved: true,
    submittedBy: "anon_seed_002",
    usageCount: 8
  },
  {
    text: "Chaos is my Comfort Zone",
    category: "chaotic",
    isApproved: true,
    submittedBy: "anon_seed_003",
    usageCount: 12
  },
  {
    text: "404: Social Life Not Found",
    category: "funny",
    isApproved: true,
    submittedBy: "anon_seed_004",
    usageCount: 23
  },
  {
    text: "Existence Precedes Essence",
    category: "philosophical",
    isApproved: true,
    submittedBy: "anon_seed_005",
    usageCount: 6
  },
  {
    text: "Disconnect to Reconnect",
    category: "motivational",
    isApproved: true,
    submittedBy: "anon_seed_006",
    usageCount: 10
  },
  {
    text: "Less Screen More Life",
    category: "minimalist",
    isApproved: true,
    submittedBy: "anon_seed_007",
    usageCount: 18
  },
  {
    text: "Embrace the Glitch",
    category: "chaotic",
    isApproved: true,
    submittedBy: "anon_seed_008",
    usageCount: 9
  },
  {
    text: "Powered by Coffee & Dreams",
    category: "funny",
    isApproved: true,
    submittedBy: "anon_seed_009",
    usageCount: 21
  },
  {
    text: "Be the Change You Code",
    category: "philosophical",
    isApproved: true,
    submittedBy: "anon_seed_010",
    usageCount: 7
  }
];

// Database seeder function
export async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    await connectToDatabase();
    console.log('✅ Connected to database');

    // Clear existing data
    await Product.deleteMany({});
    await Settings.deleteMany({});
    await CommunityText.deleteMany({});
    console.log('🗑️ Cleared existing data');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Inserted ${products.length} products`);

    // Insert sample settings
    const settings = await Settings.create(sampleSettings);
    console.log('✅ Inserted settings');

    // Insert sample community texts
    const communityTexts = await CommunityText.insertMany(sampleCommunityTexts);
    console.log(`✅ Inserted ${communityTexts.length} community texts`);

    console.log('🎉 Database seeding completed successfully!');
    
    return {
      products: products.length,
      settings: 1,
      communityTexts: communityTexts.length,
    };
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Function to check if database is empty
export async function isDatabaseEmpty(): Promise<boolean> {
  try {
    await connectToDatabase();
    
    const productCount = await Product.countDocuments();
    const settingsCount = await Settings.countDocuments();
    
    return productCount === 0 && settingsCount === 0;
  } catch (error) {
    console.error('Error checking database:', error);
    return false;
  }
}

// Function to get database stats
export async function getDatabaseStats() {
  try {
    await connectToDatabase();
    
    const productCount = await Product.countDocuments();
    const activeProductCount = await Product.countDocuments({ isActive: true });
    const settingsCount = await Settings.countDocuments();
    
    return {
      products: productCount,
      activeProducts: activeProductCount,
      settings: settingsCount,
    };
  } catch (error) {
    console.error('Error getting database stats:', error);
    return null;
  }
}

// Auto-seed if database is empty (for development)
if (process.env.NODE_ENV === 'development') {
  seedDatabase().catch(console.error);
}
