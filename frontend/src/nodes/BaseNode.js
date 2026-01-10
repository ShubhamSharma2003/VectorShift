import React from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import '../index.css';

export const BaseNode = ({ id, title, children, leftHandles = [], rightHandles = [], className = '', selected = false }) => {
  const { deleteElements } = useReactFlow();

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteElements({ nodes: [{ id }] });
  };

  return (
    <div className={`vs-node ${className} ${selected ? 'vs-node--selected' : ''}`}>
      {/* Delete button - shows when selected */}
      {selected && (
        <button 
          className="vs-node__delete" 
          onClick={handleDelete}
          title="Delete node (or press Delete/Backspace)"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path 
              d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}

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

      <div className="vs-node__header">{title}</div>

      <div className="vs-node__body">{children}</div>

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
