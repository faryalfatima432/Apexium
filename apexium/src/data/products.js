// data/products.js - Updated with more products and working images
export const categories = ['Perfumes', 'Watches', 'Shoes', 'Glasses', 'Chargers', 'Airbuds', 'Books', 'Clothes'];

export const products = [
  // PERFUMES (8 products)
  {
    id: 1,
    name: 'Premium Men\'s Perfume',
    price: 2499,
    category: 'Perfumes',
    subcategory: 'Floral',
    gender: 'men',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&auto=format&fit=crop&q=60',
    description: 'Long-lasting fragrance with notes of bergamot, cedarwood, and amber.'
  },
 

  // WATCHES (8 products)
  {
    id: 9,
    name: 'Luxury Women\'s Watch',
    price: 5499,
    category: 'Watches',
    subcategory: 'Analog',
    gender: 'women',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60',
    description: 'Elegant timepiece with rose gold finish and genuine leather strap.'
  },
  {
    id: 10,
    name: 'Men\'s Chronograph Watch',
    price: 6499,
    category: 'Watches',
    subcategory: 'Chronograph',
    gender: 'men',
    image: 'https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=500&auto=format&fit=crop&q=60',
    description: 'Professional chronograph watch with multiple dials and stainless steel.'
  },

  {
    id: 12,
    name: 'Luxury Diamond Watch',
    price: 12999,
    category: 'Watches',
    subcategory: 'Luxury',
    gender: 'women',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&auto=format&fit=crop&q=60',
    description: 'Luxurious watch with diamond accents and mother of pearl dial.'
  },
  {
    id: 13,
    name: 'Kids Digital Watch',
    price: 1999,
    category: 'Watches',
    subcategory: 'Digital',
    gender: 'kids',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=60',
    description: 'Fun digital watch for kids with colorful design and water resistance.'
  },

  // SHOES (8 products)
  {
    id: 17,
    name: 'Sports Running Shoes',
    price: 3999,
    category: 'Shoes',
    subcategory: 'Sports',
    gender: 'men',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60',
    description: 'Lightweight running shoes with enhanced cushioning and breathable mesh.'
  },
  {
    id: 18,
    name: 'Casual Leather Shoes',
    price: 4499,
    category: 'Shoes',
    subcategory: 'Casual',
    gender: 'men',
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&auto=format&fit=crop&q=60',
    description: 'Premium leather shoes with comfortable insoles and classic design.'
  },
  {
    id: 19,
    name: 'Formal Dress Shoes',
    price: 4999,
    category: 'Shoes',
    subcategory: 'Formal',
    gender: 'men',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&auto=format&fit=crop&q=60',
    description: 'Elegant formal shoes crafted from genuine leather for special occasions.'
  },
  {
    id: 20,
    name: 'Women\'s Athletic Shoes',
    price: 4299,
    category: 'Shoes',
    subcategory: 'Sports',
    gender: 'women',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&auto=format&fit=crop&q=60',
    description: 'Women\'s athletic shoes with extra cushioning and support for training.'
  },

  {
    id: 22,
    name: 'Kids Sports Shoes',
    price: 2999,
    category: 'Shoes',
    subcategory: 'Sports',
    gender: 'kids',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop&q=60',
    description: 'Durable sports shoes for kids with flexible soles and fun designs.'
  },
  {
    id: 23,
    name: 'Designer High Heels',
    price: 5999,
    category: 'Shoes',
    subcategory: 'Heels',
    gender: 'women',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&auto=format&fit=crop&q=60',
    description: 'Elegant high heels with premium finish and comfortable design.'
  },
  

  // GLASSES (8 products)
  {
    id: 25,
    name: 'Designer Sunglasses',
    price: 1999,
    category: 'Glasses',
    subcategory: 'Sunglasses',
    gender: 'women',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format&fit=crop&q=60',
    description: 'UV-protected sunglasses with polarized lenses and stylish frame.'
  },
  {
    id: 26,
    name: 'Blue Light Glasses',
    price: 1799,
    category: 'Glasses',
    subcategory: 'Prescription',
    gender: 'unisex',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=60',
    description: 'Blue light blocking glasses with anti-glare coating for screen time.'
  },
  {
    id: 27,
    name: 'Aviator Sunglasses',
    price: 2299,
    category: 'Glasses',
    subcategory: 'Sunglasses',
    gender: 'men',
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=500&auto=format&fit=crop&q=60',
    description: 'Classic aviator style sunglasses with UV400 protection.'
  },
  {
    id: 28,
    name: 'Reading Glasses',
    price: 1299,
    category: 'Glasses',
    subcategory: 'Reading',
    gender: 'unisex',
    image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=500&auto=format&fit=crop&q=60',
    description: 'Comfortable reading glasses with anti-reflective coating.'
  },


  {
    id: 31,
    name: 'Kids Sunglasses',
    price: 999,
    category: 'Glasses',
    subcategory: 'Sunglasses',
    gender: 'kids',
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=500&auto=format&fit=crop&q=60',
    description: 'Fun and safe sunglasses for kids with UV protection.'
  },
  {
    id: 32,
    name: 'Designer Optical Frames',
    price: 3899,
    category: 'Glasses',
    subcategory: 'Optical',
    gender: 'unisex',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=500&auto=format&fit=crop&q=60',
    description: 'Premium designer frames for prescription glasses.'
  },

  // AIRBUDS (8 products)
  {
    id: 41,
    name: 'Noise Cancelling Earbuds',
    price: 6999,
    category: 'Airbuds',
    subcategory: 'Noise Cancelling',
    gender: 'unisex',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60',
    description: 'True wireless earbuds with active noise cancellation and 24-hour battery.'
  },
  {
    id: 42,
    name: 'Sports Wireless Earbuds',
    price: 3499,
    category: 'Airbuds',
    subcategory: 'Sports',
    gender: 'unisex',
    image: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=500&auto=format&fit=crop&q=60',
    description: 'Sweat-resistant wireless earbuds with secure fit for workouts.'
  },
  {
    id: 43,
    name: 'Premium Gaming Earbuds',
    price: 5599,
    category: 'Airbuds',
    subcategory: 'Gaming',
    gender: 'unisex',
    image: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=500&auto=format&fit=crop&q=60',
    description: 'Low-latency wireless earbuds designed for gaming with immersive sound.'
  },
  {
    id: 44,
    name: 'Wireless Neckband Earbuds',
    price: 2899,
    category: 'Airbuds',
    subcategory: 'Wireless',
    gender: 'unisex',
    image: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=500&auto=format&fit=crop&q=60',
    description: 'Comfortable neckband-style wireless earbuds with magnetic earpieces.'
  },
  {
    id: 45,
    name: 'Budget Wireless Earbuds',
    price: 1999,
    category: 'Airbuds',
    subcategory: 'Budget',
    gender: 'unisex',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60',
    description: 'Affordable wireless earbuds with decent sound quality and battery life.'
  },
  {
    id: 46,
    name: 'Waterproof Earbuds',
    price: 4299,
    category: 'Airbuds',
    subcategory: 'Waterproof',
    gender: 'unisex',
    image: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=500&auto=format&fit=crop&q=60',
    description: 'Fully waterproof earbuds perfect for swimming and extreme sports.'
  },
  {
    id: 47,
    name: 'Kids Safe Earbuds',
    price: 1599,
    category: 'Airbuds',
    subcategory: 'Kids',
    gender: 'kids',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60',
    description: 'Volume-limited earbuds designed specifically for children\'s safety.'
  },
  {
    id: 48,
    name: 'Luxury Gold Earbuds',
    price: 8999,
    category: 'Airbuds',
    subcategory: 'Luxury',
    gender: 'unisex',
    image: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=500&auto=format&fit=crop&q=60',
    description: 'Premium earbuds with gold finish and exceptional sound quality.'
  },

  // BOOKS (8 products)
  {
    id: 49,
    name: 'The Great Novel',
    price: 599,
    category: 'Books',
    subcategory: 'Fiction',
    gender: 'unisex',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60',
    description: 'Bestselling fiction novel with captivating story and characters.'
  },
  
  {
    id: 51,
    name: 'Business Strategy Guide',
    price: 899,
    category: 'Books',
    subcategory: 'Business',
    gender: 'unisex',
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=500&auto=format&fit=crop&q=60',
    description: 'Expert guide to business strategy and entrepreneurship.'
  },
  {
    id: 52,
    name: 'Children\'s Storybook',
    price: 399,
    category: 'Books',
    subcategory: 'Children',
    gender: 'kids',
    image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=500&auto=format&fit=crop&q=60',
    description: 'Colorful storybook with engaging illustrations for children.'
  },
  {
    id: 53,
    name: 'Cookbook Collection',
    price: 799,
    category: 'Books',
    subcategory: 'Cooking',
    gender: 'unisex',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60',
    description: 'Collection of delicious recipes from around the world.'
  },

  {
    id: 55,
    name: 'Self-Help Guide',
    price: 499,
    category: 'Books',
    subcategory: 'Self-Help',
    gender: 'unisex',
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=500&auto=format&fit=crop&q=60',
    description: 'Practical guide to personal development and self-improvement.'
  },
  {
    id: 56,
    name: 'Art & Photography',
    price: 1599,
    category: 'Books',
    subcategory: 'Art',
    gender: 'unisex',
    image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=500&auto=format&fit=crop&q=60',
    description: 'Stunning collection of art and photography works.'
  },

  // CLOTHES (8 products)
  {
    id: 57,
    name: 'Men\'s Casual T-Shirt',
    price: 899,
    category: 'Clothes',
    subcategory: 'Casual',
    gender: 'men',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60',
    description: 'Comfortable cotton t-shirt perfect for casual wear.'
  },
  {
    id: 58,
    name: 'Women\'s Summer Dress',
    price: 1999,
    category: 'Clothes',
    subcategory: 'Dress',
    gender: 'women',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop&q=60',
    description: 'Elegant summer dress with floral pattern and comfortable fit.'
  },
  {
    id: 59,
    name: 'Kids Jacket',
    price: 1499,
    category: 'Clothes',
    subcategory: 'Outerwear',
    gender: 'kids',
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500&auto=format&fit=crop&q=60',
    description: 'Warm and comfortable jacket for children in various colors.'
  },
  {
    id: 60,
    name: 'Formal Shirt',
    price: 1299,
    category: 'Clothes',
    subcategory: 'Formal',
    gender: 'men',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=60',
    description: 'Premium formal shirt for business and special occasions.'
  },
  {
    id: 61,
    name: 'Women\'s Jeans',
    price: 1799,
    category: 'Clothes',
    subcategory: 'Jeans',
    gender: 'women',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60',
    description: 'Comfortable and stylish jeans with perfect fit.'
  },
  {
    id: 62,
    name: 'Sports Trackpants',
    price: 1199,
    category: 'Clothes',
    subcategory: 'Sports',
    gender: 'unisex',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&auto=format&fit=crop&q=60',
    description: 'Breathable trackpants ideal for sports and workouts.'
  },
  {
    id: 63,
    name: 'Winter Sweater',
    price: 2299,
    category: 'Clothes',
    subcategory: 'Winter',
    gender: 'unisex',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&auto=format&fit=crop&q=60',
    description: 'Warm and cozy sweater for cold winter days.'
  },
  {
    id: 64,
    name: 'Designer Handbag',
    price: 3499,
    category: 'Clothes',
    subcategory: 'Accessories',
    gender: 'women',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=60',
    description: 'Elegant designer handbag with premium finish and ample space.'
  }
];