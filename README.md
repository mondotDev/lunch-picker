# Lunch Picker App (Triage → Filter → Spinner)

A minimal React + Vite + Tailwind starter that helps you decide what’s for lunch.
It ships with 12 mock restaurant records formatted exactly like a Yelp Business
Search API response, so wiring up the live API later is trivial.

## Quick start

```bash
npm install         # install dependencies
npm run dev         # start Vite dev server
npm run build       # production build
```

The **fake data** lives in `src/data/fakeRestaurants.js`:

```js
import fake from './fakeRestaurants';
console.log(fake.businesses[0].name);
```

When you swap to live data, simply replace the import with your API call.

### Screens

1. **Triage** – choose *Delivery* or *Pickup*  
2. **Filter** – toggle diet/price/distance/cuisine chips  
3. **Spinner** – spin wheel to pick a restaurant  

### Tech

* React 18 + Vite
* Tailwind CSS
* React Router v6 (hash router for easy static deploy)
* Framer‑motion stub included for future spinner animation

---

MIT License
