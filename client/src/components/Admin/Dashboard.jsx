import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { BiHomeAlt, BiUserCircle, BiUser } from "react-icons/bi";
import { MdOutlineNoMeals, MdOutlineCategory, MdOutlineDeliveryDining, MdOutlinePayment, MdOutlineSchool} from "react-icons/md";
import {TfiStatsUp} from "react-icons/tfi";
import {FaSchool} from "react-icons/fa";
import {RiHistoryLine} from "react-icons/ri";
import Formation from './Formation';
import Organism from './Organism';
import { Outlet } from 'react-router-dom';


export default function Dashboard() {
    const menus = [
        { name: "Home", link: "", icon: BiHomeAlt },
        { name: "Organism", link: "organism", icon: FaSchool },
        { name: "Employés", link: "employes", icon: BiUser },
        { name: "Formation", link: "formation", icon: MdOutlineSchool },
        { name: "Historique", link: "historique", icon: RiHistoryLine },

    ]
  return (
    <div className="flex w-screen">
        <Sidebar menus={menus}/>
        <div className="relative w-full h-screen px-3 overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex items-center justify-between py-4 bg-white dark:bg-gray-800 ">
                <div className="ml-4">
                    <div className='mb-6'>
                        <h1 className='font-bold text-3xl'>Bonjour Admin</h1>
                    </div>
                    
                </div>
                
            </div>
            <Outlet />
        </div>
    </div>
  )
}
