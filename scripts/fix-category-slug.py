#!/usr/bin/env python3
import re
import os

filepath = '/vercel/share/v0-project/data/products.ts'

if not os.path.exists(filepath):
    print(f"[v0] File not found: {filepath}")
    exit(1)

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Find all category: values
categories = re.findall(r"category:\s*'([^']+)'", content)
print(f"[v0] Categories found: {', '.join(sorted(set(categories)))}")

# For each category, add categorySlug if missing
for cat in sorted(set(categories)):
    # Pattern: category: 'xxx', followed by price or something without categorySlug yet
    pattern = f"(category:\\s*'{cat}',)\\n(\\s+price:)"
    replacement = f"\\1\\n    categorySlug: '{cat}',\\n\\2"
    new_content = re.sub(pattern, replacement, content)
    if new_content != content:
        count = len(re.findall(pattern, content))
        print(f"[v0] Added categorySlug for '{cat}': {count} products")
        content = new_content

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"[v0] Successfully updated {filepath}")
