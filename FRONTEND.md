# GreenBasket frontend-only mode

The GreenBasket project is configured as a frontend-only React/Vite app for static hosting.

## Start locally

```bash
npm install
npm run dev
```

The frontend runs on `http://localhost:3000`.

## Browser storage behavior

The catalog comes from `src/data.ts`. Demo state is stored in browser `localStorage`:

- `greenbasket-cart` — cart lines are restored after a page refresh.
- `greenbasket-orders` — successful checkout creates a local order record.
- `greenbasket-subscribers` — newsletter subscriptions are stored locally.

A successful checkout saves the order, clears the cart, closes the cart drawer, and shows a success message.

## Admin demo

Open `/admin` to view total orders, gross revenue, items sold, average order value, and each placed order saved in this browser.

## Important note

Because this is frontend-only, orders are not permanent server records, are not shared across devices, and are cleared if browser storage is cleared. Real orders, payments, SMS notifications, secure admin login, and cross-device data require a backend.
