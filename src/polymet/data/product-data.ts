export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  image?: string;
  subcategories?: ProductCategory[];
}

export interface ProductSpecification {
  name: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  minOrder: number;
  stock: number;
  attributes: {
    [key: string]: string;
  };
}

export interface Supplier {
  id: string;
  name: string;
  logo: string;
  country: string;
  responseRate: number;
  responseTime: string;
  yearEstablished: number;
  totalRevenue: string;
  mainProducts: string[];
  certifications: string[];
  rating: number;
  reviewCount: number;
  verificationLevel: "verified" | "gold" | "platinum";
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  images: string[];
  price: {
    min: number;
    max: number;
  };
  currency: string;
  minOrder: number;
  categoryId: string;
  tags: string[];
  specifications: ProductSpecification[];
  variants: ProductVariant[];
  supplier: Supplier;
  rating: number;
  reviewCount: number;
  shippingTime: string;
  paymentMethods: string[];
  customizationAvailable: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "industrial-supplies",
    name: "Industrial Supplies",
    slug: "industrial-supplies",
    image: "https://picsum.photos/seed/industrial/300/200",
    subcategories: [
      {
        id: "safety-equipment",
        name: "Safety Equipment",
        slug: "safety-equipment",
        image: "https://picsum.photos/seed/safety/300/200",
      },
      {
        id: "tools",
        name: "Tools & Equipment",
        slug: "tools",
        image: "https://picsum.photos/seed/tools/300/200",
      },
      {
        id: "hardware",
        name: "Hardware",
        slug: "hardware",
        image: "https://picsum.photos/seed/hardware/300/200",
      },
    ],
  },
  {
    id: "electronics",
    name: "Electronics",
    slug: "electronics",
    image: "https://picsum.photos/seed/electronics/300/200",
    subcategories: [
      {
        id: "components",
        name: "Electronic Components",
        slug: "components",
        image: "https://picsum.photos/seed/components/300/200",
      },
      {
        id: "circuit-boards",
        name: "Circuit Boards",
        slug: "circuit-boards",
        image: "https://picsum.photos/seed/circuits/300/200",
      },
      {
        id: "connectors",
        name: "Connectors & Terminals",
        slug: "connectors",
        image: "https://picsum.photos/seed/connectors/300/200",
      },
    ],
  },
  {
    id: "machinery",
    name: "Machinery",
    slug: "machinery",
    image: "https://picsum.photos/seed/machinery/300/200",
    subcategories: [
      {
        id: "manufacturing",
        name: "Manufacturing Equipment",
        slug: "manufacturing",
        image: "https://picsum.photos/seed/manufacturing/300/200",
      },
      {
        id: "packaging",
        name: "Packaging Machinery",
        slug: "packaging-machinery",
        image: "https://picsum.photos/seed/packaging/300/200",
      },
      {
        id: "cnc",
        name: "CNC Machines",
        slug: "cnc",
        image: "https://picsum.photos/seed/cnc/300/200",
      },
    ],
  },
  {
    id: "raw-materials",
    name: "Raw Materials",
    slug: "raw-materials",
    image: "https://picsum.photos/seed/materials/300/200",
    subcategories: [
      {
        id: "metals",
        name: "Metals & Alloys",
        slug: "metals",
        image: "https://picsum.photos/seed/metals/300/200",
      },
      {
        id: "plastics",
        name: "Plastics & Polymers",
        slug: "plastics",
        image: "https://picsum.photos/seed/plastics/300/200",
      },
      {
        id: "textiles",
        name: "Textiles & Fabrics",
        slug: "textiles",
        image: "https://picsum.photos/seed/textiles/300/200",
      },
    ],
  },
  {
    id: "packaging",
    name: "Packaging",
    slug: "packaging",
    image: "https://picsum.photos/seed/packaging-materials/300/200",
    subcategories: [
      {
        id: "boxes",
        name: "Boxes & Containers",
        slug: "boxes",
        image: "https://picsum.photos/seed/boxes/300/200",
      },
      {
        id: "labels",
        name: "Labels & Tags",
        slug: "labels",
        image: "https://picsum.photos/seed/labels/300/200",
      },
      {
        id: "tapes",
        name: "Tapes & Adhesives",
        slug: "tapes",
        image: "https://picsum.photos/seed/tapes/300/200",
      },
    ],
  },
  {
    id: "office-supplies",
    name: "Office Supplies",
    slug: "office-supplies",
    image: "https://picsum.photos/seed/office/300/200",
    subcategories: [
      {
        id: "stationery",
        name: "Stationery",
        slug: "stationery",
        image: "https://picsum.photos/seed/stationery/300/200",
      },
      {
        id: "furniture",
        name: "Office Furniture",
        slug: "furniture",
        image: "https://picsum.photos/seed/furniture/300/200",
      },
      {
        id: "technology",
        name: "Office Technology",
        slug: "technology",
        image: "https://picsum.photos/seed/technology/300/200",
      },
    ],
  },
];

export const SUPPLIERS: Supplier[] = [
  {
    id: "sup-001",
    name: "TechPro Industries",
    logo: "https://github.com/polymet-ai.png",
    country: "United States",
    responseRate: 98,
    responseTime: "< 24h",
    yearEstablished: 2005,
    totalRevenue: "$10M - $50M",
    mainProducts: ["Electronic Components", "Circuit Boards", "Sensors"],
    certifications: ["ISO 9001", "ISO 14001"],
    rating: 4.8,
    reviewCount: 256,
    verificationLevel: "platinum",
  },
  {
    id: "sup-002",
    name: "Global Materials Co.",
    logo: "https://github.com/polymet-ai.png",
    country: "Germany",
    responseRate: 95,
    responseTime: "< 12h",
    yearEstablished: 1998,
    totalRevenue: "$50M - $100M",
    mainProducts: ["Metals", "Polymers", "Composites"],
    certifications: ["ISO 9001", "ISO 14001", "OHSAS 18001"],
    rating: 4.7,
    reviewCount: 412,
    verificationLevel: "gold",
  },
  {
    id: "sup-003",
    name: "PackMaster Solutions",
    logo: "https://github.com/polymet-ai.png",
    country: "China",
    responseRate: 92,
    responseTime: "< 24h",
    yearEstablished: 2010,
    totalRevenue: "$1M - $10M",
    mainProducts: ["Packaging Materials", "Boxes", "Tapes"],
    certifications: ["ISO 9001"],
    rating: 4.5,
    reviewCount: 189,
    verificationLevel: "verified",
  },
  {
    id: "sup-004",
    name: "MachineWorks Ltd.",
    logo: "https://github.com/polymet-ai.png",
    country: "Japan",
    responseRate: 97,
    responseTime: "< 6h",
    yearEstablished: 1985,
    totalRevenue: "> $100M",
    mainProducts: [
      "CNC Machines",
      "Manufacturing Equipment",
      "Industrial Robots",
    ],

    certifications: ["ISO 9001", "ISO 14001", "ISO 45001"],
    rating: 4.9,
    reviewCount: 523,
    verificationLevel: "platinum",
  },
  {
    id: "sup-005",
    name: "SafetyFirst Equipment",
    logo: "https://github.com/polymet-ai.png",
    country: "Canada",
    responseRate: 94,
    responseTime: "< 24h",
    yearEstablished: 2008,
    totalRevenue: "$10M - $50M",
    mainProducts: [
      "Safety Gear",
      "Protective Equipment",
      "Workplace Safety Solutions",
    ],

    certifications: ["ISO 9001", "OHSAS 18001"],
    rating: 4.6,
    reviewCount: 317,
    verificationLevel: "gold",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "prod-001",
    title: "Industrial Safety Helmet with Integrated Face Shield",
    slug: "industrial-safety-helmet",
    description:
      "High-quality safety helmet with integrated face shield for industrial use. Features adjustable headband, ventilation system, and impact-resistant shell. Meets ANSI Z89.1 Type I Class E standards.",
    images: [
      "https://picsum.photos/seed/helmet1/800/800",
      "https://picsum.photos/seed/helmet2/800/800",
      "https://picsum.photos/seed/helmet3/800/800",
      "https://picsum.photos/seed/helmet4/800/800",
    ],

    price: {
      min: 15.99,
      max: 24.99,
    },
    currency: "USD",
    minOrder: 50,
    categoryId: "safety-equipment",
    tags: ["safety", "helmet", "industrial", "protection"],
    specifications: [
      { name: "Material", value: "High-density polyethylene" },
      { name: "Certification", value: "ANSI Z89.1 Type I Class E" },
      { name: "Weight", value: "450g" },
      { name: "Size Range", value: "54-62cm (adjustable)" },
      { name: "Face Shield", value: "Clear polycarbonate, flip-up" },
    ],

    variants: [
      {
        id: "var-001",
        name: "White Helmet",
        sku: "SH-WHT-001",
        price: 15.99,
        minOrder: 50,
        stock: 5000,
        attributes: {
          color: "White",
          size: "Standard",
        },
      },
      {
        id: "var-002",
        name: "Yellow Helmet",
        sku: "SH-YLW-001",
        price: 15.99,
        minOrder: 50,
        stock: 4500,
        attributes: {
          color: "Yellow",
          size: "Standard",
        },
      },
      {
        id: "var-003",
        name: "Red Helmet",
        sku: "SH-RED-001",
        price: 16.99,
        minOrder: 50,
        stock: 3000,
        attributes: {
          color: "Red",
          size: "Standard",
        },
      },
      {
        id: "var-004",
        name: "Premium White Helmet",
        sku: "SH-WHT-002",
        price: 24.99,
        minOrder: 50,
        stock: 2000,
        attributes: {
          color: "White",
          size: "Standard",
          type: "Premium",
        },
      },
    ],

    supplier: SUPPLIERS[4],
    rating: 4.7,
    reviewCount: 128,
    shippingTime: "7-15 days",
    paymentMethods: ["T/T", "L/C", "Western Union", "PayPal"],
    customizationAvailable: true,
    featured: true,
    createdAt: "2023-08-15T10:30:00Z",
    updatedAt: "2024-02-20T14:45:00Z",
  },
  {
    id: "prod-002",
    title: "PCB Manufacturing Service - 2 to 32 Layer Custom Circuit Boards",
    slug: "pcb-manufacturing-service",
    description:
      "Professional PCB manufacturing service offering 2 to 32 layer custom circuit boards. We provide high-quality, precision-engineered PCBs for various applications including consumer electronics, industrial equipment, automotive systems, and more.",
    images: [
      "https://picsum.photos/seed/pcb1/800/800",
      "https://picsum.photos/seed/pcb2/800/800",
      "https://picsum.photos/seed/pcb3/800/800",
    ],

    price: {
      min: 0.5,
      max: 15.0,
    },
    currency: "USD",
    minOrder: 10,
    categoryId: "circuit-boards",
    tags: ["pcb", "electronics", "circuit board", "manufacturing"],
    specifications: [
      { name: "Layers", value: "2-32 layers" },
      { name: "Material", value: "FR4, High TG FR4, Aluminum, Rogers, etc." },
      { name: "Thickness", value: "0.4mm-3.2mm" },
      { name: "Min. Line Width", value: "3mil" },
      { name: "Min. Line Spacing", value: "3mil" },
      {
        name: "Surface Finish",
        value: "HASL, ENIG, OSP, Immersion Silver, Immersion Tin",
      },
    ],

    variants: [
      {
        id: "var-005",
        name: "2 Layer PCB",
        sku: "PCB-2L",
        price: 0.5,
        minOrder: 10,
        stock: 10000,
        attributes: {
          layers: "2",
          finish: "HASL",
        },
      },
      {
        id: "var-006",
        name: "4 Layer PCB",
        sku: "PCB-4L",
        price: 2.5,
        minOrder: 10,
        stock: 10000,
        attributes: {
          layers: "4",
          finish: "HASL",
        },
      },
      {
        id: "var-007",
        name: "6 Layer PCB",
        sku: "PCB-6L",
        price: 5.0,
        minOrder: 10,
        stock: 10000,
        attributes: {
          layers: "6",
          finish: "HASL",
        },
      },
      {
        id: "var-008",
        name: "8 Layer PCB",
        sku: "PCB-8L",
        price: 8.0,
        minOrder: 5,
        stock: 5000,
        attributes: {
          layers: "8",
          finish: "HASL",
        },
      },
      {
        id: "var-009",
        name: "2 Layer PCB - ENIG Finish",
        sku: "PCB-2L-ENIG",
        price: 1.0,
        minOrder: 10,
        stock: 10000,
        attributes: {
          layers: "2",
          finish: "ENIG",
        },
      },
    ],

    supplier: SUPPLIERS[0],
    rating: 4.9,
    reviewCount: 256,
    shippingTime: "10-20 days",
    paymentMethods: ["T/T", "L/C", "Western Union", "PayPal", "Credit Card"],
    customizationAvailable: true,
    featured: true,
    createdAt: "2023-05-10T08:15:00Z",
    updatedAt: "2024-03-05T11:30:00Z",
  },
  {
    id: "prod-003",
    title: "Aluminum Alloy 6061-T6 Sheets - Custom Cut Sizes",
    slug: "aluminum-alloy-sheets",
    description:
      "Premium quality Aluminum Alloy 6061-T6 sheets available in custom cut sizes. This versatile alloy offers excellent corrosion resistance, good workability, and high strength-to-weight ratio, making it ideal for various industrial applications.",
    images: [
      "https://picsum.photos/seed/aluminum1/800/800",
      "https://picsum.photos/seed/aluminum2/800/800",
      "https://picsum.photos/seed/aluminum3/800/800",
    ],

    price: {
      min: 3.5,
      max: 12.0,
    },
    currency: "USD",
    minOrder: 100,
    categoryId: "metals",
    tags: ["aluminum", "metal", "sheet", "6061-T6", "raw material"],
    specifications: [
      { name: "Alloy", value: "6061-T6" },
      { name: "Thickness Range", value: "0.5mm-10mm" },
      { name: "Width Range", value: "100mm-1500mm" },
      { name: "Length Range", value: "100mm-6000mm" },
      { name: "Tensile Strength", value: "310 MPa" },
      { name: "Yield Strength", value: "276 MPa" },
      { name: "Elongation", value: "12%" },
    ],

    variants: [
      {
        id: "var-010",
        name: "1mm Thickness",
        sku: "AL-6061-T6-1MM",
        price: 3.5,
        minOrder: 100,
        stock: 50000,
        attributes: {
          thickness: "1mm",
        },
      },
      {
        id: "var-011",
        name: "2mm Thickness",
        sku: "AL-6061-T6-2MM",
        price: 5.0,
        minOrder: 100,
        stock: 40000,
        attributes: {
          thickness: "2mm",
        },
      },
      {
        id: "var-012",
        name: "3mm Thickness",
        sku: "AL-6061-T6-3MM",
        price: 7.0,
        minOrder: 100,
        stock: 35000,
        attributes: {
          thickness: "3mm",
        },
      },
      {
        id: "var-013",
        name: "5mm Thickness",
        sku: "AL-6061-T6-5MM",
        price: 10.0,
        minOrder: 50,
        stock: 25000,
        attributes: {
          thickness: "5mm",
        },
      },
      {
        id: "var-014",
        name: "10mm Thickness",
        sku: "AL-6061-T6-10MM",
        price: 12.0,
        minOrder: 50,
        stock: 20000,
        attributes: {
          thickness: "10mm",
        },
      },
    ],

    supplier: SUPPLIERS[1],
    rating: 4.8,
    reviewCount: 189,
    shippingTime: "15-25 days",
    paymentMethods: ["T/T", "L/C"],
    customizationAvailable: true,
    featured: false,
    createdAt: "2023-07-22T14:20:00Z",
    updatedAt: "2024-01-15T09:45:00Z",
  },
  {
    id: "prod-004",
    title: "Automatic Packaging Machine for Food Products",
    slug: "automatic-packaging-machine",
    description:
      "High-efficiency automatic packaging machine designed for food products. This versatile machine handles various packaging formats including bags, pouches, and sachets. Features touch screen control, stainless steel construction, and easy maintenance design.",
    images: [
      "https://picsum.photos/seed/packagingmachine1/800/800",
      "https://picsum.photos/seed/packagingmachine2/800/800",
      "https://picsum.photos/seed/packagingmachine3/800/800",
      "https://picsum.photos/seed/packagingmachine4/800/800",
    ],

    price: {
      min: 15000,
      max: 35000,
    },
    currency: "USD",
    minOrder: 1,
    categoryId: "packaging-machinery",
    tags: ["packaging", "machine", "food", "automation", "equipment"],
    specifications: [
      { name: "Power", value: "3.5 kW" },
      { name: "Voltage", value: "220V/380V/415V, 50/60Hz" },
      { name: "Capacity", value: "30-60 bags/min" },
      { name: "Bag Size Range", value: "Length: 50-200mm, Width: 50-150mm" },
      { name: "Machine Dimensions", value: "1800 x 1200 x 1600mm" },
      { name: "Machine Weight", value: "850kg" },
      { name: "Material", value: "304 Stainless Steel" },
    ],

    variants: [
      {
        id: "var-015",
        name: "Standard Model",
        sku: "APM-STD-001",
        price: 15000,
        minOrder: 1,
        stock: 10,
        attributes: {
          model: "Standard",
          capacity: "30 bags/min",
        },
      },
      {
        id: "var-016",
        name: "Advanced Model",
        sku: "APM-ADV-001",
        price: 22000,
        minOrder: 1,
        stock: 8,
        attributes: {
          model: "Advanced",
          capacity: "45 bags/min",
        },
      },
      {
        id: "var-017",
        name: "Premium Model",
        sku: "APM-PRE-001",
        price: 35000,
        minOrder: 1,
        stock: 5,
        attributes: {
          model: "Premium",
          capacity: "60 bags/min",
        },
      },
    ],

    supplier: SUPPLIERS[3],
    rating: 4.7,
    reviewCount: 42,
    shippingTime: "30-45 days",
    paymentMethods: ["T/T", "L/C"],
    customizationAvailable: true,
    featured: true,
    createdAt: "2023-09-05T11:10:00Z",
    updatedAt: "2024-02-28T16:30:00Z",
  },
  {
    id: "prod-005",
    title: "Corrugated Shipping Boxes - Bulk Wholesale",
    slug: "corrugated-shipping-boxes",
    description:
      "High-quality corrugated shipping boxes available in bulk wholesale quantities. These durable boxes are perfect for e-commerce, retail shipping, and warehouse storage. Available in various sizes and strengths with customization options.",
    images: [
      "https://picsum.photos/seed/boxes1/800/800",
      "https://picsum.photos/seed/boxes2/800/800",
      "https://picsum.photos/seed/boxes3/800/800",
    ],

    price: {
      min: 0.35,
      max: 1.2,
    },
    currency: "USD",
    minOrder: 1000,
    categoryId: "boxes",
    tags: ["boxes", "shipping", "packaging", "corrugated", "wholesale"],
    specifications: [
      { name: "Material", value: "Corrugated Cardboard" },
      { name: "Flute Type", value: "B-Flute, E-Flute, or Custom" },
      { name: "ECT Rating", value: "32 ECT to 48 ECT" },
      { name: "Printing", value: "Up to 4 colors available" },
      { name: "Finish", value: "Kraft, White, or Custom" },
    ],

    variants: [
      {
        id: "var-018",
        name: 'Small Box (8x6x4")',
        sku: "CB-S-864",
        price: 0.35,
        minOrder: 1000,
        stock: 50000,
        attributes: {
          size: "8x6x4 inches",
          strength: "32 ECT",
        },
      },
      {
        id: "var-019",
        name: 'Medium Box (12x10x6")',
        sku: "CB-M-12106",
        price: 0.55,
        minOrder: 1000,
        stock: 40000,
        attributes: {
          size: "12x10x6 inches",
          strength: "32 ECT",
        },
      },
      {
        id: "var-020",
        name: 'Large Box (18x12x10")',
        sku: "CB-L-181210",
        price: 0.85,
        minOrder: 1000,
        stock: 30000,
        attributes: {
          size: "18x12x10 inches",
          strength: "32 ECT",
        },
      },
      {
        id: "var-021",
        name: 'Heavy Duty Medium Box (12x10x6")',
        sku: "CB-HD-M-12106",
        price: 0.75,
        minOrder: 1000,
        stock: 25000,
        attributes: {
          size: "12x10x6 inches",
          strength: "44 ECT",
        },
      },
      {
        id: "var-022",
        name: 'Heavy Duty Large Box (18x12x10")',
        sku: "CB-HD-L-181210",
        price: 1.2,
        minOrder: 1000,
        stock: 20000,
        attributes: {
          size: "18x12x10 inches",
          strength: "48 ECT",
        },
      },
    ],

    supplier: SUPPLIERS[2],
    rating: 4.6,
    reviewCount: 215,
    shippingTime: "10-20 days",
    paymentMethods: ["T/T", "L/C", "PayPal"],
    customizationAvailable: true,
    featured: false,
    createdAt: "2023-10-12T09:25:00Z",
    updatedAt: "2024-03-01T13:15:00Z",
  },
  {
    id: "prod-006",
    title: "Industrial Workbench with Storage - Heavy Duty",
    slug: "industrial-workbench",
    description:
      "Heavy-duty industrial workbench with integrated storage solutions. Designed for workshops, factories, and maintenance facilities. Features adjustable height, reinforced steel frame, and customizable storage options.",
    images: [
      "https://picsum.photos/seed/workbench1/800/800",
      "https://picsum.photos/seed/workbench2/800/800",
      "https://picsum.photos/seed/workbench3/800/800",
    ],

    price: {
      min: 299.99,
      max: 599.99,
    },
    currency: "USD",
    minOrder: 5,
    categoryId: "tools",
    tags: ["workbench", "industrial", "storage", "workshop", "equipment"],
    specifications: [
      { name: "Material", value: "Steel frame with hardwood or composite top" },
      { name: "Load Capacity", value: "1000-2000 lbs" },
      { name: "Height", value: "Adjustable 30-42 inches" },
      { name: "Width", value: "48-96 inches" },
      { name: "Depth", value: "24-36 inches" },
      { name: "Storage", value: "Drawers, shelves, and pegboard options" },
    ],

    variants: [
      {
        id: "var-023",
        name: 'Standard Workbench (48")',
        sku: "IWB-STD-48",
        price: 299.99,
        minOrder: 5,
        stock: 100,
        attributes: {
          size: "48x30x34 inches",
          storage: "2 drawers",
        },
      },
      {
        id: "var-024",
        name: 'Standard Workbench (72")',
        sku: "IWB-STD-72",
        price: 399.99,
        minOrder: 5,
        stock: 80,
        attributes: {
          size: "72x30x34 inches",
          storage: "2 drawers",
        },
      },
      {
        id: "var-025",
        name: 'Deluxe Workbench (48")',
        sku: "IWB-DLX-48",
        price: 399.99,
        minOrder: 5,
        stock: 60,
        attributes: {
          size: "48x30x34 inches",
          storage: "4 drawers, 1 cabinet",
        },
      },
      {
        id: "var-026",
        name: 'Deluxe Workbench (72")',
        sku: "IWB-DLX-72",
        price: 499.99,
        minOrder: 5,
        stock: 50,
        attributes: {
          size: "72x30x34 inches",
          storage: "4 drawers, 1 cabinet",
        },
      },
      {
        id: "var-027",
        name: 'Premium Workbench (72")',
        sku: "IWB-PRM-72",
        price: 599.99,
        minOrder: 3,
        stock: 30,
        attributes: {
          size: "72x36x34 inches",
          storage: "6 drawers, 2 cabinets, pegboard",
        },
      },
    ],

    supplier: SUPPLIERS[4],
    rating: 4.8,
    reviewCount: 87,
    shippingTime: "15-25 days",
    paymentMethods: ["T/T", "L/C", "Credit Card"],
    customizationAvailable: true,
    featured: true,
    createdAt: "2023-11-18T15:40:00Z",
    updatedAt: "2024-02-10T10:20:00Z",
  },
];

export const FEATURED_PRODUCTS = PRODUCTS.filter((product) => product.featured);
