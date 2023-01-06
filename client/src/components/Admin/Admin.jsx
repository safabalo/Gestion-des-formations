import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { BiHomeAlt, BiUserCircle } from "react-icons/bi";
import { MdOutlineNoMeals, MdOutlineCategory, MdOutlineDeliveryDining, MdOutlinePayment} from "react-icons/md";
import {TfiStatsUp} from "react-icons/tfi";

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
                <div className="ml-2">
                    <h1>Livreur / Client</h1>
                </div>
            </div>
        </div>
    </div>
  )
}
