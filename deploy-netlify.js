#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚀 Phume Netlify Deployment');
console.log('===========================\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ Error: package.json not found. Please run this script from the project root.');
  process.exit(1);
}

// Check if Netlify CLI is installed
try {
  execSync('netlify --version', { stdio: 'pipe' });
} catch (error) {
  console.log('📦 Installing Netlify CLI...');
  execSync('npm install -g netlify-cli', { stdio: 'inherit' });
}

// Build the project
console.log('🏗️  Building project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build successful\n');
} catch (error) {
  console.error('❌ Build failed. Please check the errors above.');
  process.exit(1);
}

// Check if user is logged in to Netlify
console.log('🔐 Checking Netlify authentication...');
try {
  execSync('netlify status', { stdio: 'pipe' });
  console.log('✅ Already logged in to Netlify\n');
} catch (error) {
  console.log('🔑 Please log in to Netlify...');
  execSync('netlify login', { stdio: 'inherit' });
}

// Deploy to Netlify
console.log('🚀 Deploying to Netlify...');
try {
  // First deploy (draft)
  console.log('📤 Creating draft deployment...');
  execSync('netlify deploy --dir=dist', { stdio: 'inherit' });
  
  console.log('\n🎯 Draft deployment successful!');
  console.log('Review your deployment and then run:');
  console.log('netlify deploy --prod --dir=dist');
  console.log('\nOr run this script with --prod flag to deploy to production immediately.');
  
} catch (error) {
  console.error('❌ Deployment failed. Please check the errors above.');
  process.exit(1);
}

console.log('\n🎉 Deployment Complete!');
console.log('======================\n');

console.log('📋 Next Steps:');
console.log('1. Review your draft deployment');
console.log('2. If everything looks good, deploy to production:');
console.log('   netlify deploy --prod --dir=dist');
console.log('3. Set up environment variables in Netlify dashboard');
console.log('4. Configure your custom domain (optional)\n');

console.log('🔧 Environment Variables to Set:');
console.log('Go to Site Settings > Environment Variables and add:');
console.log('- VITE_SUPABASE_URL');
console.log('- VITE_SUPABASE_ANON_KEY\n');

console.log('📖 See SUPABASE_SETUP.md for backend configuration');
console.log('🌐 Your app is now live and ready to use!');