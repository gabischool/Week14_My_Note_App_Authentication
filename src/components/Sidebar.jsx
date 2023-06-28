import { Link, useNavigate } from "react-router-dom"
import { MdNoteAdd, MdHome } from "react-icons/md"
import { BiSolidLogInCircle } from "react-icons/bi"
import { BsPersonFillAdd } from "react-icons/bs"
import { useState } from "react"
import { useEffect } from "react"
import Cookies from "js-cookie"
const Sidebar = () => {
  const token = Cookies.get("token");
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      setAuth(true);
    }
  }, [token])
  const handleLogOut = ()=>{
    Cookies.remove("token");
    setAuth(false);
    navigate('/Login');
  }
  return (
    <div className='bg-white border-r-2 border-l-2 shadow p-2 w-2/12 h-screen'>

      <nav>
        <ul className='flex flex-col justify-start items-start  p-2 '>
          <Link className="p-2 text-xl flex flex-row justify-start items-start" to="/" ><MdHome size={20} className="mt-1" /> <span className="ml-2">Home</span></Link>

          {auth && (
            <>
            <Link className="p-2 text-xl flex flex-row justify-start items-start" to="/AddNote" ><MdNoteAdd size={20} className="mt-1" /> <span className="ml-2">Note</span></Link>
            <button onClick={handleLogOut}>
            <Link  className="p-2 text-xl flex flex-row justify-start items-start" ><BiSolidLogInCircle size={20} className="mt-1" /> <span className="ml-2">Sign Out</span></Link>
            </button>
            </>
          )}

          {!auth && (
            <>
              <Link className="p-2 text-xl flex flex-row justify-start items-start" to="/Register" ><BsPersonFillAdd size={20} className="mt-1" /> <span className="ml-2">Sign Up</span></Link>
              <Link className="p-2 text-xl flex flex-row justify-start items-start" to="/Login" ><BiSolidLogInCircle size={20} className="mt-1" /> <span className="ml-2">Sign In</span></Link>
            </>
          )}

        </ul>
      </nav>
    </div>
  )
}

export default Sidebar