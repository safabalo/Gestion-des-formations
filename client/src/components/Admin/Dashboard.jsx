import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { BiHomeAlt, BiUserCircle, BiUser } from "react-icons/bi";
import { MdOutlineNoMeals, MdOutlineCategory, MdOutlineDeliveryDining, MdOutlinePayment, MdOutlineSchool} from "react-icons/md";
import {TfiStatsUp} from "react-icons/tfi";
import {FaSchool} from "react-icons/fa";
import {RiHistoryLine} from "react-icons/ri";
import Cards from '../Cards/Cards';
import Formation from './Formation';
import Organism from './Organism';


export default function Dashboard() {
    const menus = [
        { name: "Home", link: "/", icon: BiHomeAlt },
        { name: "Organism", link: "/Users", icon: FaSchool },
        { name: "Employés", link: "/Produit", icon: BiUser },
        { name: "Formation", link: "/Category", icon: MdOutlineSchool },
        { name: "Historique", link: "/Command", icon: RiHistoryLine },

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
                    {/* <div className='flex gap-7 items-center justify-center'>
                        <Cards />
                        <Cards />
                        <Cards />
                    </div> */}
                    
                </div>
                
            </div>
            {/* <Table/> */}
            <Organism />
        </div>
    </div>
  )
}
