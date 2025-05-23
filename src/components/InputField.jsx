import React, { useContext, useState } from 'react'
import { TodoContext } from './TodoContext.jsx'

export default function InputField() {
  const {
    todoValue,
    setTodoValue,
    handleSubmit,
    editingIndex,
    currentPriority,
    setCurrentPriority,
    motivationalQuote
  } = useContext(TodoContext);

  const [isFocused, setIsFocused] = useState(false);
  const maxLength = 100; // Maximum character limit

  function handleFormSubmit(e) {
    e.preventDefault();
    if (todoValue.trim()) {
      handleSubmit(todoValue);
      // Play a subtle sound effect when adding a task (optional)
      // new Audio('/sounds/add-task.mp3').play().catch(e => console.log('Audio play failed:', e));
    }
  }

  const priorityColors = {
    low: {
      bg: 'bg-indigo-600',
      text: 'text-indigo-400',
      border: 'border-indigo-600',
      hoverBg: 'hover:bg-indigo-900/10',
      hoverBorder: 'hover:border-indigo-400',
      hoverShadow: 'hover:shadow-indigo-500/40',
      activeBg: 'active:bg-indigo-700'
    },
    medium: {
      bg: 'bg-purple-600',
      text: 'text-purple-400',
      border: 'border-purple-600',
      hoverBg: 'hover:bg-purple-900/10',
      hoverBorder: 'hover:border-purple-400',
      hoverShadow: 'hover:shadow-purple-500/40',
      activeBg: 'active:bg-purple-700'
    },
    high: {
      bg: 'bg-pink-600',
      text: 'text-pink-400',
      border: 'border-pink-600',
      hoverBg: 'hover:bg-pink-900/10',
      hoverBorder: 'hover:border-pink-400',
      hoverShadow: 'hover:shadow-pink-500/40',
      activeBg: 'active:bg-pink-700'
    }
  };

  return (
    <div className='px-10 py-5 text-xl'>
      <div className="mb-3 text-center italic text-sm text-purple-300/80 animate-fade-in">
        {motivationalQuote}
      </div>

      <form onSubmit={handleFormSubmit} className="relative">
        <div className="relative group mb-4">
          <input
            type="text"
            value={todoValue}
            onChange={e => setTodoValue(e.target.value.slice(0, maxLength))}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={editingIndex !== null ? 'Edit your cosmic task...' : 'Enter your cosmic task...'}
            className={`
              w-full
              mb-4
              outline-none border-2 p-3
              rounded-3xl
              pl-5 pr-12
              bg-gradient-to-r from-indigo-900/80 to-purple-900/80
              border-purple-600/30
              text-white
              placeholder-purple-400/50
              transition-all duration-300
              ${isFocused ? 'shadow-lg shadow-purple-700/30 scale-[1.02]' : 'hover:shadow-md hover:shadow-purple-700/20'}
            `}
          />
          <span className={`
            absolute right-5 top-1/2 transform -translate-y-1/2
            transition-all duration-300
            ${todoValue ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
          `}>
            {editingIndex !== null ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className=" mb-4 h-5 w-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
            )}
          </span>
          <div className="absolute right-5 bottom-[-14px] text-md text-purple-400/70">
            {todoValue.length}/{maxLength}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between mb-4">
          <div className="flex items-center space-x-2 mb-2 sm:mb-0">
            <span className="text-md text-purple-300">Priority:</span>
            {['low', 'medium', 'high'].map(priority => (
              <button
                key={priority}
                type="button"
                onClick={() => setCurrentPriority(priority)}
                className={`
                  px-3 py-1 rounded-full text-sm 
                  md:text-base lg:text-lg
                  capitalize
                  transition-colors duration-200
                  transform hover:scale-105 active:scale-95
                  hover:brightness-110
                  focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-purple-500/50
                  ${currentPriority === priority
                    ? `${priorityColors[priority].bg} text-white font-bold hover:shadow-md ${priorityColors[priority].hoverShadow} ${priorityColors[priority].activeBg}`
                    : `bg-transparent ${priorityColors[priority].text} ${priorityColors[priority].border} border ${priorityColors[priority].hoverBg} ${priorityColors[priority].hoverBorder}`
                  }
                `}
              >
                {priority}
              </button>
            ))}
          </div>

          <button
            type='submit'
            className={`
              px-6 py-2 rounded-4xl
              text-white cursor-pointer
              transition-all duration-300
              transform hover:scale-105 active:scale-95
              bg-gradient-to-r from-purple-600 to-indigo-800
              hover:shadow-lg hover:shadow-purple-700/30
              disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500/50
            `}
            disabled={!todoValue.trim()}
          >
            <div className="flex items-center justify-center space-x-1">
              <span>{editingIndex !== null ? 'Update' : 'Add'}</span>
              {editingIndex !== null ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </button>
        </div>
      </form>
    </div>
  )
}