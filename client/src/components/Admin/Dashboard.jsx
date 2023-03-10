import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { BiHomeAlt, BiUser } from "react-icons/bi";
import { MdOutlineSchool } from "react-icons/md";
import { FaSchool } from "react-icons/fa";
import { RiHistoryLine } from "react-icons/ri";
import { IoStopwatchOutline } from "react-icons/io5";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  const menus = [
    { name: "Home", link: "", icon: BiHomeAlt },
    { name: "Organism", link: "organism", icon: FaSchool },
    { name: "Employés", link: "employes", icon: BiUser },
    { name: "Formation", link: "formation", icon: MdOutlineSchool },
    { name: "Assign", link: "assigner", icon: IoStopwatchOutline },
    { name: "Historique", link: "historique", icon: RiHistoryLine },
  ];
  return (
    <div className="flex w-screen">
      <Sidebar menus={menus} />
      <div className="relative w-full h-screen px-3 overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between py-4 bg-white dark:bg-gray-800 ">
          <div className="ml-4">
            <div className="mb-6">
              <h1 className="font-bold text-3xl">Bonjour Admin</h1>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
