# YoloDetect - Demo App

This is a scaffolded React + Vite project inspired by the YoloDetect repo and the app design you provided.

Features in this scaffold:
- Image upload and 'Use sample image' button (includes the sample image).
- Mock detection (used when no TFJS model present) that recognizes the sample `miralss.png` as "Jaguar".
- Info card with description, play sound and View in AR buttons (assets are placeholders).
- `<model-viewer>` AR viewer integration for `.glb` models.
- Simple local Q&A box using a tiny knowledge-base in `public/descriptions.json`.

To run:
```bash
npm install
npm run dev
```

Notes:
- No TensorFlow model files are bundled here. If you place a TFJS `model.json` and weights under `/public/models/yolo11n_web_model/`, the app will attempt to load it (you may need to adapt `src/utils/detect.js` to your model's outputs).
- Audio and 3D model files are placeholders (paths included in `public/descriptions.json`). Replace `/public/audio/*.mp3` and `/public/3d/*.glb` with real assets for full AR/audio experience.

Enjoy! If you want, I can:
- Add a simple Express backend to proxy OpenAI for expanded Q&A,
- Integrate a real TFJS model (if you provide `model.json`),
- Expand detection post-processing (anchors/NMS) tuned to your model export.
