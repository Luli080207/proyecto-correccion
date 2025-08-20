import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "../pages/Home"
import { Dashboard } from "../pages/Dashboard"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"
import { NotFound } from "../pages/NotFound"
import { PrivateRoute } from "../components/PrivateRoute"
import { useState } from "react"
import About from "../pages/about";

const RouterApp = () => {

  // estado global de autenticacion
  const [user, setUser] = useState(false)


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/about" element={<About/>} />
        <Route path="/" element={<Home user={user}/>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrate" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export { RouterApp }