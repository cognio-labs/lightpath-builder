from PIL import Image
import numpy as np

for name in ['camp_mother_child.jpg', 'camp_girl_child.jpg']:
    p = f'D:/lightpath-builder-main/lightpath-builder-main/scratch/candidates/{name}'
    im = Image.open(p)
    arr = np.array(im)
    print(name)
    print('  Dimensions:', im.size)
    print('  Mean RGB:', arr.mean(axis=(0,1)))
    # save smaller thumbnail for quick preview if needed
    thumb = im.copy()
    thumb.thumbnail((600, 400))
    thumb.save(f'D:/lightpath-builder-main/lightpath-builder-main/scratch/candidates/thumb_{name}')
