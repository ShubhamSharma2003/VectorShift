import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { CustomSelect } from '../components/CustomSelect';

export const OutputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(data?.outputName ?? id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType ?? 'Text');

  const handleNameChange = (e) => setCurrName(e.target.value);

  const typeOptions = [
    { value: 'Text', label: 'Text' },
    { value: 'File', label: 'Image' }
  ];

  const leftHandles = [{ id: `${id}-value`, type: 'target' }];

  return (
    <BaseNode id={id} title="Output" leftHandles={leftHandles} className="vs-node--output" selected={selected}>
      <div className="vs-field">
        <label className="vs-field__label">Name</label>
        <input className="vs-field__input" type="text" value={currName} onChange={handleNameChange} />
      </div>
      <div className="vs-field">
        <label className="vs-field__label">Type</label>
        <CustomSelect
          value={outputType}
          onChange={setOutputType}
          options={typeOptions}
        />
      </div>
    </BaseNode>
  );
}
