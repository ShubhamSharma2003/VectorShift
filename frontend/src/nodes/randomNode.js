import { BaseNode } from './BaseNode';

export const RandomNode = ({ id, selected }) => {
  return (
    <BaseNode id={id} title="Random" rightHandles={[{ id: `${id}-value` }]} className="vs-node--small vs-node--random" selected={selected}>
      <div className="vs-node__description">Generates a random value.</div>
    </BaseNode>
  );
};

export default RandomNode;
