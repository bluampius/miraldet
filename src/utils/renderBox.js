export function drawBoxesOnCanvas(ctxOrCtx, detections, labels, dims){
  // ctxOrCtx can be CanvasRenderingContext2D or Canvas element
  let ctx = ctxOrCtx;
  if (ctxOrCtx.getContext) ctx = ctxOrCtx.getContext('2d');
  const width = dims.width, height = dims.height;
  ctx.lineWidth = 3;
  ctx.font = '14px system-ui';
  ctx.textBaseline = 'top';
  detections.forEach(d=>{
    const [xmin,ymin,xmax,ymax] = d.box;
    const x = xmin * width;
    const y = ymin * height;
    const w = (xmax - xmin) * width;
    const h = (ymax - ymin) * height;

    ctx.strokeStyle = '#fff';
    ctx.beginPath();
    ctx.moveTo(x, y+20); ctx.lineTo(x, y); ctx.lineTo(x+20, y);
    ctx.moveTo(x+w-20, y); ctx.lineTo(x+w, y); ctx.lineTo(x+w, y+20);
    ctx.moveTo(x, y+h-20); ctx.lineTo(x, y+h); ctx.lineTo(x+20, y+h);
    ctx.moveTo(x+w-20, y+h); ctx.lineTo(x+w, y+h); ctx.lineTo(x+w, y+h-20);
    ctx.stroke();

    const label = (labels[d.classId] || 'object') + ' ' + Math.round(d.score*100)+'%';
    const tw = ctx.measureText(label).width + 8;
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(x, Math.max(0,y-24), tw, 22);
    ctx.fillStyle = '#fff';
    ctx.fillText(label, x+4, Math.max(0,y-22));
  });
}
