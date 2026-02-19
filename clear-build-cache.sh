#!/bin/bash
# Clear Next.js build cache to resolve stale build artifacts
rm -rf /vercel/share/v0-project/.next
echo "Next.js build cache cleared successfully"
