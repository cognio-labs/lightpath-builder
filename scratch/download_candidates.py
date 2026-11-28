import urllib.request
import os
from PIL import Image

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
out_dir = r'D:\lightpath-builder-main\lightpath-builder-main\scratch\candidates'
os.makedirs(out_dir, exist_ok=True)

urls = {
    'camp_mother_child.jpg': 'https://upload.wikimedia.org/wikipedia/commons/8/8d/A_doctor_examining_a_mother_and_her_child_at_the_health_camp%2C_organised_as_part_of_the_Bharat_Nirman_Public_Information_Campaign%2C_at_Bankadaha%2C_Bishnupur%2C_West_Bengal_on_December_12%2C_2011.jpg',
    'camp_girl_child.jpg': 'https://upload.wikimedia.org/wikipedia/commons/0/09/The_Doctor_checking_the_health_of_a_girl_child_at_the_Health_Camp_organised_as_a_part_of_the_Bharat_Nirman_Public_Information_Campaign%2C_at_Pollachi_in_Coimbatore_district%2C_Tamil_Nadu_on_August_28%2C_2011.jpg',
    'camp_child_exam.jpg': 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Doctor_examining_a_child_in_a_medical_camp%2C_organised_by_the_DFP%2C_during_the_Bharat_Nirman_Public_Information_Campaign%2C_at_Hilli_Block%2C_Dakshin_Dinajpur%2C_West_Bengal_on_February_06%2C_2012.jpg',
    'odisha_vaccination.jpg': 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Community_health_worker_gives_a_vaccination_in_Odisha_state%2C_India_%288380317750%29.jpg'
}

for name, u in urls.items():
    dest = os.path.join(out_dir, name)
    try:
        req = urllib.request.Request(u, headers=headers)
        with urllib.request.urlopen(req) as resp, open(dest, 'wb') as f:
            f.write(resp.read())
        with Image.open(dest) as im:
            print(f'Downloaded {name}: {im.size}, {im.format}, {os.path.getsize(dest)} bytes')
    except Exception as e:
        print(f'Failed {name}: {e}')
