import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

  import Login from '../Views/Login/login'
  import Signup from '../Views/Signup/register'
  import ForgotPassword from '../Views/ForgotPassword/forgotPassword'
  import AddPost from "../Views/AddPost/addpost";
  import Dashboard from "../Views/Dashboard/dashboard"
  import Detail from '../Views/Detail/detail'

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>
    },

    {
      path: "/register",
      element: <Signup/>
    },

    {
      path: "/forgotPassword",
      element: <ForgotPassword/>
    },

    {
      path: "/addPost",
      element: <AddPost/>
    },

    {
      path: "/dashboard",
      element: <Dashboard/>
    },

    {
      path: "/dashboard/detail/:adId",
      element: <Detail/>  // dynamic route: => detail me ad ki id route me set hogi jo ad k click pr detal me jayega single ad (dynamic routing khlata ha)
    }, 
  ]); 

  function Router() {
    return  <RouterProvider router={router} />
  }

  export default Router;



//   // -------------------------------------
//   import { useState, useEffect } from 'react'
// import {
//     createBrowserRouter,
//     RouterProvider,
//     Outlet,
//     useNavigate
// } from "react-router-dom"
// import Register from '../views/Register'
// import Login from '../views/Login'
// import Dashboard from '../views/Dashboard'
// import AboutUs from '../views/AboutUs'
// import ContactUs from '../views/ContactUs'
// import Detail from '../views/Detail'
// import Header from '../components/Header'
// import { onAuthStateChanged } from 'firebase/auth'
// import { auth } from './firebase'

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Layout />,
//         children: [
//             {
//                 path: "/",
//                 element: <Dashboard />,
//             },
//             {
//                 path: "/contactUs",
//                 element: <ContactUs />,
//             },
//             {
//                 path: "/aboutUs",
//                 element: <AboutUs />,
//             },
//             {
//                 path: "/detail/:adId",
//                 element: <Detail />,
//             },
//             {
//                 path: "/login",
//                 element: <Login />,
//             },
//             {
//                 path: "/register",
//                 element: <Register />,
//             },
//         ]
//     }
// ]);

// function Layout() {
//     const [user, setUser] = useState()
//     const [loading, setLoading] = useState(true)
//     const navigate = useNavigate()

//     useEffect(() => {
//         onAuthStateChanged(auth, (user) => {
//             setUser(user)
//             setLoading(false)
//         });
//     }, [])

//     useEffect(() => {
//         const path = window.location.pathname
//         if (user) {
//             if (path === '/register' || path === "/login") {
//                 navigate('/')
//             }
//         } else {
//             if (path === '/' || path === '/contactUs') {
//                 navigate('/login')
//             }
//         }
//     }, [window.location.pathname, user])

//     if (loading) return <div>Loading...</div>

//     return <div>
//         <Header user={user} />
//         <Outlet />
//     </div>
// }

// function Router() {
//     return <RouterProvider router={router} />
// }

// export default Router