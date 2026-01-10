# Node Deletion Guide

## 🗑️ How to Delete Nodes

You now have **3 ways** to delete nodes from the canvas:

---

## Method 1: Visual Delete Button (NEW!)

### How it works:
1. **Click on any node** to select it
2. A **red X button** appears in the top-right corner
3. **Click the red button** to delete the node

### Features:
- ✨ Animated red button with hover effect
- 🎯 Appears only when node is selected
- 💫 Smooth scale animation on interaction
- 🛡️ Tooltip shows keyboard shortcuts

---

## Method 2: Keyboard Shortcuts

### How it works:
1. **Click on a node** to select it
2. Press **Delete** or **Backspace** key
3. Node is instantly removed

### Tips:
- You can select multiple nodes (hold **Shift** and click)
- Press **Delete** to remove all selected nodes at once
- Works on both Windows and Mac

---

## Method 3: Delete Edges (Connections)

### How it works:
1. **Click on an edge** (connection line)
2. Press **Delete** or **Backspace**
3. Connection is removed

---

## 🎨 Visual Feedback

### When a node is selected:
- **Purple glow** around the node border
- **Stronger shadow** effect
- **Red delete button** appears in top-right corner

### Node Selection States:
- **Unselected**: Normal appearance
- **Hovered**: Lifts up slightly
- **Selected**: Purple glow + delete button visible
- **Multiple selected**: All show purple glow

---

## 🔧 Technical Implementation

### What Changed:

**1. BaseNode Component**
- Added `selected` prop
- Added delete button with SVG icon
- Integrated `useReactFlow` hook for deletion
- Button only renders when `selected={true}`

**2. All Node Types Updated**
- InputNode, OutputNode, TextNode
- LLMNode, MathNode, JoinNode
- FilterNode, DateNode, RandomNode
- All now pass `selected` prop to BaseNode

**3. React Flow Config**
- Enabled `deleteKeyCode` for keyboard shortcuts
- Added `multiSelectionKeyCode` for selecting multiple nodes
- Already had `onNodesChange` handler (handles deletions)

**4. CSS Styling**
- `.vs-node--selected` - Purple glow effect
- `.vs-node__delete` - Red circular button
- Hover/active animations on delete button

---

## 🎬 Perfect for Your Video!

### Demo Script:

**Step 1: Show the Problem**
> "Previously, if I wanted to remove a node, I had to refresh the entire page. Not ideal!"

**Step 2: Show Visual Deletion**
> "Now, when I select a node, a delete button appears. Just click it and... gone!"
> [Click node, show red X, click X]

**Step 3: Show Keyboard Shortcut**
> "Or even faster - select a node and press Delete or Backspace."
> [Select node, press Delete]

**Step 4: Show Multiple Selection**
> "I can even delete multiple nodes at once. Hold Shift, select multiple nodes, and press Delete."
> [Shift+click multiple nodes, press Delete]

**Step 5: Show Edge Deletion**
> "And of course, I can delete connections too."
> [Click edge, press Delete]

---

## 💡 User Experience Improvements

### Before:
❌ No way to delete nodes  
❌ Had to refresh webpage  
❌ Lost entire workspace  
❌ Frustrating workflow  

### After:
✅ Visual delete button  
✅ Keyboard shortcuts  
✅ Multiple selection support  
✅ Smooth animations  
✅ Professional UX  

---

## 🚀 Additional Features

### Multi-Selection:
- Hold **Shift** and click nodes to select multiple
- Or drag a selection box around nodes
- Press **Delete** to remove all selected nodes

### Undo (Future Enhancement):
- Consider adding Ctrl+Z for undo
- Store deletion history
- Allow restoration of deleted nodes

### Context Menu (Future Enhancement):
- Right-click on node
- Show context menu with "Delete" option
- More professional desktop-app feel

---

## 🎨 Customization Options

### Change Delete Button Color:
Edit `frontend/src/styles/nodes.css`:
```css
.vs-node__delete {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  /* Change to your preferred color */
}
```

### Change Button Position:
```css
.vs-node__delete {
  top: -10px;    /* Adjust vertical position */
  right: -10px;  /* Adjust horizontal position */
}
```

### Change Delete Icon:
Edit `frontend/src/nodes/BaseNode.js` - replace the SVG path with your icon.

---

## 🐛 Troubleshooting

### Delete button doesn't appear?
- Make sure node is selected (should have purple glow)
- Check browser console for errors
- Verify `selected` prop is being passed

### Keyboard shortcuts don't work?
- Click on the canvas first to focus
- Make sure node is selected
- Try both Delete and Backspace keys

### Can't delete multiple nodes?
- Hold Shift while clicking nodes
- Or drag selection box
- All selected nodes should have purple glow

---

## 📝 Code Reference

### BaseNode with Delete Button:
```javascript
export const BaseNode = ({ id, title, children, leftHandles, rightHandles, className, selected }) => {
  const { deleteElements } = useReactFlow();

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteElements({ nodes: [{ id }] });
  };

  return (
    <div className={`vs-node ${className} ${selected ? 'vs-node--selected' : ''}`}>
      {selected && (
        <button className="vs-node__delete" onClick={handleDelete}>
          <svg width="14" height="14">
            <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      )}
      {/* ... rest of node */}
    </div>
  );
};
```

---

**End of Guide** 🎉

Your nodes can now be deleted easily with visual feedback and keyboard shortcuts!
