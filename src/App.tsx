import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Heart,
  Leaf,
  Menu,
  Minus,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sprout,
  Truck,
  X,
  Zap,
} from 'lucide-react';
import { createOrder, subscribeToNewsletter } from './api';
import AdminPanel from './AdminPanel';
import { benefits, categories, footerColumns, products, type Product } from './data';

const heroImage = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=90';
const farmImage = 'https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=1100&q=88';
const offerImage = 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=1100&q=88';

type CartLine = { product: Product; quantity: number };

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 ${compact ? 'scale-90 origin-left' : ''}`}>
      <span className="relative flex h-11 w-11 items-center justify-center rounded-[15px] bg-leaf text-white shadow-card">
        <ShoppingBasketMark />
        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-cream bg-lime" />
      </span>
      <span className="leading-none">
        <span className="block font-display text-[24px] font-semibold tracking-[-0.06em] text-ink">GreenBasket</span>
        <span className="mt-1 block font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-leaf/70">Fresh from nature</span>
      </span>
    </div>
  );
}

function ShoppingBasketMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="h-7 w-7 fill-none stroke-current stroke-[1.8]">
      <path d="M7 12h18l-2 13H9L7 12Z" />
      <path d="M11 12c0-4.7 2-7 5-7s5 2.3 5 7" />
      <path d="M10 16h12M11.5 20h9M13 24h6" />
      <path d="M5.5 12h21" />
    </svg>
  );
}

function SectionHeading({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: string }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="mb-2 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-leaf"><Leaf className="h-3.5 w-3.5 fill-leaf" />{eyebrow}</p>}
        <h2 className="font-display text-3xl font-semibold tracking-[-0.055em] text-ink sm:text-[37px]">{title}</h2>
      </div>
      {action && <button className="group hidden items-center gap-2 pb-1 text-sm font-bold text-ink/70 transition hover:text-leaf sm:flex">{action}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></button>}
    </div>
  );
}

function Storefront() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartLine[]>(() => {
    try {
      const savedCart = window.localStorage.getItem('greenbasket-cart');
      return savedCart ? JSON.parse(savedCart) as CartLine[] : [];
    } catch {
      return [];
    }
  });
  const [activeCategory, setActiveCategory] = useState('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterState, setNewsletterState] = useState<'idle' | 'error' | 'success'>('idle');
  const [searchOpen, setSearchOpen] = useState(false);
  const [orderState, setOrderState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    window.localStorage.setItem('greenbasket-cart', JSON.stringify(cart));
  }, [cart]);

  const cartCount = cart.reduce((total, line) => total + line.quantity, 0);
  const cartTotal = cart.reduce((total, line) => total + line.product.price * line.quantity, 0);
  const visibleProducts = useMemo(() => activeCategory === 'all' ? products : products.filter((product) => product.category === activeCategory), [activeCategory]);

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find((line) => line.product.id === product.id);
      if (existing) return current.map((line) => line.product.id === product.id ? { ...line, quantity: line.quantity + 1 } : line);
      return [...current, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((current) => current.flatMap((line) => {
      if (line.product.id !== productId) return [line];
      const quantity = line.quantity + delta;
      return quantity > 0 ? [{ ...line, quantity }] : [];
    }));
  };

  const validateNewsletter = async () => {
    if (!/^\S+@\S+\.\S+$/.test(newsletterEmail)) {
      setNewsletterState('error');
      return;
    }
    try {
      await subscribeToNewsletter(newsletterEmail);
      setNewsletterState('success');
    } catch {
      setNewsletterState('error');
    }
  };

  const submitOrder = async () => {
    setOrderState('loading');
    try {
      await createOrder(cart.map(({ product, quantity }) => ({ productId: product.id, name: product.name, unitPrice: product.price, quantity })));
      setCart([]);
      setCartOpen(false);
      setOrderState('idle');
      setOrderSuccess(true);
      window.setTimeout(() => setOrderSuccess(false), 4500);
    } catch {
      setOrderState('error');
    }
  };

  const browseCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-ink">
      <div className="bg-leaf-dark px-5 py-2 text-[11px] font-semibold text-white/90 sm:px-8">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4">
          <p className="flex items-center gap-2"><Truck className="h-3.5 w-3.5 text-lime" /> Free delivery on orders over $49</p>
          <p className="hidden items-center gap-2 sm:flex"><Leaf className="h-3.5 w-3.5 text-lime" /> 100% organic & fresh</p>
          <p className="flex items-center gap-2"><Clock3 className="h-3.5 w-3.5 text-lime" /> Support 24/7</p>
        </div>
      </div>

      <header className="sticky top-0 z-30 border-b border-ink/5 bg-cream/95 px-5 backdrop-blur-md sm:px-8">
        <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between gap-6">
          <a href="#top" aria-label="GreenBasket home"><Logo /></a>
          <nav className="hidden items-center gap-8 text-[13px] font-bold text-ink/70 lg:flex">
            {['Home', 'Shop', 'Categories', 'Deals', 'About us', 'Contact'].map((item, index) => (
              <a key={item} href={index === 0 ? '#top' : index === 1 ? '#products' : index === 2 ? '#categories' : index === 3 ? '#deal' : '#footer'} className={`relative py-2 transition hover:text-leaf ${index === 0 ? 'text-ink after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-leaf' : ''}`}>{item}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <button aria-label="Search products" onClick={() => setSearchOpen(true)} className="rounded-full p-2.5 transition hover:bg-white hover:text-leaf"><Search className="h-5 w-5" /></button>
            <button aria-label="Account" className="hidden rounded-full p-2.5 transition hover:bg-white hover:text-leaf sm:block"><CircleUserRound className="h-5 w-5" /></button>
            <button aria-label={`Shopping cart with ${cartCount} items`} onClick={() => setCartOpen(true)} className="relative rounded-full p-2.5 transition hover:bg-white hover:text-leaf"><ShoppingCart className="h-5 w-5" />{cartCount > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-leaf px-1 text-[10px] font-bold text-white">{cartCount}</span>}</button>
            <button aria-label="Toggle menu" onClick={() => setMobileOpen((open) => !open)} className="rounded-full p-2.5 transition hover:bg-white hover:text-leaf lg:hidden">{mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
          </div>
        </div>
        {mobileOpen && <nav className="border-t border-ink/5 py-4 lg:hidden">{['Home', 'Shop', 'Categories', 'Deals', 'About us', 'Contact'].map((item, index) => <a key={item} onClick={() => setMobileOpen(false)} href={index === 0 ? '#top' : index === 1 ? '#products' : index === 2 ? '#categories' : index === 3 ? '#deal' : '#footer'} className="block rounded-xl px-3 py-2.5 text-sm font-bold text-ink/70 hover:bg-white hover:text-leaf">{item}</a>)}</nav>}
      </header>

      {searchOpen && <div className="fixed inset-0 z-50 flex items-start justify-center bg-ink/30 px-5 pt-24 backdrop-blur-sm" onClick={() => setSearchOpen(false)}><div className="w-full max-w-lg rounded-[28px] bg-cream p-5 shadow-soft" onClick={(event) => event.stopPropagation()}><div className="mb-3 flex items-center justify-between"><p className="font-display text-2xl font-semibold">Find something fresh</p><button aria-label="Close search" onClick={() => setSearchOpen(false)} className="rounded-full p-2 hover:bg-white"><X className="h-5 w-5" /></button></div><div className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-white px-4 py-3"><Search className="h-5 w-5 text-ink/40" /><input autoFocus placeholder="Try “tomatoes” or “organic”" className="w-full bg-transparent text-sm outline-none placeholder:text-ink/35" /><kbd className="hidden rounded-md bg-sand px-2 py-1 text-[10px] font-bold text-ink/50 sm:block">ESC</kbd></div><p className="mt-3 text-xs text-ink/50">Search is ready for your next harvest. Browse popular picks below.</p></div></div>}

      <main id="top">
        <section className="relative mx-auto max-w-[1320px] overflow-hidden px-5 pb-8 pt-10 sm:px-8 sm:pt-16 lg:pb-12">
          <div className="absolute -left-16 top-24 h-56 w-56 rounded-full bg-lime/20 blur-3xl" />
          <div className="absolute right-8 top-16 h-48 w-48 rounded-full bg-[#dbecc4]/50 blur-3xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:gap-12">
            <div className="relative z-10 max-w-xl">
              <p className="mb-5 flex items-center gap-2 font-display text-lg italic text-leaf"><span className="h-px w-7 bg-leaf" /> Nature’s goodness <Leaf className="h-4 w-4 rotate-45 fill-leaf" /></p>
              <h1 className="max-w-[600px] font-display text-[48px] font-semibold leading-[0.98] tracking-[-0.065em] text-ink sm:text-[68px] lg:text-[76px]">Fresh food.<br /><span className="text-ink/90">Healthy life.</span><br /><em className="font-display not-italic text-leaf">Everyday.</em></h1>
              <p className="mt-6 max-w-md text-base leading-7 text-ink/65 sm:text-[17px]">100% organic fruits, vegetables & more delivered fresh to your door.</p>
              <button onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })} className="group mt-7 inline-flex items-center gap-3 rounded-full bg-leaf px-6 py-3.5 text-sm font-extrabold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-leaf-dark">Shop fresh today <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20"><ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></span></button>
              <div className="mt-9 grid max-w-lg grid-cols-3 gap-3 border-t border-ink/10 pt-5">
                {[{ icon: Leaf, title: '100% Organic', copy: 'Pure & natural' }, { icon: Truck, title: 'Fast delivery', copy: 'On time, every time' }, { icon: ShieldCheck, title: 'Secure payment', copy: 'Safe & protected' }].map(({ icon: Icon, title, copy }) => <div key={title} className="flex items-start gap-2"><span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-leaf shadow-sm"><Icon className="h-4 w-4" /></span><div><p className="text-[11px] font-extrabold text-ink">{title}</p><p className="mt-0.5 text-[10px] text-ink/50">{copy}</p></div></div>)}
              </div>
            </div>
            <div className="relative min-h-[380px] sm:min-h-[500px] lg:min-h-[560px]">
              <div className="absolute inset-0 overflow-hidden rounded-[45%_45%_35%_35%/25%_25%_45%_45%] bg-[#e9efda] shadow-soft"><img src={heroImage} alt="A basket overflowing with fresh organic vegetables" className="h-full w-full object-cover object-center transition duration-700 hover:scale-105" /></div>
              <div className="absolute -left-3 top-16 hidden -rotate-12 rounded-full border border-leaf/20 bg-cream/85 px-4 py-3 text-center shadow-sm backdrop-blur sm:block"><Leaf className="mx-auto h-6 w-6 text-leaf" /><p className="mt-1 font-display text-sm font-semibold italic text-ink">Fresh<br />& local</p></div>
              <div className="absolute bottom-12 right-2 flex h-28 w-28 -rotate-6 flex-col items-center justify-center rounded-full border-4 border-cream bg-leaf text-center text-white shadow-card sm:right-5 sm:h-36 sm:w-36"><p className="font-display text-xl font-semibold leading-none sm:text-2xl">Eat fresh</p><p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-lime sm:text-[11px]">stay healthy</p></div>
              <div className="absolute -bottom-3 left-10 h-24 w-24 rounded-full bg-lime/40 blur-2xl" />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-5 pb-12 sm:px-8 lg:pb-16">
          <div className="relative grid overflow-hidden rounded-[30px] border border-leaf/15 bg-[#f0f6e8] shadow-card lg:grid-cols-[0.85fr_1.25fr_0.8fr]">
            <div className="relative min-h-[180px] overflow-hidden lg:min-h-[195px]"><img src={farmImage} alt="A farmer carrying a crate of fresh produce" className="absolute inset-0 h-full w-full object-cover object-center" /><div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#f0f6e8] lg:bg-gradient-to-r lg:from-transparent lg:to-[#f0f6e8]" /></div>
            <div className="flex flex-col justify-center px-7 py-7 sm:px-10"><p className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-leaf">Welcome to GreenBasket</p><h2 className="mt-2 max-w-sm font-display text-3xl font-semibold leading-[0.98] tracking-[-0.06em] text-ink sm:text-[38px]">Good food starts<br /><span className="text-leaf">closer to home.</span></h2><p className="mt-3 max-w-sm text-sm leading-6 text-ink/60">We bring you the freshest, handpicked produce from trusted farms. Quality you can taste, every single time.</p><button onClick={() => document.getElementById('why')?.scrollIntoView({ behavior: 'smooth' })} className="group mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-leaf px-5 py-2.5 text-xs font-extrabold text-white transition hover:bg-leaf-dark">Our farm story <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></button></div>
            <div className="grid grid-cols-3 border-t border-leaf/10 px-6 py-6 sm:px-10 lg:grid-cols-1 lg:border-l lg:border-t-0 lg:py-7"><div className="flex items-center gap-3 border-r border-leaf/10 pr-3 lg:border-b lg:border-r-0 lg:pb-4"><span className="text-2xl font-display font-semibold text-leaf">25+</span><span className="text-[10px] font-bold leading-4 text-ink/60">Local<br />farms</span></div><div className="flex items-center gap-3 border-r border-leaf/10 px-3 lg:border-b lg:border-r-0 lg:py-4"><span className="text-2xl font-display font-semibold text-leaf">500+</span><span className="text-[10px] font-bold leading-4 text-ink/60">Fresh<br />products</span></div><div className="flex items-center gap-3 pl-3 lg:pt-4"><span className="text-2xl font-display font-semibold text-leaf">10K+</span><span className="text-[10px] font-bold leading-4 text-ink/60">Happy<br />customers</span></div></div>
          </div>
        </section>

        <section id="categories" className="mx-auto max-w-[1280px] scroll-mt-24 px-5 pb-12 sm:px-8 lg:pb-16"><SectionHeading eyebrow="Shop fresh" title="Browse by category" action="View all" /><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">{categories.map((category) => <button key={category.id} onClick={() => browseCategory(category.id)} className={`group relative overflow-hidden rounded-[22px] ${category.tone} p-3 text-left transition hover:-translate-y-1 hover:shadow-card`}><div className="relative aspect-[1.28] overflow-hidden rounded-[16px]"><img src={category.image} alt={category.name} className="h-full w-full object-cover mix-blend-multiply transition duration-500 group-hover:scale-105" /><span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-ink/60"><ArrowUpRight className="h-3.5 w-3.5" /></span></div><p className={`mt-3 text-sm font-extrabold ${category.accent}`}>{category.name}</p><p className="mt-1 text-[10px] font-semibold text-ink/45">{category.count}</p></button>)}</div></section>

        <section id="deal" className="mx-auto max-w-[1280px] scroll-mt-24 px-5 pb-12 sm:px-8 lg:pb-16"><div className="relative overflow-hidden rounded-[28px] bg-[#f9ead1] px-7 py-9 sm:px-12 lg:h-[235px] lg:py-10"><div className="relative z-10 max-w-sm"><p className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-leaf"><Zap className="h-3.5 w-3.5 fill-leaf" /> Limited time offer</p><h2 className="mt-2 font-display text-4xl font-semibold leading-none tracking-[-0.06em] text-ink sm:text-5xl">Up to <span className="text-[#dc6c1e]">30% off</span></h2><p className="mt-2 text-base font-bold text-ink/70">On fresh vegetables</p><button onClick={() => browseCategory('vegetables')} className="group mt-5 inline-flex items-center gap-2 rounded-full bg-[#e97829] px-5 py-2.5 text-xs font-extrabold text-white transition hover:bg-[#cb5e12]">Grab the deal <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></button></div><img src={offerImage} alt="Colorful fresh vegetables for the seasonal offer" className="absolute bottom-0 right-[-20px] h-[115%] w-[65%] object-cover object-left opacity-90 mix-blend-multiply sm:right-0 sm:w-[55%] lg:w-[54%]" /><span className="absolute bottom-7 right-5 flex h-24 w-24 rotate-12 flex-col items-center justify-center rounded-full border-4 border-[#f9ead1] bg-[#e97829] text-center text-[10px] font-extrabold text-white sm:right-12"><span className="text-sm">Best quality</span><span>Best price</span></span></div></section>

        <section id="why" className="mx-auto max-w-[1280px] scroll-mt-24 px-5 pb-12 sm:px-8 lg:pb-16"><SectionHeading eyebrow="The GreenBasket promise" title="Why choose us?" /><div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{benefits.map((benefit) => <div key={benefit.title} className={`rounded-[20px] ${benefit.tone} p-4 sm:p-5`}><span className={`flex h-10 w-10 items-center justify-center rounded-full bg-white ${benefit.iconTone} shadow-sm`}>{benefit.icon === 'sprout' ? <Sprout className="h-5 w-5" /> : benefit.icon === 'droplets' ? <Leaf className="h-5 w-5" /> : benefit.icon === 'sun' ? <Zap className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}</span><p className="mt-4 text-sm font-extrabold text-ink">{benefit.title}</p><p className="mt-1 text-xs text-ink/55">{benefit.copy}</p></div>)}</div></section>

        <section id="products" className="mx-auto max-w-[1280px] scroll-mt-24 px-5 pb-14 sm:px-8 lg:pb-20"><div className="mb-5 flex flex-wrap items-end justify-between gap-4"><SectionHeading eyebrow="Picked for you" title="Top picks today" /><div className="flex items-center gap-1 rounded-full bg-white p-1 shadow-sm"><button onClick={() => setActiveCategory('all')} className={`rounded-full px-3 py-1.5 text-[11px] font-extrabold transition ${activeCategory === 'all' ? 'bg-leaf text-white' : 'text-ink/55 hover:text-leaf'}`}>All</button>{categories.slice(0, 3).map((category) => <button key={category.id} onClick={() => setActiveCategory(category.id)} className={`hidden rounded-full px-3 py-1.5 text-[11px] font-extrabold transition sm:block ${activeCategory === category.id ? 'bg-leaf text-white' : 'text-ink/55 hover:text-leaf'}`}>{category.name.split(' ')[0]}</button>)}</div></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} onAdd={() => { addToCart(product); setCartOpen(true); }} />)}</div>{visibleProducts.length === 0 && <div className="rounded-2xl bg-white p-10 text-center text-sm text-ink/60">We are restocking this collection. Try another category.</div>}<div className="mt-6 flex justify-center gap-2"><button aria-label="Previous products" className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-white text-ink/60 transition hover:border-leaf hover:text-leaf"><ChevronLeft className="h-4 w-4" /></button><span className="flex items-center gap-1 px-2"><span className="h-1.5 w-6 rounded-full bg-leaf" /><span className="h-1.5 w-1.5 rounded-full bg-ink/15" /><span className="h-1.5 w-1.5 rounded-full bg-ink/15" /></span><button aria-label="Next products" className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-white text-ink/60 transition hover:border-leaf hover:text-leaf"><ChevronRight className="h-4 w-4" /></button></div></section>

        <section className="border-y border-leaf/10 bg-[#edf5e6] px-5 py-8 sm:px-8"><div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-5 sm:flex-row"><div className="flex items-center gap-3"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-leaf text-white"><ShoppingBag className="h-5 w-5" /></span><div><h2 className="font-display text-xl font-semibold tracking-[-0.03em] text-ink">Stay healthy, stay updated!</h2><p className="mt-0.5 text-xs text-ink/55">Fresh picks, seasonal offers, and good food ideas in your inbox.</p></div></div><div className="w-full max-w-md">{newsletterState === 'success' ? <div className="flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-extrabold text-leaf"><BadgeCheck className="mr-2 h-5 w-5" /> You’re on the list — welcome in.</div> : <div className="flex rounded-full bg-white p-1.5 shadow-sm"><input aria-label="Email address" type="email" value={newsletterEmail} onChange={(event) => { setNewsletterEmail(event.target.value); setNewsletterState('idle'); }} placeholder="Enter your email" className="min-w-0 flex-1 bg-transparent px-4 text-xs outline-none placeholder:text-ink/35" /><button onClick={validateNewsletter} className="rounded-full bg-leaf px-5 py-2.5 text-xs font-extrabold text-white transition hover:bg-leaf-dark">Subscribe</button></div>}{newsletterState === 'error' && <p className="mt-2 pl-4 text-xs font-bold text-red-600">Please enter a valid email address.</p>}</div></div></section>
      </main>

      <footer id="footer" className="bg-[#f8f4e8] px-5 pb-7 pt-12 sm:px-8"><div className="mx-auto max-w-[1280px]"><div className="grid gap-10 md:grid-cols-[1.3fr_2fr] lg:grid-cols-[1.2fr_2.2fr_0.8fr]"><div><Logo compact /><p className="mt-5 max-w-xs text-xs leading-5 text-ink/55">Your trusted partner for fresh, organic, and healthy food. We care for you and the planet.</p><div className="mt-5 flex gap-2">{['f', 'ig', 'p', '▶'].map((social) => <button key={social} aria-label={`GreenBasket ${social}`} className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-white transition hover:bg-leaf">{social}</button>)}</div></div><div className="grid grid-cols-3 gap-5">{footerColumns.map((column) => <div key={column.title}><h3 className="text-xs font-extrabold text-ink">{column.title}</h3><div className="mt-4 space-y-2.5">{column.links.map((link) => <a key={link} href="#top" className="block text-[11px] font-semibold text-ink/55 transition hover:text-leaf">{link}</a>)}</div></div>)}</div><div><h3 className="text-xs font-extrabold text-ink">We accept</h3><div className="mt-4 grid grid-cols-3 gap-2 text-[9px] font-extrabold text-ink/60"><span className="rounded border border-ink/10 bg-white px-2 py-1 text-center">VISA</span><span className="rounded border border-ink/10 bg-white px-2 py-1 text-center">MC</span><span className="rounded border border-ink/10 bg-white px-2 py-1 text-center">PayPal</span><span className="col-span-2 flex items-center gap-1 rounded border border-ink/10 bg-white px-2 py-1"><ShieldCheck className="h-3 w-3 text-leaf" /> SSL secure</span></div></div></div><div className="mt-10 flex flex-col justify-between gap-3 border-t border-ink/10 pt-5 text-[10px] font-semibold text-ink/45 sm:flex-row"><p>© 2026 GreenBasket. All rights reserved.</p><div className="flex gap-4"><a href="#footer" className="hover:text-leaf">Privacy</a><a href="#footer" className="hover:text-leaf">Terms</a><a href="#footer" className="hover:text-leaf">Cookies</a></div></div></div></footer>

      {cartOpen && <div className="fixed inset-0 z-50 bg-ink/25 backdrop-blur-[2px]" onClick={() => setCartOpen(false)}><aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-soft" onClick={(event) => event.stopPropagation()}><div className="flex items-center justify-between border-b border-ink/10 px-6 py-5"><div><p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-leaf">Your harvest</p><h2 className="mt-1 font-display text-2xl font-semibold">Shopping cart <span className="text-ink/35">({cartCount})</span></h2></div><button aria-label="Close cart" onClick={() => setCartOpen(false)} className="rounded-full p-2 hover:bg-white"><X className="h-5 w-5" /></button></div><div className="flex-1 overflow-y-auto px-6 py-5">{cart.length === 0 ? <div className="flex h-full flex-col items-center justify-center text-center"><span className="flex h-16 w-16 items-center justify-center rounded-full bg-mist text-leaf"><ShoppingCart className="h-7 w-7" /></span><h3 className="mt-5 font-display text-2xl font-semibold">Your cart is feeling light.</h3><p className="mt-2 max-w-xs text-sm leading-6 text-ink/55">Add a few fresh picks and we’ll get them on their way to your kitchen.</p><button onClick={() => { setCartOpen(false); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }} className="mt-5 rounded-full bg-leaf px-5 py-3 text-xs font-extrabold text-white hover:bg-leaf-dark">Browse top picks</button></div> : <div className="space-y-4">{cart.map(({ product, quantity }) => <div key={product.id} className="flex gap-3 rounded-2xl bg-white p-3"><img src={product.image} alt="" className="h-20 w-20 rounded-xl object-cover" /><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><div><h3 className="truncate text-sm font-extrabold">{product.name}</h3><p className="mt-1 text-xs text-ink/45">{product.unit}</p></div><p className="text-sm font-extrabold text-leaf">${(product.price * quantity).toFixed(2)}</p></div><div className="mt-3 flex items-center justify-between"><div className="flex items-center gap-3 rounded-full border border-ink/10 px-2 py-1"><button aria-label={`Decrease ${product.name}`} onClick={() => updateQuantity(product.id, -1)}><Minus className="h-3 w-3" /></button><span className="min-w-3 text-center text-xs font-bold">{quantity}</span><button aria-label={`Increase ${product.name}`} onClick={() => updateQuantity(product.id, 1)}><Plus className="h-3 w-3" /></button></div><button onClick={() => setCart((current) => current.filter((line) => line.product.id !== product.id))} className="text-[11px] font-bold text-ink/40 hover:text-red-500">Remove</button></div></div></div>)}</div>}</div>{cart.length > 0 && <div className="border-t border-ink/10 bg-white/60 px-6 py-5"><div className="flex items-center justify-between text-sm font-bold"><span>Subtotal</span><span className="text-xl font-display font-semibold">${cartTotal.toFixed(2)}</span></div><p className="mt-2 text-xs text-ink/50">Taxes and delivery are calculated at checkout.</p><button onClick={submitOrder} disabled={orderState === 'loading'} className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-leaf py-3.5 text-sm font-extrabold text-white transition hover:bg-leaf-dark disabled:cursor-not-allowed disabled:opacity-70">{orderState === 'loading' ? 'Creating order...' : orderState === 'error' ? 'Try again' : 'Continue to checkout'} <ArrowRight className="h-4 w-4" /></button></div>}</aside></div>}

      {orderSuccess && <div role="status" aria-live="polite" className="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-3 rounded-full bg-leaf px-5 py-3 text-sm font-extrabold text-white shadow-soft"><BadgeCheck className="h-5 w-5 text-lime" /> Order placed successfully! Your cart is clear.</div>}
    </div>
  );
}

function ProductCard({ product, onAdd }: { product: Product; onAdd: () => void }) {
  return <article className="group relative rounded-[22px] border border-ink/8 bg-white p-2.5 shadow-sm transition hover:-translate-y-1 hover:shadow-card"><div className={`relative overflow-hidden rounded-[17px] ${product.tone}`}><img src={product.image} alt={product.name} className="aspect-square w-full object-cover mix-blend-multiply transition duration-500 group-hover:scale-105" /><button aria-label={`Save ${product.name} to wishlist`} className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/85 text-ink/45 transition hover:text-red-500"><Heart className="h-3.5 w-3.5" /></button>{product.badge && <span className="absolute bottom-2 left-2 rounded-full bg-white/85 px-2 py-1 text-[9px] font-extrabold text-leaf">{product.badge}</span>}</div><div className="px-1.5 pb-1.5 pt-3"><h3 className="truncate text-[13px] font-extrabold text-ink">{product.name}</h3><p className="mt-1 text-[10px] font-semibold text-ink/45">{product.unit}</p><div className="mt-3 flex items-end justify-between gap-2"><p className="font-display text-lg font-semibold text-ink">${product.price.toFixed(2)}</p><button aria-label={`Add ${product.name} to cart`} onClick={onAdd} className="flex h-8 w-8 items-center justify-center rounded-full bg-leaf text-white transition hover:bg-leaf-dark"><Plus className="h-4 w-4" /></button></div></div></article>;
}

export default function App() {
  return window.location.pathname === '/admin' ? <AdminPanel /> : <Storefront />;
}
