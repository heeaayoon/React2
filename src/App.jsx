import Nav from './component/Nav'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './component/Home'
import Login from './component/Login'
import Subway from './component/Subway'
import Rest from './component/Rest'
import TodoList from './component/TodoList'

function App() {
  return (
    <BrowserRouter> 
      <div className="w-full xl:w-8/10 h-screen mx-auto flex flex-col justify-start items-start">
        <Nav />
        <main className="w-full flex-grow
                        overflow-y-auto py-10
                        flex flex-col items-center">
          <Routes>
            <Route path = "/" element={<Home/>} />
            <Route path = "/login" element={<Login/>} />
            <Route path = "/subway" element={<Subway/>} />
            <Route path = "/rest" element={<Rest/>} />
            <Route path = "/todo" element={<TodoList/>} />
          </Routes>
        </main>
        <footer className="w-full min-h-20 bg-black text-white flex justify-center items-center">
          K-digital 2025 2기 Front-end
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
