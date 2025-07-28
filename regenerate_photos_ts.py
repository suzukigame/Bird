import os
import json
import re

photos_ts_path = r'C:\Users\sujak\Desktop\hobby\GitHub\Bird\my-bird-photos\src\data\photos.ts'
bird_db_path = r'C:\Users\sujak\Desktop\hobby\GitHub\Bird\my-bird-photos\src\data\bird_database.ts'
images_base_path = r'C:\Users\sujak\Desktop\hobby\GitHub\Bird\my-bird-photos\public\images\birds'

# 1. Read bird_database.ts to get species to family mapping and location/subspecies
with open(bird_db_path, 'r', encoding='utf-8') as f:
    db_content = f.read().replace('export const birdDatabase = ', '').replace(';', '')
    bird_db = json.loads(db_content)

species_info_map = {}
japanese_to_english_species = {}
for family_entry in bird_db:
    for type_entry in family_entry['types']:
        for species_entry in type_entry['species']:
            japanese_name = species_entry['japaneseName']
            english_name = species_entry['englishName']
            species_info_map[japanese_name] = {
                'family': family_entry['familyName'],
                'location': species_entry.get('location', ''),
                'subspecies': species_entry.get('subspecies', ''),
                'englishName': english_name # Add englishName to map
            }
            japanese_to_english_species[japanese_name] = english_name

# Define prefecture_map globally within the script
prefecture_map = {
    'fukuoka': {'ja': '福岡県', 'en': 'Fukuoka Prefecture'},
    'ibaraki': {'ja': '茨城県', 'en': 'Ibaraki Prefecture'},
    'saga': {'ja': '佐賀県', 'en': 'Saga Prefecture'},
    'hokkaido': {'ja': '北海道', 'en': 'Hokkaido'},
    'tochigi': {'ja': '栃木県', 'en': 'Tochigi Prefecture'},
    'miyagi': {'ja': '宮城県', 'en': 'Miyagi Prefecture'},
    'nagano': {'ja': '長野県', 'en': 'Nagano Prefecture'},
}

# 2. List Image Files
all_image_files = []
for root, _, files in os.walk(images_base_path):
    for file in files:
        if file.lower().endswith('.jpg') or file.lower().endswith('.jpeg'):
            all_image_files.append(os.path.join(root, file))

# 3. Extract Photo Data and generate photos_data array
photos_data = []
id_counter = 1

for full_path in all_image_files:
    relative_path = os.path.relpath(full_path, images_base_path).replace(os.sep, '/')
    
    # Extract family from the first directory in the relative path
    family_folder_name = relative_path.split('/')[0]

    # Extract filename without extension
    filename_without_ext = os.path.splitext(os.path.basename(full_path))[0]

    # Attempt to parse filename for date, prefecture, and species
    # Example: YYYYMMDD_prefecture_englishspecies_ID.ext
    match = re.match(r'^(\d{8})_([a-zA-Z]+)_([a-zA-Z0-9\s-]+)(?:_\d+)?$', filename_without_ext)
    
    date = ''
    prefecture_ja = ''
    prefecture_en = ''
    english_species_from_filename = ''
    japanese_species = ''
    location_detail_ja = ''
    location_detail_en = ''
    memo_ja = ''
    memo_en = ''

    if match:
        date = match.group(1)[:4] + '-' + match.group(1)[4:6] + '-' + match.group(1)[6:8]
        prefecture_code = match.group(2).lower()
        prefecture_ja = prefecture_map.get(prefecture_code, {'ja': '', 'en': ''})['ja']
        prefecture_en = prefecture_map.get(prefecture_code, {'ja': '', 'en': ''})['en']
        english_species_from_filename = match.group(3).replace('_', ' ')
        japanese_species = [jp for jp, en in japanese_to_english_species.items() if en == english_species_from_filename].pop() if [jp for jp, en in japanese_to_english_species.items() if en == english_species_from_filename] else family_folder_name
    else:
        # Fallback if filename doesn't match expected pattern
        # Try to get date from filename if it contains YYYYMMDD
        date_match_fallback = re.search(r'(\d{4})(\d{2})(\d{2})', filename_without_ext)
        if date_match_fallback:
            date = f'{date_match_fallback.group(1)}-{date_match_fallback.group(2)}-{date_match_fallback.group(3)}'
        else:
            # Try YYYYMM
            date_match_fallback = re.search(r'(\d{4})(\d{2})', filename_without_ext)
            if date_match_fallback:
                date = f'{date_match_fallback.group(1)}-{date_match_fallback.group(2)}'

        # Try to get prefecture from filename
        pref_match_fallback = re.search(r'_(fukuoka|ibaraki|saga|hokkaido|tochigi|miyagi|nagano)', filename_without_ext, re.IGNORECASE)
        if pref_match_fallback:
            prefecture_code = pref_match_fallback.group(1).lower()
            prefecture_ja = prefecture_map.get(prefecture_code, {'ja': '', 'en': ''})['ja']
            prefecture_en = prefecture_map.get(prefecture_code, {'ja': '', 'en': ''})['en']
        
        # Use family folder name as birdSpecies if not parsed from filename
        japanese_species = family_folder_name

    # Get locationDetail from bird_database if available
    if japanese_species in species_info_map:
        location_detail_ja = species_info_map[japanese_species]['location']
        location_detail_en = japanese_to_english_species.get(location_detail_ja, '') # This needs proper translation

    photos_data.append({
        'id': str(id_counter),
        'src': f'/images/birds/{relative_path}',
        'thumbnail': f'/images/birds/{relative_path}',
        'prefecture': {'ja': prefecture_ja, 'en': prefecture_en},
        'date': date,
        'birdSpecies': japanese_species,
        'locationDetail': {'ja': location_detail_ja, 'en': location_detail_en},
        'memo': {'ja': memo_ja, 'en': memo_en}, # Memo is empty for now
        'family': family_folder_name, # Family is the top-level folder name
    })
    id_counter += 1

# 4. Generate photos.ts content
photos_ts_content = f"import {{ IPhoto }} from '../types/photo';\n\nexport const photos: IPhoto[] = [\n"
for i, photo in enumerate(photos_data):
    photos_ts_content += f"  {{\n"
    for key, value in photo.items():
        if key == 'src' or key == 'thumbnail':
            photos_ts_content += f"    {key}: process.env.PUBLIC_URL + '{value}',\n"
        elif isinstance(value, dict):
            photos_ts_content += f"    {key}: {{ ja: '{value['ja']}', en: '{value['en']}' }},\n"
        else:
            photos_ts_content += f"    {key}: '{value}',\n"
    photos_ts_content += f"  }}{',' if i < len(photos_data) - 1 else ''}\n"
photos_ts_content += f"];\n"

# 5. Write photos.ts
with open(photos_ts_path, 'w', encoding='utf-8') as f:
    f.write(photos_ts_content)

print(f'Successfully regenerated {photos_ts_path}')
