import os
import json

md_path = r'C:\Users\sujak\Desktop\hobby\GitHub\Bird\bird_list_table.md'
ts_path = r'C:\Users\sujak\Desktop\hobby\GitHub\Bird\my-bird-photos\src\data\bird_database.ts'

db = []
current_family = None
current_type = None

with open(md_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Skip header and separator lines
content_lines = lines[2:]

for line in content_lines:
    parts = [p.strip() for p in line.split('|')]
    
    # Ensure there are enough parts to avoid index errors
    if len(parts) < 6: # 科 | 類 | 和名 | 英名 | 亜種 | 場所
        continue

    family_name = parts[1] if parts[1] else None
    type_name = parts[2] if parts[2] else None
    japanese_name = parts[3] if parts[3] else None
    english_name = parts[4] if parts[4] else None

    if family_name:
        current_family = {'familyName': family_name, 'types': []}
        db.append(current_family)
        current_type = None # Reset type when a new family starts

    if current_family:
        if type_name:
            # If type_name is present and different from current_type, create a new type
            if not current_type or current_type['typeName'] != type_name:
                current_type = {'typeName': type_name, 'species': []}
                current_family['types'].append(current_type)
        elif not current_type or current_type['typeName'] != '':
            # If type_name is empty, but we need a new 'type' entry for species directly under family
            current_type = {'typeName': '', 'species': []}
            current_family['types'].append(current_type)

        if japanese_name and english_name and current_type:
            current_type['species'].append({'japaneseName': japanese_name, 'englishName': english_name})

# Remove families or types that ended up empty (e.g., due to parsing errors or empty rows)
final_db = []
for family in db:
    cleaned_types = []
    for type_entry in family['types']:
        if type_entry['species']:
            cleaned_types.append(type_entry)
    if cleaned_types:
        family['types'] = cleaned_types
        final_db.append(family)

with open(ts_path, 'w', encoding='utf-8') as f:
    f.write(f'export const birdDatabase = {json.dumps(final_db, ensure_ascii=False, indent=2)};\n')

print(f'Successfully created {ts_path}')