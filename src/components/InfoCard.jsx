import React from 'react';

export default function InfoCard({ item, onPlaySound, onViewAR }){
  if (!item) return (
    <div className="info-card">
      <h3>No object selected</h3>
      <p>Upload an image or use the sample to detect objects (mock detection is used if model is missing).</p>
    </div>
  );
  return (
    <div className="info-card">
      <h2>{item.title}</h2>
      {item.scientific && <em>{item.scientific}</em>}
      <p>{item.description}</p>
      <div className="info-row">
        {item.audio && <button className="btn small" onClick={()=>onPlaySound(item.audio)}>🔊 Play Sound</button>}
        {item.glb && <button className="btn small" onClick={()=>onViewAR(item.glb)}>📱 View in AR</button>}
      </div>
    </div>
  );
}
