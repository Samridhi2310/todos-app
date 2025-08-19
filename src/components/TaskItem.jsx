import { useState, useMemo } from "react";
import { updateTodo } from "../api";

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [saving, setSaving] = useState(false);

  // Normalize because MockAPI may return "true"/"false" as strings
  const completed = useMemo(
    () => task?.completed === true || task?.completed === "true",
    [task?.completed]
  );

  const handleToggle = async () => {
    if (saving) return;
    setSaving(true);

    try {
      const updated = await updateTodo(task.id, {
        ...task,
        completed: !completed,
      });

      // Normalize again before sending up
      onToggle({
        ...updated,
        completed:
          updated.completed === true || updated.completed === "true",
      });
    } catch (e) {
      console.error("Toggle failed:", e);
      alert(`Failed to toggle: ${e?.message || e}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <li className="bg-white p-3 rounded shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <div className="flex-1">
        <div className="font-semibold">{task.title}</div>
        {task.description && (
          <div className="text-sm text-gray-600">{task.description}</div>
        )}
         {/*Show createdAt if available */}
        {task.createdAt && (
          <div className="text-xs text-gray-500">
            Created at: {new Date(task.createdAt).toLocaleString()}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span
          className={`text-xs px-2 py-1 rounded ${
            completed ? "bg-green-200" : "bg-yellow-200"
          }`}
        >
          {completed ? "Done" : "Pending"}
        </span>

        <button
          onClick={handleToggle}
          disabled={saving}
          className="px-2 py-1 text-sm rounded bg-indigo-600 text-white disabled:opacity-50"
        >
          {saving ? "..." : completed ? "Mark Incomplete" : "Mark Complete"}
        </button>

        <button
          onClick={() => onEdit(task)}
          className="px-2 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(task)}
          className="px-2 py-1 text-sm rounded bg-rose-600 text-white"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
