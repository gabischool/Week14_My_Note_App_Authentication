import React from "react"
import { useGetUserQuery } from "../../store/api/UserSlice"

const Profile = () => {

    const {data: user = {}} = useGetUserQuery()
    
    return (
        <div className="bg-white md:w-3/4 lg:w-1/2 shadow p-10">
            <h1 className="font-bold text-2xl text-slate-800">Welcome Profile User</h1>
            <h3 className="font-medium text-gray-800 mt-4">About</h3>
            <p className="font-semibold">Name: {user.name}</p>
            <p className="font-semibold">Email: {user.email}</p>
        </div>
    )
}

export default Profile;