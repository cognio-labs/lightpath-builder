import urllib.request
import urllib.parse
import json

headers = {'User-Agent': 'ScienceDivineApp/1.0 (dev@sciencedivine.org)'}
queries = [
    'doctor child smiling india',
    'medical checkup child india',
    'health checkup camp child india',
    'pediatrician clinic india',
    'community health worker india'
]

for query in queries:
    url = f'https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(query)}&srnamespace=6&format=json&srlimit=8'
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            results = data.get('query', {}).get('search', [])
            for r in results:
                title = r['title']
                if any(ext in title.lower() for ext in ['.jpg', '.jpeg', '.png']):
                    info_url = f'https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(title)}&prop=imageinfo&iiprop=url|size&format=json'
                    req2 = urllib.request.Request(info_url, headers=headers)
                    with urllib.request.urlopen(req2) as resp2:
                        d2 = json.loads(resp2.read().decode('utf-8'))
                        pages = d2.get('query', {}).get('pages', {})
                        for k, v in pages.items():
                            ii = v.get('imageinfo', [{}])[0]
                            print(title, '-->', ii.get('url'), ii.get('width'), 'x', ii.get('height'))
    except Exception as e:
        print('Error:', e)
