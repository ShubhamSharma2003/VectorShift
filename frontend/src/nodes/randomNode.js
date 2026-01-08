import { BaseNode } from './BaseNode';

export const RandomNode = ({ id }) => {
  return (
    <BaseNode id={id} title="Random" rightHandles={[{ id: `${id}-value` }]} className="small-node">
      <div>Generates a random value.</div>
    </BaseNode>
  );
};

export default RandomNode;
