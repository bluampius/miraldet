import React, {useRef, useState, useEffect} from 'react';
import { loadModelAndDetect } from '../utils/detect';
import { drawBoxesOnCanvas } from '../utils/renderBox';
import InfoCard from './InfoCard';
import ARViewer from './ARViewer';
import QABox from './QABox';
import labels from '/labels.json';
import descriptions from '/descriptions.json';

const MODEL_URL = '/models/yolo11n_web_model/model.json';

export default function App(){
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [glbForAR, setGlbForAR] = useState(null);

  useEffect(() => {
    // preload test image into public assets
  }, []);

  async function handleFile(e){
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    await runDetection(url, file.name);
  }

  async function runDetection(url, filename){
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;
    await img.decode();
    // fit canvas to image while preserving aspect and max height
    const maxH = 520;
    const scale = Math.min(390/ img.width, maxH / img.height, 1.0);
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(img,0,0,canvas.width,canvas.height);

    // try to run real model if present; otherwise fallback to a mock detection for the sample image
    const detections = await loadModelAndDetect(MODEL_URL, img, canvas);
    // detections: [{box:[xmin,ymin,xmax,ymax], score, classId}]
    drawBoxesOnCanvas(ctx, detections, labels, {width:canvas.width, height:canvas.height});
    if (detections.length){
      const top = detections.sort((a,b)=>b.score-a.score)[0];
      const name = labels[top.classId] || String(top.classId);
      setSelected(descriptions[name] || {title:name, description: 'No description available.'});
      setGlbForAR((descriptions[name] && descriptions[name].glb) ? descriptions[name].glb : null);
    } else {
      setSelected(null);
      setGlbForAR(null);
    }
  }

  async function useSample(){
    // sample image is included in public/assets/miralss.png
    await runDetection('/assets/miralss.png', 'miralss.png');
  }

  return (
    <div className="app">
      <div className="header"><div className="top-pill">Species identified</div></div>

      <div className="viewer">
        <div className="media-canvas">
          <canvas ref={canvasRef} style={{display:'block',margin:'0 auto'}} />
          <div className="corner-brackets" aria-hidden>
            {/* purely decorative; drawn on canvas by drawBoxes but keep for style */}
          </div>
        </div>

        <div className="controls">
          <input type="file" accept="image/*,video/*" onChange={handleFile} />
          <button className="btn small" onClick={useSample}>Use sample image</button>
        </div>
      </div>

      <div>
        <InfoCard item={selected}
          onPlaySound={(src)=>{ if(src) new Audio(src).play(); }}
          onViewAR={(glb)=> setGlbForAR(glb)} />
        <QABox item={selected} kb={descriptions.kb || {}} />
      </div>

      {glbForAR && <ARViewer glbUrl={glbForAR} title={selected?.title || 'Object'} />}
    </div>
  );
}
