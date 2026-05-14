#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Phume Deployment Script');
console.log('==========================\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ Error: package.json not found. Please run this script from the project root.');
  process.exit(1);
}

// Check if node_modules exists
if (!fs.existsSync('node_modules')) {
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
}

// Run linting
console.log('🔍 Running linter...');
try {
  execSync('npm run lint', { stdio: 'inherit' });
  console.log('✅ Linting passed\n');
} catch (error) {
  console.log('⚠️  Linting warnings found, continuing...\n');
}

// Run TypeScript check
console.log('🔧 Checking TypeScript...');
try {
  execSync('npx tsc --noEmit', { stdio: 'inherit' });
  console.log('✅ TypeScript check passed\n');
} catch (error) {
  console.error('❌ TypeScript errors found. Please fix them before deploying.');
  process.exit(1);
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

// Check if dist folder was created
if (!fs.existsSync('dist')) {
  console.error('❌ Error: dist folder not found after build.');
  process.exit(1);
}

console.log('🎉 Deployment ready!');
console.log('==================\n');
console.log('Your app has been built successfully.');
console.log('The dist/ folder contains your production-ready files.\n');

console.log('Next steps:');
console.log('1. Deploy the dist/ folder to your hosting provider');
console.log('2. Set up environment variables if using Supabase');
console.log('3. Test your deployment\n');

console.log('Quick deploy options:');
console.log('• Vercel: vercel --prod');
console.log('• Netlify: netlify deploy --prod --dir=dist');
console.log('• GitHub Pages: npm run deploy (after setup)\n');

console.log('📖 See DEPLOYMENT.md for detailed instructions');
console.log('🔗 Demo: The app works without Supabase configuration');