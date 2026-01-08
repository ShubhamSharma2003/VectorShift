import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id }) => {
  const [cond, setCond] = useState('item => true');
  const leftHandles = [{ id: `${id}-in` }];
  const rightHandles = [{ id: `${id}-out` }];

  return (
    <BaseNode id={id} title="Filter" leftHandles={leftHandles} rightHandles={rightHandles} className="vs-node--small vs-node--filter">
      <div className="vs-field">
        <label className="vs-field__label">Condition</label>
        <input className="vs-field__input" value={cond} onChange={(e) => setCond(e.target.value)} />
      </div>
    </BaseNode>
  );
};

export default FilterNode;
