from playwright.sync_api import sync_playwright
import os
from PIL import Image

out_dir = r'D:\lightpath-builder-main\lightpath-builder-main\scratch\browser_candidates\unsplash2'
os.makedirs(out_dir, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, channel='chrome')
    context = browser.new_context(user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
    page = context.new_page()

    queries = ['indian doctor outdoor', 'indian doctor village', 'indian doctor camp', 'indian healthcare']
    for q in queries:
        url = f'https://unsplash.com/s/photos/{q.replace(" ", "-")}'
        print('Searching Unsplash:', q)
        page.goto(url, wait_until='domcontentloaded', timeout=15000)
        page.wait_for_timeout(2500)

        imgs = page.query_selector_all('figure img')
        print('Found figure imgs:', len(imgs))
        for i, img in enumerate(imgs[:10]):
            src = img.get_attribute('src')
            alt = img.get_attribute('alt') or ''
            if src and 'images.unsplash.com/photo-' in src:
                base_url = src.split('?')[0]
                high_res = base_url + '?auto=format&fit=crop&w=1920&q=85'
                photo_id = base_url.split('/')[-1]
                dest = os.path.join(out_dir, f'un2_{photo_id}.jpg')
                if not os.path.exists(dest):
                    resp = page.request.get(high_res)
                    if resp.status == 200:
                        with open(dest, 'wb') as f:
                            f.write(resp.body())
                        with Image.open(dest) as pil_im:
                            if pil_im.width > pil_im.height:
                                print(f'  [Landscape] {dest} | {pil_im.size} | Alt: {alt[:60]}')

    browser.close()
