from playwright.sync_api import sync_playwright
import os
from PIL import Image

out_dir = r'D:\lightpath-builder-main\lightpath-builder-main\scratch\browser_candidates\doctors'
os.makedirs(out_dir, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, channel='chrome')
    context = browser.new_context(user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
    page = context.new_page()

    url = 'https://www.pexels.com/search/indian%20doctor%20smiling/'
    print('Searching indian doctor smiling...')
    page.goto(url, wait_until='domcontentloaded', timeout=15000)
    page.wait_for_timeout(2000)

    imgs = page.query_selector_all('article img')
    print('Found imgs:', len(imgs))
    saved = 0
    for i, img in enumerate(imgs):
        src = img.get_attribute('src')
        alt = img.get_attribute('alt') or ''
        if src and 'images.pexels.com/photos/' in src:
            base_url = src.split('?')[0]
            high_res = base_url + '?auto=compress&cs=tinysrgb&w=1920'
            photo_id = base_url.split('/')[-1].split('.')[0]
            dest = os.path.join(out_dir, f'doc_{saved}.jpg')
            resp = page.request.get(high_res)
            if resp.status == 200:
                with open(dest, 'wb') as f:
                    f.write(resp.body())
                with Image.open(dest) as pil_im:
                    if pil_im.width > pil_im.height: # Landscape only!
                        print(f'  [Landscape {saved}] {dest} | {pil_im.size} | Alt: {alt[:60]}')
                        saved += 1
                        if saved >= 6: break

    browser.close()
