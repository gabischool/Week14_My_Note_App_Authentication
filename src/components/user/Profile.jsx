import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../../store/api/UserSlice";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Profile = () => {
  const { data: user = {} } = useGetUserQuery();
  console.log(user);
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
    <div>
      <div className="max-w-xl mx-auto bg-white w-[30rem] overflow-hidden shadow-lg">
        <div className="border-b px-4 pb-6">
          <div className="text-center my-4">
            <img
              className="h-32 w-32 rounded-full border-4 border-white mx-auto my-4"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfoF1qEUc35z3668E7icTZN_I8ZTiZLiHNT9MZ1eQ&s"
              alt=""
            />
            <div className="py-2">
              <h3 className="font-bold text-2xl mb-1">{user?.name}</h3>
              <div className="text-xl inline-flex text-gray-700 items-center">
                {user?.email}
              </div>
            </div>
          </div>
          <div className="flex gap-2 px-2">
            <button className="flex-1 rounded-full bg-blue-600 text-white antialiased font-bold hover:bg-blue-800 px-4 py-2">
              <Link to="/add_Note">Addnote</Link>
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 rounded-full border-2 border-gray-400 font-semibold text-black px-4 py-2">
              Logout
            </button>
          </div>
        </div>
        <div className="px-4 py-4">
          <div className="flex gap-2 items-center text-gray-800r mb-4">
            <span>
              <strong className="text-black">3</strong> Having Notes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
