from PIL import Image
import numpy as np

user_shot = Image.open(r'C:\Users\PC\.gemini\antigravity\brain\efc78312-017c-4f1b-a5b7-e43ea6dc5dbe\.user_uploaded\media_1795857435381_77b7ee4a.jpg')
old_asset = Image.open(r'D:\lightpath-builder-main\lightpath-builder-main\public\images\swasthya-seva\10.png')
gen_asset = Image.open(r'C:\Users\PC\.gemini\antigravity\brain\efc78312-017c-4f1b-a5b7-e43ea6dc5dbe\swasthya_seva_health_camp_1795852501934.jpg')

print('user_shot size:', user_shot.size)
print('old_asset size:', old_asset.size)
print('gen_asset size:', gen_asset.size)

# Crop the right side of user_shot where the doctor is
w, h = user_shot.size
right_crop = user_shot.crop((int(w * 0.7), int(h * 0.1), w, int(h * 0.9)))
print('right_crop mean RGB:', np.array(right_crop).mean(axis=(0,1)))

# Let's check difference with old_asset
w_old, h_old = old_asset.size
old_right = old_asset.crop((int(w_old * 0.7), int(h_old * 0.1), w_old, int(h_old * 0.9)))
print('old_right mean RGB:', np.array(old_right).mean(axis=(0,1)))

# Let's check difference with gen_asset
w_gen, h_gen = gen_asset.size
gen_right = gen_asset.crop((int(w_gen * 0.7), int(h_gen * 0.1), w_gen, int(h_gen * 0.9)))
print('gen_right mean RGB:', np.array(gen_right).mean(axis=(0,1)))
