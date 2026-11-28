from playwright.sync_api import sync_playwright
import os

out_dir = r'D:\lightpath-builder-main\lightpath-builder-main\scratch\browser_candidates'
os.makedirs(out_dir, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, channel='chrome')
    context = browser.new_context(user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
    page = context.new_page()

    # Search Pexels for "indian doctor child"
    url = 'https://www.pexels.com/search/indian%20doctor%20child/'
    print('Navigating to:', url)
    page.goto(url, wait_until='domcontentloaded', timeout=15000)
    page.wait_for_timeout(3000)

    # Find image elements
    img_elements = page.query_selector_all('img')
    print('Found img elements:', len(img_elements))
    saved = 0
    for i, el in enumerate(img_elements):
        src = el.get_attribute('src')
        alt = el.get_attribute('alt') or ''
        if src and 'images.pexels.com/photos/' in src:
            print(f'Pexels Photo {i}:', alt[:50], src[:80])
            # High-res version of pexels: replace parameters or get auto=compress
            high_res = src.split('?')[0] + '?auto=compress&cs=tinysrgb&w=1600'
            dest = os.path.join(out_dir, f'pexels_{saved}.jpg')
            # fetch via page context
            try:
                resp = page.request.get(high_res)
                if resp.status == 200:
                    with open(dest, 'wb') as f:
                        f.write(resp.body())
                    print(f'  Saved pexels_{saved}.jpg ({len(resp.body())} bytes)')
                    saved += 1
                    if saved >= 5:
                        break
            except Exception as ex:
                print('  Error downloading:', ex)

    browser.close()
