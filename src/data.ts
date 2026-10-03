export type Category = {
  id: string;
  name: string;
  count: string;
  image: string;
  tone: string;
  accent: string;
};

export type Product = {
  id: string;
  name: string;
  unit: string;
  price: number;
  oldPrice?: number;
  category: string;
  image: string;
  badge?: string;
  tone: string;
};

export const categories: Category[] = [
  {
    id: 'vegetables',
    name: 'Vegetables',
    count: '120+ items',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=720&q=85',
    tone: 'bg-[#edf5e6]',
    accent: 'text-leaf',
  },
  {
    id: 'fruits',
    name: 'Fruits',
    count: '80+ items',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=720&q=85',
    tone: 'bg-[#fff1df]',
    accent: 'text-[#df7c24]',
  },
  {
    id: 'herbs',
    name: 'Herbs & Greens',
    count: '60+ items',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=720&q=85',
    tone: 'bg-[#eef6e9]',
    accent: 'text-[#4c8d55]',
  },
  {
    id: 'dairy',
    name: 'Dairy & Eggs',
    count: '40+ items',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=720&q=85',
    tone: 'bg-[#edf2fb]',
    accent: 'text-[#5a7bb5]',
  },
  {
    id: 'pantry',
    name: 'Nuts & Seeds',
    count: '50+ items',
    image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=720&q=85',
    tone: 'bg-[#fff4df]',
    accent: 'text-[#9b6f2d]',
  },
];

export const products: Product[] = [
  {
    id: 'tomatoes',
    name: 'Organic Tomatoes',
    unit: '500 g / pack',
    price: 2.49,
    category: 'vegetables',
    image: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=720&q=85',
    badge: 'Best seller',
    tone: 'bg-[#fff3ed]',
  },
  {
    id: 'carrots',
    name: 'Fresh Carrots',
    unit: '1 kg / bunch',
    price: 1.49,
    category: 'vegetables',
    image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=720&q=85',
    badge: 'Farm pick',
    tone: 'bg-[#fff6e8]',
  },
  {
    id: 'spinach',
    name: 'Green Spinach',
    unit: '1 bunch',
    price: 1.29,
    category: 'herbs',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=720&q=85',
    badge: 'Picked today',
    tone: 'bg-[#edf7eb]',
  },
  {
    id: 'apples',
    name: 'Red Apples',
    unit: '1 kg / bag',
    price: 2.99,
    category: 'fruits',
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=720&q=85',
    badge: 'Sweet & crisp',
    tone: 'bg-[#fff0ef]',
  },
  {
    id: 'eggs',
    name: 'Farm Eggs',
    unit: '6 pcs / carton',
    price: 1.99,
    category: 'dairy',
    image: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&w=720&q=85',
    badge: 'Free range',
    tone: 'bg-[#fff8e8]',
  },
];

export const benefits = [
  { title: 'Farm fresh', copy: 'Handpicked with care', icon: 'sprout', tone: 'bg-[#edf7e9]', iconTone: 'text-leaf' },
  { title: 'Chemical free', copy: 'Safe for you & family', icon: 'droplets', tone: 'bg-[#eaf5f6]', iconTone: 'text-[#2b92a0]' },
  { title: 'Sustainably grown', copy: 'Good for nature', icon: 'sun', tone: 'bg-[#fff5e1]', iconTone: 'text-[#a67922]' },
  { title: 'Premium quality', copy: 'Best quality assured', icon: 'shield', tone: 'bg-[#fff0f0]', iconTone: 'text-[#c25959]' },
];

export const footerColumns = [
  { title: 'Quick links', links: ['Shop', 'Categories', 'Deals', 'About us', 'Contact'] },
  { title: 'Customer service', links: ['My account', 'Track order', 'Shipping & delivery', 'Returns & refunds', 'FAQs'] },
  { title: 'Information', links: ['Privacy policy', 'Terms & conditions', 'Refund policy', 'Blog', 'Careers'] },
];
