import { useGetUserQuery } from "../../store/api/UserSlice"

const Profile = () => {
    const {data: user = {}} = useGetUserQuery()
    return (
        <div className="min-h-screen flex flex-row items-center justify-center bg-gray-200">
        <div className="mx-auto rounded-lg bg-white p-10 shadow md:w-3/4 lg:w-1/2">
            <p>Name :{user.name}</p>
            <p>Email: {user.email}</p>
       
        
      </div>
      </div>
    )
}

export default Profile;