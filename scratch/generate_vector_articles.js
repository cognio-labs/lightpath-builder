const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'articles');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. OPTIMISTIC MIND
// Shifting from negative thoughts toward positive possibilities.
// Smiling person with a calm brain/mind visual, soft sunlight, small flowers and positive glowing shapes.
// Pastel blue, yellow, peach and mint.
const svg1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FEF9C3" stop-opacity="0.6"/>
      <stop offset="50%" stop-color="#FFEDD5" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#E0F2FE" stop-opacity="0.6"/>
    </linearGradient>
    <linearGradient id="sunGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE047" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#FDBA74" stop-opacity="0.3"/>
    </linearGradient>
    <linearGradient id="peachShirt" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FED7AA"/>
      <stop offset="100%" stop-color="#FDBA74"/>
    </linearGradient>
    <linearGradient id="mintPants" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#A7F3D0"/>
      <stop offset="100%" stop-color="#6EE7B7"/>
    </linearGradient>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="800" height="500" fill="url(#bg1)"/>

  <!-- Organic Background Blobs -->
  <path d="M 120 180 C 80 80, 260 40, 360 90 C 460 140, 480 300, 380 340 C 280 380, 160 280, 120 180 Z" fill="#FEF08A" opacity="0.45"/>
  <path d="M 450 120 C 580 60, 720 130, 700 260 C 680 390, 520 420, 440 350 C 360 280, 320 180, 450 120 Z" fill="#BAE6FD" opacity="0.4"/>
  <circle cx="200" cy="140" r="70" fill="url(#sunGlow)"/>

  <!-- Hilltop / Grounding curve -->
  <path d="M -20 460 Q 400 370 820 460 L 820 520 L -20 520 Z" fill="#D1FAE5" opacity="0.65"/>
  <path d="M 60 470 Q 400 410 760 480 L 800 520 L 0 520 Z" fill="#A7F3D0" opacity="0.4"/>

  <!-- Botanical details on ground -->
  <g transform="translate(180, 390)">
    <path d="M 0 30 Q -15 0 0 -20 Q 15 0 0 30 Z" fill="#6EE7B7"/>
    <circle cx="0" cy="-25" r="7" fill="#FDE047"/>
    <circle cx="-10" cy="-18" r="5" fill="#F472B6" opacity="0.8"/>
    <circle cx="10" cy="-18" r="5" fill="#F472B6" opacity="0.8"/>
  </g>
  <g transform="translate(620, 385)">
    <path d="M 0 35 Q 20 10 5 -25 Q -10 10 0 35 Z" fill="#34D399"/>
    <circle cx="5" cy="-30" r="8" fill="#FDBA74"/>
    <circle cx="-4" cy="-25" r="5" fill="#DDD6FE"/>
    <circle cx="14" cy="-25" r="5" fill="#DDD6FE"/>
  </g>

  <!-- Glowing Mind / Ideas blooming above head -->
  <g transform="translate(400, 130)" filter="url(#softGlow)">
    <circle cx="0" cy="0" r="65" fill="#FEF08A" opacity="0.5"/>
    <circle cx="0" cy="0" r="45" fill="#FFFFFF" opacity="0.6"/>
    <!-- Stylized brain / blooming lotus icon -->
    <path d="M -30 10 C -35 -15, -15 -35, 0 -30 C 15 -35, 35 -15, 30 10 C 20 25, -20 25, -30 10 Z" fill="#DDD6FE" opacity="0.9"/>
    <path d="M -15 15 C -20 -5, -5 -20, 0 -15 C 5 -20, 20 -5, 15 15 Z" fill="#FBCFE8"/>
    <!-- Radiating sparkles / stars -->
    <path d="M 0 -48 L 3 -38 L 13 -35 L 3 -32 L 0 -22 L -3 -32 L -13 -35 L -3 -38 Z" fill="#F59E0B"/>
    <path d="M 45 -20 L 47 -12 L 55 -10 L 47 -8 L 45 0 L 43 -8 L 35 -10 L 43 -12 Z" fill="#FBBF24"/>
    <path d="M -45 -20 L -43 -12 L -35 -10 L -43 -8 L -45 0 L -47 -8 L -55 -10 L -47 -12 Z" fill="#FBBF24"/>
    <circle cx="35" cy="25" r="4" fill="#34D399"/>
    <circle cx="-35" cy="25" r="4" fill="#60A5FA"/>
  </g>

  <!-- Friendly Seated Meditating Person -->
  <!-- Body/Torso -->
  <g transform="translate(400, 240)">
    <!-- Shadow -->
    <ellipse cx="0" cy="180" rx="110" ry="18" fill="#A7F3D0" opacity="0.6"/>

    <!-- Cross-legged legs/mat -->
    <path d="M -115 160 C -110 120, -50 120, 0 135 C 50 120, 110 120, 115 160 C 110 185, -110 185, -115 160 Z" fill="url(#mintPants)"/>
    <ellipse cx="-75" cy="160" rx="22" ry="14" fill="#6EE7B7"/>
    <ellipse cx="75" cy="160" rx="22" ry="14" fill="#6EE7B7"/>

    <!-- Feet/Soles cute minimal -->
    <ellipse cx="-85" cy="155" rx="10" ry="8" fill="#FCD34D" opacity="0.4"/>
    <ellipse cx="85" cy="155" rx="10" ry="8" fill="#FCD34D" opacity="0.4"/>

    <!-- Torso / Sweatshirt -->
    <path d="M -45 35 C -45 15, -30 -10, 0 -10 C 30 -10, 45 15, 45 35 L 55 130 C 30 135, -30 135, -55 130 Z" fill="url(#peachShirt)"/>
    
    <!-- Arms resting peacefully on knees -->
    <path d="M -40 25 C -75 45, -90 90, -75 140 C -70 145, -60 140, -65 130 C -75 90, -60 55, -30 35 Z" fill="#FED7AA"/>
    <path d="M 40 25 C 75 45, 90 90, 75 140 C 70 145, 60 140, 65 130 C 75 90, 60 55, 30 35 Z" fill="#FED7AA"/>
    <!-- Hands in calm open mudra -->
    <circle cx="-75" cy="142" r="10" fill="#FDBA74"/>
    <circle cx="75" cy="142" r="10" fill="#FDBA74"/>

    <!-- Neck -->
    <rect x="-11" y="-22" width="22" height="20" rx="6" fill="#FED7AA"/>

    <!-- Head -->
    <ellipse cx="0" cy="-55" rx="34" ry="38" fill="#FED7AA"/>

    <!-- Cheerful Peaceful Face -->
    <!-- Blushing cheeks -->
    <circle cx="-18" cy="-50" r="7" fill="#FB7185" opacity="0.3"/>
    <circle cx="18" cy="-50" r="7" fill="#FB7185" opacity="0.3"/>
    <!-- Closed smiling eyes (arcs) -->
    <path d="M -23 -58 Q -16 -65 -9 -58" stroke="#78350F" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M 9 -58 Q 16 -65 23 -58" stroke="#78350F" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- Gentle happy smile -->
    <path d="M -10 -42 Q 0 -33 10 -42" stroke="#78350F" stroke-width="3" fill="none" stroke-linecap="round"/>

    <!-- Hair (cute modern top-knot/bun) -->
    <path d="M -34 -65 C -36 -100, 36 -100, 34 -65 C 25 -75, -25 -75, -34 -65 Z" fill="#4B3832"/>
    <circle cx="0" cy="-98" r="16" fill="#4B3832"/>
  </g>

  <!-- Floating positive wellness shapes -->
  <circle cx="150" cy="280" r="6" fill="#F472B6" opacity="0.6"/>
  <circle cx="650" cy="220" r="8" fill="#FBBF24" opacity="0.7"/>
  <circle cx="280" cy="190" r="5" fill="#38BDF8" opacity="0.6"/>
  <circle cx="530" cy="180" r="7" fill="#A7F3D0" opacity="0.8"/>
  <path d="M 230 220 Q 240 210 250 220 Q 240 230 230 220 Z" fill="#FDE047"/>
  <path d="M 570 260 Q 580 250 590 260 Q 580 270 570 260 Z" fill="#F472B6" opacity="0.7"/>
</svg>`;

// 2. CONSCIOUS MIND
// Peaceful mindfulness, sitting comfortably with eyes closed, awareness & presence.
// Floating leaves, gentle light, soft clouds, calm breathing waves.
// Pastel blue, mint, lavender, warm yellow.
const svg2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EDE9FE" stop-opacity="0.7"/>
      <stop offset="50%" stop-color="#E0F2FE" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#ECFDF5" stop-opacity="0.7"/>
    </linearGradient>
    <linearGradient id="auraGlow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#C4B5FD" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#93C5FD" stop-opacity="0.1"/>
    </linearGradient>
    <linearGradient id="lavenderTop" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#C4B5FD"/>
      <stop offset="100%" stop-color="#A78BFA"/>
    </linearGradient>
    <linearGradient id="bluePants" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#BAE6FD"/>
      <stop offset="100%" stop-color="#7DD3FC"/>
    </linearGradient>
  </defs>

  <rect width="800" height="500" fill="url(#bg2)"/>

  <!-- Soft Dreamy Clouds in Background -->
  <g fill="#FFFFFF" opacity="0.6">
    <ellipse cx="160" cy="110" rx="70" ry="25"/>
    <ellipse cx="200" cy="100" rx="50" ry="30"/>
    <ellipse cx="640" cy="130" rx="80" ry="28"/>
    <ellipse cx="600" cy="120" rx="55" ry="32"/>
  </g>

  <!-- Concentric Awareness / Calm Breathing Waves -->
  <g transform="translate(400, 240)">
    <circle cx="0" cy="0" r="180" fill="none" stroke="#C4B5FD" stroke-width="2" stroke-dasharray="8 8" opacity="0.35"/>
    <circle cx="0" cy="0" r="140" fill="none" stroke="#67E8F9" stroke-width="2" opacity="0.4"/>
    <circle cx="0" cy="0" r="105" fill="none" stroke="#FDE047" stroke-width="2.5" opacity="0.5"/>
    <circle cx="0" cy="0" r="75" fill="url(#auraGlow)"/>
  </g>

  <!-- Floating Botanical Leaves (Present moment awareness) -->
  <g transform="translate(220, 200) rotate(-25)">
    <path d="M 0 0 C 25 -30, 45 -10, 40 15 C 20 20, 0 15, 0 0 Z" fill="#86EFAC" opacity="0.75"/>
    <path d="M 5 0 Q 25 -5 35 12" stroke="#059669" stroke-width="1.5" fill="none" opacity="0.5"/>
  </g>
  <g transform="translate(560, 180) rotate(35)">
    <path d="M 0 0 C 30 -20, 45 5, 30 25 C 10 20, 0 15, 0 0 Z" fill="#A7F3D0" opacity="0.8"/>
  </g>
  <g transform="translate(190, 310) rotate(15)">
    <path d="M 0 0 C 20 -20, 35 0, 25 20 C 10 15, 0 10, 0 0 Z" fill="#DDD6FE" opacity="0.7"/>
  </g>
  <g transform="translate(580, 290) rotate(-20)">
    <path d="M 0 0 C 22 -22, 38 0, 28 22 C 12 16, 0 10, 0 0 Z" fill="#BAE6FD" opacity="0.8"/>
  </g>

  <!-- Central Conscious Character -->
  <g transform="translate(400, 235)">
    <!-- Soft floor shadow -->
    <ellipse cx="0" cy="185" rx="115" ry="18" fill="#CBD5E1" opacity="0.35"/>

    <!-- Meditation Cushion (Zafu) -->
    <ellipse cx="0" cy="175" rx="85" ry="22" fill="#DDD6FE"/>
    <ellipse cx="0" cy="168" rx="80" ry="18" fill="#EDE9FE"/>

    <!-- Legs in Half Lotus -->
    <path d="M -110 150 C -105 110, -45 115, 0 128 C 45 115, 105 110, 110 150 C 105 175, -105 175, -110 150 Z" fill="url(#bluePants)"/>

    <!-- Torso in Lavender Top -->
    <path d="M -42 25 C -42 5, -28 -15, 0 -15 C 28 -15, 42 5, 42 25 L 50 125 C 25 130, -25 130, -50 125 Z" fill="url(#lavenderTop)"/>

    <!-- Relaxed Hands resting gently on knees -->
    <path d="M -38 20 C -70 40, -85 85, -70 135 C -65 140, -55 135, -60 125 C -70 85, -55 50, -28 30 Z" fill="#FBCFE8"/>
    <path d="M 38 20 C 70 40, 85 85, 70 135 C 65 140, 55 135, 60 125 C 70 85, 55 50, 28 30 Z" fill="#FBCFE8"/>
    <!-- Gyan Mudra (Thumb & Index touching) -->
    <circle cx="-70" cy="138" r="9" fill="#FED7AA"/>
    <circle cx="70" cy="138" r="9" fill="#FED7AA"/>

    <!-- Neck & Head -->
    <rect x="-10" y="-28" width="20" height="20" rx="5" fill="#FED7AA"/>
    <ellipse cx="0" cy="-60" rx="32" ry="36" fill="#FED7AA"/>

    <!-- Peaceful Facial Expression -->
    <circle cx="-16" cy="-56" r="6" fill="#F472B6" opacity="0.3"/>
    <circle cx="16" cy="-56" r="6" fill="#F472B6" opacity="0.3"/>
    <!-- Relaxed closed eyes -->
    <path d="M -22 -62 Q -15 -67 -8 -62" stroke="#581C87" stroke-width="2.8" fill="none" stroke-linecap="round"/>
    <path d="M 8 -62 Q 15 -67 22 -62" stroke="#581C87" stroke-width="2.8" fill="none" stroke-linecap="round"/>
    <!-- Serene gentle breath mouth -->
    <path d="M -7 -46 Q 0 -41 7 -46" stroke="#581C87" stroke-width="2.5" fill="none" stroke-linecap="round"/>

    <!-- Sleek wavy hair -->
    <path d="M -33 -68 C -35 -105, 35 -105, 33 -68 C 22 -75, -22 -75, -33 -68 Z" fill="#3B2F2F"/>
    <path d="M -32 -60 C -38 -30, -32 0, -25 20 C -20 20, -24 -20, -28 -55 Z" fill="#3B2F2F"/>
    <path d="M 32 -60 C 38 -30, 32 0, 25 20 C 20 20, 24 -20, 28 -55 Z" fill="#3B2F2F"/>
  </g>

  <!-- Glowing gentle light dots -->
  <circle cx="400" cy="90" r="4" fill="#FDE047"/>
  <circle cx="360" cy="75" r="3" fill="#67E8F9"/>
  <circle cx="440" cy="75" r="3" fill="#F472B6"/>
</svg>`;

// 3. PEACE OF MIND
// Soothing illustration of a relaxed person sitting peacefully near nature.
// Gentle sunlight, trees, flowers, soft clouds, quiet lake, calm & refreshed.
// Pastel green, blue, lavender, warm cream.
const svg3 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="sky3" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#E0F2FE"/>
      <stop offset="60%" stop-color="#FEF3C7"/>
      <stop offset="100%" stop-color="#EDE9FE"/>
    </linearGradient>
    <linearGradient id="lake" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#BAE6FD" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#7DD3FC" stop-opacity="0.9"/>
    </linearGradient>
    <linearGradient id="greenHill" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#A7F3D0"/>
      <stop offset="100%" stop-color="#6EE7B7"/>
    </linearGradient>
  </defs>

  <!-- Sky -->
  <rect width="800" height="500" fill="url(#sky3)"/>

  <!-- Morning Sun behind hills -->
  <circle cx="480" cy="180" r="80" fill="#FDE047" opacity="0.45"/>

  <!-- Distant Rolling Pastel Hills -->
  <path d="M 0 260 Q 250 180 500 240 Q 680 200 800 250 L 800 500 L 0 500 Z" fill="#DDD6FE" opacity="0.4"/>
  <path d="M -50 280 Q 200 220 480 270 Q 680 230 850 290 L 850 500 L -50 500 Z" fill="#BBF7D0" opacity="0.6"/>

  <!-- Peaceful Lake Surface -->
  <path d="M 0 340 Q 400 320 800 340 L 800 500 L 0 500 Z" fill="url(#lake)"/>

  <!-- Water Ripples -->
  <ellipse cx="400" cy="420" rx="140" ry="8" fill="#FFFFFF" opacity="0.4"/>
  <ellipse cx="260" cy="450" rx="90" ry="6" fill="#FFFFFF" opacity="0.3"/>
  <ellipse cx="580" cy="440" rx="100" ry="7" fill="#FFFFFF" opacity="0.35"/>

  <!-- Blooming Lotus on Lake -->
  <g transform="translate(560, 410)">
    <ellipse cx="0" cy="12" rx="35" ry="10" fill="#059669" opacity="0.3"/>
    <path d="M -25 10 Q 0 -15 25 10 Z" fill="#F472B6" opacity="0.7"/>
    <path d="M -15 10 Q 0 -22 15 10 Z" fill="#FBCFE8"/>
    <circle cx="0" cy="4" r="6" fill="#FDE047"/>
  </g>

  <!-- Grassy Hill in Foreground (Left side) -->
  <path d="M -40 330 Q 180 320 340 420 Q 220 520 -40 520 Z" fill="url(#greenHill)"/>

  <!-- Stylized rounded pastel tree -->
  <g transform="translate(110, 240)">
    <path d="M 0 90 Q 5 40 0 0" stroke="#78350F" stroke-width="8" stroke-linecap="round"/>
    <circle cx="-5" cy="-20" r="45" fill="#34D399" opacity="0.8"/>
    <circle cx="20" cy="-35" r="35" fill="#6EE7B7" opacity="0.9"/>
    <circle cx="-25" cy="-40" r="30" fill="#A7F3D0"/>
  </g>

  <!-- Relaxed Person sitting comfortably on smooth rock looking out -->
  <g transform="translate(250, 330)">
    <!-- Smooth Rock -->
    <ellipse cx="0" cy="70" rx="65" ry="25" fill="#E2E8F0"/>
    <ellipse cx="5" cy="65" rx="55" ry="20" fill="#F1F5F9"/>

    <!-- Person Seated (Side-ish relaxed profile) -->
    <!-- Legs drawn up comfortably -->
    <path d="M -20 60 C -10 30, 25 25, 45 45 C 50 65, 30 70, 0 68 Z" fill="#C4B5FD"/>
    <ellipse cx="40" cy="55" rx="14" ry="12" fill="#A78BFA"/>

    <!-- Torso -->
    <path d="M -30 45 C -35 15, -20 -10, 0 -15 C 20 -15, 25 15, 20 45 Z" fill="#FED7AA"/>
    <!-- Arm wrapping around knee -->
    <path d="M -10 0 C 15 5, 35 25, 30 45" stroke="#FDBA74" stroke-width="12" stroke-linecap="round" fill="none"/>

    <!-- Head & Serene Face -->
    <ellipse cx="-2" cy="-35" rx="20" ry="24" fill="#FED7AA"/>
    <!-- Calm smile & closed eye -->
    <path d="M 4 -36 Q 10 -40 16 -36" stroke="#4B3832" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M 6 -26 Q 11 -22 16 -26" stroke="#4B3832" stroke-width="2" fill="none" stroke-linecap="round"/>
    <!-- Hair -->
    <path d="M -20 -40 C -15 -62, 18 -60, 20 -40 C 10 -48, -15 -48, -20 -40 Z" fill="#4B3832"/>
    <ellipse cx="-16" cy="-35" rx="8" ry="14" fill="#4B3832"/>
  </g>

  <!-- Soft flying birds in distance -->
  <path d="M 430 110 Q 438 102 446 110 Q 454 102 462 110" stroke="#93C5FD" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M 470 125 Q 476 118 482 125 Q 488 118 494 125" stroke="#93C5FD" stroke-width="1.8" fill="none" stroke-linecap="round"/>
</svg>`;

// 4. MENTAL HEALTH
// Warm mental wellness illustration, person taking care of mind & emotional wellbeing.
// Glowing heart-and-brain concept, small plants, cup of tea with steam, soft sunlight.
// Pastel peach, mint, blue, lavender.
const svg4 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bg4" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF7ED" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#FDF2F8" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#E0F2FE" stop-opacity="0.7"/>
    </linearGradient>
    <linearGradient id="heartBrainGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDA4AF"/>
      <stop offset="100%" stop-color="#C4B5FD"/>
    </linearGradient>
    <filter id="softGlow4" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <rect width="800" height="500" fill="url(#bg4)"/>

  <!-- Warm Sunbeam window arch in background -->
  <path d="M 180 80 Q 400 30 620 80 L 650 450 L 150 450 Z" fill="#FEF3C7" opacity="0.4"/>
  <circle cx="400" cy="110" r="90" fill="#FDE047" opacity="0.35"/>

  <!-- Small side table with cozy tea & potted plant -->
  <g transform="translate(560, 310)">
    <!-- Table surface -->
    <ellipse cx="0" cy="50" rx="65" ry="18" fill="#FED7AA"/>
    <path d="M -5 68 L -15 150 M 5 68 L 15 150" stroke="#FDBA74" stroke-width="6" stroke-linecap="round"/>

    <!-- Warm Cup of Tea -->
    <rect x="-35" y="15" width="28" height="26" rx="6" fill="#67E8F9"/>
    <path d="M -7 20 Q 2 27 -7 34" stroke="#67E8F9" stroke-width="4" fill="none" stroke-linecap="round"/>
    <!-- Steam rising gently -->
    <path d="M -26 8 Q -30 -5 -24 -15" stroke="#CBD5E1" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.6"/>
    <path d="M -16 5 Q -10 -8 -16 -18" stroke="#CBD5E1" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.6"/>

    <!-- Potted Monstera / Succulent Plant -->
    <path d="M 15 25 L 35 25 L 30 48 L 20 48 Z" fill="#F472B6"/>
    <path d="M 25 25 Q 10 5 18 -12 Q 35 0 25 25 Z" fill="#34D399"/>
    <path d="M 25 25 Q 45 5 40 -15 Q 25 0 25 25 Z" fill="#6EE7B7"/>
    <path d="M 25 25 Q 30 -5 32 -25 Q 22 -15 25 25 Z" fill="#A7F3D0"/>
  </g>

  <!-- Glowing Heart-and-Brain Connection Symbol -->
  <g transform="translate(400, 120)" filter="url(#softGlow4)">
    <circle cx="0" cy="0" r="55" fill="#FFFFFF" opacity="0.75"/>
    <circle cx="0" cy="0" r="45" fill="url(#heartBrainGlow)" opacity="0.4"/>
    
    <!-- Heart shape (left) intertwined with Brain swirls (right) -->
    <path d="M 0 -15 C -20 -35, -45 -10, -25 15 L 0 35 L 25 15 C 45 -10, 20 -35, 0 -15 Z" fill="#F43F5E" opacity="0.75"/>
    <!-- Brain folds inside / harmony -->
    <path d="M 0 -15 C 8 -25, 20 -25, 24 -15 C 28 -8, 22 -2, 25 5 C 28 12, 18 20, 10 25" stroke="#FFFFFF" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- Sparkles -->
    <path d="M -45 -25 L -42 -18 L -35 -15 L -42 -12 L -45 -5 L -48 -12 L -55 -15 L -48 -18 Z" fill="#FDE047"/>
    <path d="M 45 -25 L 48 -18 L 55 -15 L 48 -12 L 45 -5 L 42 -12 L 35 -15 L 42 -18 Z" fill="#FDE047"/>
  </g>

  <!-- Friendly Person taking care of wellbeing -->
  <g transform="translate(320, 240)">
    <!-- Floor shadow -->
    <ellipse cx="0" cy="180" rx="90" ry="16" fill="#CBD5E1" opacity="0.4"/>

    <!-- Seated with hands gently placed over heart/chest -->
    <path d="M -80 150 C -75 115, -35 120, 0 130 C 35 120, 75 115, 80 150 C 75 175, -75 175, -80 150 Z" fill="#A7F3D0"/>

    <!-- Sweater in cozy Mint / Lavender -->
    <path d="M -38 30 C -38 10, -25 -10, 0 -10 C 25 -10, 38 10, 38 30 L 45 125 C 20 130, -20 130, -45 125 Z" fill="#BAE6FD"/>

    <!-- Arms folded warmly across chest (self-hug / compassion) -->
    <path d="M -35 25 C -55 50, -40 85, 5 70 C 15 67, 12 55, 0 57 C -20 60, -35 45, -22 30 Z" fill="#93C5FD"/>
    <path d="M 35 25 C 55 50, 40 85, -5 70 C -15 67, -12 55, 0 57 C 20 60, 35 45, 22 30 Z" fill="#93C5FD"/>
    <!-- Hands gently holding shoulders/chest -->
    <circle cx="-2" cy="62" r="8" fill="#FED7AA"/>

    <!-- Head & Content, Warm Expression -->
    <rect x="-9" y="-22" width="18" height="18" rx="5" fill="#FED7AA"/>
    <ellipse cx="0" cy="-52" rx="30" ry="34" fill="#FED7AA"/>
    <!-- Blushing cheeks -->
    <circle cx="-14" cy="-48" r="6" fill="#FB7185" opacity="0.35"/>
    <circle cx="14" cy="-48" r="6" fill="#FB7185" opacity="0.35"/>
    <!-- Gentle happy closed eyes -->
    <path d="M -20 -54 Q -14 -60 -8 -54" stroke="#475569" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <path d="M 8 -54 Q 14 -60 20 -54" stroke="#475569" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <!-- Sweet calm smile -->
    <path d="M -8 -38 Q 0 -31 8 -38" stroke="#475569" stroke-width="2.4" fill="none" stroke-linecap="round"/>

    <!-- Modern Bob Haircut in Chestnut -->
    <path d="M -30 -60 C -32 -95, 32 -95, 30 -60 C 35 -30, 25 -10, 20 -15 C 10 -40, -10 -40, -20 -15 C -25 -10, -35 -30, -30 -60 Z" fill="#78350F"/>
  </g>
</svg>`;

// 5. YOGA FOR HYPERTENSION
// Calm wellness illustration of gentle yoga, seated/standing, slow breathing.
// Peaceful surroundings, soft plants, subtle flowing energy lines, relaxation & balance.
// Pastel blue, green, lavender, peach.
const svg5 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bg5" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ECFDF5" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#F0F9FF" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#EDE9FE" stop-opacity="0.7"/>
    </linearGradient>
    <linearGradient id="flowStream" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#34D399" stop-opacity="0.6"/>
      <stop offset="50%" stop-color="#60A5FA" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#A78BFA" stop-opacity="0.5"/>
    </linearGradient>
  </defs>

  <rect width="800" height="500" fill="url(#bg5)"/>

  <!-- Flowing Calm Breath / Energy Ribbons -->
  <path d="M 100 280 C 220 180, 280 340, 400 240 C 520 140, 580 300, 720 200" stroke="url(#flowStream)" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.7"/>
  <path d="M 120 310 C 240 210, 300 370, 420 270 C 540 170, 600 330, 740 230" stroke="url(#flowStream)" stroke-width="3" stroke-dasharray="6 6" fill="none" opacity="0.5"/>

  <!-- Balanced Zen Stones on side -->
  <g transform="translate(620, 340)">
    <ellipse cx="0" cy="50" rx="40" ry="14" fill="#CBD5E1"/>
    <ellipse cx="2" cy="30" rx="30" ry="11" fill="#94A3B8"/>
    <ellipse cx="-1" cy="13" rx="20" ry="8" fill="#64748B"/>
    <ellipse cx="0" cy="0" rx="12" ry="6" fill="#F472B6" opacity="0.8"/>
  </g>

  <!-- Grounding Plants & Foliage -->
  <g transform="translate(180, 330)">
    <path d="M 0 50 Q -30 10 -20 -30 Q 0 10 0 50 Z" fill="#6EE7B7"/>
    <path d="M 0 50 Q 25 15 35 -20 Q 15 10 0 50 Z" fill="#34D399"/>
    <path d="M 0 50 Q -5 0 0 -45 Q 10 0 0 50 Z" fill="#A7F3D0"/>
  </g>

  <!-- Person in Gentle Sukhasana / Pranayama Pose -->
  <g transform="translate(400, 230)">
    <!-- Yoga Mat Base -->
    <ellipse cx="0" cy="180" rx="130" ry="24" fill="#FED7AA" opacity="0.7"/>

    <!-- Seated Legs -->
    <path d="M -115 150 C -110 110, -50 115, 0 130 C 50 115, 110 110, 115 150 C 110 175, -110 175, -115 150 Z" fill="#C4B5FD"/>

    <!-- Torso in Relaxed Peach Tee -->
    <path d="M -40 25 C -40 5, -28 -15, 0 -15 C 28 -15, 40 5, 40 25 L 48 125 C 22 130, -22 130, -48 125 Z" fill="#FED7AA"/>

    <!-- One Hand on Heart/Chest (Monitoring calm heart rate), other on Knee -->
    <!-- Left arm resting on knee in mudra -->
    <path d="M -35 25 C -65 45, -80 85, -65 135 C -60 140, -50 135, -55 125 C -65 85, -50 50, -25 30 Z" fill="#FDBA74"/>
    <circle cx="-65" cy="138" r="9" fill="#FDBA74"/>
    
    <!-- Right arm bent gently with hand over heart -->
    <path d="M 35 25 C 60 50, 45 80, 5 65 C -5 62, -2 50, 8 52 C 30 57, 45 45, 25 25 Z" fill="#FDBA74"/>
    <circle cx="5" cy="58" r="8" fill="#FDBA74"/>

    <!-- Peaceful Head tilted slightly with deep breathing -->
    <rect x="-9" y="-24" width="18" height="18" rx="5" fill="#FDBA74"/>
    <ellipse cx="0" cy="-56" rx="30" ry="35" fill="#FDBA74"/>
    
    <!-- Relaxed Closed Eyes & Soft Exhale -->
    <circle cx="-14" cy="-52" r="6" fill="#FB7185" opacity="0.3"/>
    <circle cx="14" cy="-52" r="6" fill="#FB7185" opacity="0.3"/>
    <path d="M -20 -58 Q -14 -64 -8 -58" stroke="#334155" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M 8 -58 Q 14 -64 20 -58" stroke="#334155" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <circle cx="0" cy="-42" r="3.5" fill="#334155" opacity="0.7"/> <!-- gentle O breath -->

    <!-- Neat Hair -->
    <path d="M -30 -65 C -30 -98, 30 -98, 30 -65 C 20 -72, -20 -72, -30 -65 Z" fill="#1E293B"/>
  </g>

  <!-- Floating soft prana circles -->
  <circle cx="330" cy="170" r="6" fill="#34D399" opacity="0.6"/>
  <circle cx="470" cy="170" r="6" fill="#60A5FA" opacity="0.6"/>
  <circle cx="400" cy="110" r="8" fill="#FDE047" opacity="0.7"/>
</svg>`;

// 6. YOGA NIDRA
// Deep relaxation Shavasana, eyes closed, soft moonlight, stars, lotus flowers, dreamy pastel clouds.
// Lavender, soft blue, mint, warm cream.
const svg6 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="twilight" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#C7D2FE" stop-opacity="0.7"/>
      <stop offset="50%" stop-color="#E0E7FF" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#EDE9FE" stop-opacity="0.9"/>
    </linearGradient>
    <linearGradient id="moonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FEF08A"/>
      <stop offset="100%" stop-color="#FDE047" stop-opacity="0.4"/>
    </linearGradient>
  </defs>

  <rect width="800" height="500" fill="url(#twilight)"/>

  <!-- Crescent Moon in soft evening sky -->
  <g transform="translate(640, 100)">
    <circle cx="0" cy="0" r="38" fill="url(#moonGlow)"/>
    <circle cx="14" cy="-6" r="32" fill="#C7D2FE"/>
    <!-- Gentle stars -->
    <path d="M -50 20 L -47 26 L -40 28 L -47 30 L -50 36 L -53 30 L -60 28 L -53 26 Z" fill="#FEF08A"/>
    <path d="M 20 60 L 22 64 L 28 65 L 22 66 L 20 70 L 18 66 L 12 65 L 18 64 Z" fill="#FEF08A"/>
  </g>

  <!-- Dreamy Pastel Clouds around room/space -->
  <g fill="#FFFFFF" opacity="0.45">
    <ellipse cx="200" cy="130" rx="90" ry="30"/>
    <ellipse cx="260" cy="120" rx="65" ry="35"/>
    <ellipse cx="150" cy="140" rx="55" ry="25"/>
    <ellipse cx="500" cy="160" rx="110" ry="35"/>
  </g>

  <!-- Floor line with gentle candlelight & lotus -->
  <g transform="translate(160, 360)">
    <!-- Small Candle -->
    <rect x="-10" y="20" width="20" height="30" rx="4" fill="#FED7AA"/>
    <path d="M 0 20 Q 4 10 0 2 Q -4 10 0 20 Z" fill="#FDE047"/>
    <circle cx="0" cy="10" r="14" fill="#FDE047" opacity="0.3"/>
  </g>

  <g transform="translate(660, 360)">
    <!-- Serene Lotus -->
    <path d="M -30 45 Q 0 10 30 45 Z" fill="#86EFAC" opacity="0.4"/>
    <path d="M -20 40 Q 0 5 20 40 Z" fill="#F472B6" opacity="0.7"/>
    <path d="M -10 38 Q 0 0 10 38 Z" fill="#FBCFE8"/>
  </g>

  <!-- Person Lying in Peaceful Shavasana on Yoga Mat -->
  <g transform="translate(400, 340)">
    <!-- Soft Yoga Mat -->
    <rect x="-240" y="10" width="480" height="40" rx="18" fill="#DDD6FE"/>
    <rect x="-230" y="5" width="460" height="30" rx="14" fill="#EDE9FE"/>

    <!-- Soft Cozy Pastel Blanket covering torso & legs -->
    <path d="M -130 5 C -110 -15, 140 -15, 170 5 L 170 25 L -130 25 Z" fill="#BAE6FD" opacity="0.9"/>
    <!-- Blanket fold ripples -->
    <path d="M -70 5 Q 0 -5 70 5" stroke="#7DD3FC" stroke-width="2.5" fill="none" opacity="0.6"/>

    <!-- Head on pillow (Left side) -->
    <ellipse cx="-165" cy="5" rx="35" ry="14" fill="#FEF3C7"/> <!-- pillow -->
    <ellipse cx="-165" cy="-8" rx="22" ry="24" fill="#FED7AA"/> <!-- head -->
    
    <!-- Peaceful Sleeping/Resting Face -->
    <path d="M -175 -10 Q -170 -6 -165 -10" stroke="#475569" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path d="M -158 -10 Q -153 -6 -148 -10" stroke="#475569" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path d="M -162 4 Q -158 8 -154 4" stroke="#475569" stroke-width="2" fill="none" stroke-linecap="round"/>
    <!-- Relaxed hair resting on pillow -->
    <path d="M -192 -5 C -190 -25, -150 -30, -145 -18 C -155 -22, -180 -20, -188 5 Z" fill="#475569"/>

    <!-- Feet poking out from blanket (Right side) -->
    <ellipse cx="185" cy="8" rx="8" ry="12" fill="#FED7AA" transform="rotate(15 185 8)"/>
    <ellipse cx="195" cy="14" rx="8" ry="12" fill="#FED7AA" transform="rotate(35 195 14)"/>

    <!-- Gentle hands resting by side in open surrender -->
    <ellipse cx="-60" cy="20" rx="14" ry="7" fill="#FED7AA"/>
    <ellipse cx="60" cy="20" rx="14" ry="7" fill="#FED7AA"/>
  </g>

  <!-- Dreamy Glowing Waves above the resting figure -->
  <path d="M 220 250 Q 320 220 420 250 Q 520 280 620 240" stroke="#C4B5FD" stroke-width="2" fill="none" stroke-dasharray="6 6" opacity="0.6"/>
  <path d="M 260 220 Q 360 190 460 220 Q 560 250 640 210" stroke="#A7F3D0" stroke-width="2" fill="none" opacity="0.5"/>
</svg>`;

// 7. YOGA + MINDFULNESS MEDITATION
// Combining gentle yoga and mindfulness meditation.
// Flowing breath lines, lotus flowers, plants, glowing energy, harmony between body & mind.
// Pastel lavender, mint, blue, peach.
const svg7 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bg7" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDF4FF" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#FFF7ED" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#F0FDF4" stop-opacity="0.7"/>
    </linearGradient>
    <linearGradient id="lotusGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F472B6"/>
      <stop offset="100%" stop-color="#C084FC"/>
    </linearGradient>
  </defs>

  <rect width="800" height="500" fill="url(#bg7)"/>

  <!-- Harmonic Circular Aura in Center -->
  <g transform="translate(400, 240)">
    <circle cx="0" cy="0" r="160" fill="#DDD6FE" opacity="0.2"/>
    <circle cx="0" cy="0" r="120" fill="#BAE6FD" opacity="0.3"/>
    <circle cx="0" cy="0" r="85" fill="#FEF08A" opacity="0.4"/>
  </g>

  <!-- Flowing Mindful Energy Arcs -->
  <path d="M 160 380 C 180 200, 320 80, 480 90 C 640 100, 680 240, 640 380" stroke="#A7F3D0" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.7"/>
  <path d="M 220 380 C 240 240, 340 140, 460 150 C 580 160, 600 260, 580 380" stroke="#FBCFE8" stroke-width="2.5" stroke-dasharray="6 6" fill="none" opacity="0.6"/>

  <!-- Elegant Lotus at base of meditation -->
  <g transform="translate(400, 370)">
    <path d="M -60 10 C -40 -30, -10 -40, 0 0 C 10 -40, 40 -30, 60 10 Z" fill="url(#lotusGrad)" opacity="0.3"/>
    <path d="M -40 12 C -25 -20, -5 -30, 0 5 C 5 -30, 25 -20, 40 12 Z" fill="#F472B6" opacity="0.6"/>
    <path d="M -20 15 C -12 -10, 0 -20, 0 10 C 0 -20, 12 -10, 20 15 Z" fill="#FBCFE8"/>
  </g>

  <!-- Person in Graceful Yoga Stretch + Meditation Pose -->
  <g transform="translate(400, 230)">
    <!-- Floor shadow -->
    <ellipse cx="0" cy="165" rx="100" ry="16" fill="#CBD5E1" opacity="0.4"/>

    <!-- Seated Lotus Base -->
    <path d="M -95 135 C -90 105, -40 110, 0 120 C 40 110, 90 105, 95 135 C 90 155, -90 155, -95 135 Z" fill="#6EE7B7"/>

    <!-- Torso in Lavender Top -->
    <path d="M -34 25 C -34 5, -24 -15, 0 -15 C 24 -15, 34 5, 34 25 L 40 120 C 20 124, -20 124, -40 120 Z" fill="#C4B5FD"/>

    <!-- Graceful arms extended upward in gentle crescent mudra (Anjali / upward reach) -->
    <path d="M -30 20 C -65 -15, -45 -70, -20 -100 C -12 -105, -8 -95, -14 -90 C -35 -65, -45 -20, -20 28 Z" fill="#FED7AA"/>
    <path d="M 30 20 C 65 -15, 45 -70, 20 -100 C 12 -105, 8 -95, 14 -90 C 35 -65, 45 -20, 20 28 Z" fill="#FED7AA"/>
    <!-- Hands meeting gracefully above head -->
    <circle cx="-14" cy="-98" r="7" fill="#FDBA74"/>
    <circle cx="14" cy="-98" r="7" fill="#FDBA74"/>

    <!-- Peaceful Head -->
    <rect x="-8" y="-22" width="16" height="16" rx="4" fill="#FED7AA"/>
    <ellipse cx="0" cy="-50" rx="26" ry="30" fill="#FED7AA"/>
    
    <!-- Peaceful serene face -->
    <circle cx="-12" cy="-48" r="5" fill="#FB7185" opacity="0.3"/>
    <circle cx="12" cy="-48" r="5" fill="#FB7185" opacity="0.3"/>
    <path d="M -16 -53 Q -11 -58 -6 -53" stroke="#4C1D95" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path d="M 6 -53 Q 11 -58 16 -53" stroke="#4C1D95" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path d="M -6 -38 Q 0 -33 6 -38" stroke="#4C1D95" stroke-width="2" fill="none" stroke-linecap="round"/>

    <!-- Cute bun / hair -->
    <path d="M -26 -58 C -28 -88, 28 -88, 26 -58 C 18 -64, -18 -64, -26 -58 Z" fill="#312E81"/>
  </g>

  <!-- Little glowing stars around hands -->
  <circle cx="400" cy="115" r="4" fill="#FDE047"/>
  <circle cx="370" cy="130" r="3" fill="#67E8F9"/>
  <circle cx="430" cy="130" r="3" fill="#F472B6"/>
</svg>`;

// 8. MEDITATION FOR SENIORS
// Warm, uplifting illustration of a senior person comfortably practicing meditation in home/garden.
// Gentle smile, relaxed posture, plants, flowers, sunlight, cozy atmosphere, healthy & content.
// Soft pastel colors, friendly modern vector style.
const svg8 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bg8" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FEFCE8" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#FFF7ED" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#FCE7F3" stop-opacity="0.6"/>
    </linearGradient>
  </defs>

  <rect width="800" height="500" fill="url(#bg8)"/>

  <!-- Warm sunbeams in cozy living room / garden -->
  <g fill="#FEF08A" opacity="0.3">
    <polygon points="120,0 220,0 380,500 240,500"/>
    <polygon points="260,0 340,0 480,500 360,500"/>
  </g>

  <!-- Potted Fiddle Leaf Fig on Left -->
  <g transform="translate(180, 290)">
    <rect x="-18" y="70" width="36" height="45" rx="6" fill="#FDBA74"/>
    <path d="M 0 70 L 0 -40" stroke="#78350F" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="-25" cy="20" rx="28" ry="16" fill="#34D399" transform="rotate(-25 -25 20)"/>
    <ellipse cx="25" cy="-5" rx="30" ry="17" fill="#6EE7B7" transform="rotate(25 25 -5)"/>
    <ellipse cx="-20" cy="-30" rx="26" ry="15" fill="#A7F3D0" transform="rotate(-30 -20 -30)"/>
    <ellipse cx="15" cy="-55" rx="24" ry="14" fill="#34D399" transform="rotate(20 15 -55)"/>
  </g>

  <!-- Blooming Flower Pot on Right -->
  <g transform="translate(620, 310)">
    <rect x="-16" y="55" width="32" height="40" rx="5" fill="#DDD6FE"/>
    <path d="M 0 55 Q -15 15 -8 -15 Q 5 15 0 55 Z" fill="#6EE7B7"/>
    <!-- Cute pastel blossoms -->
    <circle cx="-8" cy="-20" r="10" fill="#F472B6"/>
    <circle cx="8" cy="-10" r="8" fill="#FDE047"/>
    <circle cx="-16" cy="5" r="7" fill="#BAE6FD"/>
  </g>

  <!-- Senior Person Meditating in Cozy Armchair -->
  <g transform="translate(400, 240)">
    <!-- Armchair Backrest & Cushion -->
    <path d="M -90 140 C -95 10, -75 -40, 0 -40 C 75 -40, 95 10, 90 140 Z" fill="#BAE6FD" opacity="0.6"/>
    <ellipse cx="0" cy="145" rx="80" ry="25" fill="#7DD3FC" opacity="0.7"/>

    <!-- Seated Senior Figure -->
    <!-- Comfortable soft mint trousers -->
    <path d="M -60 135 C -55 95, -25 95, 0 105 C 25 95, 55 95, 60 135 C 55 155, -55 155, -60 135 Z" fill="#A7F3D0"/>

    <!-- Soft Cream/Yellow Cardigan -->
    <path d="M -36 15 C -36 -5, -24 -20, 0 -20 C 24 -20, 36 -5, 36 15 L 42 105 C 20 110, -20 110, -42 105 Z" fill="#FEF08A"/>
    <!-- Cardigan collar line -->
    <path d="M -12 -18 L 0 20 L 12 -18" stroke="#F59E0B" stroke-width="2" fill="none"/>

    <!-- Arms resting on armchair rests with hands in lap -->
    <path d="M -32 10 C -55 35, -50 70, -15 85" stroke="#FDE68A" stroke-width="12" stroke-linecap="round" fill="none"/>
    <path d="M 32 10 C 55 35, 50 70, 15 85" stroke="#FDE68A" stroke-width="12" stroke-linecap="round" fill="none"/>
    <ellipse cx="0" cy="85" rx="14" ry="10" fill="#FED7AA"/>

    <!-- Senior Head & Warm Content Expression -->
    <rect x="-8" y="-30" width="16" height="15" rx="4" fill="#FED7AA"/>
    <ellipse cx="0" cy="-60" rx="28" ry="32" fill="#FED7AA"/>
    
    <!-- Kind smiling eyes & warm smile lines -->
    <circle cx="-12" cy="-56" r="6" fill="#FB7185" opacity="0.3"/>
    <circle cx="12" cy="-56" r="6" fill="#FB7185" opacity="0.3"/>
    <!-- Gentle closed smiling eyes -->
    <path d="M -18 -62 Q -12 -68 -6 -62" stroke="#78350F" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M 6 -62 Q 12 -68 18 -62" stroke="#78350F" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <!-- Cheerful gentle smile -->
    <path d="M -8 -45 Q 0 -38 8 -45" stroke="#78350F" stroke-width="2.5" fill="none" stroke-linecap="round"/>

    <!-- Silver / Soft White Senior Hair -->
    <path d="M -28 -68 C -30 -100, 30 -100, 28 -68 C 22 -75, -22 -75, -28 -68 Z" fill="#E2E8F0"/>
    <circle cx="-25" cy="-62" r="10" fill="#E2E8F0"/>
    <circle cx="25" cy="-62" r="10" fill="#E2E8F0"/>
  </g>

  <!-- Tea cup on little table beside chair -->
  <g transform="translate(280, 360)">
    <rect x="-10" y="5" width="20" height="16" rx="4" fill="#F472B6"/>
    <path d="M -4 -2 Q 0 -8 -4 -12" stroke="#CBD5E1" stroke-width="1.8" fill="none"/>
  </g>
</svg>`;

// 9. YOGA & MEDITATION — MIND-BODY HARMONY
// Holistic wellness illustration showing the connection between mind and body.
// Peaceful person practicing gentle yoga/meditation, surrounded by flowing circular energy shapes,
// lotus flowers, leaves, sunlight and subtle balance symbols.
// Pastel blue, mint, lavender, peach, warm yellow.
const svg9 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bg9" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E0F2FE" stop-opacity="0.8"/>
      <stop offset="35%" stop-color="#FDF4FF" stop-opacity="0.7"/>
      <stop offset="70%" stop-color="#FEF3C7" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#ECFDF5" stop-opacity="0.8"/>
    </linearGradient>
    <linearGradient id="harmonyRing" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#818CF8"/>
      <stop offset="50%" stop-color="#F472B6"/>
      <stop offset="100%" stop-color="#FBBF24"/>
    </linearGradient>
  </defs>

  <rect width="800" height="500" fill="url(#bg9)"/>

  <!-- Sacred Geometry / Harmony Mandala Rings -->
  <g transform="translate(400, 235)">
    <!-- Outermost Soft Ring -->
    <circle cx="0" cy="0" r="195" fill="none" stroke="#C4B5FD" stroke-width="2" stroke-dasharray="6 8" opacity="0.4"/>
    <!-- Middle Harmony Arc -->
    <circle cx="0" cy="0" r="150" fill="none" stroke="url(#harmonyRing)" stroke-width="3" opacity="0.6"/>
    <!-- Inner Radiant Aura -->
    <circle cx="0" cy="0" r="110" fill="#FEF08A" opacity="0.45"/>
    <circle cx="0" cy="0" r="75" fill="#FFFFFF" opacity="0.6"/>

    <!-- Subtle Yin-Yang / Balance Swirls -->
    <path d="M 0 -150 A 75 75 0 0 1 0 0 A 75 75 0 0 0 0 150" stroke="#93C5FD" stroke-width="2" fill="none" opacity="0.5"/>
  </g>

  <!-- Floating Lotus Blossoms & Petals orbiting gracefully -->
  <g transform="translate(210, 160) rotate(-15)">
    <path d="M -20 15 C -15 -15, 15 -15, 20 15 Z" fill="#F472B6" opacity="0.7"/>
    <path d="M -10 16 C -8 -5, 8 -5, 10 16 Z" fill="#FBCFE8"/>
  </g>
  <g transform="translate(590, 160) rotate(15)">
    <path d="M -20 15 C -15 -15, 15 -15, 20 15 Z" fill="#C084FC" opacity="0.7"/>
    <path d="M -10 16 C -8 -5, 8 -5, 10 16 Z" fill="#DDD6FE"/>
  </g>
  <g transform="translate(240, 340) rotate(25)">
    <path d="M 0 0 C 25 -25, 40 5, 25 25 Z" fill="#6EE7B7" opacity="0.7"/>
  </g>
  <g transform="translate(560, 340) rotate(-25)">
    <path d="M 0 0 C -25 -25, -40 5, -25 25 Z" fill="#FDE047" opacity="0.8"/>
  </g>

  <!-- Meditating Figure in Anjali Mudra (Prayer/Balance Hands at Heart) -->
  <g transform="translate(400, 230)">
    <!-- Base Shadow -->
    <ellipse cx="0" cy="175" rx="115" ry="18" fill="#CBD5E1" opacity="0.4"/>

    <!-- Full Lotus Legs in Soft Lavender -->
    <path d="M -110 145 C -105 110, -45 115, 0 125 C 45 115, 105 110, 110 145 C 105 170, -105 170, -110 145 Z" fill="#C4B5FD"/>
    <ellipse cx="-75" cy="145" rx="20" ry="12" fill="#A78BFA"/>
    <ellipse cx="75" cy="145" rx="20" ry="12" fill="#A78BFA"/>

    <!-- Torso in Mint/Teal Top -->
    <path d="M -38 25 C -38 5, -26 -15, 0 -15 C 26 -15, 38 5, 38 25 L 45 120 C 22 125, -22 125, -45 120 Z" fill="#A7F3D0"/>

    <!-- Arms bent meeting at heart center in Anjali Mudra -->
    <path d="M -35 25 C -55 50, -40 85, -5 65" stroke="#FDBA74" stroke-width="12" stroke-linecap="round" fill="none"/>
    <path d="M 35 25 C 55 50, 40 85, 5 65" stroke="#FDBA74" stroke-width="12" stroke-linecap="round" fill="none"/>
    <!-- Prayer hands together at chest center -->
    <path d="M -6 52 L 0 35 L 6 52 Z" fill="#FDBA74"/>
    <ellipse cx="0" cy="56" rx="8" ry="12" fill="#FED7AA"/>

    <!-- Head & Serene, Harmonious Expression -->
    <rect x="-9" y="-24" width="18" height="18" rx="5" fill="#FED7AA"/>
    <ellipse cx="0" cy="-56" rx="30" ry="34" fill="#FED7AA"/>
    
    <!-- Gentle closed eyes and warm smile -->
    <circle cx="-14" cy="-52" r="6" fill="#FB7185" opacity="0.3"/>
    <circle cx="14" cy="-52" r="6" fill="#FB7185" opacity="0.3"/>
    <path d="M -20 -58 Q -14 -64 -8 -58" stroke="#3730A3" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <path d="M 8 -58 Q 14 -64 20 -58" stroke="#3730A3" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <path d="M -8 -40 Q 0 -33 8 -40" stroke="#3730A3" stroke-width="2.4" fill="none" stroke-linecap="round"/>

    <!-- Graceful Topknot Hair -->
    <path d="M -30 -65 C -32 -98, 32 -98, 30 -65 C 22 -72, -22 -72, -30 -65 Z" fill="#1E1B4B"/>
    <circle cx="0" cy="-96" r="14" fill="#1E1B4B"/>
  </g>

  <!-- Golden Balance Sparkles around the Crown -->
  <path d="M 400 95 L 403 103 L 411 105 L 403 107 L 400 115 L 397 107 L 389 105 L 397 103 Z" fill="#FBBF24"/>
  <circle cx="360" cy="115" r="3.5" fill="#67E8F9"/>
  <circle cx="440" cy="115" r="3.5" fill="#F472B6"/>
</svg>`;

const files = [
  { name: 'optimistic-mind.svg', content: svg1 },
  { name: 'conscious-mind.svg', content: svg2 },
  { name: 'feel-calm.svg', content: svg3 },
  { name: 'mental-health.svg', content: svg4 },
  { name: 'yoga-hypertension.svg', content: svg5 },
  { name: 'yoga-nidra.svg', content: svg6 },
  { name: 'yoga-mindfulness.svg', content: svg7 },
  { name: 'meditation-seniors.svg', content: svg8 },
  { name: 'mind-body-harmony.svg', content: svg9 },
];

for (const file of files) {
  const filePath = path.join(outDir, file.name);
  fs.writeFileSync(filePath, file.content, 'utf8');
  console.log('Saved vector illustration:', file.name);
}

console.log('All 9 illustrations created successfully!');
