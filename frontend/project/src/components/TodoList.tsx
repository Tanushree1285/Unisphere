import React, { useState } from 'react';
import { Plus, Calendar, Clock, CheckCircle, Trash2, Edit2 } from 'lucide-react';

interface Todo {
  id: number;
  title: string;
  description: string;
  deadline: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      title: 'Complete Database Assignment',
      description: 'Finish the SQL queries and normalization exercises',
      deadline: '2024-03-15',
      completed: false,
    },
    {
      id: 2,
      title: 'Prepare for Mid-term',
      description: 'Review chapters 1-5 for the upcoming examination',
      deadline: '2024-03-20',
      completed: true,
    },
  ]);

  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    deadline: '',
  });

  const [isEditing, setIsEditing] = useState<number | null>(null);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.title) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        ...newTodo,
        completed: false,
      },
    ]);

    setNewTodo({
      title: '',
      description: '',
      deadline: '',
    });
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (todo: Todo) => {
    setIsEditing(todo.id);
    setNewTodo({
      title: todo.title,
      description: todo.description,
      deadline: todo.deadline,
    });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditing) return;

    setTodos(
      todos.map((todo) =>
        todo.id === isEditing
          ? {
              ...todo,
              title: newTodo.title,
              description: newTodo.description,
              deadline: newTodo.deadline,
            }
          : todo
      )
    );

    setIsEditing(null);
    setNewTodo({
      title: '',
      description: '',
      deadline: '',
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">To-Do List</h1>

      {/* Add/Edit Todo Form */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <form onSubmit={isEditing ? handleUpdate : handleAddTodo}>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={newTodo.title}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, title: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                rows={3}
                value={newTodo.description}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, description: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Deadline
              </label>
              <input
                type="date"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={newTodo.deadline}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, deadline: e.target.value })
                }
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus className="h-5 w-5 mr-2" />
                {isEditing ? 'Update Task' : 'Add Task'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Todo List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`p-6 ${
                todo.completed ? 'bg-gray-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <button
                    onClick={() => toggleComplete(todo.id)}
                    className={`flex-shrink-0 ${
                      todo.completed
                        ? 'text-green-500'
                        : 'text-gray-400 hover:text-gray-500'
                    }`}
                  >
                    <CheckCircle className="h-6 w-6" />
                  </button>
                  <div className="ml-3">
                    <p
                      className={`text-sm font-medium ${
                        todo.completed
                          ? 'text-gray-500 line-through'
                          : 'text-gray-900'
                      }`}
                    >
                      {todo.title}
                    </p>
                    <p className="text-sm text-gray-500">{todo.description}</p>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      <p>Due {todo.deadline}</p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => startEditing(todo)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;