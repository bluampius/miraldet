import React, {useState} from 'react';

export default function QABox({ item, kb }){
  const [q, setQ] = useState('');
  const [ans, setAns] = useState(null);

  function ask(){
    if (!item) return;
    const key = item.key || item.title;
    const facts = kb[key] || [];
    const qLower = q.toLowerCase();
    const match = facts.find(f => qLower.includes(f.keyword)) || facts[0];
    setAns(match ? match.answer : "I don't know the answer to that yet.");
  }

  return (
    <div className="qa-box">
      <input placeholder={item ? `Ask about ${item.title}...` : "Ask about the detected object..."} value={q} onChange={e=>setQ(e.target.value)} />
      <button className="btn small" onClick={ask}>Ask</button>
      {ans && <div className="answer">{ans}</div>}
    </div>
  );
}
