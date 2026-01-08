import { BaseNode } from './BaseNode';

export const DateNode = ({ id }) => {
  return (
    <BaseNode id={id} title="Date" rightHandles={[{ id: `${id}-date` }] } className="vs-node--small vs-node--date">
      <div className="vs-node__description">Outputs current date string.</div>
    </BaseNode>
  );
};

export default DateNode;
