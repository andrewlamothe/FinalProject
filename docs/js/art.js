/* Lumina Oracle · card artwork
   Each card face is a full SVG: element palette, glow, scattered stars,
   a unique gold line-art illustration, frame, and title block.

   CUSTOM_ART lets you swap any card to painted/AI artwork: drop an image
   (5:8 ratio, e.g. 800×1280) into art/custom/ and map it here by card id:
     const CUSTOM_ART = { 1: 'art/custom/01-inner-flame.jpg' };
   See art/PROMPTS.md for a ready-made, style-consistent prompt per card. */

const CUSTOM_ART = {};

/* shared stroke style for illustrations */
const S = 'stroke="#ecd9a8" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
const FILL = 'rgba(243,220,164,.13)'; /* soft gold wash */
const DOT = '#f3dca4';

const ART_PALETTES = {
  fire:   { top: '#2b0d1d', mid: '#561b2a', bot: '#8e3a2c', glow: '#ffb05c' },
  water:  { top: '#0a1430', mid: '#16305e', bot: '#2b5a86', glow: '#cfe4ff' },
  air:    { top: '#131a2e', mid: '#2c3a60', bot: '#5d6f9e', glow: '#dfe8ff' },
  earth:  { top: '#0f1d15', mid: '#1f4030', bot: '#4a7a4e', glow: '#cfeebb' },
  spirit: { top: '#150d30', mid: '#2c1a58', bot: '#4b2e86', glow: '#fff3c4' },
};

/* per-card center illustrations, drawn in a 300×480 viewBox (stage ≈ y 70–370) */
const CARD_ART = {
  /* ── fire ── */
  1: `<g ${S}>
      <path d="M150 128 C 128 162 122 186 134 206 C 140 216 160 216 166 206 C 178 186 172 162 150 128 Z" fill="${FILL}"/>
      <path d="M150 162 C 142 178 140 190 146 200 C 149 205 151 205 154 200 C 160 190 158 178 150 162"/>
      <rect x="126" y="222" width="48" height="84" rx="6"/>
      <path d="M126 246 C 138 240 162 252 174 246"/>
      <path d="M150 306 L 150 318 M 118 318 L 182 318"/>
      <path d="M150 96 L 150 80 M 196 120 L 208 108 M 104 120 L 92 108 M 214 168 L 230 164 M 86 168 L 70 164" opacity=".7"/>
    </g>`,
  2: `<g ${S}>
      <path d="M150 280 C 138 250 142 220 150 196 C 158 220 162 250 150 280 Z" fill="${FILL}"/>
      <path d="M150 196 C 146 178 150 164 150 150 C 150 164 154 178 150 196"/>
      <circle cx="150" cy="143" r="9"/><path d="M150 134 L 154 124"/>
      <path d="M142 230 C 100 220 76 190 64 150 C 92 170 112 172 130 168"/>
      <path d="M138 244 C 92 244 60 220 42 184 C 74 210 102 212 124 204"/>
      <path d="M136 258 C 96 268 64 256 44 232 C 76 250 104 246 122 236"/>
      <path d="M158 230 C 200 220 224 190 236 150 C 208 170 188 172 170 168"/>
      <path d="M162 244 C 208 244 240 220 258 184 C 226 210 198 212 176 204"/>
      <path d="M164 258 C 204 268 236 256 256 232 C 224 250 196 246 178 236"/>
      <path d="M150 280 C 144 310 152 330 142 356 M 150 280 C 156 312 148 334 160 360"/>
      <path d="M150 280 C 150 320 150 344 150 372" stroke-dasharray="2 7"/>
    </g>`,
  3: `<g ${S}>
      <circle cx="150" cy="208" r="44"/>
      ${Array.from({ length: 14 }, (_, i) => {
        const a = (Math.PI * 2 * i) / 14 - Math.PI / 2;
        const x1 = 150 + Math.cos(a) * 52, y1 = 208 + Math.sin(a) * 52;
        const x2 = 150 + Math.cos(a) * 80, y2 = 208 + Math.sin(a) * 80;
        const mx = 150 + Math.cos(a + 0.18) * 70, my = 208 + Math.sin(a + 0.18) * 70;
        return `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}"/>`;
      }).join('')}
      <circle cx="136" cy="200" r="3" fill="${DOT}" stroke="none"/><circle cx="164" cy="200" r="3" fill="${DOT}" stroke="none"/>
      <path d="M144 222 L 150 228 L 156 222 M 150 228 L 150 236 M 142 240 C 146 244 154 244 158 240"/>
      <path d="M118 226 L 100 224 M 118 234 L 102 238 M 182 226 L 200 224 M 182 234 L 198 238" opacity=".7"/>
    </g>`,
  4: `<g ${S}>
      <path d="M76 330 L 76 196 C 76 142 110 110 150 110 C 190 110 224 142 224 196 L 224 330" />
      <path d="M90 330 L 90 200 C 90 152 118 124 150 124 C 182 124 210 152 210 200 L 210 330" opacity=".55"/>
      <circle cx="150" cy="210" r="38" fill="${FILL}"/>
      ${Array.from({ length: 12 }, (_, i) => {
        const a = (Math.PI * 2 * i) / 12;
        const x1 = 150 + Math.cos(a) * 46, y1 = 210 + Math.sin(a) * 46;
        const x2 = 150 + Math.cos(a) * 60, y2 = 210 + Math.sin(a) * 60;
        return `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)}"/>`;
      }).join('')}
      <path d="M60 330 L 240 330"/>
      <path d="M120 330 C 130 308 170 308 180 330" stroke-dasharray="2 6"/>
    </g>`,
  5: `<g ${S}>
      <path d="M118 332 C 150 300 160 268 166 226 L 184 130 L 196 142 C 196 196 188 252 158 300 C 148 316 134 328 118 332 Z" fill="${FILL}"/>
      <path d="M166 226 C 162 252 154 280 140 304"/>
      <path d="M184 130 C 196 104 216 92 236 90 C 224 104 220 122 214 138 C 208 130 196 130 184 130" fill="${FILL}"/>
      <path d="M214 96 C 222 110 230 112 236 110" opacity=".6"/>
      <circle cx="104" cy="344" r="6"/>
      <path d="M64 200 C 84 188 84 168 72 156 M 80 232 C 104 224 108 200 98 184" opacity=".7"/>
    </g>`,
  6: `<g ${S}>
      <path d="M138 200 L 162 200 L 156 330 L 144 330 Z"/>
      <path d="M130 200 L 170 200 M 134 188 L 166 188"/>
      <path d="M150 100 C 132 128 128 152 138 170 C 144 180 156 180 162 170 C 172 152 168 128 150 100 Z" fill="${FILL}"/>
      <path d="M150 134 C 144 146 143 156 148 164 C 150 167 152 167 154 164 C 158 156 156 146 150 134"/>
      <path d="M120 144 C 110 158 110 170 116 180 M 180 144 C 190 158 190 170 184 180" opacity=".7"/>
      <path d="M124 330 L 176 330 M 132 344 L 168 344"/>
      <circle cx="106" cy="110" r="2.4" fill="${DOT}" stroke="none"/><circle cx="196" cy="104" r="2" fill="${DOT}" stroke="none"/>
    </g>`,
  7: `<g ${S}>
      <path d="M150 312 C 110 280 74 252 74 206 C 74 176 96 158 120 158 C 134 158 146 166 150 178 C 154 166 166 158 180 158 C 204 158 226 176 226 206 C 226 252 190 280 150 312 Z" fill="${FILL}"/>
      <path d="M150 254 C 138 234 136 218 144 204 C 148 196 152 196 156 204 C 164 218 162 234 150 254 Z"/>
      <path d="M150 222 C 147 230 147 236 150 242 C 153 236 153 230 150 222" opacity=".8"/>
      <path d="M104 134 L 110 122 M 150 124 L 150 110 M 196 134 L 190 122" opacity=".75"/>
      <circle cx="84" cy="150" r="2.2" fill="${DOT}" stroke="none"/><circle cx="216" cy="150" r="2.2" fill="${DOT}" stroke="none"/>
    </g>`,
  8: `<g ${S}>
      <path d="M88 116 C 70 116 58 104 60 90 C 62 78 74 72 84 76 C 86 60 104 52 118 58 C 124 44 146 40 158 50 C 168 40 190 44 194 58 C 210 54 226 64 226 80 C 238 82 244 96 236 106 C 228 116 214 116 206 112" opacity=".85"/>
      <path d="M170 124 L 134 200 L 158 200 L 118 286 L 144 286 L 116 360" fill="${FILL}"/>
      <path d="M116 360 L 160 300 L 138 300 L 178 214 L 154 214 L 186 144" opacity="0"/>
      <path d="M170 124 L 186 144 M 116 360 L 124 332"/>
      <path d="M70 200 L 84 208 M 226 180 L 212 190 M 220 250 L 204 252" opacity=".6"/>
    </g>`,
  9: `<g ${S}>
      <path d="M96 320 L 204 320 M 108 320 L 192 296 M 192 320 L 108 296"/>
      <path d="M150 184 C 122 222 116 252 130 276 C 138 290 162 290 170 276 C 184 252 178 222 150 184 Z" fill="${FILL}"/>
      <path d="M150 228 C 140 244 138 258 146 268 C 149 272 151 272 154 268 C 162 258 160 244 150 228"/>
      <path d="M118 206 C 108 222 106 236 112 250 M 182 206 C 192 222 194 236 188 250" opacity=".65"/>
      <circle cx="118" cy="160" r="2.4" fill="${DOT}" stroke="none"/><circle cx="184" cy="148" r="2" fill="${DOT}" stroke="none"/><circle cx="150" cy="128" r="2.8" fill="${DOT}" stroke="none"/>
      <path d="M226 116 a 26 26 0 1 1 -18 -44 a 20 20 0 1 0 18 44 Z" fill="${FILL}" opacity=".9"/>
    </g>`,
  /* ── water ── */
  10: `<g>
      <circle cx="150" cy="148" r="52" fill="#f0e6c8" opacity=".95"/>
      <circle cx="134" cy="134" r="9" fill="#ddd0ab"/><circle cx="166" cy="158" r="6" fill="#ddd0ab"/>
      <circle cx="148" cy="172" r="4.5" fill="#ddd0ab"/><circle cx="170" cy="130" r="4" fill="#ddd0ab"/>
      <path d="M150 204 L 132 360 L 168 360 Z" fill="rgba(240,230,200,.13)"/>
      <g ${S}>
        <path d="M28 300 C 60 286 90 314 122 300 C 154 286 184 314 216 300 C 248 286 264 306 276 300"/>
        <path d="M22 330 C 58 316 92 344 128 330 C 164 316 196 344 232 330 C 258 320 270 334 280 330"/>
        <path d="M28 360 C 64 346 100 374 138 360 C 176 346 210 374 248 360 C 262 355 272 362 278 360"/>
        <path d="M40 390 C 76 378 112 402 150 390 C 188 378 222 402 258 390" opacity=".7"/>
      </g>
    </g>`,
  11: `<g ${S}>
      <path d="M104 250 L 104 320 M 196 250 L 196 320 M 92 320 L 208 320 M 92 332 L 208 332"/>
      <ellipse cx="150" cy="250" rx="46" ry="12"/>
      <path d="M104 250 L 110 200 L 190 200 L 196 250"/>
      <path d="M96 200 L 204 200 M 116 200 L 150 152 L 184 200" />
      <path d="M150 152 L 150 142"/>
      <path d="M150 200 L 150 268" stroke-dasharray="2 6"/>
      <path d="M138 268 L 162 268 L 160 284 L 140 284 Z" fill="${FILL}"/>
      <ellipse cx="150" cy="306" rx="22" ry="5" opacity=".7"/><ellipse cx="150" cy="306" rx="36" ry="8" opacity=".4"/>
      <circle cx="150" cy="124" r="2.4" fill="${DOT}" stroke="none"/>
    </g>`,
  12: `<g ${S}>
      <path d="M62 268 L 238 268" />
      <path d="M104 268 A 46 46 0 0 1 196 268" fill="${FILL}"/>
      ${Array.from({ length: 7 }, (_, i) => {
        const a = Math.PI + (Math.PI * i) / 6;
        const x1 = 150 + Math.cos(a) * 56, y1 = 268 + Math.sin(a) * 56;
        const x2 = 150 + Math.cos(a) * 76, y2 = 268 + Math.sin(a) * 76;
        return `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)}"/>`;
      }).join('')}
      <path d="M36 296 C 70 284 102 308 136 296 C 170 284 200 308 234 296 C 252 290 262 298 268 296"/>
      <path d="M48 326 C 82 314 114 338 148 326 C 182 314 212 338 246 326" opacity=".7"/>
      <path d="M66 354 C 98 344 128 364 160 354 C 192 344 218 360 240 354" opacity=".45"/>
    </g>`,
  13: `<g ${S}>
      <path d="M150 108 C 134 134 128 152 136 168 C 142 180 158 180 164 168 C 172 152 166 134 150 108 Z" fill="${FILL}"/>
      <ellipse cx="150" cy="248" rx="26" ry="7"/>
      <ellipse cx="150" cy="252" rx="48" ry="13" opacity=".7"/>
      <ellipse cx="150" cy="258" rx="72" ry="19" opacity=".45"/>
      <ellipse cx="150" cy="264" rx="96" ry="25" opacity=".25"/>
      <path d="M150 180 L 150 238" stroke-dasharray="1.5 8"/>
      <path d="M84 300 C 96 288 112 288 120 296 C 110 302 94 304 84 300 Z" fill="${FILL}"/>
      <path d="M216 300 C 204 288 188 288 180 296 C 190 302 206 304 216 300 Z" fill="${FILL}"/>
    </g>`,
  14: `<g ${S}>
      <path d="M74 96 C 130 118 168 110 194 132 C 222 156 212 192 178 204 C 142 218 112 210 92 230 C 70 252 84 286 122 296 C 160 306 196 298 226 318" />
      <path d="M62 110 C 116 132 158 124 184 144" opacity=".5"/>
      <path d="M238 330 C 196 312 158 318 124 310" opacity=".5"/>
      <path d="M148 158 C 158 148 174 148 180 156 C 172 164 156 166 148 158 Z" fill="${FILL}"/>
      <path d="M156 158 L 152 166" opacity=".8"/>
      <path d="M118 256 C 128 246 144 246 150 254 C 142 262 126 264 118 256 Z" fill="${FILL}" opacity=".8"/>
      <circle cx="216" cy="172" r="2.2" fill="${DOT}" stroke="none"/><circle cx="96" cy="190" r="2" fill="${DOT}" stroke="none"/>
    </g>`,
  15: `<g ${S}>
      <path d="M70 268 C 70 222 106 190 150 190 C 194 190 230 222 230 268 Z" fill="${FILL}"/>
      ${Array.from({ length: 7 }, (_, i) => {
        const a = Math.PI + (Math.PI * (i + 0.5)) / 7;
        const x = 150 + Math.cos(a) * 74, y = 268 + Math.sin(a) * 72;
        return `<path d="M 150 264 Q ${((150 + x) / 2).toFixed(1)} ${((264 + y) / 2 - 8).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}" opacity=".55"/>`;
      }).join('')}
      <path d="M70 268 C 70 296 106 314 150 314 C 194 314 230 296 230 268"/>
      <path d="M86 286 C 110 300 190 300 214 286" opacity=".5"/>
      <circle cx="150" cy="258" r="17" fill="#f0e6c8" stroke="#ddd0ab"/>
      <path d="M141 252 a 10 10 0 0 1 8 -4" stroke="#fff" opacity=".9"/>
      <circle cx="116" cy="160" r="3"/><circle cx="138" cy="136" r="2.2"/><circle cx="170" cy="150" r="2.6"/>
    </g>`,
  16: `<g ${S}>
      <path d="M60 240 L 110 162 L 138 204 L 168 140 L 240 240" fill="${FILL}"/>
      <path d="M154 170 L 168 140 L 184 162" opacity=".8"/>
      <path d="M48 240 L 252 240"/>
      <g opacity=".5">
        <path d="M60 240 L 110 318 L 138 276 L 168 340 L 240 240"/>
        <path d="M154 310 L 168 340 L 184 318"/>
      </g>
      <path d="M58 262 L 92 262 M 120 276 L 160 276 M 196 262 L 240 262 M 84 296 L 124 296 M 180 300 L 220 300" opacity=".4"/>
      <circle cx="206" cy="118" r="2.6" fill="${DOT}" stroke="none"/><circle cx="84" cy="128" r="2" fill="${DOT}" stroke="none"/>
    </g>`,
  17: `<g ${S}>
      <path d="M96 176 C 76 176 62 162 64 146 C 66 132 80 124 92 128 C 96 108 118 98 136 106 C 144 90 170 86 184 98 C 196 88 220 94 224 110 C 242 110 254 126 248 142 C 244 156 230 162 218 158 C 212 170 198 176 188 172" fill="${FILL}"/>
      <path d="M100 200 L 92 224 M 132 204 L 124 228 M 164 204 L 156 228 M 196 200 L 188 224" />
      <path d="M116 244 L 108 268 M 148 248 L 140 272 M 180 244 L 172 268" opacity=".7"/>
      <path d="M150 330 C 150 310 150 298 150 290 M 150 290 C 138 296 130 308 130 318 M 150 290 C 162 296 170 308 170 318"/>
      <path d="M118 336 L 182 336"/>
    </g>`,
  18: `<g ${S}>
      <path d="M132 290 L 138 170 L 162 170 L 168 290 Z"/>
      <path d="M134 250 L 166 250 M 136 212 L 164 212"/>
      <path d="M138 170 L 134 152 L 166 152 L 162 170 M 140 152 L 150 134 L 160 152"/>
      <circle cx="150" cy="160" r="0.5"/>
      <path d="M128 152 L 96 132 M 128 160 L 92 156 M 172 152 L 204 132 M 172 160 L 208 156" opacity=".75"/>
      <path d="M120 290 L 180 290"/>
      <path d="M36 312 C 70 300 102 322 136 312 C 170 300 202 324 236 312 C 256 306 266 314 272 312"/>
      <path d="M52 342 C 86 330 118 352 152 342 C 186 330 216 352 248 342" opacity=".6"/>
      <circle cx="150" cy="106" r="2.6" fill="${DOT}" stroke="none"/>
    </g>`,
  /* ── air ── */
  19: `<g ${S}>
      <path d="M118 222 C 130 196 152 184 178 186 C 170 196 168 204 170 212 C 186 206 202 208 212 218 C 198 222 190 228 186 236 C 174 258 148 264 126 252 Z" fill="${FILL}"/>
      <path d="M178 186 C 186 176 198 172 208 174 M 208 174 L 216 178" />
      <circle cx="214" cy="180" r="1.6" fill="${DOT}" stroke="none"/>
      <path d="M126 252 C 116 262 112 272 112 282"/>
      <path d="M142 232 C 120 246 96 248 76 240 C 92 234 102 226 108 216" opacity=".8"/>
      <rect x="120" y="306" width="60" height="40" rx="4"/>
      <path d="M120 310 L 150 330 L 180 310"/>
      <path d="M84 130 C 104 124 118 128 128 138 M 196 122 C 212 118 226 122 234 130" opacity=".5"/>
    </g>`,
  20: `<g ${S}>
      <circle cx="150" cy="170" r="40" fill="${FILL}"/>
      ${Array.from({ length: 16 }, (_, i) => {
        const a = (Math.PI * 2 * i) / 16;
        const long = i % 2 === 0;
        const x1 = 150 + Math.cos(a) * 50, y1 = 170 + Math.sin(a) * 50;
        const x2 = 150 + Math.cos(a) * (long ? 72 : 60), y2 = 170 + Math.sin(a) * (long ? 72 : 60);
        return `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)}" ${long ? '' : 'opacity=".6"'}/>`;
      }).join('')}
      <path d="M40 320 C 80 288 120 272 150 272 C 180 272 220 288 260 320"/>
      <path d="M64 320 C 98 296 128 284 150 284 C 172 284 202 296 236 320" opacity=".5"/>
      <path d="M46 338 L 254 338" opacity=".7"/>
    </g>`,
  21: `<g ${S}>
      <path d="M150 96 C 196 130 212 196 196 262 C 188 294 170 318 150 330 Z" fill="${FILL}"/>
      <path d="M150 96 C 104 130 88 196 104 262 C 112 294 130 318 150 330 Z"/>
      <path d="M150 96 L 150 330"/>
      <path d="M150 150 C 136 152 124 160 116 172 M 150 150 C 164 152 176 160 184 172" opacity=".7"/>
      <path d="M150 196 C 132 198 118 208 110 222 M 150 196 C 168 198 182 208 190 222" opacity=".7"/>
      <path d="M150 244 C 136 246 126 252 118 262 M 150 244 C 164 246 174 252 182 262" opacity=".7"/>
      <path d="M150 330 C 150 344 146 356 138 366" stroke-dasharray="2 6"/>
      <path d="M64 140 C 80 132 94 134 104 142 M 196 120 C 210 112 226 114 236 124" opacity=".45"/>
    </g>`,
  22: `<g ${S}>
      <circle cx="150" cy="220" r="92"/>
      <circle cx="150" cy="220" r="78" stroke-dasharray="2 8" opacity=".7"/>
      <path d="M150 136 L 162 208 L 150 220 L 138 208 Z" fill="${FILL}"/>
      <path d="M150 304 L 138 232 L 150 220 L 162 232 Z"/>
      <path d="M66 220 L 138 208 L 150 220 L 138 232 Z"/>
      <path d="M234 220 L 162 232 L 150 220 L 162 208 Z" fill="${FILL}"/>
      <path d="M96 166 L 140 210 M 204 166 L 160 210 M 96 274 L 140 230 M 204 274 L 160 230" opacity=".45"/>
      <circle cx="150" cy="220" r="6" fill="${DOT}" stroke="none"/>
      <path d="M150 122 L 150 110 M 144 116 L 150 104 L 156 116" opacity=".9"/>
    </g>`,
  23: `<g ${S}>
      <rect x="84" y="110" width="132" height="190" rx="8"/>
      <path d="M150 110 L 150 300 M 84 205 L 216 205"/>
      <path d="M84 300 C 96 314 110 320 124 320 M 216 300 C 204 314 190 320 176 320" opacity=".7"/>
      <circle cx="118" cy="156" r="10" fill="${FILL}"/>
      <path d="M118 142 L 118 134 M 118 178 L 118 170 M 132 156 L 140 156 M 104 156 L 96 156" opacity=".8"/>
      <path d="M168 246 C 184 240 198 244 206 254 C 196 262 180 262 168 254" fill="${FILL}" opacity=".9"/>
      <path d="M226 168 C 244 162 256 166 264 176 M 230 196 C 246 192 256 196 262 204" opacity=".6"/>
      <circle cx="186" cy="148" r="2.6" fill="${DOT}" stroke="none"/><circle cx="200" cy="170" r="1.8" fill="${DOT}" stroke="none"/>
    </g>`,
  24: `<g ${S}>
      <path d="M188 96 L 172 130 L 184 130 L 164 168" opacity=".8"/>
      <path d="M132 214 C 130 196 140 180 158 176 C 150 186 150 194 154 200 C 164 196 176 198 182 206 C 174 210 170 214 168 220 C 162 240 144 248 128 242 Z" fill="${FILL}"/>
      <path d="M158 176 C 164 168 172 164 180 166 M 180 166 L 186 170"/>
      <circle cx="184" cy="171" r="1.5" fill="${DOT}" stroke="none"/>
      <path d="M128 242 C 122 250 120 258 120 266"/>
      <path d="M70 268 C 100 258 132 262 158 252 C 196 238 224 240 244 252"/>
      <path d="M88 268 L 84 282 M 120 262 L 118 278 M 226 248 L 230 262" opacity=".6"/>
      <circle cx="92" cy="130" r="2.2" fill="${DOT}" stroke="none"/><circle cx="118" cy="106" r="1.8" fill="${DOT}" stroke="none"/>
    </g>`,
  25: `<g ${S}>
      <path d="M150 92 L 198 152 L 150 212 L 102 152 Z" fill="${FILL}"/>
      <path d="M150 92 L 150 212 M 102 152 L 198 152"/>
      <path d="M150 212 C 142 250 158 274 146 308 C 140 326 128 338 112 344" stroke-dasharray="3 6"/>
      <path d="M146 240 L 162 234 M 150 274 L 134 270" opacity=".7"/>
      <circle cx="104" cy="350" r="9"/>
      <path d="M96 344 L 112 356 M 96 356 L 112 344" opacity=".7"/>
      <path d="M196 96 C 212 90 226 92 234 100 M 206 122 C 220 118 230 120 236 126" opacity=".5"/>
    </g>`,
  26: `<g ${S}>
      <path d="M64 160 C 110 148 160 152 196 166 C 224 176 230 198 214 208 C 200 216 184 208 184 196 C 184 186 194 182 200 186"/>
      <path d="M58 216 C 104 204 156 208 196 222 C 228 232 234 258 214 268 C 198 276 180 268 180 254 C 180 242 192 238 199 243" opacity=".75"/>
      <path d="M76 272 C 116 262 158 266 190 278 C 212 286 216 304 202 312 C 190 318 176 312 176 302" opacity=".5"/>
      <path d="M104 122 C 116 114 130 114 138 120" opacity=".55"/>
      <circle cx="66" cy="140" r="2" fill="${DOT}" stroke="none"/><circle cx="226" cy="148" r="2.4" fill="${DOT}" stroke="none"/><circle cx="240" cy="294" r="2" fill="${DOT}" stroke="none"/>
    </g>`,
  27: `<g ${S} stroke-width="2.2">
      ${[
        [70, 280, 1], [96, 258, 1.1], [124, 240, 1.2], [154, 226, 1.25], [184, 218, 1.2],
        [212, 216, 1.05], [236, 222, 0.9], [110, 296, 0.85], [140, 280, 1], [170, 264, 1.1],
        [200, 252, 1], [226, 248, 0.85], [86, 318, 0.7], [120, 318, 0.8], [152, 304, 0.9],
        [184, 292, 0.85], [214, 284, 0.7], [240, 280, 0.6], [76, 244, 0.8], [102, 224, 0.9],
        [132, 206, 1], [164, 194, 1.05], [196, 188, 0.95], [224, 190, 0.8], [248, 198, 0.65],
        [148, 168, 0.8], [180, 160, 0.85], [210, 158, 0.7], [236, 162, 0.6], [118, 182, 0.7],
      ].map(([x, y, s]) =>
        `<path d="M ${x - 9 * s} ${y - 5 * s} Q ${x} ${y + 4 * s} ${x + 9 * s} ${y - 5 * s}" opacity="${(0.35 + s * 0.5).toFixed(2)}"/>`
      ).join('')}
      <circle cx="86" cy="128" r="2" fill="${DOT}" stroke="none"/><circle cx="222" cy="116" r="2.4" fill="${DOT}" stroke="none"/>
    </g>`,
  /* ── earth ── */
  28: `<g ${S}>
      <path d="M150 254 L 150 160"/>
      <path d="M150 196 C 126 188 108 168 102 142 C 124 148 142 162 150 180 C 158 162 176 148 198 142 C 192 168 174 188 150 196" fill="${FILL}"/>
      <path d="M150 160 C 132 144 124 122 126 100 C 142 112 150 130 150 148 C 150 130 158 112 174 100 C 176 122 168 144 150 160" fill="${FILL}"/>
      <path d="M118 124 C 104 118 94 106 90 92 M 182 124 C 196 118 206 106 210 92" opacity=".6"/>
      <path d="M62 254 L 238 254"/>
      <g opacity=".75">
        <path d="M150 254 L 150 296 M 150 268 C 128 274 112 288 104 308 M 150 268 C 172 274 188 288 196 308"/>
        <path d="M150 284 C 134 292 124 304 120 320 M 150 284 C 166 292 176 304 180 320" opacity=".7"/>
      </g>
    </g>`,
  29: `<g ${S}>
      <path d="M150 250 L 150 196"/>
      <path d="M150 214 C 138 200 122 194 106 196 C 112 212 126 222 142 222 C 146 222 148 220 150 218" fill="${FILL}"/>
      <path d="M150 200 C 160 188 174 182 188 184 C 184 198 172 208 158 208" fill="${FILL}"/>
      <path d="M86 268 C 110 254 190 254 214 268 C 198 280 102 280 86 268 Z"/>
      <path d="M100 286 L 200 286 M 114 300 L 186 300" opacity=".5"/>
      ${Array.from({ length: 7 }, (_, i) => {
        const a = Math.PI + (Math.PI * (i + 0.5)) / 7;
        const x1 = 150 + Math.cos(a) * 78, y1 = 170 + Math.sin(a) * 64;
        const x2 = 150 + Math.cos(a) * 96, y2 = 170 + Math.sin(a) * 80;
        return `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)}" opacity=".55"/>`;
      }).join('')}
    </g>`,
  30: `<g ${S}>
      ${[-26, -13, 0, 13, 26].map((dx, i) => {
        const lean = dx * 0.55;
        return `<path d="M ${150 + dx} 330 C ${150 + dx - lean * 0.3} 280 ${150 + dx - lean} 230 ${150 + dx - lean} 186"/>
        ${Array.from({ length: 5 }, (_, j) => {
          const y = 186 + j * 16, x = 150 + dx - lean * (1 - j * 0.12);
          return `<path d="M ${x} ${y} C ${x - 10} ${y - 8} ${x - 12} ${y - 18} ${x - 8} ${y - 24} M ${x} ${y} C ${x + 10} ${y - 8} ${x + 12} ${y - 18} ${x + 8} ${y - 24}" opacity=".8"/>`;
        }).join('')}`;
      }).join('')}
      <path d="M118 296 C 134 286 166 286 182 296" stroke-width="3"/>
      <path d="M122 304 C 138 296 162 296 178 304" opacity=".6"/>
    </g>`,
  31: `<g ${S}>
      <path d="M30 340 L 96 240 L 130 286 L 178 196 L 226 262 L 252 224 L 282 340" fill="${FILL}"/>
      <path d="M164 222 L 178 196 L 192 218" opacity=".8"/>
      <path d="M252 224 L 252 200 L 268 206 L 252 212" />
      <path d="M64 340 C 96 320 110 304 122 290 C 138 272 158 258 178 250 C 202 240 224 234 244 232" stroke-dasharray="2 7"/>
      <circle cx="252" cy="196" r="2.6" fill="${DOT}" stroke="none"/>
      <path d="M22 340 L 286 340" opacity=".8"/>
    </g>`,
  32: `<g ${S}>
      <path d="M88 330 L 88 210 L 150 150 L 212 210 L 212 330 Z"/>
      <path d="M74 222 L 150 148 L 226 222"/>
      <rect x="128" y="262" width="44" height="68" rx="3"/>
      <path d="M150 262 L 150 330 M 128 296 L 172 296" opacity=".6"/>
      <rect x="180" y="160" width="16" height="34"/>
      <path d="M188 144 C 184 130 192 122 188 108 M 196 140 C 200 128 194 120 198 108" opacity=".7"/>
      <path d="M104 240 a 10 10 0 1 1 0.1 0 M 196 240 a 10 10 0 1 1 0.1 0" opacity=".7"/>
      <path d="M64 330 L 236 330"/>
    </g>`,
  33: `<g ${S}>
      <path d="M226 132 a 30 30 0 1 1 -20 -50 a 24 24 0 1 0 20 50 Z" fill="${FILL}"/>
      <rect x="62" y="240" width="30" height="74" rx="4" transform="rotate(-6 77 277)"/>
      <rect x="110" y="226" width="32" height="88" rx="4"/>
      <rect x="160" y="228" width="32" height="86" rx="4" transform="rotate(4 176 271)"/>
      <rect x="210" y="244" width="28" height="70" rx="4" transform="rotate(8 224 279)"/>
      <path d="M104 226 L 148 226 M 154 230 L 198 230" opacity=".7"/>
      <path d="M44 322 L 256 322" opacity=".8"/>
      <circle cx="96" cy="120" r="2.2" fill="${DOT}" stroke="none"/><circle cx="130" cy="96" r="1.8" fill="${DOT}" stroke="none"/>
    </g>`,
  34: `<g ${S}>
      <path d="M82 268 C 82 216 112 184 150 184 C 188 184 218 216 218 268 Z" fill="${FILL}"/>
      <path d="M104 268 C 104 236 124 212 150 212 C 176 212 196 236 196 268" opacity=".6"/>
      <path d="M124 240 L 150 226 L 176 240 L 176 262 L 150 274 L 124 262 Z" opacity=".75"/>
      <path d="M150 226 L 150 274 M 124 240 L 176 262 M 176 240 L 124 262" opacity=".4"/>
      <path d="M218 256 C 232 252 242 256 244 266 C 246 274 240 280 232 280 C 226 280 222 276 222 272" />
      <circle cx="236" cy="264" r="1.6" fill="${DOT}" stroke="none"/>
      <path d="M96 268 C 92 278 92 286 96 292 M 130 270 C 128 280 128 288 132 294 M 170 270 C 172 280 172 288 168 294 M 204 268 C 208 278 208 286 204 292" opacity=".8"/>
      <path d="M64 300 L 236 300" opacity=".7"/>
    </g>`,
  35: `<g ${S}>
      <path d="M58 330 C 58 230 98 158 150 158 C 202 158 242 230 242 330" fill="${FILL}"/>
      <path d="M84 330 C 84 252 112 196 150 196 C 188 196 216 252 216 330"/>
      <path d="M118 196 L 122 216 M 150 188 L 150 212 M 182 196 L 178 216" opacity=".6"/>
      <path d="M138 286 L 162 286 L 158 330 L 142 330 Z" opacity=".9"/>
      <path d="M150 258 C 144 268 143 276 147 282 C 149 285 151 285 153 282 C 157 276 156 268 150 258 Z" fill="${FILL}"/>
      <path d="M40 330 L 260 330"/>
      <circle cx="150" cy="132" r="2.2" fill="${DOT}" stroke="none"/>
    </g>`,
  /* ── spirit ── */
  36: `<g ${S}>
      <path d="M196 96 C 210 110 210 130 198 142 L 186 154"/>
      <ellipse cx="201" cy="106" rx="5" ry="9" transform="rotate(40 201 106)"/>
      <path d="M186 154 C 150 190 110 184 86 214 C 64 242 80 274 112 280 C 146 286 170 264 162 238 C 156 218 130 214 118 230" stroke-dasharray="4 5"/>
      <path d="M118 230 C 110 242 116 256 130 258" stroke-dasharray="4 5" opacity=".8"/>
      ${[[88, 130], [232, 168], [70, 188], [226, 246], [186, 312], [98, 318]].map(([x, y]) =>
        `<path d="M ${x} ${y - 7} L ${x + 2} ${y - 2} L ${x + 7} ${y} L ${x + 2} ${y + 2} L ${x} ${y + 7} L ${x - 2} ${y + 2} L ${x - 7} ${y} L ${x - 2} ${y - 2} Z" fill="${DOT}" stroke="none"/>`
      ).join('')}
    </g>`,
  37: `<g ${S}>
      <path d="M70 110 L 230 110"/>
      <path d="M86 110 C 82 170 88 250 78 330 C 96 314 108 296 112 278" fill="${FILL}"/>
      <path d="M214 110 C 218 170 212 250 222 330 C 204 314 192 296 188 278" fill="${FILL}"/>
      <path d="M112 110 C 110 160 114 220 108 280" opacity=".6"/>
      <path d="M188 110 C 190 160 186 220 192 280" opacity=".6"/>
      <circle cx="150" cy="190" r="26" opacity=".9"/>
      <path d="M150 156 L 150 146 M 150 234 L 150 224 M 184 190 L 194 190 M 106 190 L 116 190" opacity=".6"/>
      <circle cx="150" cy="190" r="4" fill="${DOT}" stroke="none"/>
      <circle cx="134" cy="262" r="2" fill="${DOT}" stroke="none"/><circle cx="166" cy="282" r="2.4" fill="${DOT}" stroke="none"/><circle cx="150" cy="316" r="1.8" fill="${DOT}" stroke="none"/>
    </g>`,
  38: `<g>
      <g fill="#e8c46f">
        <path d="M150 76 L 159 148 L 150 160 L 141 148 Z"/>
        <path d="M150 244 L 141 172 L 150 160 L 159 172 Z"/>
        <path d="M66 160 L 138 151 L 150 160 L 138 169 Z"/>
        <path d="M234 160 L 162 169 L 150 160 L 162 151 Z"/>
      </g>
      <circle cx="150" cy="160" r="7" fill="#fff7dd"/>
      <g ${S}>
        <circle cx="150" cy="160" r="58" stroke-dasharray="3 8"/>
        <circle cx="150" cy="160" r="92" stroke-dasharray="2 10" opacity=".7"/>
        <path d="M20 372 L 76 312 L 116 348 L 162 296 L 208 344 L 246 314 L 280 372"/>
        <path d="M150 372 C 146 340 156 320 150 296" stroke-dasharray="2 7"/>
      </g>
      <g fill="${DOT}">
        <circle cx="58" cy="92" r="2.2"/><circle cx="92" cy="64" r="1.6"/><circle cx="236" cy="84" r="2.4"/><circle cx="252" cy="220" r="2"/>
      </g>
    </g>`,
  39: `<g ${S}>
      <circle cx="150" cy="186" r="64"/>
      <circle cx="150" cy="186" r="58" opacity=".5"/>
      ${(() => {
        const pts = Array.from({ length: 8 }, (_, i) => {
          const a = (Math.PI * 2 * i) / 8 - Math.PI / 2;
          return [150 + Math.cos(a) * 58, 186 + Math.sin(a) * 58];
        });
        let web = '';
        for (let i = 0; i < 8; i++) {
          const [x1, y1] = pts[i], [x2, y2] = pts[(i + 3) % 8];
          web += `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)}" opacity=".5"/>`;
        }
        return web;
      })()}
      <circle cx="150" cy="186" r="8" fill="${FILL}"/>
      <path d="M114 240 C 112 268 116 290 112 314 M 150 250 C 150 278 154 300 150 326 M 186 240 C 188 268 184 290 188 314" stroke-dasharray="1 0"/>
      <path d="M106 296 C 112 300 116 300 120 296 M 144 308 C 150 312 154 312 158 308 M 180 296 C 186 300 190 300 194 296" opacity=".7"/>
      <circle cx="113" cy="278" r="2.4" fill="${DOT}" stroke="none"/><circle cx="151" cy="290" r="2.4" fill="${DOT}" stroke="none"/><circle cx="187" cy="278" r="2.4" fill="${DOT}" stroke="none"/>
    </g>`,
  40: `<g ${S}>
      <path d="M138 122 L 162 122 M 144 122 L 144 168 L 96 282 C 88 302 100 322 122 322 L 178 322 C 200 322 212 302 204 282 L 156 168 L 156 122" fill="${FILL}"/>
      <path d="M112 246 L 188 246" opacity=".7"/>
      <circle cx="136" cy="280" r="5" opacity=".8"/><circle cx="162" cy="296" r="4" opacity=".7"/><circle cx="152" cy="264" r="3" opacity=".6"/>
      <path d="M150 196 L 153 207 L 164 210 L 153 213 L 150 224 L 147 213 L 136 210 L 147 207 Z" fill="${DOT}" stroke="none"/>
      <circle cx="84" cy="150" r="13"/>
      <path d="M246 142 a 14 14 0 1 1 -10 -23 a 11 11 0 1 0 10 23 Z" fill="${FILL}"/>
      <path d="M84 130 L 84 124 M 84 176 L 84 170 M 104 150 L 98 150 M 70 150 L 64 150" opacity=".6"/>
    </g>`,
  41: `<g ${S}>
      <path d="M150 120 C 174 136 198 142 220 142 C 220 226 196 286 150 320 C 104 286 80 226 80 142 C 102 142 126 136 150 120 Z" fill="${FILL}"/>
      <path d="M150 140 C 168 152 186 158 202 158 C 202 222 184 270 150 298 C 116 270 98 222 98 158 C 114 158 132 152 150 140 Z" opacity=".55"/>
      <path d="M150 178 L 155 194 L 172 194 L 158 204 L 163 220 L 150 210 L 137 220 L 142 204 L 128 194 L 145 194 Z" fill="${DOT}" stroke="none"/>
      <path d="M74 160 C 56 166 44 178 40 194 C 56 192 68 184 76 172 M 226 160 C 244 166 256 178 260 194 C 244 192 232 184 224 172" opacity=".75"/>
      <circle cx="150" cy="92" r="2.6" fill="${DOT}" stroke="none"/>
    </g>`,
  42: `<g ${S}>
      <path d="M82 240 C 82 282 112 310 150 310 C 188 310 218 282 218 240 Z" fill="${FILL}"/>
      <path d="M94 252 C 120 262 180 262 206 252" opacity=".5"/>
      <path d="M150 310 L 150 330 M 122 338 L 178 338 M 134 330 L 166 330"/>
      <path d="M150 122 C 146 152 150 180 146 210 M 162 134 C 160 158 164 184 160 212 M 138 140 C 136 162 138 188 136 214" stroke-dasharray="1.5 7"/>
      ${[[150, 110], [163, 124], [137, 128]].map(([x, y], i) =>
        `<path d="M ${x} ${y - 6} L ${x + 1.8} ${y - 1.8} L ${x + 6} ${y} L ${x + 1.8} ${y + 1.8} L ${x} ${y + 6} L ${x - 1.8} ${y + 1.8} L ${x - 6} ${y} L ${x - 1.8} ${y - 1.8} Z" fill="${DOT}" stroke="none" opacity="${1 - i * 0.25}"/>`
      ).join('')}
      <circle cx="150" cy="228" r="2.2" fill="${DOT}" stroke="none"/>
    </g>`,
  43: `<g ${S}>
      <path d="M150 218 C 150 206 162 200 170 208 C 180 218 174 236 160 240 C 140 246 124 230 126 210 C 128 184 154 168 178 176 C 208 186 220 218 208 246 C 194 280 152 292 120 276 C 82 258 70 210 90 174 C 96 162 106 152 118 144" fill="none"/>
      <path d="M118 144 C 124 142 130 142 134 144 M 118 144 C 116 150 116 156 118 160" opacity=".8"/>
      <circle cx="150" cy="222" r="2.6" fill="${DOT}" stroke="none"/>
      ${[[222, 130], [78, 120], [240, 290], [78, 300]].map(([x, y]) =>
        `<path d="M ${x} ${y - 6} L ${x + 1.8} ${y - 1.8} L ${x + 6} ${y} L ${x + 1.8} ${y + 1.8} L ${x} ${y + 6} L ${x - 1.8} ${y + 1.8} L ${x - 6} ${y} L ${x - 1.8} ${y - 1.8} Z" fill="${DOT}" stroke="none"/>`
      ).join('')}
    </g>`,
  44: `<g ${S}>
      <path d="M84 290 L 76 200 L 116 240 L 150 184 L 184 240 L 224 200 L 216 290 Z" fill="${FILL}"/>
      <path d="M84 306 L 216 306 M 90 318 L 210 318"/>
      <circle cx="150" cy="172" r="5" fill="${DOT}" stroke="none"/>
      <circle cx="73" cy="188" r="4" fill="${DOT}" stroke="none"/>
      <circle cx="227" cy="188" r="4" fill="${DOT}" stroke="none"/>
      <path d="M96 268 C 120 258 180 258 204 268" opacity=".5"/>
      ${(() => {
        return Array.from({ length: 7 }, (_, i) => {
          const a = Math.PI + (Math.PI * (i + 0.5)) / 7;
          const x = 150 + Math.cos(a) * 100, y = 196 + Math.sin(a) * 92;
          return `<path d="M ${x.toFixed(1)} ${(y - 5).toFixed(1)} L ${(x + 1.6).toFixed(1)} ${(y - 1.6).toFixed(1)} L ${(x + 5).toFixed(1)} ${y.toFixed(1)} L ${(x + 1.6).toFixed(1)} ${(y + 1.6).toFixed(1)} L ${x.toFixed(1)} ${(y + 5).toFixed(1)} L ${(x - 1.6).toFixed(1)} ${(y + 1.6).toFixed(1)} L ${(x - 5).toFixed(1)} ${y.toFixed(1)} L ${(x - 1.6).toFixed(1)} ${(y - 1.6).toFixed(1)} Z" fill="${DOT}" stroke="none"/>`;
        }).join('');
      })()}
    </g>`,
};

/* deterministic little star scatter per card */
const scatterStars = (id) => {
  let s = id * 2654435761 >>> 0;
  const rnd = () => ((s = (s * 1103515245 + 12345) >>> 0) / 0xffffffff);
  return Array.from({ length: 7 }, () => {
    const x = 24 + rnd() * 252, y = 70 + rnd() * 180, r = 0.8 + rnd() * 1.6;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="#f3dca4" opacity="${(0.3 + rnd() * 0.5).toFixed(2)}"/>`;
  }).join('');
};

let _svgUid = 0;
/* full card face SVG; opts.compact hides keywords/element for tiny tiles */
function cardArtSVG(card, opts = {}) {
  const pal = ART_PALETTES[card.element];
  const uid = `c${card.id}-${++_svgUid}`;
  const el = ELEMENTS[card.element];
  return `
  <svg viewBox="0 0 300 480" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${card.name}">
    <defs>
      <linearGradient id="bg-${uid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${pal.top}"/><stop offset=".55" stop-color="${pal.mid}"/><stop offset="1" stop-color="${pal.bot}"/>
      </linearGradient>
      <radialGradient id="gl-${uid}" cx=".5" cy=".4" r=".5">
        <stop offset="0" stop-color="${pal.glow}" stop-opacity=".5"/><stop offset="1" stop-color="${pal.glow}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="300" height="480" fill="url(#bg-${uid})"/>
    <circle cx="150" cy="200" r="150" fill="url(#gl-${uid})"/>
    ${scatterStars(card.id)}
    ${CARD_ART[card.id] || ''}
    <rect x="10" y="10" width="280" height="460" rx="14" fill="none" stroke="rgba(243,220,164,.5)" stroke-width="1.5"/>
    ${opts.compact ? '' : `<text x="150" y="46" text-anchor="middle" fill="rgba(246,234,208,.8)" font-size="12" letter-spacing="6" font-family="Outfit, sans-serif">${el.label.toUpperCase()}</text>`}
    <text x="150" y="${opts.compact ? 430 : 416}" text-anchor="middle" fill="#f6ead0" font-size="${opts.compact ? 30 : 26}" font-family="Cormorant Garamond, Georgia, serif" letter-spacing="1">${card.name}</text>
    ${opts.compact ? '' : `<text x="150" y="442" text-anchor="middle" fill="rgba(246,234,208,.75)" font-size="13" font-style="italic" font-family="Cormorant Garamond, Georgia, serif">${card.keywords.join(' · ')}</text>`}
  </svg>`;
}

/* card face HTML: custom painted/AI art when mapped, SVG line art otherwise */
function cardFaceHTML(card, opts = {}) {
  const custom = CUSTOM_ART[card.id];
  if (custom) {
    return `
      <div class="custom-art">
        <img src="${custom}" alt="${card.name}" loading="lazy"/>
        <div class="custom-art-label">
          <div class="ca-name">${card.name}</div>
          ${opts.compact ? '' : `<div class="ca-keywords">${card.keywords.join(' · ')}</div>`}
        </div>
      </div>`;
  }
  return cardArtSVG(card, opts);
}
