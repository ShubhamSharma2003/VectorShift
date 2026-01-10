import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName ?? id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType ?? 'Text');

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setOutputType(e.target.value);

  const leftHandles = [{ id: `${id}-value`, type: 'target' }];

  return (
    <BaseNode id={id} title="Output" leftHandles={leftHandles} className="vs-node--output">
      <div className="vs-field">
        <label className="vs-field__label">Name</label>
        <input className="vs-field__input" type="text" value={currName} onChange={handleNameChange} />
      </div>
      <div className="vs-field">
        <label className="vs-field__label">Type</label>
        <select className="vs-field__select" value={outputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </div>
    </BaseNode>
  );
}
