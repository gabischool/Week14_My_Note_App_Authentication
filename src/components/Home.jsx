import { Route, Routes } from 'react-router-dom';
import Notes from './Notes';
import Sidebar from './Sidebar'
import { CiMenuKebab } from "react-icons/ci";
import AddNote from './AddNote';
import EditNote from './EditNote';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import PrivateRoutes from '../privateRoutes/PrivateRoutes';
import { useState } from 'react';
import Profile from './Profile';
const Home = () => {
    const [ showMenu , setShowMenu ] = useState(false);
    const HandleShowMenu = ()=>{
      setShowMenu(!showMenu);
    }
    const HandleHideMenu = ()=>{
      setShowMenu(false);
    }
    return (
        <div className='w-full lg:p-4 bg-white shadow-lg'>
            <div className='p-5 border-b-2 border-b-blue-600  shadow flex flex-row justify-between items-center'>
                <h1 className='text-3xl'> Gabi Note App</h1>
                <p className='lg:hidden'><CiMenuKebab size={28} onClick={HandleShowMenu}/></p>
            </div>
            <div className='flex flex-row justify-start items-start gap-5'>
                <Sidebar HandleShowMenu={HandleShowMenu} HandleHideMenu={HandleHideMenu} showMenu={showMenu} />
                <Routes>
                    <Route path="/" element={<Notes />} />
                    <Route path='/Profile' element={<Profile/>}/>
                    <Route path="/AddNote" element={<PrivateRoutes />}>
                    <Route path="/AddNote" element={<AddNote />} />
                    </Route>
                    
                    <Route path="/EditNote/:id" element={<EditNote />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                </Routes>
            </div>
        </div>
    )
}

export default Home