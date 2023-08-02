import React,{useEffect,useState} from 'react';
import AddNote from "./components/AddNote";
import Notes from "./components/Notes";
import EditNote from "./components/EditNote";
import { Routes, Route,Link, useNavigate,  } from "react-router-dom";
import Register from './components/user/Register';
import Login from './components/user/Login';
import Profile from './components/user/Profile';
import PrivateRoute from "./PrivateRoute";
import  Cookies from "js-cookie";

function App() {
  
  const token =Cookies.get('token');
  const [isAuthenticated,setIsAuthenticated]=React.useState(false);
  const navigate=useNavigate();

  useEffect(()=>{
if(token){
    setIsAuthenticated(true);
  }
},[token]
)
const handleLogout=()=>{
  Cookies.remove('token');
  setIsAuthenticated(false);
  window.location.reload();
  navigate('/login');


}
  return (
    <div className="bg-slate-50">

    <header className="bg-white py-10">
      <nav className="h-full">
        <div className="container mx-auto flex justify-between items-center">
            <h3 className="text-2xl font-bold">My Notes</h3>
            <ul className="hidden md:flex space-x-6">
              
            {isAuthenticated && (
                <>
              <li><Link to="/" className="bg-blue-400 px-4 py-2 rounded-3xl hover:bg-blue-500 text-white">Notes</Link></li>
              
              <li><Link to="/AddNote" className="bg-blue-400 px-4 py-2 rounded-3xl hover:bg-blue-500 text-white">AddNotes</Link></li>
              <li><Link to="/profile" className="bg-blue-400 px-4 py-2 rounded-3xl hover:bg-blue-500 text-white">Profile</Link></li>
              <li><Link onClick={()=>handleLogout()} className="bg-blue-400 px-4 py-2 rounded-3xl hover:bg-blue-500 text-white">logout</Link></li>

              </>
              )}
              {!isAuthenticated && (
                <>
              <li><Link to="/register" className="bg-blue-400 px-4 py-2 rounded-3xl hover:bg-blue-500 text-white">Register</Link></li>
              
              <li><Link to="/login" className="bg-blue-400 px-4 py-2 rounded-3xl hover:bg-blue-500 text-white">Login</Link></li>
              </>
              )}
              </ul>
        </div>
      </nav>
    </header>

         <Routes>
    <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />

            <Route path="/AddNote" element={<PrivateRoute/>} >
             
            <Route path="/AddNote" element={<AddNote />} />
            </Route>
            <Route path="/" element={<PrivateRoute/>} >
            <Route path="/edit/:id" element={<EditNote />} />
            <Route path="/" element={<Notes/>}/>
            <Route path="/profile" element={<Profile/>}/>
            </Route>
   
    </Routes>
  </div>
  );
}

export default App;