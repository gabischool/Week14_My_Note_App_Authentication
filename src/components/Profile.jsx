import avatar from "../assets/avator.png";
import { useGetUserQuery } from "../store/api/UserSlice";
const Profile = () => {
    const { data:users = { } } = useGetUserQuery();
    console.log(users.name)
    return (
        <div className='mt-10 p-5 w-full lg:w-5/12 shadow-inner lg:mx-auto '>
            <p className="text-3xl p-3 my-3 text-slate-600">Profile</p>
            <div>
                <img className="w-64 mx-auto" src={avatar} alt="avatar profile" />
                <div className=" space-y-3 p-2">
                    <p className="text-xl">Name : {users.name}</p>
                    <p className="text-xl">Email :{users.email} </p>
                </div>
            </div>
        </div>
    )
}

export default Profile