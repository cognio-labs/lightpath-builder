from PIL import Image, ImageEnhance
import os

src = r'C:\Users\PC\.gemini\antigravity\brain\efc78312-017c-4f1b-a5b7-e43ea6dc5dbe\swasthya_seva_health_camp_1795852501934.jpg'
im = Image.open(src)
print('Source size:', im.size)

# Resize to standard widescreen hero: 1600 x 960
target_w, target_h = 1600, 960
# Scale keeping aspect ratio
ratio = max(target_w / im.width, target_h / im.height)
new_w = int(im.width * ratio)
new_h = int(im.height * ratio)
im_resized = im.resize((new_w, new_h), Image.Resampling.LANCZOS)

# Center crop
left = (new_w - target_w) // 2
top = (new_h - target_h) // 2
im_cropped = im_resized.crop((left, top, left + target_w, top + target_h))

# Enhance color and clarity subtly so it looks bright and vibrant
enhancer = ImageEnhance.Color(im_cropped)
im_vibrant = enhancer.enhance(1.08)
enhancer_con = ImageEnhance.Contrast(im_vibrant)
im_vibrant = enhancer_con.enhance(1.04)

out_dest = r'D:\lightpath-builder-main\lightpath-builder-main\public\images\swasthya-seva\hero.webp'
im_vibrant.save(out_dest, 'WEBP', quality=92)
print('Saved enhanced hero.webp:', out_dest, os.path.getsize(out_dest), 'bytes')
