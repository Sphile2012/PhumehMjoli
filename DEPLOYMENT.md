# Phume - Deployment Guide

## ✅ Build Status

The application builds successfully and is ready for deployment!

## 🚀 Quick Deploy

### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite configuration
6. Add environment variables (optional):
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
7. Click "Deploy"

### Option 2: Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variables (optional):
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
7. Click "Deploy site"

### Option 3: GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to package.json:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Update vite.config.ts:
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // ... rest of config
   })
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

## 🔧 Environment Variables

The app works in **demo mode** without Supabase configuration. To enable full functionality:

### Required for Production:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Optional:
```env
VITE_ENABLE_ROUTE_MESSAGING=true
```

## 📦 Build Locally

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Features

### ✅ Working Features (Demo Mode):
- Full UI/UX with Instagram-like interface
- Mock data for posts, stories, and users
- Like, save, and comment interactions (in-memory)
- Responsive design (mobile & desktop)
- Smooth animations and transitions
- Error boundary for graceful error handling
- Loading states

### 🔌 Supabase Integration (When Configured):
- Real user authentication
- Database-backed posts and stories
- Real-time messaging
- Persistent likes and follows
- User profiles
- File storage for media

## 🐛 Troubleshooting

### Blank Page After Deployment

1. **Check browser console** for errors
2. **Verify environment variables** are set correctly
3. **Check base URL** in vite.config.ts matches your deployment path
4. **Clear browser cache** and hard refresh (Ctrl+Shift+R)

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run build
```

### Supabase Connection Issues

The app will automatically fall back to demo mode if Supabase is not configured. Check:
1. Environment variables are correctly set
2. Supabase project is active
3. API keys are valid
4. Database migrations have been run

## 📱 Testing Deployment

After deployment, test these features:
- [ ] Home page loads
- [ ] Navigation works
- [ ] Posts display correctly
- [ ] Stories carousel works
- [ ] Like/save interactions work
- [ ] Mobile responsive design
- [ ] Error pages display correctly

## 🔐 Security Notes

- Never commit `.env.local` or `.env` files
- Use environment variables for all sensitive data
- Supabase RLS policies are configured for security
- API keys should be kept secret

## 📊 Performance

Current build size:
- CSS: ~110 KB (gzipped: ~17 KB)
- JS: ~806 KB (gzipped: ~242 KB)

Consider code splitting for better performance:
```typescript
// Use dynamic imports for routes
const Home = lazy(() => import('@/pages/Home'))
```

## 🎨 Customization

### Branding
- Logo: Update in `src/components/Layout.tsx`
- Favicon: Replace `public/instagram-favicon.png`
- Colors: Modify `src/index.css` theme variables
- Footer: Update in `src/components/Layout.tsx`

### Features
- Add new pages in `src/pages/`
- Add routes in `src/App.tsx`
- Extend API in `src/api/`

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Review the error boundary message
3. Check network tab for failed requests
4. Verify environment variables

---

**Built by Phumeh** • Instagram Clone with React, TypeScript, Vite, and Supabase