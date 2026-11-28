from PIL import Image

gen_asset = Image.open(r'C:\Users\PC\.gemini\antigravity\brain\efc78312-017c-4f1b-a5b7-e43ea6dc5dbe\swasthya_seva_health_camp_1795852501934.jpg')
print('Dimensions:', gen_asset.size)
# Save a WebP copy to inspect or test
out_test = r'D:\lightpath-builder-main\lightpath-builder-main\scratch\test_swasthya_hero.webp'
gen_asset.save(out_test, 'WEBP', quality=90)
print('Saved test WebP, size:', out_test)
