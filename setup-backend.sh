#!/bin/bash

# Chefly Backend Setup Script
# This script removes the old backend and creates a fresh Strapi project

set -e  # Exit on any error

echo "🗑️  Removing old backend..."
rm -rf backend

echo "📦 Creating fresh Strapi backend with CLI..."
npx create-strapi-app@latest backend --quickstart --no-run --typescript

echo "✅ Backend created successfully!"
echo ""
echo "Next steps:"
echo "1. cd backend"
echo "2. npm run develop"
echo "3. Open http://localhost:1337/admin and create your admin user"

