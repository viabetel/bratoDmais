#!/bin/bash
# Clean Next.js build cache
rm -rf .next
rm -rf node_modules/.cache
rm -rf .turbo
echo "Cache cleaned successfully"
