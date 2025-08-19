const API = process.env.REACT_APP_API_BASE_URL; 
export async function fetchTodos() {
  const res = await fetch(`${API}`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export async function createTodo(payload) {
  const res = await fetch(`${API}`, {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create');
  return res.json();
}

export async function updateTodo(id, payload) {
  const res = await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to update');
  return res.json();
}

export async function patchTodo(id, payload) {
  const res = await fetch(`${API}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to patch');
  return res.json();
}

export async function deleteTodo(id) {
  const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete');
  return res.json();
}
