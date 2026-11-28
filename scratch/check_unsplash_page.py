import urllib.request
import re

photo_slug = 'doctor-examines-a-young-boys-chest-with-stethoscope-100b5e356169'
url = f'https://unsplash.com/photos/{photo_slug}'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        og = re.findall(r'property="og:image"\s+content="([^"]+)"', html)
        print('OG Image:', og)
except Exception as e:
    print('Error:', e)
