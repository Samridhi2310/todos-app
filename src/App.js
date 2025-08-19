import { useEffect, useMemo, useState } from "react";
import AddNewTaskModal from "./components/AddNewTaskModal";
import EditTaskModal from "./components/EditTaskModal";
import ConfirmDialog from "./components/ConfirmDialog";
import TaskItem from "./components/TaskItem";
import FilterBar from "./components/FilterBar";
import { fetchTodos, deleteTodo } from "./api";

export default function App() {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // fetch all
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchTodos();
        // sort newest first
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setTasks(data);
      } catch (e) {
        setErr("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // add (optimistic handled by AddNewTaskModal calling this)
  const handleTaskAdded = (newTask) => {
    setTasks(prev => [newTask, ...prev]);
  };

  // toggle completed result from child
  const handleToggle = (updated) => {
    setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)));
  };

  // open edit
  const handleOpenEdit = (task) => {
    setEditTask(task);
    setShowEdit(true);
  };

  // after edit saved
  const handleEdited = (updated) => {
    setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)));
  };

  // delete flow
  const askDelete = (task) => {
    setToDelete(task);
    setConfirmOpen(true);
  };
  const doDelete = async () => {
    if (!toDelete) return;
    try {
      await deleteTodo(toDelete.id);
      setTasks(prev => prev.filter(t => t.id !== toDelete.id));
    } catch (e) {
      alert("Failed to delete");
    } finally {
      setConfirmOpen(false);
      setToDelete(null);
    }
  };

  // filtering
  const filtered = useMemo(() => {
    if (filter === "completed") return tasks.filter(t => t.completed);
    if (filter === "incomplete") return tasks.filter(t => !t.completed);
    return tasks;
  }, [tasks, filter]);

  return (
    <div className="min-h-screen min-w-full bg-teal-500 p-4 sm:p-10">
      <div className="max-w-2xl mx-auto">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-white">TO DO LIST</h1>
          <p className="text-white/90 mt-1">Manage your tasks efficiently</p>
        </header>

        <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => setShowAdd(true)}
            className="bg-white px-4 py-2 rounded shadow hover:bg-gray-200 w-full sm:w-auto"
          >
            Add New Task
          </button>

          <FilterBar value={filter} onChange={setFilter} />
        </div>

        <section className="mt-6">
          {loading && <p className="text-white">Loading...</p>}
          {err && <p className="text-rose-100">{err}</p>}

          {!loading && filtered.length === 0 ? (
            <p className="text-white">No tasks{filter !== "all" ? ` in ${filter}` : ""}...</p>
          ) : (
            <ul className="space-y-2">
              {filtered.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={handleToggle}
                  onEdit={handleOpenEdit}
                  onDelete={askDelete}
                />
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Modals */}
      <AddNewTaskModal
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
        onTaskAdded={handleTaskAdded}
      />

      <EditTaskModal
        isOpen={showEdit}
        task={editTask}
        onClose={() => setShowEdit(false)}
        onUpdated={handleEdited}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Delete Task?"
        message={`Are you sure you want to delete "${toDelete?.title}"?`}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={doDelete}
      />
    </div>
  );
}

