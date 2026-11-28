import urllib.request
import urllib.parse
import json
import os
from PIL import Image

headers = {'User-Agent': 'ScienceDivineHealth/1.0 (dev@sciencedivine.org)'}
queries = [
    'doctor examining child india',
    'pediatrician child india',
    'health checkup girl india',
    'doctor smile child india',
    'free medical camp child india',
    'health worker child india smile',
    'community health checkup india child'
]

out_dir = r'D:\lightpath-builder-main\lightpath-builder-main\scratch\health_candidates'
os.makedirs(out_dir, exist_ok=True)

found_files = []

for q in queries:
    url = f'https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(q)}&srnamespace=6&format=json&srlimit=10'
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            results = data.get('query', {}).get('search', [])
            for r in results:
                title = r['title']
                if any(ext in title.lower() for ext in ['.jpg', '.jpeg', '.png']):
                    found_files.append(title)
    except Exception as e:
        print('Error searching:', e)

# deduplicate
found_files = list(dict.fromkeys(found_files))
print(f'Total candidates found: {len(found_files)}')

for title in found_files[:15]:
    info_url = f'https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(title)}&prop=imageinfo&iiprop=url|size&format=json'
    try:
        req = urllib.request.Request(info_url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            d = json.loads(resp.read().decode('utf-8'))
            pages = d.get('query', {}).get('pages', {})
            for k, v in pages.items():
                ii = v.get('imageinfo', [{}])[0]
                img_url = ii.get('url')
                w = ii.get('width', 0)
                h = ii.get('height', 0)
                if w >= 1200 and img_url:
                    clean_name = title.replace('File:', '').replace(' ', '_')[:50] + '.jpg'
                    dest = os.path.join(out_dir, clean_name)
                    if not os.path.exists(dest):
                        # download
                        req2 = urllib.request.Request(img_url, headers=headers)
                        with urllib.request.urlopen(req2) as r2, open(dest, 'wb') as f:
                            f.write(r2.read())
                    print(f'Saved: {clean_name} ({w}x{h})')
    except Exception as e:
        print(f'Error fetching {title}:', e)
