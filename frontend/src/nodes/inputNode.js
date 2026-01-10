import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { CustomSelect } from '../components/CustomSelect';

export const InputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(data?.inputName ?? id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType ?? 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const typeOptions = [
    { value: 'Text', label: 'Text' },
    { value: 'File', label: 'File' }
  ];

  const rightHandles = [{ id: `${id}-value`, type: 'source' }];

  return (
    <BaseNode id={id} title="Input" rightHandles={rightHandles} className="vs-node--input" selected={selected}>
      <div className="vs-field">
        <label className="vs-field__label">Name</label>
        <input 
          className="vs-field__input" 
          type="text" 
          value={currName} 
          onChange={handleNameChange} 
        />
      </div>
      <div className="vs-field">
        <label className="vs-field__label">Type</label>
        <CustomSelect
          value={inputType}
          onChange={setInputType}
          options={typeOptions}
        />
      </div>
    </BaseNode>
  );
}

export default InputNode;
