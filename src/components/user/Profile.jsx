import React from 'react'
import { useGetUserQuery } from '../../store/api/UserSlice'

function Profile() {

 const { data: user = {}, error, isloading } = useGetUserQuery();
  
    return (
        <div className="min-h-screen flex flex-row items-center justify-center bg-gray-200">
        <div className="mx-auto rounded-lg bg-blue-600 p-10 shadow md:w-3/4 lg:w-1/2">
          <h4 className="mb-10 text-2xl font-bold text-center text-white">Profile</h4>
           <div>
            <img src='https://cdn-icons-png.flaticon.com/512/3177/3177440.png'
            className='w-12 text-center' />
          <h2 className='text-white'>Name: {user.name}</h2>
          <h2 className='text-white'>Email: {user.email}</h2>
         </div>
        
        </div>
      </div>
  )
}

export default Profile