import { BaseNode } from './BaseNode';

// LLM node for AI model calls
export const LLMNode = ({ id, data, selected }) => {
  const leftHandles = [
    { id: `${id}-system`, type: 'target', top: '30%' },
    { id: `${id}-prompt`, type: 'target', top: '60%' },
  ];
  const rightHandles = [{ id: `${id}-response`, type: 'source' }];

  // TODO: add model selection and temperature controls
  return (
    <BaseNode id={id} title="LLM" leftHandles={leftHandles} rightHandles={rightHandles} className="vs-node--llm" selected={selected}>
      <div className="vs-node__description">This is a LLM node.</div>
    </BaseNode>
  );
}

export default LLMNode;
