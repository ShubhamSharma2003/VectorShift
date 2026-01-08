import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const JoinNode = ({ id }) => {
  const [sep, setSep] = useState(', ');
  const leftHandles = [{ id: `${id}-a` }, { id: `${id}-b`, top: '50%' }];
  const rightHandles = [{ id: `${id}-joined` }];

  return (
    <BaseNode id={id} title="Join" leftHandles={leftHandles} rightHandles={rightHandles} className="small-node join-node">
      <div className="vs-field">
        <label>Separator</label>
        <input value={sep} onChange={(e) => setSep(e.target.value)} />
      </div>
    </BaseNode>
  );
};

export default JoinNode;
