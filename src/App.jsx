import AddNote from "./components/AddNote";
import Notes from "./components/Notes";
import EditNote from "./components/EditNote";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./components/user/Login";
import Cookies from "js-cookie";
import Register from "./components/user/Register";
import { Header } from "./components/Header";
import Profile from "./components/user/Profile";
//import PrivateRoute from "./PrivateRoute";

function App() {

  return (
    <div className="bg-blue-600 min-h-screen flex">
      <div className="w-full">
        <div className="flex flex-col items-center">


        <Header/>
          <h3 className="text-3xl text-white mb-5 mt-5">Note</h3>
        
          <Routes>
          

            {/* //<Route path="/notes/addNote" element={<PrivateRoute/>} /> */}
            <Route path="/addNote" element={<AddNote />} />
         
            {/* <Route path="/edit/:id" element={<PrivateRoute/>} />  */}
            <Route path="/edit/:id" element={<EditNote />} />           
            <Route path="/user/login" element={<Login />} />
            <Route path="/notes" element={<Notes />} />
            {/* <Route path="/user/profile" element={<PrivateRoute/>} /> */}
            <Route path="/user/profile" element={<Profile/>} />
            <Route path="/user/login/register" element={<Register/>} />
          
          
          </Routes>
            
          
          
        </div>
      </div>
    </div>
  );
}

export default App;