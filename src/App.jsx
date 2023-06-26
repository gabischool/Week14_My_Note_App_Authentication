import AddNote from "./components/AddNote";
import Notes from "./components/Notes";
import EditNote from "./components/EditNote";
import { Routes, Route, Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import PrivateRoute from "./PrivateRoute";
import Cookies from "js-cookie";
import Profile from './components/user/Profile'

function App() {

  const [menu , setMenu] = useState(false);
  const [userInfo , setUserInfo] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = Cookies.get("token")
    if(token) {
      setUserInfo(token)
    }
  },[userInfo])

  const handleLogout = () => {
    try {
      Cookies.remove("token")
      setUserInfo(null)
      window.location.reload()
      navigate("/login")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 z-10 w-full bg-white h-[70px] shadow-lg flex items-center justify-between md:px-[10%] px-8">
        <h2 className="text-3xl font-bold text-slate-800">
          Som <span className="text-[#00BEFE]">Notes</span>
        </h2>
        <div className="md:hidden w-[40px] h-[40px] bg-[#00BEFE] text-xl text-white
         rounded flex items-center justify-center cursor-pointer" 
         onClick={() => setMenu(!menu)}>
          {!menu ? <FaBars/> : <FaTimes/>}
        </div>
        <ul className={`md:static md:flex md:gap-2 md:w-auto w-[80%] md:h-auto h-[100vh] absolute top-[70px] right-0
          bg-slate-900 md:bg-white md:!text-slate-800 text-white z-10 transition-all duration-200 
         ${!menu ? 'max-md:scale-x-0 origin-right max-md:opacity-0' : 'max-md:scale-x-100 max-md:opacity-100'}`}>
          <li className={`md:py-0 px-4 py-3 text-2xl font-medium max-md:hover:bg-[#00BEFE] ${location.pathname === "/" ? "max-md:bg-[#00befe] max-md:text-white" : "max-md:bg-transparent max-md:text-white"} ${location.pathname === "/" && "text-[#00BEFE]"} transition-all cursor-pointer `}><Link to="/">Home</Link></li>
          {userInfo && (
          <>
          <li className={`md:py-0 px-4 py-3 text-2xl font-medium max-md:hover:bg-[#00BEFE] ${location.pathname === "/add_Note" ? "max-md:bg-[#00befe] max-md:text-white" : "max-md:bg-transparent max-md:text-white"} ${location.pathname == "/add_Note" ? "text-[#00BEFE]" : "text-slate-900"} transition-all cursor-pointer `}><Link to="/add_Note">Add Note</Link></li>
          <li className={`md:py-0 px-4 py-3 text-2xl font-medium max-md:hover:bg-[#00BEFE] ${location.pathname === "/Profile" ? "max-md:bg-[#00BEFE] max-md:text-white" : "max-md:bg-transparent max-md:text-white"} ${location.pathname == "/Profile" ? "text-[#00BEFE]" : "text-slate-900"} transition-all cursor-pointer `}><Link to="/profile">Profile</Link></li>
          <li className={`md:py-0 px-4 py-3 text-2xl font-medium max-md:hover:bg-[#00BEFE] transition-all cursor-pointer `}><Link onClick={handleLogout}>Logout</Link></li>
          </>
          )}
          {!userInfo && (
          <>
          <li className={`md:py-0 px-4 py-3 text-2xl font-medium max-md:hover:bg-[#00BEFE] ${location.pathname === "/register" ? "max-md:bg-[#00befe] max-md:text-white" : "max-md:bg-transparent max-md:text-white"} ${location.pathname === "/register" && "text-[#00BEFE]"} transition-all cursor-pointer md:hover:text-[#00BEFE]`}><Link to="/register">Register</Link></li>
          <li className={`md:py-0 px-4 py-3 text-2xl font-medium max-md:hover:bg-[#00BEFE] ${location.pathname === "/login" ? "max-md:bg-[#00befe] max-md:text-white" : "max-md:bg-transparent max-md:text-white"} ${location.pathname === "/login" && "text-[#00BEFE]"} transition-all cursor-pointer md:hover:text-[#00BEFE]`}><Link to="/login">Login</Link></li>
          </>
          )}
        </ul>
      </div>
      <div className="bg-gray-50 w-full relative top-[75px] md:h-[80vh] h-[100vh] -z-1 flex items-center justify-center">
          <Routes>
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/add_Note" element={<PrivateRoute/>}>
              <Route path="/add_Note" element={<AddNote />} />
            </Route>
            <Route path="/profile" element={<PrivateRoute/>}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/edit/:id" element={<PrivateRoute/>}>
              <Route path="/edit/:id" element={<EditNote />} />
            </Route>
            <Route path="/" element={<Notes/>}/>
          </Routes>
      </div>
    </div>
  );
}

export default App;