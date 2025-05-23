import React, { useContext, useState, useEffect } from 'react'
import { TodoContext } from './TodoContext.jsx'

export default function InputList() {
  const { tasks, deleteItem, editItem, toggleComplete } = useContext(TodoContext);
  const [showConfetti, setShowConfetti] = useState(false);
  const [sortBy, setSortBy] = useState('priority');

  // Sort tasks based on current sort criteria
  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    } else if (sortBy === 'date') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === 'completed') {
      return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
    }
    return 0;
  });

  // Handle confetti animation when a task is completed
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const handleToggleComplete = (index, e) => {
    // Prevent toggle if clicking on edit or delete buttons
    if (e.target.closest('button')) return;
    
    const task = tasks[index];
    if (!task.completed) {
      setShowConfetti(true);
    }
    toggleComplete(index);
  };

  const priorityColors = {
    low: {
      bg: 'bg-indigo-900/30',
      border: 'border-indigo-600',
      text: 'text-indigo-400',
      hover: 'hover:bg-indigo-900/40'
    },
    medium: {
      bg: 'bg-purple-900/30',
      border: 'border-purple-600',
      text: 'text-purple-400',
      hover: 'hover:bg-purple-900/40'
    },
    high: {
      bg: 'bg-pink-900/30',
      border: 'border-pink-600',
      text: 'text-pink-400',
      hover: 'hover:bg-pink-900/40'
    }
  };

  const priorityIcons = {
    low: '🌱',
    medium: '🔆',
    high: '🔥'
  };

  return (
    <div className='px-10 py-2 text-xl'>
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="confetti-container">
            {[...Array(50)].map((_, i) => {
              const size = Math.random() * 10 + 5;
              const left = Math.random() * 100;
              const animDuration = Math.random() * 3 + 2;
              const colors = ['#9333ea', '#f472b6', '#10b981', '#f59e0b'];
              const color = colors[Math.floor(Math.random() * colors.length)];

              return (
                <div
                  key={i}
                  className="absolute animate-confetti"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: color,
                    left: `${left}%`,
                    top: '-20px',
                    animationDuration: `${animDuration}s`,
                    animationDelay: `${Math.random() * 0.5}s`,
                    transform: `rotate(${Math.random() * 360}deg)`
                  }}
                />
              );
            })}
          </div>
        </div>
      )}

      <ul className='flex flex-col justify-start items-start mb-1 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar'>
        {tasks.length === 0 ? (
          <li className="w-full text-center py-6 text-purple-300/70 italic animate-fade-in">
            No tasks yet. Add one above! ✨
          </li>
        ) : (
          sortedTasks.map((task, index) => (
            <li
              onClick={(e) => handleToggleComplete(index, e)}
              className={`
                mb-3 mt-3
                text-white
                font-light
                ${priorityColors[task.priority].bg}
                ${priorityColors[task.priority].hover}
                border ${priorityColors[task.priority].border}
                pl-4 w-full py-3
                rounded-3xl
                flex items-center justify-between pr-4
                transition-all duration-300
                hover:shadow-md hover:shadow-purple-700/20
                ${task.completed ? 'opacity-70' : 'opacity-100'}
                transform hover:scale-[1.02] active:scale-[0.98]
                cursor-pointer
                group
                relative
                overflow-hidden
              `}
              key={index}
            >
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className={`
                  w-6 h-6 rounded-full flex items-center justify-center
                  border-2 ${priorityColors[task.priority].border}
                  transition-all duration-300
                  ${task.completed
                    ? `${priorityColors[task.priority].bg} text-white font-bold`
                    : 'bg-transparent'
                  }
                  group-hover:scale-110
                `}>
                  {task.completed && (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 animate-check" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>

                <div className="flex flex-col">
                  <span className={`
                    text-lg transition-all duration-300
                    ${task.completed ? 'line-through opacity-70' : ''}
                  `}>
                    {task.text}
                  </span>
                  <div className="flex items-center space-x-2 text-xs opacity-70">
                    <span className={`${priorityColors[task.priority].text}`}>
                      {priorityIcons[task.priority]} {task.priority}
                    </span>
                    <span className="text-purple-300/50">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    editItem(index);
                  }}
                  className='p-2 cursor-pointer hover:opacity-[.8] outline-0 text-purple-400 hover:text-purple-300 transition-colors duration-200 hover:scale-110'
                  aria-label="Edit task"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteItem(index);
                  }}
                  className='p-2 cursor-pointer hover:opacity-[.8] outline-0 text-pink-400 hover:text-pink-300 transition-colors duration-200 hover:scale-110'
                  aria-label="Delete task"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}