# Amazing Chinese Restaurant

A premium Next.js restaurant website starter with:

- Multilingual homepage
- Interactive menu
- Cart and checkout flow
- Table booking
- Reviews
- Built-in rule-based AI chatbot
- Role-based dashboards for owner, manager, and customer
- Dark mode, loyalty points, coupons, WhatsApp, map embed, and social gallery

## Run locally

1. Install Node.js 20+.
2. Run `npm install`
3. Run `npm run dev`
4. Open `http://localhost:3000`

## GitHub Pages

- The project is configured for static export with `next build`.
- The included GitHub Actions workflow deploys the generated `out/` directory to GitHub Pages.
- Because GitHub Pages is static hosting, the current owner/manager/customer systems work as demo flows stored in browser `localStorage`, not as a real server-backed backend.

## Demo accounts

- Owner: `owner@amazingchinese.in` / `owner123`
- Manager: `manager@amazingchinese.in` / `manager123`
- Customer: `customer@amazingchinese.in` / `customer123`

## Notes

- Data persistence currently uses browser `localStorage` for a quick demo experience.
- The UI is ready to be connected to Express, MongoDB/MySQL, JWT auth, Razorpay/Stripe, and real notification services.
