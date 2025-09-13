#!/bin/bash
echo "🚀 CareerPilot AI - Production Deployment Script"
echo "================================================"

echo "🧹 Cleaning previous builds..."
rm -rf node_modules .next out package-lock.json

echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

echo "🔍 Running linting..."
npm run lint:fix

echo "🏗️ Building for production..."
npm run build

echo "✅ Build completed successfully!"
echo "🚀 Ready for Vercel deployment!"
