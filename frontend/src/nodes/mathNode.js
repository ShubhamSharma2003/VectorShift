import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const MathNode = ({ id, data }) => {
  const [expr, setExpr] = useState(data?.expression ?? '1+1');
  return (
    <BaseNode id={id} title="Math" rightHandles={[{ id: `${id}-result` }]} className="vs-node--small vs-node--math">
      <div className="vs-field">
        <label className="vs-field__label">Expr</label>
        <input className="vs-field__input" value={expr} onChange={(e) => setExpr(e.target.value)} />
      </div>
    </BaseNode>
  );
};

export default MathNode;
