# Quick Reference: Creating New Nodes

A step-by-step guide to adding new node types to your pipeline editor.

---

## 📋 Checklist

When creating a new node, you need to:

- [ ] 1. Create the node component file
- [ ] 2. Register in `ui.js` nodeTypes
- [ ] 3. Add to toolbar in `toolbar.js`
- [ ] 4. Add default data in `ui.js` getInitNodeData()
- [ ] 5. (Optional) Add custom CSS

---

## 🎯 Step-by-Step Guide

### Step 1: Create Node Component

**File:** `frontend/src/nodes/myNewNode.js`

```javascript
import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const MyNewNode = ({ id, data }) => {
  // 1. Initialize state from data prop with defaults
  const [myValue, setMyValue] = useState(data?.myValue ?? 'default value');
  
  // 2. Configure handles (inputs on left, outputs on right)
  const leftHandles = [
    { id: `${id}-input1`, type: 'target', top: '30%' },
    { id: `${id}-input2`, type: 'target', top: '70%' }
  ];
  
  const rightHandles = [
    { id: `${id}-output`, type: 'source' }
  ];
  
  // 3. Render BaseNode with custom content
  return (
    <BaseNode 
      id={id} 
      title="My New Node" 
      leftHandles={leftHandles} 
      rightHandles={rightHandles}
      className="vs-node--mynew"
    >
      <div className="vs-field">
        <label className="vs-field__label">My Field</label>
        <input 
          className="vs-field__input" 
          value={myValue} 
          onChange={(e) => setMyValue(e.target.value)} 
        />
      </div>
    </BaseNode>
  );
};

export default MyNewNode;
```

---

### Step 2: Register Node Type

**File:** `frontend/src/ui.js`

**A. Import the component:**
```javascript
import { MyNewNode } from './nodes/myNewNode';
```

**B. Add to nodeTypes object:**
```javascript
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  mynew: MyNewNode,  // ← Add your node
  // ... other nodes
};
```

---

### Step 3: Add to Toolbar

**File:** `frontend/src/toolbar.js`

```javascript
export const PipelineToolbar = () => {
  return (
    <div className="vs-toolbar">
      <div className="vs-toolbar__title">Node Palette</div>
      <div className="vs-toolbar__nodes">
        <DraggableNode type='customInput' label='Input' />
        <DraggableNode type='llm' label='LLM' />
        <DraggableNode type='mynew' label='My New' />  {/* ← Add here */}
        {/* ... other nodes */}
      </div>
    </div>
  );
};
```

**Important:** The `type` prop must match the key in `nodeTypes` object!

---

### Step 4: Add Default Data

**File:** `frontend/src/ui.js` - `getInitNodeData()` function

```javascript
const getInitNodeData = (nodeID, type) => {
  let nodeData = { id: nodeID };
  
  switch(type) {
    case 'customInput':
      nodeData.inputName = nodeID.replace('customInput-', 'input_');
      nodeData.inputType = 'Text';
      break;
    
    case 'mynew':  // ← Add your case
      nodeData.myValue = 'default value';
      break;
    
    // ... other cases
  }
  
  return nodeData;
}
```

**Important:** Property names must match what your component expects!

---

### Step 5: Add Custom CSS (Optional)

**File:** `frontend/src/styles/nodes.css`

```css
/* My New Node styles */
.vs-node--mynew {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
}

.vs-node--mynew .vs-node__header {
  color: #ffffff;
}
```

---

## 🎨 Handle Configuration Examples

### No Handles (Info/Display Node)
```javascript
const leftHandles = [];
const rightHandles = [];
```

### Single Input, Single Output
```javascript
const leftHandles = [{ id: `${id}-in` }];
const rightHandles = [{ id: `${id}-out` }];
```

### Multiple Inputs, Single Output
```javascript
const leftHandles = [
  { id: `${id}-input1`, top: '25%' },
  { id: `${id}-input2`, top: '50%' },
  { id: `${id}-input3`, top: '75%' }
];
const rightHandles = [{ id: `${id}-output` }];
```

### Single Input, Multiple Outputs
```javascript
const leftHandles = [{ id: `${id}-input` }];
const rightHandles = [
  { id: `${id}-output1`, top: '33%' },
  { id: `${id}-output2`, top: '66%' }
];
```

### Dynamic Handles (Like TextNode)
```javascript
const [dynamicInputs, setDynamicInputs] = useState(['var1', 'var2']);

const leftHandles = dynamicInputs.map((varName, i) => ({
  id: `${id}-${varName}`,
  type: 'target',
  top: `${(i + 1) * 20}%`
}));
```

---

## 📝 Form Field Examples

### Text Input
```javascript
<div className="vs-field">
  <label className="vs-field__label">Name</label>
  <input 
    className="vs-field__input" 
    type="text" 
    value={name} 
    onChange={(e) => setName(e.target.value)} 
  />
</div>
```

### Number Input
```javascript
<div className="vs-field">
  <label className="vs-field__label">Count</label>
  <input 
    className="vs-field__input" 
    type="number" 
    value={count} 
    onChange={(e) => setCount(parseInt(e.target.value))} 
  />
</div>
```

### Select Dropdown
```javascript
<div className="vs-field">
  <label className="vs-field__label">Type</label>
  <select 
    className="vs-field__select" 
    value={type} 
    onChange={(e) => setType(e.target.value)}
  >
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
  </select>
</div>
```

### Textarea
```javascript
<div className="vs-field">
  <label className="vs-field__label">Content</label>
  <textarea 
    className="vs-field__textarea" 
    value={content} 
    onChange={(e) => setContent(e.target.value)}
    rows={4}
  />
</div>
```

### Checkbox
```javascript
<div className="vs-field">
  <label className="vs-field__label">
    <input 
      type="checkbox" 
      checked={enabled} 
      onChange={(e) => setEnabled(e.target.checked)} 
    />
    Enable Feature
  </label>
</div>
```

---

## 🔧 Complete Example: API Call Node

Here's a complete example of a more complex node:

```javascript
import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const APINode = ({ id, data }) => {
  // State with defaults from data prop
  const [url, setUrl] = useState(data?.url ?? 'https://api.example.com');
  const [method, setMethod] = useState(data?.method ?? 'GET');
  const [timeout, setTimeout] = useState(data?.timeout ?? 5000);
  const [includeAuth, setIncludeAuth] = useState(data?.includeAuth ?? false);
  
  // Configure handles
  const leftHandles = [
    { id: `${id}-url`, type: 'target', top: '20%' },
    { id: `${id}-body`, type: 'target', top: '50%' },
    { id: `${id}-headers`, type: 'target', top: '80%' }
  ];
  
  const rightHandles = [
    { id: `${id}-response`, type: 'source', top: '33%' },
    { id: `${id}-error`, type: 'source', top: '66%' }
  ];
  
  return (
    <BaseNode 
      id={id} 
      title="API Call" 
      leftHandles={leftHandles} 
      rightHandles={rightHandles}
      className="vs-node--api"
    >
      <div className="vs-field">
        <label className="vs-field__label">URL</label>
        <input 
          className="vs-field__input" 
          type="text"
          value={url} 
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
        />
      </div>
      
      <div className="vs-field">
        <label className="vs-field__label">Method</label>
        <select 
          className="vs-field__select" 
          value={method} 
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
      
      <div className="vs-field">
        <label className="vs-field__label">Timeout (ms)</label>
        <input 
          className="vs-field__input" 
          type="number"
          value={timeout} 
          onChange={(e) => setTimeout(parseInt(e.target.value))}
          min="100"
          max="60000"
        />
      </div>
      
      <div className="vs-field">
        <label className="vs-field__label">
          <input 
            type="checkbox" 
            checked={includeAuth} 
            onChange={(e) => setIncludeAuth(e.target.checked)} 
          />
          Include Auth Headers
        </label>
      </div>
    </BaseNode>
  );
};

export default APINode;
```

**Don't forget to:**
1. Import in `ui.js`
2. Add to `nodeTypes` object as `api: APINode`
3. Add to toolbar as `<DraggableNode type='api' label='API' />`
4. Add default data:
   ```javascript
   case 'api':
     nodeData.url = 'https://api.example.com';
     nodeData.method = 'GET';
     nodeData.timeout = 5000;
     nodeData.includeAuth = false;
     break;
   ```

---

## ⚠️ Common Mistakes to Avoid

### 1. Missing Data Prop
```javascript
// ❌ Wrong - can't restore state
export const MyNode = ({ id }) => { ... }

// ✅ Correct
export const MyNode = ({ id, data }) => { ... }
```

### 2. Using || Instead of ??
```javascript
// ❌ Wrong - empty string will use default
const [text, setText] = useState(data?.text || 'default');

// ✅ Correct
const [text, setText] = useState(data?.text ?? 'default');
```

### 3. Type Mismatch
```javascript
// ❌ Wrong - type doesn't match nodeTypes key
<DraggableNode type='myNode' />  // toolbar.js
const nodeTypes = { mynode: MyNode };  // ui.js - lowercase!

// ✅ Correct - exact match
<DraggableNode type='mynode' />
const nodeTypes = { mynode: MyNode };
```

### 4. Forgetting Default Data
```javascript
// ❌ Wrong - no default data in getInitNodeData()
case 'mynode':
  break;  // Empty!

// ✅ Correct
case 'mynode':
  nodeData.myValue = 'default';
  break;
```

### 5. Handle ID Conflicts
```javascript
// ❌ Wrong - same ID for multiple handles
{ id: `${id}-output` }
{ id: `${id}-output` }  // Conflict!

// ✅ Correct - unique IDs
{ id: `${id}-output1` }
{ id: `${id}-output2` }
```

---

## 🎨 Styling Tips

### Node Size Classes
```javascript
// Small node (like Math, Date)
className="vs-node--small vs-node--mynode"

// Regular node (default)
className="vs-node--mynode"

// Large node (if needed)
className="vs-node--large vs-node--mynode"
```

### CSS Structure
```css
/* Base node style */
.vs-node--mynode {
  background: #gradient;
  border-color: #color;
}

/* Header */
.vs-node--mynode .vs-node__header {
  color: #color;
}

/* Body */
.vs-node--mynode .vs-node__body {
  padding: 12px;
}

/* Custom fields */
.vs-node--mynode .vs-field__input {
  background: #color;
}
```

---

## 🧪 Testing Your Node

### Manual Testing Checklist
- [ ] Node appears in toolbar
- [ ] Can drag and drop onto canvas
- [ ] Shows correct default values
- [ ] Form fields update state correctly
- [ ] Handles appear in correct positions
- [ ] Can connect to other nodes
- [ ] Submit button sends correct data structure
- [ ] No console errors

### Test Data Structure
```javascript
// After creating your node, check in console:
console.log(nodes);
// Should show:
{
  id: "mynode-1",
  type: "mynode",
  position: { x: 100, y: 100 },
  data: {
    id: "mynode-1",
    myValue: "default value"
  }
}
```

---

## 📚 Reference Files

When creating a new node, refer to these examples:

- **Simple Node**: `mathNode.js` - minimal UI, single output
- **Input Node**: `inputNode.js` - form fields, data persistence
- **Output Node**: `outputNode.js` - similar to input
- **Complex Node**: `textNode.js` - dynamic handles, auto-resize
- **Multi-Input**: `joinNode.js` - multiple inputs, single output
- **Multi-Input with Logic**: `filterNode.js` - validation/filtering

---

## 🚀 Quick Start Template

Copy this template to get started quickly:

```javascript
import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const TemplateNode = ({ id, data }) => {
  // TODO: Add your state variables
  const [value, setValue] = useState(data?.value ?? 'default');
  
  // TODO: Configure your handles
  const leftHandles = [{ id: `${id}-input` }];
  const rightHandles = [{ id: `${id}-output` }];
  
  return (
    <BaseNode 
      id={id} 
      title="Template" 
      leftHandles={leftHandles} 
      rightHandles={rightHandles}
      className="vs-node--template"
    >
      {/* TODO: Add your UI */}
      <div className="vs-field">
        <label className="vs-field__label">Value</label>
        <input 
          className="vs-field__input" 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
        />
      </div>
    </BaseNode>
  );
};

export default TemplateNode;
```

---

**Happy Node Building!** 🎉

For more details, see:
- `VIDEO_WALKTHROUGH_SCRIPT.md` - Full explanation
- `FIXES_SUMMARY.md` - Architecture decisions
- `BaseNode.js` - Component API
