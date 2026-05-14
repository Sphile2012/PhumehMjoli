# 🚀 Phume Supabase Setup Guide

## Quick Setup (5 minutes)

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose your organization
4. Enter project name: `phume-instagram-clone`
5. Enter database password (save this!)
6. Select region closest to your users
7. Click "Create new project"

### Step 2: Get Your Credentials
1. Go to **Settings** → **API**
2. Copy your **Project URL**
3. Copy your **anon/public key**

### Step 3: Configure Environment Variables
1. Open `.env.local` in your project
2. Replace the placeholder values:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 4: Run Database Setup
1. Go to **SQL Editor** in your Supabase dashboard
2. Copy the entire contents of `supabase-setup.sql`
3. Paste it into the SQL Editor
4. Click "Run" to execute the script

### Step 5: Test Your Setup
```bash
npm run dev
```

Your app should now be fully functional with:
- ✅ Real user authentication
- ✅ Persistent posts and stories
- ✅ Real-time likes and comments
- ✅ Follow/unfollow system
- ✅ Direct messaging
- ✅ File storage ready

## 🎯 Features Enabled

### Authentication
- Email/password signup and login
- Automatic profile creation
- Session management
- Password reset (configurable)

### Posts & Stories
- Create, read, update, delete posts
- Image/video/carousel support
- Hashtags and location tagging
- Stories with 24-hour expiration
- Automatic cleanup of expired stories

### Social Features
- Like/unlike posts
- Comment system with replies
- Follow/unfollow users
- Real-time notifications
- Direct messaging

### Database Features
- Row Level Security (RLS) enabled
- Automatic counter updates
- Real-time subscriptions
- Optimized indexes
- Data validation

## 🔧 Advanced Configuration

### Enable File Storage
1. Go to **Storage** in Supabase dashboard
2. Create a new bucket: `media`
3. Set it to public
4. Configure upload policies

### Enable Real-time
Real-time is already configured for:
- Posts (new posts appear instantly)
- Comments (live comment updates)
- Likes (instant like counts)
- Messages (real-time chat)
- Follows (live follower counts)

### Email Templates (Optional)
1. Go to **Authentication** → **Email Templates**
2. Customize signup confirmation email
3. Customize password reset email
4. Add your branding

### Social Login (Optional)
1. Go to **Authentication** → **Providers**
2. Enable Google, GitHub, etc.
3. Configure OAuth credentials
4. Update your app to use social login

## 🛠️ Database Schema

### Tables Created
- `profiles` - User profiles and metadata
- `posts` - User posts with media
- `stories` - Temporary stories (24h expiration)
- `comments` - Post comments with threading
- `likes` - Post likes tracking
- `follows` - User relationships
- `messages` - Direct messages
- `story_views` - Story view tracking

### Automatic Features
- **Triggers**: Auto-update counters (likes, follows, posts)
- **Functions**: Handle new user registration
- **Policies**: Row Level Security for data protection
- **Indexes**: Optimized for performance

## 🚨 Troubleshooting

### Common Issues

**1. "Invalid API key" error**
- Check your environment variables
- Ensure `.env.local` is in project root
- Restart your dev server after changes

**2. Database connection failed**
- Verify your project URL is correct
- Check if your Supabase project is active
- Ensure you've run the SQL setup script

**3. Authentication not working**
- Check if email confirmation is disabled in Auth settings
- Verify RLS policies are set up correctly
- Check browser console for detailed errors

**4. Real-time not working**
- Ensure tables are added to replication
- Check if your subscription is active
- Verify network connectivity

### Debug Mode
Add this to your `.env.local` for debugging:
```env
VITE_DEBUG_SUPABASE=true
```

### Reset Database
If you need to start over:
1. Go to **Settings** → **General**
2. Scroll to "Danger Zone"
3. Click "Reset database"
4. Re-run the setup SQL script

## 📊 Performance Tips

### Optimize Images
- Use WebP format when possible
- Implement image compression
- Add lazy loading for better performance

### Database Optimization
- Use pagination for large datasets
- Implement proper indexing
- Use select() to limit returned columns

### Real-time Optimization
- Subscribe only to necessary channels
- Unsubscribe when components unmount
- Use filters to reduce data transfer

## 🔐 Security Best Practices

### Environment Variables
- Never commit `.env.local` to git
- Use different projects for dev/staging/prod
- Rotate API keys regularly

### Row Level Security
- All tables have RLS enabled
- Users can only access their own data
- Public data is properly filtered

### File Upload Security
- Implement file type validation
- Set file size limits
- Scan uploads for malware (optional)

## 🚀 Deployment

### Environment Variables for Production
Set these in your hosting provider:
```env
VITE_SUPABASE_URL=your_production_url
VITE_SUPABASE_ANON_KEY=your_production_key
```

### Supabase Production Checklist
- [ ] Enable email confirmations
- [ ] Set up custom domain (optional)
- [ ] Configure CORS settings
- [ ] Set up monitoring and alerts
- [ ] Enable database backups
- [ ] Configure rate limiting

## 📞 Support

### Getting Help
1. Check Supabase documentation: [supabase.com/docs](https://supabase.com/docs)
2. Join Supabase Discord community
3. Check GitHub issues for common problems
4. Review browser console for error details

### Useful Commands
```bash
# Check if Supabase is connected
npm run dev

# Reset local environment
rm .env.local && npm run setup-supabase

# Build for production
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

---

**🎉 Congratulations!** Your Phume Instagram clone now has a fully functional backend with Supabase. Users can sign up, create posts, interact with content, and message each other in real-time.

*Built by Phumeh • Powered by Supabase*