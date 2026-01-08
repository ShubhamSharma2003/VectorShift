import { BaseNode } from './BaseNode';

export const RandomNode = ({ id }) => {
  return (
    <BaseNode id={id} title="Random" rightHandles={[{ id: `${id}-value` }]} className="vs-node--small vs-node--random">
      <div className="vs-node__description">Generates a random value.</div>
    </BaseNode>
  );
};

export default RandomNode;
