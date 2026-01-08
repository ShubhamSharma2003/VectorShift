// outputNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setOutputType(e.target.value);

  const leftHandles = [{ id: `${id}-value`, type: 'target' }];

  return (
    <BaseNode id={id} title="Output" leftHandles={leftHandles} className="output-node">
      <div className="vs-field">
        <label>Name</label>
        <input type="text" value={currName} onChange={handleNameChange} />
      </div>
      <div className="vs-field">
        <label>Type</label>
        <select value={outputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </div>
    </BaseNode>
  );
}
