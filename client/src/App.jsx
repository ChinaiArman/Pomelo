import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import Login from "./pages/Login"


const router = createBrowserRouter([
  {
    path: "/",
    element:<Home />
  },
  {
    path: "/login",
    element: <Login />
  },
])

function App() {
  return (
      <div className="App">
        <NavBar />
        <RouterProvider router={router} />
        <Footer />
      </div>
  )
}

export default App
