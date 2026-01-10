import { useEffect, useRef, useState } from 'react';
import { BaseNode } from './BaseNode';

// regex for finding template variables like {{var}}
const VAR_RE = /\{\{\s*([a-zA-Z_$][\w$]*)\s*\}\}/g;

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text ?? '{{input}}');
  const [size, setSize] = useState({ width: 220, height: 80 });
  const [vars, setVars] = useState([]);
  const measurer = useRef(null);

  console.log(data.text);
  

  useEffect(() => {
    const found = new Set();
    let m;
    // extract all variable names from template
    while ((m = VAR_RE.exec(currText)) !== null) {
      found.add(m[1]);
    }
    setVars(Array.from(found));

    // auto-resize based on content
    if (measurer.current) {
      measurer.current.textContent = currText || ' ';
      const rect = measurer.current.getBoundingClientRect();
      // min/max constraints to keep it reasonable
      setSize({ 
        width: Math.min(420, Math.max(160, rect.width + 40)), 
        height: Math.min(300, Math.max(60, rect.height + 30)) 
      });
    }
  }, [currText]);

  function handleTextChange(e) {
    setCurrText(e.target.value);
  }

  const leftHandles = vars.map((v, i) => ({ 
    id: `${id}-${v}`, 
    type: 'target', 
    top: `${(i + 1) * 18}%` 
  }));
  const rightHandles = [{ id: `${id}-output`, type: 'source' }];

  return (
    <>
      <BaseNode id={id} title="Text" leftHandles={leftHandles} rightHandles={rightHandles} className="vs-node--text">
        <div className="vs-node__text-wrapper" style={{ width: size.width }}>
          <textarea 
            className="vs-field__textarea vs-field__textarea--text-node" 
            value={currText} 
            onChange={handleTextChange} 
            style={{ width: '100%', height: size.height, resize: 'none' }} 
          />
        </div>
      </BaseNode>

      {/* hidden element for measuring text width */}
      <div ref={measurer} className="vs-measurer" aria-hidden />
    </>
  );
};

export default TextNode;
