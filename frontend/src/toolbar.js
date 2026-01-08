// toolbar.js

import { DraggableNode } from './draggableNode';
import './index.css';

export const PipelineToolbar = () => {
    return (
        <div className="pipeline-toolbar">
            <div className="toolbar-title">Node Palette</div>
            <div className="toolbar-nodes">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='date' label='Date' />
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='join' label='Join' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='random' label='Random' />
            </div>
        </div>
    );
};
