

## Generate 4 blog hero illustrations with Nano Banana 2

### What
Use the `lovable_ai.py` script with `--image --model google/gemini-3.1-flash-image-preview` to generate 4 blog hero illustrations matching the style of the existing software illustration.

### How
1. Copy `lovable_ai.py` to `/tmp/`
2. Run 4 image generation commands, each with the user's exact style prompt + topic-specific scene description
3. QA each generated image
4. Copy to `src/assets/` replacing existing files

### Prompts
Base prompt (user-provided) + topic suffix:

- **blog-hero-patienten.png**: "...A nurse with a medical bag visiting an elderly patient at their home, standing near an open front door."
- **blog-hero-administratie.png**: "...A nurse sitting at a desk with a laptop, folders, and paperwork, doing administrative tasks."
- **blog-hero-zelfstandig.png**: "...A confident nurse stepping forward independently, holding a briefcase, with a lightbulb and checklist floating nearby."
- **blog-hero-hbo5.png**: "...A nursing student holding books and a diploma, with a graduation cap and classroom elements nearby."

### Files changed
- `src/assets/blog-hero-patienten.png`
- `src/assets/blog-hero-administratie.png`
- `src/assets/blog-hero-zelfstandig.png`
- `src/assets/blog-hero-hbo5.png`

