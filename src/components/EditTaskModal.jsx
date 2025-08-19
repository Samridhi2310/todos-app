import { useEffect, useState } from "react";
import { updateTodo } from "../api";

export default function EditTaskModal({ isOpen, onClose, task, onUpdated }) {
  const [form, setForm] = useState({ title:"", description:"", completed:false });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (task) setForm({ title: task.title || "", description: task.description || "", completed: !!task.completed });
  }, [task]);

  if (!isOpen || !task) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      alert("Title and description are required");
      return;
    }
    setSaving(true);
    try {
      const updated = await updateTodo(task.id, {
        ...task,
        title: form.title,
        description: form.description,
        completed: form.completed,
      });
      onUpdated(updated);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-lg p-5">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input name="title" value={form.title} onChange={handleChange} className="w-full border rounded p-2" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <input name="description" value={form.description} onChange={handleChange} className="w-full border rounded p-2" />
          </div>

          <label className="inline-flex items-center gap-2">
            <input type="checkbox" name="completed" checked={form.completed} onChange={handleChange} />
            <span>Completed</span>
          </label>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
            <button type="submit" disabled={saving} className="px-4 py-2 bg-black text-white rounded">
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
