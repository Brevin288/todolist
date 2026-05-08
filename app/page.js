"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, input]);
    setInput("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const completeTask = (index) => {
    const taskToComplete = tasks[index];
    setTasks(tasks.filter((_, i) => i !== index));
    setCompletedTasks([...completedTasks, taskToComplete]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-12 px-4">
      <div className="max-w-md mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">To Do List</h1>
        
        {/* Input Area */}
        <div className="flex gap-2 mb-8">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all"
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 rounded-lg font-medium hover:opacity-90 active:scale-95 transition-all"
          >
            Add
          </button>
        </div>

        {/* Active Tasks */}
        <div className="space-y-3 mb-8">
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">Active Tasks</h2>
          {tasks.length === 0 ? (
            <p className="text-zinc-400 text-sm italic py-2 text-center">No active tasks</p>
          ) : (
            tasks.map((task, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-800"
              >
                <input
                  type="checkbox"
                  onChange={() => completeTask(index)}
                  className="w-5 h-5 rounded border-zinc-300 dark:border-zinc-600 accent-zinc-900 dark:accent-zinc-100 cursor-pointer"
                />
                <p className="flex-1 font-medium">{task}</p>
                <button
                  onClick={() => deleteTask(index)}
                  className="p-1 text-zinc-400 hover:text-red-500 transition-colors"
                  aria-label="Delete task"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Status Counts */}
        <div className="flex justify-between items-center pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">
          <span>Active: {tasks.length}</span>
          <span>Completed: {completedTasks.length}</span>
        </div>

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div className="space-y-2 opacity-60">
            <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">Recently Completed</h2>
            {completedTasks.map((task, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-zinc-50/50 dark:bg-zinc-800/30 rounded-xl border border-transparent"
              >
                <div className="w-5 h-5 flex items-center justify-center text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <p className="flex-1 line-through text-zinc-500">{task}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
