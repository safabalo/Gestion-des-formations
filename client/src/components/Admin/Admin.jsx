import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { BiHomeAlt, BiUserCircle } from "react-icons/bi";
import { MdOutlineNoMeals, MdOutlineCategory, MdOutlineDeliveryDining, MdOutlinePayment} from "react-icons/md";
import {TfiStatsUp} from "react-icons/tfi";
import Cards from '../Cards/Cards';
import Table from './Table';


export default function Admin() {
    const menus = [
        { name: "Home", link: "/", icon: BiHomeAlt },
        { name: "Organism", link: "/Users", icon: BiUserCircle },
        { name: "Employés", link: "/Produit", icon: MdOutlineNoMeals },
        { name: "Formation", link: "/Category", icon: MdOutlineCategory },
        { name: "Command", link: "/Command", icon: MdOutlineDeliveryDining },
        { name: "Payement", link: "/Payement", icon: MdOutlinePayment },
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
            <Table/>
        </div>
    </div>
  )
}
