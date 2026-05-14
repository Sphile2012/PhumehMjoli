#!/usr/bin/env node

import fs from 'fs';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Phume Supabase Environment Setup');
console.log('===================================\n');

console.log('This will help you configure your Supabase credentials.');
console.log('You can get these from: https://supabase.com → Your Project → Settings → API\n');

const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

async function setupEnvironment() {
  try {
    console.log('📋 Please provide your Supabase credentials:\n');
    
    const supabaseUrl = await askQuestion('🔗 Supabase Project URL (https://your-project.supabase.co): ');
    const supabaseKey = await askQuestion('🔑 Supabase Anon Key (eyJ...): ');
    
    if (!supabaseUrl || !supabaseKey) {
      console.log('\n❌ Both URL and Key are required. Please try again.');
      rl.close();
      return;
    }
    
    // Validate URL format
    if (!supabaseUrl.includes('supabase.co')) {
      console.log('\n⚠️  Warning: URL doesn\'t look like a Supabase URL. Please double-check.');
    }
    
    // Validate key format
    if (!supabaseKey.startsWith('eyJ')) {
      console.log('\n⚠️  Warning: Key doesn\'t look like a JWT token. Please double-check.');
    }
    
    const envContent = `# Supabase Configuration
VITE_SUPABASE_URL=${supabaseUrl}
VITE_SUPABASE_ANON_KEY=${supabaseKey}

# Development
VITE_ENABLE_ROUTE_MESSAGING=true

# Profile Info
VITE_APP_CREATOR=Phumeh Mjoli
`;
    
    fs.writeFileSync('.env.local', envContent);
    
    console.log('\n✅ Environment file created successfully!');
    console.log('📁 File: .env.local');
    console.log('\n📋 Next steps:');
    console.log('1. Go to Supabase SQL Editor');
    console.log('2. Copy and paste the contents of supabase-setup.sql');
    console.log('3. Run the SQL script');
    console.log('4. Start your dev server: npm run dev');
    console.log('5. Test login/signup functionality\n');
    
    console.log('🔧 Quick test:');
    console.log('- Email: test@example.com');
    console.log('- Password: password123');
    console.log('- Username: testuser\n');
    
    console.log('📖 See QUICK_SUPABASE_SETUP.md for detailed instructions');
    
  } catch (error) {
    console.error('\n❌ Error setting up environment:', error.message);
  } finally {
    rl.close();
  }
}

setupEnvironment();