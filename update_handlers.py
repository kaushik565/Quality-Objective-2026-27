#!/usr/bin/env python3
import re

with open('src/slides/EmptySlide.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Array of updates: (old_pattern, new_pattern, site_name)
updates = [
    # SITE-I cards - handles multiline onClick
    (r"(\{\/\* SITE-I Incidents \*\/\s+<div\s+)onClick=\{\(\) => setSelectedCategory\('Incidents'\)\}", 
     r"\1onClick={() => { setSelectedCategory('Incidents'); setSelectedSite('SITE-I') }}", 
     "SITE-I Incidents"),
    
    (r"(\{\/\* SITE-I CA \*\/\s+<div\s+)onClick=\{\(\) => setSelectedCategory\('CA'\)\}", 
     r"\1onClick={() => { setSelectedCategory('CA'); setSelectedSite('SITE-I') }}", 
     "SITE-I CA"),
    
    (r"(\{\/\* SITE-I PA \*\/\s+<div\s+)onClick=\{\(\) => setSelectedCategory\('PA'\)\}", 
     r"\1onClick={() => { setSelectedCategory('PA'); setSelectedSite('SITE-I') }}", 
     "SITE-I PA"),
    
    (r"(\{\/\* SITE-I OOS \*\/\s+<div\s+)onClick=\{\(\) => setSelectedCategory\('Out of Specifications'\)\}", 
     r"\1onClick={() => { setSelectedCategory('Out of Specifications'); setSelectedSite('SITE-I') }}", 
     "SITE-I OOS"),
    
    # SITE-III cards
    (r"(\{\/\* SITE-III Incidents \*\/\s+<div\s+)onClick=\{\(\) => setSelectedCategory\('Incidents'\)\}", 
     r"\1onClick={() => { setSelectedCategory('Incidents'); setSelectedSite('SITE-III') }}", 
     "SITE-III Incidents"),
    
    (r"(\{\/\* SITE-III CA \*\/\s+<div\s+)onClick=\{\(\) => setSelectedCategory\('CA'\)\}", 
     r"\1onClick={() => { setSelectedCategory('CA'); setSelectedSite('SITE-III') }}", 
     "SITE-III CA"),
    
    (r"(\{\/\* SITE-III PA \*\/\s+<div\s+)onClick=\{\(\) => setSelectedCategory\('PA'\)\}", 
     r"\1onClick={() => { setSelectedCategory('PA'); setSelectedSite('SITE-III') }}", 
     "SITE-III PA"),
    
    (r"(\{\/\* SITE-III OOS \*\/\s+<div\s+)onClick=\{\(\) => setSelectedCategory\('Out of Specifications'\)\}", 
     r"\1onClick={() => { setSelectedCategory('Out of Specifications'); setSelectedSite('SITE-III') }}", 
     "SITE-III OOS"),
    
    # SITE-V cards
    (r"(\{\/\* SITE-V Incidents \*\/\s+<div\s+)onClick=\{\(\) => setSelectedCategory\('Incidents'\)\}", 
     r"\1onClick={() => { setSelectedCategory('Incidents'); setSelectedSite('SITE-V') }}", 
     "SITE-V Incidents"),
    
    (r"(\{\/\* SITE-V CA \*\/\s+<div\s+)onClick=\{\(\) => setSelectedCategory\('CA'\)\}", 
     r"\1onClick={() => { setSelectedCategory('CA'); setSelectedSite('SITE-V') }}", 
     "SITE-V CA"),
    
    (r"(\{\/\* SITE-V PA \*\/\s+<div\s+)onClick=\{\(\) => setSelectedCategory\('PA'\)\}", 
     r"\1onClick={() => { setSelectedCategory('PA'); setSelectedSite('SITE-V') }}", 
     "SITE-V PA"),
    
    (r"(\{\/\* SITE-V OOS \*\/\s+<div\s+)onClick=\{\(\) => setSelectedCategory\('Out of Specifications'\)\}", 
     r"\1onClick={() => { setSelectedCategory('Out of Specifications'); setSelectedSite('SITE-V') }}", 
     "SITE-V OOS"),
]

# Apply all updates
for old_pattern, new_pattern, description in updates:
    content = re.sub(old_pattern, new_pattern, content, flags=re.DOTALL)
    print(f"✓ Updated {description}")

with open('src/slides/EmptySlide.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("\n✓ All card handlers updated successfully!")

