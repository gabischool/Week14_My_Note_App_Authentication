import AddNote from "./components/AddNote";
import Notes from "./components/Notes";
import EditNote from "./components/EditNote";
import {
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import PrivateRoute from "./PrivateRoute";
import Cookies from "js-cookie";
import Profile from "./components/user/Profile";

function App() {
  const [menu, setMenu] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      setUserInfo(true);
    }
  }, [token]);

  const handleLogout = () => {
    Cookies.remove("token");
    setUserInfo(false);
    navigate("/login");
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 z-10 w-full h-[70px] flex items-center justify-between md:px-[10%] px-8">
        <h2 className="text-xl font-bold text-slate-800">
          gabischool Note App
        </h2>
        <div
          className="md:hidden w-[40px] h-[40px] bg-[#EAB308] text-xl 
         rounded flex items-center justify-center cursor-pointer"
          onClick={() => setMenu(!menu)}>
          {!menu ? <FaBars /> : <FaTimes />}
        </div>
        <ul
          className={`md:static md:flex md:gap-2 md:w-auto w-[80%] md:h-auto h-[100vh] absolute top-[70px] right-0
         md:!text-slate-800 text-white z-10 transition-all duration-200 
         ${
           !menu
             ? "max-md:scale-x-0 origin-right max-md:opacity-0"
             : "max-md:scale-x-100 max-md:opacity-100"
         }`}>
          <li
            className={`md:py-0 px-4 py-3 text-xl  font-medium max-md:hover:bg-[#EAB308] ${
              location.pathname === "/"
                ? "max-md:bg-[#EAB308] max-md:text-white"
                : "max-md:bg-transparent max-md:text-white"
            } ${
              location.pathname === "/" && "text-gray-2000"
            } transition-all cursor-pointer `}>
            <Link to="/">Home</Link>
          </li>
          {userInfo && (
            <>
              <li className="md:py-0 px-4 py-3 text-xl   font-medium max-md:hover:bg-[#EAB308]">
                <Link to="/add_Note">Add Note</Link>
              </li>
              <li
                className="md:py-0 px-4 py-3 text-xl   font-medium max-md:hover:bg-[#EAB308] 
          ">
                <Link to="/profile">Profile</Link>
              </li>
              <li className="md:py-0 px-4 py-3 text-xl font-medium max-md:hover:bg-[#EAB308] transition-all cursor-pointer">
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </>
          )}
          {!userInfo && (
            <>
              <li
                className="md:py-0 px-4 py-3 text-xl   font-medium max-md:hover:bg-[#EAB308] ${
                 ">
                <Link to="/register">Register</Link>
              </li>
              <li
                className="md:py-0 px-4 py-3 text-xl   font-medium max-md:hover:bg-[#EAB308] ${
                 ">
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="bg-gray-50 w-full relative top-[75px] md:h-[80vh] h-[100vh] -z-1 flex items-center justify-center">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add_Note" element={<PrivateRoute />}>
            <Route path="/add_Note" element={<AddNote />} />
          </Route>
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/edit/:id" element={<PrivateRoute />}>
            <Route path="/edit/:id" element={<EditNote />} />
          </Route>
          <Route path="/" element={<Notes />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
