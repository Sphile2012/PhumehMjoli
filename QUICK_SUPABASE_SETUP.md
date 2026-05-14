# 🚀 Quick Supabase Setup for Phume (5 Minutes)

## Step 1: Create Supabase Account & Project

1. **Go to** [supabase.com](https://supabase.com)
2. **Click** "Start your project"
3. **Sign up** with GitHub (recommended) or email
4. **Create Organization** (if first time)
5. **Click** "New Project"
6. **Fill in**:
   - Name: `phume-instagram-clone`
   - Database Password: (create a strong password - SAVE THIS!)
   - Region: Choose closest to you
   - Pricing Plan: Free tier is perfect
7. **Click** "Create new project"
8. **Wait** 2-3 minutes for project to initialize

## Step 2: Get Your Credentials

1. **Go to** Settings (⚙️ icon in sidebar)
2. **Click** "API" in the settings menu
3. **Copy** these two values:
   - **Project URL** (looks like: `https://abcdefgh.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

## Step 3: Update Environment Variables

1. **Open** `.env.local` in your project root
2. **Replace** with your actual values:

```env
VITE_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YOUR-ACTUAL-KEY

VITE_ENABLE_ROUTE_MESSAGING=true
VITE_APP_CREATOR=Phumeh Mjoli
```

3. **Save** the file

## Step 4: Run Database Setup

1. **Go to** SQL Editor in Supabase dashboard (left sidebar)
2. **Click** "New query"
3. **Open** `supabase-setup.sql` from your project
4. **Copy ALL** the SQL code
5. **Paste** into Supabase SQL Editor
6. **Click** "Run" (or press Ctrl+Enter)
7. **Wait** for "Success" message

## Step 5: Configure Authentication

1. **Go to** Authentication → Providers
2. **Enable** Email provider (should be on by default)
3. **Go to** Authentication → URL Configuration
4. **Set** Site URL to: `http://localhost:8080` (for development)
5. **Add** Redirect URLs:
   - `http://localhost:8080`
   - `http://localhost:5173`
   - Your production URL (when deployed)

## Step 6: Disable Email Confirmation (For Testing)

1. **Go to** Authentication → Providers
2. **Click** on Email provider
3. **Toggle OFF** "Confirm email"
4. **Click** "Save"

> ⚠️ **Important**: Re-enable email confirmation before going to production!

## Step 7: Test Your Setup

1. **Restart** your development server:
```bash
npm run dev
```

2. **Open** http://localhost:8080
3. **Click** "Sign In" button
4. **Try** creating an account:
   - Email: `test@example.com`
   - Password: `password123`
   - Username: `testuser`
   - Full Name: `Test User`

5. **Check** if you can:
   - ✅ Sign up successfully
   - ✅ See your profile
   - ✅ Create posts
   - ✅ Like posts
   - ✅ Follow users

## 🎉 You're Done!

Your Phume Instagram clone now has:
- ✅ Real user authentication
- ✅ Database-backed posts
- ✅ Persistent data
- ✅ Real-time features
- ✅ Secure Row Level Security

## 🔧 Troubleshooting

### "Invalid API key" error
- Double-check your `.env.local` file
- Make sure there are no extra spaces
- Restart your dev server after changing env vars

### Can't sign up
- Check if email confirmation is disabled
- Verify your Supabase project is active
- Check browser console for detailed errors

### Database errors
- Make sure you ran the entire SQL setup script
- Check if all tables were created in Table Editor
- Try running the script again

### Still not working?
1. Check Supabase project status (should be "Active")
2. Verify your internet connection
3. Check browser console for errors
4. Try clearing browser cache and cookies

## 📱 For Production Deployment

When deploying to Netlify/Vercel:

1. **Add** environment variables in your hosting dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

2. **Update** Supabase Auth URLs:
   - Site URL: Your production URL
   - Redirect URLs: Add your production URL

3. **Enable** email confirmation

4. **Set up** custom domain (optional)

## 🆘 Need Help?

- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Discord**: Join Supabase Discord community
- **Check**: Browser console for error messages
- **Verify**: All environment variables are set correctly

---

**🎊 Congratulations!** Your Phume Instagram clone is now fully functional with a real backend!