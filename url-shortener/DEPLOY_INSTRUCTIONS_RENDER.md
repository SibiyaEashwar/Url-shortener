# Deploy notes (Vercel frontend + Render backend)

## 1) Update frontend API base URL (axios)
Your frontend currently uses:
- `http://localhost:5000/api` (works only locally)

Change `url-shortener/frontend/src/api/axios.js` to your Render backend domain:

```js
import axios from "axios";

const api = axios.create({
  baseURL: "https://<YOUR_RENDER_BACKEND_DOMAIN>.onrender.com/api",
});

export default api;
```

## 2) Redeploy frontend on Vercel
1. Commit the change to git.
2. Push to GitHub.
3. In Vercel: it should auto-deploy after the push.
4. Confirm the new deployment is successful.

## 3) If Vercel is not auto-deploying
In Vercel dashboard:
- Open the frontend project → **Deployments** → **New Deployment**.

## 4) What to verify after deploying
- Browser console has no network errors.
- API calls go to `https://<YOUR_RENDER_BACKEND_DOMAIN>.onrender.com/api/...`.


