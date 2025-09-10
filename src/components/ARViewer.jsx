import React from 'react';

export default function ARViewer({ glbUrl, title }){
  if (!glbUrl) return null;
  return (
    <div style={{marginTop:12}}>
      <model-viewer
        src={glbUrl}
        alt={title}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        auto-rotate
        style={{width:'100%', height:'360px', borderRadius:12, background:'#fff'}}
      />
    </div>
  );
}
