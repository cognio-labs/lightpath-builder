import urllib.request
import urllib.parse
import json

headers = {'User-Agent': 'ScienceDivineApp/1.0 (dev@sciencedivine.org)'}
queries = [
    'health camp india',
    'medical camp india',
    'free health check up india',
    'eye camp india'
]

for query in queries:
    url = f'https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(query)}&srnamespace=6&format=json&srlimit=15'
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
                            w = ii.get('width', 0)
                            h = ii.get('height', 0)
                            if w >= 1200:
                                print(f'{title} [{w}x{h}]')
                                print('   ', ii.get('url'))
    except Exception as e:
        print('Error:', e)
