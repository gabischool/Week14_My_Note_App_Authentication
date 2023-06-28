import { Route, Routes } from 'react-router-dom';
import Notes from './Notes';
import Sidebar from './Sidebar'
import { FaUserCircle } from "react-icons/fa";
import AddNote from './AddNote';
import EditNote from './EditNote';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import PrivateRoutes from '../privateRoutes/PrivateRoutes';
const Home = () => {
    return (
        <div className='w-full lg:m-auto   p-4 bg-white shadow-lg'>
            <div className='p-5 border-b-2  shadow flex flex-row justify-between items-center'>
                <h1 className='text-3xl'> Gabi Note App</h1>
                <p><FaUserCircle size={28} /></p>
            </div>
            <div className='flex flex-row justify-start items-start gap-5'>
                <Sidebar />
                <Routes>
                    <Route path="/" element={<Notes />} />

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