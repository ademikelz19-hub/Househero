import urllib.request
import urllib.parse
import re
import io
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

OUTPUT_DIR = r"c:\Users\USER\Downloads\jallbrack_all\northstar-property-care\public\images"

SERVICES_CONFIG = [
    {
        "filename": "house-cleaning.jpg",
        "query": "residential house cleaning technician cleaning kitchen marble counter US company",
        "label": "HOUSE CLEANING PRO",
        "tech_id": "TECH #412"
    },
    {
        "filename": "gutter-cleaning.jpg",
        "query": "roof cleaning technician roof gutter washing safety harness US company",
        "label": "ROOF & GUTTER PRO",
        "tech_id": "TECH #883"
    },
    {
        "filename": "pressure-washing.jpg",
        "query": "pressure washing technician driveway surface cleaner wand US company",
        "label": "PRESSURE WASH PRO",
        "tech_id": "TECH #304"
    },
    {
        "filename": "carpet-cleaning.jpg",
        "query": "carpet cleaning technician operating wand steam extraction commercial US",
        "label": "CARPET STEAM PRO",
        "tech_id": "TECH #519"
    },
    {
        "filename": "snow-removal.jpg",
        "query": "snow removal technician residential driveway snow blower clearing US",
        "label": "SNOW REMOVAL PRO",
        "tech_id": "TECH #721"
    },
    {
        "filename": "hvac-maintenance.jpg",
        "query": "hvac technician checking air conditioner gauges outdoor unit US",
        "label": "HVAC CERTIFIED PRO",
        "tech_id": "TECH #192"
    },
    {
        "filename": "lawn-care.jpg",
        "query": "lawn care worker commercial mower trimming residential landscape US",
        "label": "GROUNDS CARE PRO",
        "tech_id": "TECH #634"
    },
    {
        "filename": "junk-removal.jpg",
        "query": "junk removal crew loading truck furniture residential US",
        "label": "DISPATCH HAUL CREW",
        "tech_id": "CREW #208"
    },
    {
        "filename": "de-icing.jpg",
        "query": "de icing technician salt spreader ice melt residential walkway US",
        "label": "DE-ICING DISPATCH",
        "tech_id": "TECH #940"
    },
    {
        "filename": "dryer-vent.jpg",
        "query": "dryer vent cleaning technician vacuum brush rotary tool residential US",
        "label": "VENT SAFETY PRO",
        "tech_id": "TECH #356"
    }
]

def search_image_urls(query, max_results=12):
    url = f"https://www.bing.com/images/async?q={urllib.parse.quote(query)}&first=0&count={max_results}&adlt=off"
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        html = urllib.request.urlopen(req, timeout=12).read().decode('utf-8', errors='ignore')
        murls = re.findall(r'murl&quot;:&quot;(https?://[^&]+\.(?:jpg|jpeg|png|webp))', html, re.IGNORECASE)
        # clean unescaped
        clean_urls = []
        for u in murls:
            u_clean = u.replace('\\/', '/')
            if u_clean not in clean_urls and not any(bad in u_clean for bad in ['vecteezy', 'shutterstock', 'dreamstime', 'depositphotos', '123rf']):
                clean_urls.append(u_clean)
        # If no non-stock found, add others
        if not clean_urls:
            clean_urls = [u.replace('\\/', '/') for u in murls]
        return clean_urls
    except Exception as e:
        print(f"Error querying {query}: {e}")
        return []

def download_and_validate(urls):
    for u in urls:
        try:
            req = urllib.request.Request(u, headers=HEADERS)
            data = urllib.request.urlopen(req, timeout=8).read()
            if len(data) < 30000: # at least 30KB
                continue
            img = Image.open(io.BytesIO(data))
            img.verify()
            img = Image.open(io.BytesIO(data)) # reopen after verify
            if img.mode != 'RGB':
                img = img.convert('RGB')
            w, h = img.size
            if w >= 600 and h >= 400:
                print(f"  -> Downloaded valid image ({w}x{h}) from {u[:65]}...")
                return img
        except Exception as e:
            continue
    return None

def apply_househero_crest(img, label="HOUSEHERO CREW", tech_id="TECH #101"):
    # Target uniform size
    target_w, target_h = 1000, 750
    # Crop to 4:3 ratio centered
    w, h = img.size
    target_ratio = 4.0 / 3.0
    current_ratio = w / float(h)
    
    if current_ratio > target_ratio:
        new_w = int(h * target_ratio)
        left = (w - new_w) // 2
        img_cropped = img.crop((left, 0, left + new_w, h))
    else:
        new_h = int(w / target_ratio)
        top = (h - new_h) // 2
        img_cropped = img.crop((0, top, w, top + new_h))
        
    img_final = img_cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    # Create the HouseHero Technician Uniform Badge Overlay (Official Dispatch Crew Crest)
    badge_w, badge_h = 240, 76
    badge = Image.new("RGBA", (badge_w, badge_h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(badge)
    
    # Outer dark charcoal leather/fabric patch
    draw.rounded_rectangle([0, 0, badge_w - 1, badge_h - 1], radius=10, fill=(24, 24, 27, 235), outline=(245, 158, 11, 255), width=2)
    # Inner gold stitch border
    draw.rounded_rectangle([3, 3, badge_w - 4, badge_h - 4], radius=8, outline=(217, 119, 6, 160), width=1)
    
    # HouseHero Gold Emblem Shield
    shield_pts = [(18, 18), (42, 18), (44, 40), (30, 56), (16, 40)]
    draw.polygon(shield_pts, fill=(245, 158, 11, 255), outline=(255, 255, 255, 230))
    # House 'H' in shield
    draw.text((24, 22), "H", fill=(24, 24, 27, 255))
    
    # Brand Text
    draw.text((54, 14), "HOUSEHERO", fill=(255, 255, 255, 255))
    draw.text((144, 15), "DISPATCH", fill=(245, 158, 11, 255))
    draw.text((54, 32), label, fill=(214, 211, 209, 230))
    draw.text((54, 48), f"VERIFIED CREW • {tech_id}", fill=(245, 158, 11, 240))
    
    # Verified Checkmark circle
    draw.ellipse([badge_w - 28, 12, badge_w - 10, 30], fill=(16, 185, 129, 255))
    draw.line([(badge_w - 24, 21), (badge_w - 20, 25), (badge_w - 14, 17)], fill=(255, 255, 255, 255), width=2)
    
    # Position badge in bottom-right or top-left corner
    badge_pos = (target_w - badge_w - 24, target_h - badge_h - 24)
    img_final.paste(badge, badge_pos, badge)
    
    return img_final

def main():
    print("Starting download of real service worker action photos...")
    for item in SERVICES_CONFIG:
        fname = item["filename"]
        out_path = os.path.join(OUTPUT_DIR, fname)
        print(f"\nProcessing {fname} ({item['label']})...")
        urls = search_image_urls(item["query"])
        print(f"  Found {len(urls)} candidate URLs")
        img = download_and_validate(urls)
        
        if img:
            branded = apply_househero_crest(img, item["label"], item["tech_id"])
            branded.save(out_path, quality=92)
            print(f"  Successfully saved branded real worker photo to {fname}!")
        else:
            print(f"  Fallback: retaining current verified worker photo for {fname}")

if __name__ == "__main__":
    main()
