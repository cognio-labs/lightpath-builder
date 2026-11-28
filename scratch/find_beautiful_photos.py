from playwright.sync_api import sync_playwright
import os
from PIL import Image

out_dir = r'D:\lightpath-builder-main\lightpath-builder-main\scratch\browser_candidates\beautiful'
os.makedirs(out_dir, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, channel='chrome')
    context = browser.new_context(user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
    page = context.new_page()

    queries = [
        'indian mother baby smile',
        'indian child smile health',
        'indian doctor baby'
    ]

    for q in queries:
        url = f'https://www.pexels.com/search/{q.replace(" ", "%20")}/'
        print('Searching:', q)
        page.goto(url, wait_until='domcontentloaded', timeout=15000)
        page.wait_for_timeout(2000)

        imgs = page.query_selector_all('article img')
        print('Found imgs:', len(imgs))
        for i, img in enumerate(imgs[:10]):
            src = img.get_attribute('src')
            alt = img.get_attribute('alt') or ''
            if src and 'images.pexels.com/photos/' in src:
                base_url = src.split('?')[0]
                high_res = base_url + '?auto=compress&cs=tinysrgb&w=1920'
                photo_id = base_url.split('/')[-1].split('.')[0]
                dest = os.path.join(out_dir, f'{photo_id}.jpg')
                if not os.path.exists(dest):
                    resp = page.request.get(high_res)
                    if resp.status == 200:
                        with open(dest, 'wb') as f:
                            f.write(resp.body())
                        with Image.open(dest) as pil_im:
                            if pil_im.width > pil_im.height: # Landscape only!
                                print(f'  [Landscape] {dest} | {pil_im.size} | Alt: {alt[:60]}')

    browser.close()
