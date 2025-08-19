import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTodo } from "../api";  

function AddNewTaskModal({ onTaskAdded, isOpen, onClose }) {
  const [todo, setToDo] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setToDo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // prevent duplicate clicks
    setIsSubmitting(true);

    if (!todo.title.trim() || !todo.description.trim()) {
      toast.error("Title and description are required");
      setIsSubmitting(false);
      return;
    }

    try {
      // call API helper
      const newTask = await createTodo({
        ...todo,
        createdAt: new Date().toISOString(),
      });

      toast.success("Task Added Successfully ");

      // Reset form
      setToDo({ title: "", description: "", completed: false });

      if (onTaskAdded) {
        onTaskAdded(newTask); // update parent list
      }

      onClose();
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        {/* Modal Box */}
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Add New Task</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-lg font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={todo.title}
                onChange={handleChange}
                className="w-full p-2 rounded border"
                placeholder="Enter task title"
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-1">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={todo.description}
                onChange={handleChange}
                className="w-full p-2 rounded border"
                placeholder="Enter task description"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Adding..." : "Add Task"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer position="top-center" />
    </>
  );
}

export default AddNewTaskModal;
