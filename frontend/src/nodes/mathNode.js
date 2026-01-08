import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const MathNode = ({ id }) => {
  const [expr, setExpr] = useState('1+1');
  return (
    <BaseNode id={id} title="Math" rightHandles={[{ id: `${id}-result` }]} className="small-node">
      <div className="vs-field">
        <label>Expr</label>
        <input value={expr} onChange={(e) => setExpr(e.target.value)} />
      </div>
    </BaseNode>
  );
};

export default MathNode;
