import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id }) => {
  const [cond, setCond] = useState('item => true');
  const leftHandles = [{ id: `${id}-in` }];
  const rightHandles = [{ id: `${id}-out` }];

  return (
    <BaseNode id={id} title="Filter" leftHandles={leftHandles} rightHandles={rightHandles} className="small-node">
      <div className="vs-field">
        <label>Condition</label>
        <input value={cond} onChange={(e) => setCond(e.target.value)} />
      </div>
    </BaseNode>
  );
};

export default FilterNode;
