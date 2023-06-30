import React, { useEffect, useState } from "react";
import AddNote from "./components/AddNote";
import EditNote from "./components/EditNote";
import { Routes, Link, Route, useNavigate, useLocation } from "react-router-dom";
import Notes from "./components/Notes"
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import Profile from "./components/user/Profile";
import PrivateRoute from "./PriveRoute";
import Cookies from 'js-cookie';

function App() {
 
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const navigate = useNavigate();

  useEffect(()=> {
    const token = Cookies.get("token")
    if(token) {
      setIsAuthenticated(token)
    }
  }, [isAuthenticated])

    const handleLogout = () => {
      try {
        Cookies.remove('token');
        setIsAuthenticated(null);
        window.location.reload();
        navigate('/user/login');
      } catch (error) {
        console.log('Logout error:', error);
      
      }
    };

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80')]">
     <header className="py-4">
      <nav>
       <div className="container mx-auto flex justify-between items-center">
        <h2 className="text-2xl font-bold m-3 text-white">Ibrahim</h2>
        <ul className="hidden md:flex space-x-6 m-5">
        <li>
                <Link
                  to="/" className="bg-blue-400 px-4 py-2 rounded-3xl hover:bg-red-500 text-white"
                
                >
                  Home
                </Link>
              </li>
                
                {isAuthenticated && (
                  <>
                  <li>
                  <Link
                    to="/addNote" className="bg-blue-400 px-4 py-2 rounded-3xl hover:bg-red-500 text-white"
                  
                  >
                    AddNote
                  </Link>
                  </li>

                  <li>
                    <Link to="/profile"
                      className="bg-blue-400 px-4 py-2 rounded-3xl hover:bg-red-500 text-white"
                    >
                      Profile
                    </Link>
                    </li>
                   
                    <li>
                    <Link
                      onClick={handleLogout}
                      className="bg-blue-400 px-4 py-2 rounded-3xl hover:bg-red-500 text-white"
                    >
                      Logout
                    </Link>
                    </li>
                  </>
                )}
             
               {!isAuthenticated && (
                 <>
                  <li>
                  <Link
                    to="/user/register" className="bg-blue-400 px-4 py-2 rounded-3xl hover:bg-red-500 text-white"
                  
                  >
                    Register
                  </Link>
                </li>
  
                <li>
                      <Link
                        to="/user/login"
                        className="bg-blue-400 px-4 py-2 rounded-3xl hover:bg-red-500 text-white"
                      >
                        Login
                      </Link>
                    </li>
                    </>
               )}
            

        </ul>
       </div>
      </nav>
     </header>

     
            
       <Routes>
        <Route path="/user/login" element={<Login />} />
          <Route path="/" element={<Notes/>}/>
          <Route path="/user/register" element={<Register />} />

          <Route path="/update_note/:id" element={<PrivateRoute />}>
          <Route path="/update_note/:id" element={<EditNote />} />
        </Route>
          
          <Route path="/addNote" element={<PrivateRoute />}>
          <Route path="/addNote" element={<AddNote />} />
        </Route>

        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

         </Routes> 
   </div>
  );
}

export default App;
