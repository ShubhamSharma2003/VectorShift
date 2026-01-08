import { BaseNode } from './BaseNode';

export const DateNode = ({ id }) => {
  return (
    <BaseNode id={id} title="Date" rightHandles={[{ id: `${id}-date` }] } className="small-node">
      <div>Outputs current date string.</div>
    </BaseNode>
  );
};

export default DateNode;
