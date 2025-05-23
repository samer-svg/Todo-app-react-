import { createContext, useState, useEffect } from 'react';

// Array of motivational quotes
const MOTIVATIONAL_QUOTES = [
  "The only way to do great work is to love what you do.",
  "Believe you can and you're halfway there.",
  "Don't watch the clock; do what it does. Keep going.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Your time is limited, don't waste it living someone else's life.",
  "The best way to predict the future is to create it.",
  "The only limit to our realization of tomorrow is our doubts of today.",
  "You are never too old to set another goal or to dream a new dream.",
  "The secret of getting ahead is getting started."
];

export const TodoContext = createContext();

export function TodoProvider({ children }) {
  // Initialize tasks from localStorage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('todos');
    if (savedTasks) {
      const parsed = JSON.parse(savedTasks);
      // Check if the data is in the new format (objects) or old format (strings)
      if (Array.isArray(parsed)) {
        return parsed.map(item => typeof item === 'string' ? {
          text: item,
          completed: false,
          priority: 'medium',
          createdAt: new Date().toISOString()
        } : item);
      } else if (parsed.tasks) {
        return parsed.tasks.map(item => typeof item === 'string' ? {
          text: item,
          completed: false,
          priority: 'medium',
          createdAt: new Date().toISOString()
        } : item);
      }
    }
    return [];
  });

  const [todoValue, setTodoValue] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentPriority, setCurrentPriority] = useState('medium');
  const [motivationalQuote, setMotivationalQuote] = useState(() => {
    return MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    const saveTasks = () => {
      try {
        localStorage.setItem('todos', JSON.stringify(tasks));
      } catch (error) {
        console.error("Failed to save tasks:", error);
      }
    };

    saveTasks();
  }, [tasks]);

  // Change motivational quote every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
      setMotivationalQuote(newQuote);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  function handleSubmit(text) {
    if (text.trim()) {
      if (editingIndex !== null) {
        const updatedTasks = [...tasks];
        updatedTasks[editingIndex] = {
          ...updatedTasks[editingIndex],
          text: text,
          priority: currentPriority
        };
        setTasks(updatedTasks);
        setEditingIndex(null);
      } else {
        const newTask = {
          text: text,
          completed: false,
          priority: currentPriority,
          createdAt: new Date().toISOString()
        };
        setTasks(prev => [newTask, ...prev]);
      }
      setTodoValue('');
      setCurrentPriority('medium');
    }
  }

  function deleteItem(index) {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    if (editingIndex === index) {
      setEditingIndex(null);
      setTodoValue('');
      setCurrentPriority('medium');
    }
  }

  function editItem(index) {
    setTodoValue(tasks[index].text);
    setCurrentPriority(tasks[index].priority);
    setEditingIndex(index);
  }

  function toggleComplete(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      completed: !updatedTasks[index].completed
    };
    setTasks(updatedTasks);
  }

  function changePriority(index, priority) {
    const updatedTasks = [...tasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      priority
    };
    setTasks(updatedTasks);
  }

  const value = {
    tasks,
    todoValue,
    setTodoValue,
    editingIndex,
    currentPriority,
    setCurrentPriority,
    motivationalQuote,
    handleSubmit,
    deleteItem,
    editItem,
    toggleComplete,
    changePriority
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
}