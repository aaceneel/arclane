-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR NOT NULL,
    description TEXT,
    image TEXT,
    product_count INTEGER DEFAULT 0,
    parent_id UUID REFERENCES categories(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Suppliers table
CREATE TABLE suppliers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR NOT NULL,
    logo TEXT,
    country VARCHAR,
    response_rate INTEGER DEFAULT 0,
    response_time VARCHAR,
    year_established INTEGER,
    verification_level VARCHAR CHECK (verification_level IN ('verified', 'gold', 'platinum')) DEFAULT 'verified',
    rating DECIMAL(2,1) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    total_revenue VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR NOT NULL,
    slug VARCHAR UNIQUE NOT NULL,
    description TEXT,
    images TEXT[],
    price_min DECIMAL(10,2),
    price_max DECIMAL(10,2),
    currency VARCHAR DEFAULT 'USD',
    min_order INTEGER DEFAULT 1,
    category_id UUID REFERENCES categories(id),
    tags TEXT[],
    supplier_id UUID REFERENCES suppliers(id),
    rating DECIMAL(2,1) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    shipping_time VARCHAR,
    payment_methods TEXT[],
    customization_available BOOLEAN DEFAULT FALSE,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL,
    supplier_id UUID REFERENCES suppliers(id),
    total_amount DECIMAL(10,2),
    currency VARCHAR DEFAULT 'USD',
    status VARCHAR CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RFQs (Request for Quotations) table
CREATE TABLE rfqs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL,
    product_name VARCHAR NOT NULL,
    category VARCHAR NOT NULL,
    quantity INTEGER NOT NULL,
    unit VARCHAR NOT NULL,
    specifications TEXT,
    target_price DECIMAL(10,2),
    currency VARCHAR DEFAULT 'USD',
    delivery_location VARCHAR,
    delivery_date VARCHAR,
    payment_terms VARCHAR,
    additional_requirements TEXT,
    contact_name VARCHAR NOT NULL,
    contact_email VARCHAR NOT NULL,
    contact_phone VARCHAR,
    company_name VARCHAR,
    status VARCHAR CHECK (status IN ('open', 'closed', 'expired')) DEFAULT 'open',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS (Row Level Security) policies
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE rfqs ENABLE ROW LEVEL SECURITY;

-- Public read access for categories, suppliers, and products
CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (true);
CREATE POLICY "Suppliers are viewable by everyone" ON suppliers FOR SELECT USING (true);
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);

-- Users can only see their own orders and RFQs
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid()::text = user_id);
CREATE POLICY "Users can view own RFQs" ON rfqs FOR SELECT USING (auth.uid()::text = user_id);

-- Users can create their own orders and RFQs
CREATE POLICY "Users can create orders" ON orders FOR INSERT WITH CHECK (auth.uid()::text = user_id);
CREATE POLICY "Users can create RFQs" ON rfqs FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Users can update their own RFQs
CREATE POLICY "Users can update own RFQs" ON rfqs FOR UPDATE USING (auth.uid()::text = user_id);

-- Insert sample data
-- Categories
INSERT INTO categories (id, name, description, image, product_count) VALUES
('cat-001', 'Industrial Supplies', 'Industrial equipment and supplies', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400', 45),
('cat-002', 'Electronics', 'Electronic components and devices', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400', 32),
('cat-003', 'Machinery', 'Industrial machinery and equipment', 'https://images.unsplash.com/photo-1565057451833-4526e67d589f?w=400', 28),
('cat-004', 'Raw Materials', 'Raw materials and commodities', 'https://images.unsplash.com/photo-1566843015771-d33d2dce3a8f?w=400', 67),
('cat-005', 'Packaging', 'Packaging materials and supplies', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400', 23),
('cat-006', 'Office Supplies', 'Office equipment and supplies', 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=400', 18);

-- Suppliers
INSERT INTO suppliers (id, name, logo, country, response_rate, response_time, year_established, verification_level, rating, review_count, total_revenue) VALUES
('sup-001', 'TechPro Industries', 'https://github.com/polymet-ai.png', 'United States', 95, '< 2 hours', 2015, 'platinum', 4.8, 324, '$2.3M'),
('sup-002', 'Global Materials Co.', 'https://github.com/polymet-ai.png', 'Germany', 92, '< 4 hours', 2008, 'gold', 4.6, 198, '$1.8M'),
('sup-003', 'PackMaster Solutions', 'https://github.com/polymet-ai.png', 'China', 88, '< 6 hours', 2012, 'verified', 4.4, 145, '$980K'),
('sup-004', 'SafetyFirst Equipment', 'https://github.com/polymet-ai.png', 'Canada', 94, '< 3 hours', 2010, 'gold', 4.7, 267, '$1.5M'),
('sup-005', 'ElectroSupply Inc.', 'https://github.com/polymet-ai.png', 'Japan', 96, '< 1 hour', 2005, 'platinum', 4.9, 445, '$3.1M');

-- Products
INSERT INTO products (id, title, slug, description, images, price_min, price_max, currency, min_order, category_id, tags, supplier_id, rating, review_count, shipping_time, payment_methods, customization_available, featured) VALUES
('prod-001', 'Industrial Safety Helmet', 'industrial-safety-helmet', 'High-quality safety helmet for industrial use', ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'], 25.00, 45.00, 'USD', 10, 'cat-001', ARRAY['safety', 'helmet', 'industrial'], 'sup-004', 4.5, 89, '3-5 days', ARRAY['Credit Card', 'Bank Transfer'], true, true),
('prod-002', 'Electronic Components Kit', 'electronic-components-kit', 'Complete kit of electronic components for prototyping', ARRAY['https://images.unsplash.com/photo-1518770660439-4636190af475?w=400'], 150.00, 300.00, 'USD', 1, 'cat-002', ARRAY['electronics', 'components', 'kit'], 'sup-005', 4.7, 156, '2-4 days', ARRAY['Credit Card', 'PayPal'], false, true),
('prod-003', 'Packaging Materials Bundle', 'packaging-materials-bundle', 'Comprehensive packaging materials for shipping', ARRAY['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400'], 50.00, 120.00, 'USD', 50, 'cat-005', ARRAY['packaging', 'shipping', 'materials'], 'sup-003', 4.3, 67, '5-7 days', ARRAY['Credit Card', 'Bank Transfer'], true, false),
('prod-004', 'Industrial Machinery Parts', 'industrial-machinery-parts', 'High-precision parts for industrial machinery', ARRAY['https://images.unsplash.com/photo-1565057451833-4526e67d589f?w=400'], 500.00, 2000.00, 'USD', 1, 'cat-003', ARRAY['machinery', 'parts', 'industrial'], 'sup-001', 4.8, 234, '7-10 days', ARRAY['Bank Transfer', 'Letter of Credit'], true, true),
('prod-005', 'Raw Steel Materials', 'raw-steel-materials', 'Premium quality raw steel for manufacturing', ARRAY['https://images.unsplash.com/photo-1566843015771-d33d2dce3a8f?w=400'], 800.00, 1200.00, 'USD', 100, 'cat-004', ARRAY['steel', 'raw materials', 'manufacturing'], 'sup-002', 4.6, 123, '10-14 days', ARRAY['Bank Transfer', 'Letter of Credit'], false, true); 