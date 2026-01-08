import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const leftHandles = [
    { id: `${id}-system`, type: 'target', top: '30%' },
    { id: `${id}-prompt`, type: 'target', top: '60%' },
  ];
  const rightHandles = [{ id: `${id}-response`, type: 'source' }];

  return (
    <BaseNode id={id} title="LLM" leftHandles={leftHandles} rightHandles={rightHandles} className="vs-node--llm">
      <div className="vs-node__description">This is a LLM node.</div>
    </BaseNode>
  );
}
