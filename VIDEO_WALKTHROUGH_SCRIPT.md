# Video Walkthrough Script: Building Nodes with BaseNode and Backend Integration

## 🎯 Video Overview
This walkthrough explains how I created a reusable node architecture using BaseNode and connected it with a FastAPI backend for pipeline validation.

---

## 📋 Table of Contents
1. Introduction & Project Overview
2. The BaseNode Architecture
3. Creating Different Node Types
4. Backend Connection & Pipeline Submission
5. DAG Validation
6. Demo & Testing

---

## 1️⃣ Introduction & Project Overview (2-3 minutes)

### Opening
"Hi everyone! Today I'm going to show you how I built a visual pipeline editor using React Flow, with a reusable BaseNode component and a FastAPI backend for validation."

### What We'll Cover
- **Frontend**: React + React Flow for visual node editor
- **Backend**: FastAPI for pipeline validation
- **Architecture**: Reusable BaseNode pattern for creating multiple node types

### Project Structure
```
frontend/
  src/
    nodes/
      BaseNode.js          ← Our reusable component
      inputNode.js         ← Input node example
      textNode.js          ← Text processing node
      llmNode.js           ← LLM integration node
      outputNode.js        ← Output node
      mathNode.js          ← Math operations
      filterNode.js        ← Data filtering
      joinNode.js          ← Join operations
    submit.js              ← Backend connection
  backend/
    main.py                ← FastAPI server
```

---

## 2️⃣ The BaseNode Architecture (5-7 minutes)

### Why BaseNode?
"Instead of creating each node from scratch, I created a BaseNode component that handles common functionality. This follows the DRY principle - Don't Repeat Yourself."

### BaseNode Features

**Show the code:** `frontend/src/nodes/BaseNode.js`

```javascript
export const BaseNode = ({ 
  id, 
  title, 
  children, 
  leftHandles = [], 
  rightHandles = [], 
  className = '' 
}) => {
  return (
    <div className={`vs-node ${className}`}>
      {/* Left handles for inputs */}
      {leftHandles.map((h, idx) => (
        <Handle
          key={`left-${idx}-${h.id || idx}`}
          type={h.type || 'target'}
          position={Position.Left}
          id={h.id}
          style={{ top: h.top ?? `${(idx + 1) * 20}%` }}
        />
      ))}

      {/* Node header with title */}
      <div className="vs-node__header">{title}</div>

      {/* Node body - custom content */}
      <div className="vs-node__body">{children}</div>

      {/* Right handles for outputs */}
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
```

### Key Props Explained

| Prop | Purpose | Example |
|------|---------|---------|
| `id` | Unique identifier | `"node-1"` |
| `title` | Node header text | `"Input"`, `"LLM"` |
| `children` | Custom UI content | Form fields, textareas |
| `leftHandles` | Input connection points | `[{ id: 'input-1', type: 'target' }]` |
| `rightHandles` | Output connection points | `[{ id: 'output-1', type: 'source' }]` |
| `className` | Custom styling | `"vs-node--input"` |

### Handle Configuration
"Handles are the connection points on nodes. Left handles are typically TARGETS (inputs), and right handles are SOURCES (outputs)."

```javascript
// Example handle configurations
leftHandles = [
  { id: 'input-1', type: 'target', top: '30%' },
  { id: 'input-2', type: 'target', top: '60%' }
]

rightHandles = [
  { id: 'output-1', type: 'source' }
]
```

---

## 3️⃣ Creating Different Node Types (10-12 minutes)

### Pattern Overview
"Every node follows the same pattern:
1. Import BaseNode
2. Define state (using useState)
3. Configure handles
4. Render BaseNode with custom content"

---

### Example 1: Simple Node - MathNode

**Show code:** `frontend/src/nodes/mathNode.js`

```javascript
import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const MathNode = ({ id }) => {
  // State management
  const [expr, setExpr] = useState('1+1');
  
  // Return BaseNode with custom content
  return (
    <BaseNode 
      id={id} 
      title="Math" 
      rightHandles={[{ id: `${id}-result` }]} 
      className="vs-node--small vs-node--math"
    >
      <div className="vs-field">
        <label className="vs-field__label">Expr</label>
        <input 
          className="vs-field__input" 
          value={expr} 
          onChange={(e) => setExpr(e.target.value)} 
        />
      </div>
    </BaseNode>
  );
};
```

**Key Points:**
- ✅ Simple state with one input field
- ✅ Only right handle (output only)
- ✅ Custom className for styling

---

### Example 2: Input/Output Node - InputNode

**Show code:** `frontend/src/nodes/inputNode.js`

```javascript
export const InputNode = ({ id, data }) => {
  // Generate default name from id
  const defaultName = id.replace('customInput-', 'input_');
  const [currName, setCurrName] = useState(data?.inputName || defaultName);
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  // Define handles
  const rightHandles = [{ id: `${id}-value`, type: 'source' }];

  return (
    <BaseNode 
      id={id} 
      title="Input" 
      rightHandles={rightHandles} 
      className="vs-node--input"
    >
      <div className="vs-field">
        <label className="vs-field__label">Name</label>
        <input 
          className="vs-field__input" 
          type="text" 
          value={currName} 
          onChange={(e) => setCurrName(e.target.value)} 
        />
      </div>
      <div className="vs-field">
        <label className="vs-field__label">Type</label>
        <select 
          className="vs-field__select" 
          value={inputType} 
          onChange={(e) => setInputType(e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
}
```

**Key Points:**
- ✅ Multiple form fields (input + select)
- ✅ Default value generation
- ✅ Source handle for output
- ✅ Data persistence through props

---

### Example 3: Multi-Handle Node - LLMNode

**Show code:** `frontend/src/nodes/llmNode.js`

```javascript
export const LLMNode = ({ id, data }) => {
  // Define multiple input handles
  const leftHandles = [
    { id: `${id}-system`, type: 'target', top: '30%' },
    { id: `${id}-prompt`, type: 'target', top: '60%' },
  ];
  
  // Define output handle
  const rightHandles = [{ id: `${id}-response`, type: 'source' }];

  return (
    <BaseNode 
      id={id} 
      title="LLM" 
      leftHandles={leftHandles} 
      rightHandles={rightHandles} 
      className="vs-node--llm"
    >
      <div className="vs-node__description">
        This is a LLM node.
      </div>
    </BaseNode>
  );
}
```

**Key Points:**
- ✅ Multiple input handles (system, prompt)
- ✅ Custom positioning with `top` property
- ✅ Both input and output handles
- ✅ Minimal UI - just description

---

### Example 4: Dynamic Handles - TextNode

**Show code:** `frontend/src/nodes/textNode.js`

"This is the most complex node - it dynamically creates handles based on template variables!"

```javascript
// Regex for finding template variables like {{var}}
const VAR_RE = /\{\{\s*([a-zA-Z_$][\w$]*)\s*\}\}/g;

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [vars, setVars] = useState([]);

  useEffect(() => {
    // Extract variable names from template
    const found = new Set();
    let m;
    while ((m = VAR_RE.exec(currText)) !== null) {
      found.add(m[1]);  // m[1] is the captured variable name
    }
    setVars(Array.from(found));
  }, [currText]);

  // Create handles dynamically based on extracted variables
  const leftHandles = vars.map((v, i) => ({ 
    id: `${id}-${v}`, 
    type: 'target', 
    top: `${(i + 1) * 18}%` 
  }));
  
  const rightHandles = [{ id: `${id}-output`, type: 'source' }];

  return (
    <BaseNode 
      id={id} 
      title="Text" 
      leftHandles={leftHandles} 
      rightHandles={rightHandles} 
      className="vs-node--text"
    >
      <textarea 
        className="vs-field__textarea" 
        value={currText} 
        onChange={(e) => setCurrText(e.target.value)} 
      />
    </BaseNode>
  );
};
```

**Demo the Dynamic Handles:**
- Type: `"Hello {{name}}"` → Creates one handle for "name"
- Type: `"{{greeting}} {{name}}!"` → Creates two handles: "greeting" and "name"
- Handles update in real-time as you type!

**Key Points:**
- ✅ Regex pattern matching for template variables
- ✅ useEffect for reactive updates
- ✅ Dynamic handle generation
- ✅ Auto-resizing textarea

---

### Example 5: Multi-Input Node - JoinNode

**Show code:** `frontend/src/nodes/joinNode.js`

```javascript
export const JoinNode = ({ id }) => {
  const [sep, setSep] = useState(', ');
  
  // Two input handles at different positions
  const leftHandles = [
    { id: `${id}-a` }, 
    { id: `${id}-b`, top: '50%' }
  ];
  
  const rightHandles = [{ id: `${id}-joined` }];

  return (
    <BaseNode 
      id={id} 
      title="Join" 
      leftHandles={leftHandles} 
      rightHandles={rightHandles}
      className="vs-node--small vs-node--join"
    >
      <div className="vs-field">
        <label className="vs-field__label">Separator</label>
        <input 
          value={sep} 
          onChange={(e) => setSep(e.target.value)} 
        />
      </div>
    </BaseNode>
  );
};
```

**Key Points:**
- ✅ Multiple inputs (a, b)
- ✅ Custom handle positioning
- ✅ Simple configuration input

---

## 4️⃣ Backend Connection & Pipeline Submission (6-8 minutes)

### The Submit Button

**Show code:** `frontend/src/submit.js`

```javascript
import { useStore } from './store';

export const SubmitButton = () => {
  // Get current nodes and edges from React Flow store
  const nodes = useStore((s) => s.nodes);
  const edges = useStore((s) => s.edges);

  const handleSubmit = async () => {
    try {
      // Send to backend
      const resp = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });
      
      const json = await resp.json();
      
      // Show results
      alert(`Nodes: ${json.num_nodes}\nEdges: ${json.num_edges}\nIs DAG: ${json.is_dag}`);
    } catch (err) {
      alert('Failed to submit pipeline: ' + err.message);
    }
  };

  return (
    <button onClick={handleSubmit}>
      Submit Pipeline
    </button>
  );
}
```

**Key Points:**
- ✅ Zustand store for state management
- ✅ Fetch API for backend communication
- ✅ Error handling
- ✅ User feedback via alerts

---

### FastAPI Backend

**Show code:** `frontend/backend/main.py`

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# CORS setup for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
class Edge(BaseModel):
    id: str = None
    source: str
    target: str

class Node(BaseModel):
    id: str
    type: str = None
    data: Dict[str, Any] = None

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]
```

**Key Points:**
- ✅ CORS enabled for local development
- ✅ Pydantic models for type safety
- ✅ Clean data structure

---

## 5️⃣ DAG Validation (5-7 minutes)

### What is a DAG?
"DAG stands for Directed Acyclic Graph. It means:
- **Directed**: Edges have direction (arrows)
- **Acyclic**: No cycles/loops allowed
- **Graph**: Nodes connected by edges"

### Why Validate?
"We need to ensure pipelines don't have infinite loops. A cycle would mean data flows in a circle forever!"

### The Validation Algorithm

**Show code:** `frontend/backend/main.py` - parse_pipeline_post function

```python
@app.post('/pipelines/parse')
def parse_pipeline_post(p: Pipeline):
    num_nodes = len(p.nodes)
    num_edges = len(p.edges)

    # Step 1: Create set of valid node IDs
    node_ids = {n.id for n in p.nodes}
    
    # Step 2: Validate edge references
    for e in p.edges:
        if e.source not in node_ids or e.target not in node_ids:
            return {
                "num_nodes": num_nodes,
                "num_edges": num_edges,
                "is_dag": False,
                "error": f"Edge references non-existent node"
            }

    # Step 3: Build adjacency list
    adj = {n.id: [] for n in p.nodes}
    for e in p.edges:
        adj[e.source].append(e.target)

    # Step 4: Detect cycles using DFS with 3-color marking
    visited = {}  # 0=white (unvisited), 1=gray (visiting), 2=black (visited)
    has_cycle = False

    def dfs(u):
        nonlocal has_cycle
        if has_cycle:
            return
        visited[u] = 1  # Mark as gray (currently visiting)
        
        for v in adj.get(u, []):
            if visited.get(v, 0) == 0:  # White - not visited yet
                dfs(v)
            elif visited.get(v) == 1:  # Gray - back edge = cycle!
                has_cycle = True
                return
        
        visited[u] = 2  # Mark as black (done visiting)

    # Check all nodes
    for node_id in adj.keys():
        if visited.get(node_id, 0) == 0:
            dfs(node_id)
        if has_cycle:
            break

    return {
        "num_nodes": num_nodes, 
        "num_edges": num_edges, 
        "is_dag": not has_cycle
    }
```

### Algorithm Explanation

**3-Color DFS Algorithm:**

1. **White (0)**: Node not visited yet
2. **Gray (1)**: Node currently being explored
3. **Black (2)**: Node fully explored

**Cycle Detection:**
- If we encounter a GRAY node during DFS → We found a back edge → Cycle detected!
- If all nodes turn BLACK without finding gray nodes → No cycle → Valid DAG!

**Visual Example:**

```
Valid DAG (No cycle):
Input → Text → LLM → Output
  ✅ is_dag: true

Invalid (Has cycle):
A → B → C → A
  ❌ is_dag: false
```

---

## 6️⃣ Demo & Testing (5-7 minutes)

### Live Demo Script

**Step 1: Show the Application**
- "Let me show you the running application"
- Open `http://localhost:3000`

**Step 2: Create a Simple Pipeline**
1. Drag an Input node
2. Drag a Text node
3. Drag an Output node
4. Connect: Input → Text → Output
5. Click "Submit Pipeline"
6. Show alert: `Nodes: 3, Edges: 2, Is DAG: true`

**Step 3: Test Dynamic Handles (TextNode)**
1. Select the Text node
2. Type: `"Hello {{name}} from {{country}}!"`
3. Show how two handles appear on the left
4. Connect Input nodes to each handle

**Step 4: Test LLM Node**
1. Add Input node → connects to "system" handle
2. Add Text node → connects to "prompt" handle
3. Add Output node ← connects from "response" handle
4. Submit and validate

**Step 5: Test Cycle Detection**
1. Create: A → B → C
2. Try to connect C → A (creating a cycle)
3. Submit pipeline
4. Show: `Is DAG: false` (cycle detected!)

**Step 6: Complex Pipeline**
1. Multiple inputs
2. Join node combining inputs
3. Text node with template
4. LLM processing
5. Multiple outputs
6. Submit and validate

---

## 7️⃣ Key Takeaways & Best Practices (2-3 minutes)

### Architecture Benefits

✅ **Reusability**: BaseNode used for all node types
✅ **Consistency**: Same look and feel across all nodes
✅ **Maintainability**: Fix bugs in one place
✅ **Scalability**: Easy to add new node types
✅ **Type Safety**: Pydantic models on backend

### Code Patterns Used

1. **Component Composition**: BaseNode + custom children
2. **Props Drilling**: Passing configuration down
3. **State Management**: useState + Zustand store
4. **Dynamic Rendering**: map() for handles
5. **Effect Hooks**: useEffect for reactive updates
6. **API Integration**: Fetch + async/await
7. **Graph Algorithms**: DFS for cycle detection

### How to Add a New Node

```javascript
// 1. Create new file: nodes/myNode.js
import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const MyNode = ({ id, data }) => {
  // 2. Define state
  const [value, setValue] = useState('');
  
  // 3. Configure handles
  const leftHandles = [{ id: `${id}-input` }];
  const rightHandles = [{ id: `${id}-output` }];
  
  // 4. Return BaseNode with custom UI
  return (
    <BaseNode 
      id={id} 
      title="My Node" 
      leftHandles={leftHandles}
      rightHandles={rightHandles}
    >
      <input 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
      />
    </BaseNode>
  );
};
```

---

## 8️⃣ Future Enhancements (1-2 minutes)

### Potential Features

- 🔄 **Real Execution**: Actually run the pipeline (not just validate)
- 💾 **Save/Load**: Persist pipelines to database
- 📊 **Visualization**: Show execution progress
- 🎨 **Themes**: Dark mode support
- 🔐 **Authentication**: User accounts
- 📝 **Validation**: Input type checking
- 🧪 **Testing**: Add unit tests
- 📱 **Mobile**: Responsive design

---

## 9️⃣ Conclusion & Resources (1 minute)

### Summary
"We built a flexible node-based pipeline editor using:
- BaseNode pattern for reusable components
- React Flow for visual graph editing
- FastAPI for backend validation
- DFS algorithm for cycle detection"

### Resources
- React Flow: https://reactflow.dev/
- FastAPI: https://fastapi.tiangolo.com/
- Zustand: https://github.com/pmndrs/zustand
- Graph Algorithms: https://en.wikipedia.org/wiki/Depth-first_search

### Thank You!
"Thanks for watching! Feel free to ask questions in the comments."

---

## 🎬 Recording Tips

### Before Recording
- [ ] Start backend: `cd frontend/backend && uvicorn main:app --reload`
- [ ] Start frontend: `cd frontend && npm start`
- [ ] Clear browser cache
- [ ] Close unnecessary tabs
- [ ] Prepare example pipelines
- [ ] Test microphone and screen recording

### During Recording
- Speak clearly and slowly
- Zoom in on code when explaining
- Use cursor/pointer to highlight important lines
- Pause between sections
- Show both code and running application
- Explain WHY, not just WHAT

### After Recording
- Add timestamps in description
- Add chapters/sections
- Include links to code repository
- Add captions/subtitles
- Review for clarity

---

## 📝 Video Description Template

```
⏱️ TIMESTAMPS
00:00 - Introduction
02:30 - BaseNode Architecture
08:00 - Creating Node Types
18:00 - Backend Connection
24:00 - DAG Validation
30:00 - Live Demo
36:00 - Conclusion

🔗 RESOURCES
GitHub: [Your Repo Link]
React Flow: https://reactflow.dev/
FastAPI: https://fastapi.tiangolo.com/

💻 TECH STACK
- React + React Flow
- FastAPI + Pydantic
- Zustand (State Management)
- DFS Algorithm (Cycle Detection)

#ReactFlow #FastAPI #WebDevelopment #GraphAlgorithms
```

---

## 🎯 Common Questions to Address

**Q: Why use BaseNode instead of copying code?**
A: DRY principle - one place to fix bugs, consistent behavior, easier maintenance

**Q: Why validate on the backend?**
A: Security, consistency, can use powerful graph algorithms, centralized logic

**Q: What's the point of detecting cycles?**
A: Prevent infinite loops in data processing pipelines

**Q: Can I use this in production?**
A: Add authentication, error handling, testing, and database persistence first

**Q: How do I add my own node type?**
A: Follow the pattern shown - import BaseNode, configure handles, add custom UI

---

**End of Script** 🎬

**Total Video Length**: ~35-45 minutes
