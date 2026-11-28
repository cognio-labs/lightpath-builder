import urllib.request
import re
import json

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for query in ['indian doctor patient child', 'doctor child clinic india', 'community health camp india doctor']:
    q_url = 'https://unsplash.com/napi/search/photos?query=' + urllib.parse.quote(query) + '&per_page=10'
    try:
        req = urllib.request.Request(q_url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            results = data.get('results', [])
            print('Query:', query, 'Found:', len(results))
            for item in results:
                desc = item.get('description') or item.get('alt_description') or ''
                raw_url = item.get('urls', {}).get('regular')
                print(' -', item.get('id'), desc[:60], '-->', raw_url)
    except Exception as e:
        print('Query failed:', e)
