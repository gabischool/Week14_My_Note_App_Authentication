import AddNote from "./components/AddNote";
import Notes from "./components/Notes";
import EditNote from "./components/EditNote";
import { Routes, Route, Link, useNavigate  } from "react-router-dom";
import Register from "./assets/user/Register";
import Login from "./assets/user/login";
import  PrivateRoute from "./privateRoute.jsx";
import Cookies from "js-cookie";
import { useState , useEffect } from "react";
import Profile from "./assets/user/Profile";

function App() {

  const token= Cookies.get('token');
  const [isAuthenticated, setIsAuthenticated] =  useState(false);
  const navigate = useNavigate()
 useEffect(()=>{
  if(token){
    setIsAuthenticated(true);
  }
 },[token]);

 const handleLogout=()=>{
  Cookies.remove('token');
  setIsAuthenticated(false);
  navigate("/Login")
 }

  return (
    <div className="bg-blue-100 min-h-screen flex">
      <div className="w-full">
        <div className="flex flex-col items-center">
          <h3 className="text-3xl text-green-500 mb-5 mt-5 font-medium font-sans" ><strong>My Notes App</strong> </h3>
          <ul className="hidden md:flex space-x-6 shadow-2xl p-5 "> 
          <li > <Link to="/"  className="bg-green-400 px-4 py-2 rounded-4xl hover:bg-blue-50 text-black font-medium ">
          Home
          </Link>
          </li>
      { isAuthenticated && ( 
       <> 
       
        <li> <Link to="/Profile"  className="bg-green-400 px-4 py-2 rounded-4xl hover:bg-blue-50 text-black font-medium ">
            Profile
            </Link>
          </li>
          <li > <Link  onClick={()=>(handleLogout())}  className="bg-green-400 px-4 py-2 rounded-4xl hover:bg-blue-50: text-black font-medium">
           Logout
          </Link>
          </li>
         
           </>
      )}
         
          {!isAuthenticated &&(
             < >
          <li   ><Link to="/register"  className="bg-green-400 px-4 py-2 rounded-4xl hover:bg-blue-50 text-black font-medium ">
            Register
            </Link>
          </li>
          <li > <Link to ="/login" className="bg-green-400 px-4 py-2 rounded-4xl hover:bg-blue-50 text-black font-medium">
          Login
          </Link>
           
          </li>
          </>
          )}
           </ul>
         
         <Routes>
         <Route path="/" element ={<   PrivateRoute  />}> 
          {window.location.pathname === "/" && (
            <Route path="/" element={<AddNote />} />
          ) } else {
                <Route path="/edit/:id" element={<EditNote />} />
          }
          
           </Route>
        <Route path="/profile" element ={<   PrivateRoute  />}> 
           <Route path="/profile" element={< Profile />} />
         </Route>
          <Route path="/register" element ={< Register />}/> 

          <Route path="/Login" element ={<  Login />}/> 
          <Route path="/" element={<Notes/>}/>
          </Routes>
            

          <Notes />
        </div>
      </div>
    </div>
  );
}

export default App;