import os
import json
import re

ts_path = r'C:\Users\sujak\Desktop\hobby\GitHub\Bird\my-bird-photos\src\data\photos.ts'
db_path = r'C:\Users\sujak\Desktop\hobby\GitHub\Bird\my-bird-photos\src\data\bird_database.ts'

with open(db_path, 'r', encoding='utf-8') as f:
    db_content = f.read().replace('export const birdDatabase = ', '').replace(';', '')
    bird_db = json.loads(db_content)

species_to_family = {species['japaneseName']: family['familyName'] for family in bird_db for type in family['types'] for species in type['species']}

# Read the photos.ts file
with open(ts_path, 'r', encoding='utf-8') as f:
    photos_content = f.read()

# Regex to find each photo object
photo_objects_str = re.findall(r"{\s*id: '.*?'\s*,\s*src: process\\.env\\.PUBLIC_URL \\+ '.*?',\s*thumbnail: process\\.env\\.PUBLIC_URL \\+ '.*?',\s*prefecture: '.*?',\s*date: '.*?',\s*birdSpecies: '.*?',\s*locationDetail: '.*?',\s*memo: '.*?'\s*}", photos_content, re.DOTALL)

photos_data = []
for obj_str in photo_objects_str:
    # Extract values using regex for each field
    id_match = re.search(r"id: '(.*?)'", obj_str)
    src_match = re.search(r"src: process\\.env\\.PUBLIC_URL \\+ '(.*?)'", obj_str)
    thumbnail_match = re.search(r"thumbnail: process\\.env\\.PUBLIC_URL \\+ '(.*?)'", obj_str)
    prefecture_match = re.search(r"prefecture: '(.*?)'", obj_str)
    date_match = re.search(r"date: '(.*?)'", obj_str)
    bird_species_match = re.search(r"birdSpecies: '(.*?)'", obj_str)
    location_detail_match = re.search(r"locationDetail: '(.*?)'", obj_str)
    memo_match = re.search(r"memo: '(.*?)'", obj_str)

    photo = {
        'id': id_match.group(1) if id_match else '',
        'src': src_match.group(1) if src_match else '',
        'thumbnail': thumbnail_match.group(1) if thumbnail_match else '',
        'prefecture': prefecture_match.group(1) if prefecture_match else '',
        'date': date_match.group(1) if date_match else '',
        'birdSpecies': bird_species_match.group(1) if bird_species_match else '',
        'locationDetail': location_detail_match.group(1) if location_detail_match else '',
        'memo': memo_match.group(1) if memo_match else '',
    }
    photos_data.append(photo)

for photo in photos_data:
    photo['family'] = species_to_family.get(photo['birdSpecies'], '')

# Reconstruct the photos.ts file content
new_photos_content = f"import {{ IPhoto }} from '../types/photo';\n\nexport const photos: IPhoto[] = [\n"
for i, photo in enumerate(photos_data):
    new_photos_content += f"  {{\n"
    for key, value in photo.items():
        if key == 'src' or key == 'thumbnail':
            new_photos_content += f"    {key}: process.env.PUBLIC_URL + '{value}',\n"
        else:
            new_photos_content += f"    {key}: '{value}',\n"
    new_photos_content += f"  }}{{'',' if i < len(photos_data) - 1 else ''}}\n"
new_photos_content += f"];\n"

with open(ts_path, 'w', encoding='utf-8') as f:
    f.write(new_photos_content)

print(f'Successfully updated {ts_path}')
