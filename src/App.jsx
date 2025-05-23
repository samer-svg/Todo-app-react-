import TodoCard from './components/TodoCard'
import InputField from './components/InputField'
import InputList from './components/InputList'
import { TodoProvider } from './components/TodoContext.jsx'

export default function App() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-800 to-indigo-900 font-mono '>
      <TodoProvider>
        <TodoCard>
          <div className="flex justify-between items-center px-10 py-3 border-2 shadow-md border-purple-700/20 rounded-lg">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Cosmic Tasks
            </h1>
          </div>
          <InputField />
          <InputList />
        </TodoCard>
      </TodoProvider>
    </div>
  )
}