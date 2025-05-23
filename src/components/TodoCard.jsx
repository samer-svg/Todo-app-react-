import React from 'react'

export default function TodoCard({children}) {
  return (
    <div className="
      w-[90%] max-w-2xl
      border-0 px-0 py-0
      rounded-3xl 
      shadow-2xl
      backdrop-blur-md
      transition-all duration-500
      bg-gradient-to-br from-purple-800/90 to-indigo-900/90
      hover:shadow-purple-500/20
      animate-fade-in
      relative
      overflow-hidden
      before:absolute
      before:inset-0
      before:bg-gradient-to-r
      before:from-purple-500/10
      before:to-indigo-500/10
      before:opacity-0
      before:transition-opacity
      before:duration-500
      hover:before:opacity-100
    ">
      {children}
    </div>
  )
}
