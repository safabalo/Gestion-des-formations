import React from 'react'
import axios from 'axios'
import { AiOutlineEdit } from 'react-icons/ai'
import { useState } from 'react'
import { useEffect } from 'react'
import moment from 'moment'
// import {format} from 'date-fns'


export default function Historique() {
  let [historiques, setHistorique] = useState([])
  let [date, setDate] = useState('')

  const URL = 'http://localhost:2000/admin/'
   const getHistorique = ()=>{ axios.get(URL+'historique')
    .then((res)=>{
        console.log(res.data)
        setHistorique(historiques = res.data)
    })
    .catch((err)=>{
        console.log(err.msg)
    })
  }
  useEffect(()=>{
    try{
      getHistorique()
    }catch(err){
      console.log(err)
    }
  },[])

  return (
    <div>
              <div className='flex justify-end mb-10'>
            <button  className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                Action
            </button>
            {/* <!-- Dropdown menu --> */}
        </div>

    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="p-4">
                    <div className="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    Formateur
                </th>
                <th scope="col" className="px-6 py-3">
                    Formation
                </th>
                <th scope="col" className="px-6 py-3">
                    Début
                </th>
                <th scope="col" className="px-6 py-3">
                    Fin
                </th>
            </tr>
        </thead>
        {historiques.map((h, i)=>(
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                    <div className="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    {/* <img className="w-10 h-10 rounded-full" src={`http://localhost:2000/images/${formation.image}`} alt={formation.image} /> */}
                    <div className="pl-3">
                        <div className="text-base font-semibold">{h.user.username}</div>
                    </div>  
                </th>
                <td className="px-6 py-4">
                    {h.formation.name}
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center">
                        {moment(h.debut).format("YYYY-MM-DD")}
                    </div>
                </td>
                <td className="px-6 py-4">
                    {moment(h.fin,).format("YYYY-MM-DD")}
                </td>
            </tr>

        </tbody>
        ))}
    </table>

    </div>
  )
}
