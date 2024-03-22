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
import SignUp from "./pages/SignUp"
import Register from "./pages/Register"
import Categories from './pages/Categories';
import Transactions from './pages/Transactions';
import TeamSpaceSettings from './pages/TeamSpaceSettings';
import PageNotFound from './pages/404';
import './font.css'
import Landing from './pages/Landing';


var userID = window.localStorage.getItem("userID")
var teamSpaceID = window.localStorage.getItem("teamSpaceID")


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: () => (!userID ? window.location.href = '/login' : (!teamSpaceID ? window.location.href = '/register' : null)),
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => (!userID ? null : (!teamSpaceID ? window.location.href = '/register' : window.location.href = '/')),
  },
  {
    path: "/signup",
    element: <SignUp />,
    loader: () => (!userID ? null : (!teamSpaceID ? window.location.href = '/register' : window.location.href = '/')),
  },
  {
    path: "/register",
    element: <Register />,
    loader: () => (!userID ? window.location.href = '/login' : (!teamSpaceID ? null : window.location.href = '/')),
  },
  {
    path: "/categories",
    element: <Categories />,
    loader: () => (!userID ? window.location.href = '/login' : (!teamSpaceID ? window.location.href = '/register' : null)),
  },
  {
    path: "/transactions",
    element: <Transactions />,
    loader: () => (!userID ? window.location.href = '/login' : (!teamSpaceID ? window.location.href = '/register' : null)),
  },
  {
    path: "/teamSpaceSettings",
    element: <TeamSpaceSettings />,
    loader: () => (!userID ? window.location.href = '/login' : (!teamSpaceID ? window.location.href = '/register' : null)),
  },
  {
    path: "/landing",
    element: <Landing />,
    loader: () => (!userID ? window.location.href = '/login' : (!teamSpaceID ? window.location.href = '/register' : null)),
  },
  {
    path: "*",
    element: <PageNotFound />,
    loader: () => null,
  },
  {
    path: "/logout",
    loader: () => {
      window.localStorage.removeItem("userID")
      window.localStorage.removeItem("teamSpaceID")
      window.location.href = '/login'
    }
  },
])

function App() {
  if (window.location.pathname === '/login' || window.location.pathname === '/signup' || window.location.pathname === '/register' || window.location.pathname === '/404') {
    return (
      <div className="App">
        <RouterProvider router={router} />
      </div>
    )
  } else {
    return (
      <div className="App flex flex-col h-screen">
        <NavBar />
        <RouterProvider router={router} />
        <Footer />
      </div>
    )
  }
}

export default App
