import fs from 'fs';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

const imagesToGenerate = [
  {
    filename: 'hero-banner.png',
    prompt: 'Cinematic luxury still life of sleek minimalist ergonomic intimate wellness devices on black velvet and draped dark silk, subtle rose gold reflections, warm ambient glow, editorial studio lighting'
  },
  {
    filename: 'velvet-pulse-arc.png',
    prompt: 'Luxury ergonomic dual-stimulation sonic vibrator in deep midnight plum silicone with rose gold accent ring, luxury product photography on dark background'
  },
  {
    filename: 'velvet-pulse-arc-detail.png',
    prompt: 'Close up detail view of soft touch silicone texture and rose gold control buttons on an intimate wand device, macro studio lighting'
  },
  {
    filename: 'aura-luxe-wand.png',
    prompt: 'High-end modern luxury magic wand body massager, matte charcoal black with polished champagne gold trim, standing on dark slate, studio lighting'
  },
  {
    filename: 'nirvana-s-curve.png',
    prompt: 'Sculptural S-curve ergonomic internal wellness massager in deep wine purple silicone, sleek minimalist form, studio lighting'
  },
  {
    filename: 'solstice-couples-bond.png',
    prompt: 'Ultra-slim flexible C-shaped wearable couple vibrator in blush rose quartz silicone, minimalist intimate tech, clean luxury aesthetic'
  },
  {
    filename: 'kipis-air-wave.png',
    prompt: 'Organic petal-shaped sonic air-pulse clitoral stimulator in matte noir with gold bezel, luxury cosmetic aesthetic, dark reflective pedestal'
  },
  {
    filename: 'elysium-glass-wand.png',
    prompt: 'Hand-blown artisan borosilicate glass pleasure wand with sensual curves, sparkling light refraction on dark silk background'
  },
  {
    filename: 'eclipse-kinetic-kegel.png',
    prompt: 'Smart sleek pelvic floor trainer in soft slate grey and rose gold, minimalist medical wellness product design, studio lighting'
  },
  {
    filename: 'onyx-apex-anchor.png',
    prompt: 'Ergonomic smooth tapered wellness plug with wide ergonomic safety base, midnight matte silicone, luxury intimacy product photography'
  },
  {
    filename: 'silk-elixir-intimate-serum.png',
    prompt: 'Minimalist luxury frosted glass dropper bottle for organic intimate serum, gold dropper pipette, droplet glistening on dark stone'
  },
  {
    filename: 'nebula-satin-restraints.png',
    prompt: 'Luxury padded black silk cuffs with rose gold metal clasps and silk blindfold, laid on dark purple velvet, sophisticated sensuality'
  }
];

async function generateAll() {
  fs.mkdirSync('public/img', { recursive: true });
  const ai = new GoogleGenAI({
    apiKey: process.env.NETLIFY_AI_GATEWAY_KEY,
    httpOptions: { baseUrl: process.env.NETLIFY_AI_GATEWAY_URL?.replace(/\/$/, '') },
  });

  console.log(`Starting image generation for ${imagesToGenerate.length} assets...`);

  // Process in small batches of 3 to avoid overwhelming
  for (let i = 0; i < imagesToGenerate.length; i += 3) {
    const batch = imagesToGenerate.slice(i, i + 3);
    await Promise.all(
      batch.map(async ({ filename, prompt }) => {
        const outPath = path.join('public/img', filename);
        if (fs.existsSync(outPath) && fs.statSync(outPath).size > 10000) {
          console.log(`[Skip] Already exists: ${filename}`);
          return;
        }
        try {
          console.log(`[Generating] ${filename}...`);
          const response = await ai.models.generateContent({
            model: 'gemini-3.1-flash-image',
            contents: prompt,
          });
          const part = response.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
          if (part?.inlineData?.data) {
            fs.writeFileSync(outPath, Buffer.from(part.inlineData.data, 'base64'));
            console.log(`[Success] Saved ${filename} (${fs.statSync(outPath).size} bytes)`);
          } else {
            console.warn(`[Warning] No data for ${filename}`);
          }
        } catch (err) {
          console.error(`[Error] Failed ${filename}:`, err.message);
        }
      })
    );
  }
  console.log('Finished image generation process.');
}

generateAll();
