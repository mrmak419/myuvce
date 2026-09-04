import re
import json
import os

file_path = r'c:\Users\mrmak\OneDrive\Desktop\web-apps\future-myuvce\content\blog\uvce-pg-directory-and-student-accommodation-guide.mdx'
data_path = r'c:\Users\mrmak\OneDrive\Desktop\web-apps\future-myuvce\components\data\pg_directory.json'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Match the <Tab label="..."> and the <PGListingGroup> containing <PGListing>s
# We will just find all <PGListing ... /> inside each Tab

# Let's extract them manually or via regex
tabs_data = []

# Splitting by <Tab label=
tabs_split = content.split('<Tab label="')

new_content = tabs_split[0]

for tab in tabs_split[1:]:
    # find the end of label
    label_end = tab.find('">')
    label = tab[:label_end]
    
    # find all PGListings in this tab
    listings = []
    
    listing_matches = re.finditer(r'<PGListing\s+name="([^"]*)"\s+distance="([^"]*)"\s+area="([^"]*)"\s+rating="([^"]*)"\s+rent="([^"]*)"\s+deposit="([^"]*)"\s+amenities="([^"]*)"\s+metro="([^"]*)"\s+directionsUrl="([^"]*)"\s+mapUrl="([^"]*)"\s*/>', tab)
    
    for match in listing_matches:
        listings.append({
            "name": match.group(1),
            "distance": match.group(2),
            "area": match.group(3),
            "rating": match.group(4),
            "rent": match.group(5).replace('\n', ' | '),
            "deposit": match.group(6),
            "amenities": match.group(7),
            "metro": match.group(8),
            "directionsUrl": match.group(9),
            "mapUrl": match.group(10)
        })
    
    tabs_data.append({
        "category": label,
        "listings": listings
    })
    
    # Replace the <PGListingGroup>...</PGListingGroup> block with <PGDirectoryRenderer category="Girls / Women's PGs" />
    # We'll use regex to remove everything from <PGListingGroup> to </PGListingGroup>
    tab_cleaned = re.sub(r'<PGListingGroup>.*?</PGListingGroup>', f'<PGDirectoryRenderer category="{label}" />', tab[label_end+2:], flags=re.DOTALL)
    
    new_content += f'<Tab label="{label}">\n{tab_cleaned}'

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

with open(data_path, 'w', encoding='utf-8') as f:
    json.dump(tabs_data, f, indent=2)

print("Optimization complete!")
