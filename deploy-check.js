#!/usr/bin/env node

/**
 * Pre-deployment check script
 * Run this before deploying to Vercel to catch common issues
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Running pre-deployment checks...\n');

let hasErrors = false;

// Check if required files exist
const requiredFiles = [
  'package.json',
  'vite.config.ts',
  'vercel.json',
  'src/main.tsx',
  'index.html'
];

console.log('📁 Checking required files...');
requiredFiles.forEach(file => {
  if (fs.existsSync(path.join(__dirname, file))) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    hasErrors = true;
  }
});

// Check package.json for required scripts
console.log('\n📦 Checking package.json scripts...');
try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  
  const requiredScripts = ['build', 'vercel-build'];
  requiredScripts.forEach(script => {
    if (packageJson.scripts && packageJson.scripts[script]) {
      console.log(`✅ ${script} script`);
    } else {
      console.log(`❌ ${script} script - MISSING`);
      hasErrors = true;
    }
  });
} catch (error) {
  console.log('❌ Error reading package.json');
  hasErrors = true;
}

// Check environment variables template
console.log('\n🔐 Checking environment variables template...');
if (fs.existsSync(path.join(__dirname, '.env.example'))) {
  console.log('✅ .env.example exists');
  
  const envExample = fs.readFileSync(path.join(__dirname, '.env.example'), 'utf8');
  const requiredEnvVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_PROJECT_ID',
    'FIREBASE_PROJECT_ID',
    'SESSION_SECRET',
    'FRONTEND_URL'
  ];
  
  requiredEnvVars.forEach(envVar => {
    if (envExample.includes(envVar)) {
      console.log(`✅ ${envVar}`);
    } else {
      console.log(`⚠️  ${envVar} - Not found in .env.example`);
    }
  });
} else {
  console.log('❌ .env.example - MISSING');
  hasErrors = true;
}

// Check vercel.json configuration
console.log('\n⚡ Checking Vercel configuration...');
try {
  const vercelConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'vercel.json'), 'utf8'));
  
  if (vercelConfig.builds && vercelConfig.builds.length > 0) {
    console.log('✅ Vercel builds configuration');
  } else {
    console.log('❌ Vercel builds configuration - MISSING');
    hasErrors = true;
  }
  
  if (vercelConfig.routes && vercelConfig.routes.length > 0) {
    console.log('✅ Vercel routes configuration');
  } else {
    console.log('❌ Vercel routes configuration - MISSING');
    hasErrors = true;
  }
} catch (error) {
  console.log('❌ Error reading vercel.json');
  hasErrors = true;
}

// Final result
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.log('❌ Pre-deployment check FAILED');
  console.log('Please fix the issues above before deploying to Vercel.');
  process.exit(1);
} else {
  console.log('✅ Pre-deployment check PASSED');
  console.log('Your project is ready for Vercel deployment!');
  console.log('\nNext steps:');
  console.log('1. Push your code to Git');
  console.log('2. Connect your repository to Vercel');
  console.log('3. Configure environment variables in Vercel');
  console.log('4. Deploy!');
}