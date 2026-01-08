import React from 'react';
import { Handle, Position } from 'reactflow';
import '../index.css';

export const BaseNode = ({ id, title, children, leftHandles = [], rightHandles = [], className = '' }) => {
  return (
    <div className={`vs-node ${className}`}>
      {/* left handles */}
      {leftHandles.map((h, idx) => (
        <Handle
          key={`left-${idx}-${h.id || idx}`}
          type={h.type || 'target'}
          position={Position.Left}
          id={h.id}
          style={{ top: h.top ?? `${(idx + 1) * 20}%` }}
        />
      ))}

      <div className="vs-node-header">{title}</div>

      <div className="vs-node-body">{children}</div>

      {/* right handles */}
      {rightHandles.map((h, idx) => (
        <Handle
          key={`right-${idx}-${h.id || idx}`}
          type={h.type || 'source'}
          position={Position.Right}
          id={h.id}
          style={{ top: h.top ?? `${(idx + 1) * 50}%` }}
        />
      ))}
    </div>
  );
};

export default BaseNode;
