import React from 'react'
import Profile from '../Profile/Profile'
import RadialChart from '../radialChart/RadialChart'
import { useUserContext } from '@/context/userContext';

function Sidebar() {
  const {logoutUser} = useUserContext();
  return (
    <div className='w-[20rem] mt-[5rem] h-[calc(100%-5rem)] fixed right-0 top-0 flex flex-col bg-[#F6F5EF]'>
      <Profile />

      <div className='mt-4 mx-6'>
        <RadialChart />
      </div>

      <button className='mt-auto mb-6 mx-6 py-4 bg-[#A7492A] text-white rounded-[50px] shadow-lg hover:bg-[#8F3D1D] hover:text-white transition-all duration-200 ease-in-out' onClick={logoutUser}>Sign Out</button>
    </div>
  )
}

export default Sidebar
