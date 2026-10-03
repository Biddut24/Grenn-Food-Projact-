import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  DollarSign,
  Package,
  RefreshCw,
  ShoppingBasket,
  Users,
} from 'lucide-react';
import { getOrders, type AdminOrder } from './api';

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export default function AdminPanel() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadOrders = async () => {
    setLoading(true);
    setError('');
    try {
      setOrders(await getOrders());
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Orders could not be loaded.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadOrders();
  }, []);

  const totalRevenue = useMemo(
    () => orders.reduce((total, order) => total + order.subtotal, 0),
    [orders],
  );
  const totalItems = useMemo(
    () => orders.reduce((total, order) => total + order.items.reduce((count, item) => count + item.quantity, 0), 0),
    [orders],
  );

  return (
    <div className="min-h-screen bg-[#f4f7f0] text-ink">
      <header className="border-b border-leaf/10 bg-cream px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3 text-sm font-extrabold text-ink transition hover:text-leaf">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-leaf text-white shadow-card">
              <ShoppingBasket className="h-5 w-5" />
            </span>
            <span><span className="block font-display text-xl">GreenBasket</span><span className="block text-[10px] uppercase tracking-[0.16em] text-leaf/70">Admin panel</span></span>
          </a>
          <a href="/" className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-xs font-extrabold text-ink transition hover:border-leaf hover:text-leaf"><ArrowLeft className="h-4 w-4" /> Back to store</a>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-12">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-leaf"><Package className="h-4 w-4" /> Operations</p>
            <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.06em] text-ink sm:text-5xl">Orders overview</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-ink/60">Review orders created in this browser’s GreenBasket frontend demo.</p>
          </div>
          <button onClick={() => void loadOrders()} className="inline-flex items-center justify-center gap-2 rounded-full bg-leaf px-5 py-3 text-xs font-extrabold text-white transition hover:bg-leaf-dark disabled:opacity-60" disabled={loading}><RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh orders</button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard icon={<ShoppingBasket className="h-5 w-5" />} label="Total orders" value={String(orders.length)} tone="bg-[#e7f3df]" />
          <MetricCard icon={<DollarSign className="h-5 w-5" />} label="Gross revenue" value={`$${totalRevenue.toFixed(2)}`} tone="bg-[#fff0d9]" />
          <MetricCard icon={<Package className="h-5 w-5" />} label="Items sold" value={String(totalItems)} tone="bg-[#e5f1f4]" />
          <MetricCard icon={<Users className="h-5 w-5" />} label="Average order" value={orders.length ? `$${(totalRevenue / orders.length).toFixed(2)}` : '$0.00'} tone="bg-[#f5e9ee]" />
        </div>

        <section className="mt-8 overflow-hidden rounded-[28px] border border-ink/8 bg-white shadow-card">
          <div className="flex flex-col justify-between gap-3 border-b border-ink/8 px-5 py-5 sm:flex-row sm:items-center sm:px-7"><div><h2 className="font-display text-2xl font-semibold">Placed orders</h2><p className="mt-1 text-xs text-ink/50">Newest orders appear first.</p></div><span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#edf7e9] px-3 py-2 text-xs font-extrabold text-leaf"><CheckCircle2 className="h-4 w-4" /> Local browser storage</span></div>
          {loading ? <div className="flex items-center justify-center gap-3 px-6 py-16 text-sm text-ink/55"><RefreshCw className="h-5 w-5 animate-spin text-leaf" /> Loading orders...</div> : error ? <div className="px-6 py-16 text-center"><p className="text-sm font-bold text-red-600">{error}</p><button onClick={() => void loadOrders()} className="mt-4 rounded-full bg-leaf px-4 py-2 text-xs font-extrabold text-white">Try again</button></div> : orders.length === 0 ? <div className="px-6 py-16 text-center"><Package className="mx-auto h-10 w-10 text-ink/20" /><h3 className="mt-4 font-display text-2xl font-semibold">No orders yet</h3><p className="mt-2 text-sm text-ink/50">When a customer checks out, the order will appear here.</p></div> : <div className="divide-y divide-ink/8">{orders.slice().reverse().map((order) => <OrderRow key={order.id} order={order} />)}</div>}
        </section>

        <p className="mt-5 flex items-center gap-2 text-xs text-ink/45"><Clock3 className="h-4 w-4" /> This frontend-only demo stores orders in localStorage on this browser. It is not shared across devices or permanent server storage.</p>
      </main>
    </div>
  );
}

function MetricCard({ icon, label, value, tone }: { icon: ReactNode; label: string; value: string; tone: string }) {
  return <div className={`rounded-[22px] ${tone} p-5`}><span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-leaf shadow-sm">{icon}</span><p className="mt-5 text-xs font-bold text-ink/55">{label}</p><p className="mt-1 font-display text-3xl font-semibold tracking-[-0.05em] text-ink">{value}</p></div>;
}

function OrderRow({ order }: { order: AdminOrder }) {
  const itemCount = order.items.reduce((total, item) => total + item.quantity, 0);
  return <article className="grid gap-4 px-5 py-5 sm:px-7 lg:grid-cols-[1.15fr_1fr_auto] lg:items-center"><div><div className="flex flex-wrap items-center gap-2"><h3 className="font-extrabold text-ink">{order.id}</h3><span className="rounded-full bg-[#edf7e9] px-2 py-1 text-[10px] font-extrabold text-leaf">Placed</span></div><p className="mt-2 text-xs text-ink/50">{formatDate(order.createdAt)}</p></div><div className="flex flex-wrap gap-2">{order.items.map((item) => <span key={item.productId} className="rounded-full bg-[#f5f6f0] px-3 py-1.5 text-xs font-semibold text-ink/65">{item.name} × {item.quantity}</span>)}</div><div className="text-left lg:text-right"><p className="font-display text-2xl font-semibold text-leaf">${order.subtotal.toFixed(2)}</p><p className="mt-1 text-xs font-semibold text-ink/45">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p></div></article>;
}
