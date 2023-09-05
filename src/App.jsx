import { useState, useEffect } from "react";
import AddNote from "./components/AddNote";
import Notes from "./components/Notes";
import EditNote from "./components/EditNote";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import RegisterUser from "./components/user/RegisterUser";
import Login from "./components/user/Login";
import Cookies from "js-cookie";

function App() {
  const token = Cookies.get("token");
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setIsAuth(true);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="bg-blue-600 min-h-screen flex">
      <div className="w-full ">
        <div className=" bg-slate-50 text-slate-950">
          <div className="flex flex-col md:flex-row justify-between lg:items-center  mx-10">
            <h3 className="text-3xl  mb-5 mt-5 text-center">My Notes</h3>
            <ul className="md:flex md:item-center ">
              <li className="md:ml-8">
                <Link to="/">Home</Link>
              </li>
              {isAuth && (
                <>
                  <li className="md:ml-8">
                    <Link to="/add-note">Add Note</Link>
                  </li>
                  <li className="md:ml-8">
                    <Link onClick={() => handleLogout()}>Logout</Link>
                  </li>
                </>
              )}
              {!isAuth && (
                <>
                  <li className="md:ml-8">
                    <Link to="/register">Sing up</Link>
                  </li>
                  <li className="md:ml-8">
                    <Link to="/login">Login</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <main className="mt-12">
          <Routes>
            {/* {locations.pathname == "/login" ? (
              <Route path="/login" element={<Login />} />
            ) : (
              <Route path="/register" element={<RegisterUser />} />
            )} */}
            <Route path="/" exact element={<Notes />} />
            <Route path="/add-note" element={<AddNote />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/login" element={<Login />} />

            <Route path="/edit/:id" element={<EditNote />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
