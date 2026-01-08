// inputNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setInputType(e.target.value);

  const rightHandles = [{ id: `${id}-value`, type: 'source' }];

  return (
    <BaseNode id={id} title="Input" rightHandles={rightHandles} className="input-node">
      <div className="vs-field">
        <label>Name</label>
        <input type="text" value={currName} onChange={handleNameChange} />
      </div>
      <div className="vs-field">
        <label>Type</label>
        <select value={inputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
}
