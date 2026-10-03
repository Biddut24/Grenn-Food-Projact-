export type ApiProduct = {
  id: string;
  name: string;
  unit: string;
  price: number;
  category: string;
};

export type AdminOrder = {
  id: string;
  subtotal: number;
  createdAt: string;
  items: Array<{ productId: string; name: string; quantity: number; unitPrice: number }>;
};

const ORDERS_KEY = 'greenbasket-orders';
const SUBSCRIBERS_KEY = 'greenbasket-subscribers';

function read<T>(key: string, fallback: T): T {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) as T : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export async function subscribeToNewsletter(email: string) {
  const subscribers = read<string[]>(SUBSCRIBERS_KEY, []);
  if (!subscribers.includes(email.toLowerCase())) {
    write(SUBSCRIBERS_KEY, [...subscribers, email.toLowerCase()]);
  }
  return { ok: true as const, message: 'You are on the GreenBasket list.' };
}

export async function createOrder(items: Array<{ productId: string; name?: string; quantity: number; unitPrice?: number }>) {
  const order: AdminOrder = {
    id: `GB-${Date.now().toString(36).toUpperCase()}`,
    items: items.map((item) => ({
      productId: item.productId,
      name: item.name || item.productId,
      quantity: item.quantity,
      unitPrice: item.unitPrice || 0,
    })),
    subtotal: Number(items.reduce((sum, item) => sum + (item.unitPrice || 0) * item.quantity, 0).toFixed(2)),
    createdAt: new Date().toISOString(),
  };
  const orders = read<AdminOrder[]>(ORDERS_KEY, []);
  write(ORDERS_KEY, [...orders, order]);
  window.dispatchEvent(new Event('greenbasket-orders-updated'));
  return { ok: true, order };
}

export async function getOrders() {
  return read<AdminOrder[]>(ORDERS_KEY, []).slice().reverse();
}
