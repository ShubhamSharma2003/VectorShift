// textNode.js

import { useEffect, useRef, useState } from 'react';
import { BaseNode } from './BaseNode';

const VAR_RE = /\{\{\s*([a-zA-Z_$][\w$]*)\s*\}\}/g;

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [size, setSize] = useState({ width: 220, height: 80 });
  const [vars, setVars] = useState([]);
  const measurer = useRef(null);

  useEffect(() => {
    // compute variables
    const found = new Set();
    let m;
    while ((m = VAR_RE.exec(currText)) !== null) {
      found.add(m[1]);
    }
    setVars(Array.from(found));

    // measure size using hidden element
    if (measurer.current) {
      measurer.current.textContent = currText || ' ';
      const rect = measurer.current.getBoundingClientRect();
      setSize({ width: Math.min(420, Math.max(160, rect.width + 40)), height: Math.min(300, Math.max(60, rect.height + 30)) });
    }
  }, [currText]);

  const handleTextChange = (e) => setCurrText(e.target.value);

  const leftHandles = vars.map((v, i) => ({ id: `${id}-${v}`, type: 'target', top: `${(i + 1) * 18}%` }));
  const rightHandles = [{ id: `${id}-output`, type: 'source' }];

  return (
    <>
      <BaseNode id={id} title="Text" leftHandles={leftHandles} rightHandles={rightHandles} className="text-node">
        <div style={{ width: size.width }}>
          <textarea value={currText} onChange={handleTextChange} style={{ width: '100%', height: size.height, resize: 'none' }} />
        </div>
      </BaseNode>

      <div ref={measurer} className="vs-measurer" aria-hidden />
    </>
  );
};

export default TextNode;
