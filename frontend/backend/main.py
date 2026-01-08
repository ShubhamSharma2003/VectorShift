from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# Allow requests from the frontend during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.get('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    # keep your simple GET/form endpoint if something posts form data
    return {'status': 'parsed'}


@app.post('/pipelines/parse')
def parse_pipeline_post(p: Pipeline):
    num_nodes = len(p.nodes)
    num_edges = len(p.edges)

    # Create set of valid node IDs for validation
    node_ids = {n.id for n in p.nodes}
    
    # Validate all edges reference existing nodes
    for e in p.edges:
        if e.source not in node_ids or e.target not in node_ids:
            return {
                "num_nodes": num_nodes,
                "num_edges": num_edges,
                "is_dag": False,
                "error": f"Edge references non-existent node: {e.source} -> {e.target}"
            }

    # build adjacency list (only for existing nodes)
    adj = {n.id: [] for n in p.nodes}
    for e in p.edges:
        adj[e.source].append(e.target)

    # detect cycle using DFS with coloring
    visited = {}
    has_cycle = False

    def dfs(u):
        nonlocal has_cycle
        if has_cycle:
            return
        visited[u] = 1  # Mark as visiting (gray)
        for v in adj.get(u, []):
            if visited.get(v, 0) == 0:  # Unvisited (white)
                dfs(v)
            elif visited.get(v) == 1:  # Currently visiting (gray) = back edge = cycle
                has_cycle = True
                return
        visited[u] = 2  # Mark as visited (black)

    # Check all nodes for cycles
    for node_id in adj.keys():
        if visited.get(node_id, 0) == 0:
            dfs(node_id)
        if has_cycle:
            break

    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": not has_cycle}