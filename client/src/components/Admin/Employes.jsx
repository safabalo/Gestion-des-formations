import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Modal from '../Modal/Modal'

export default function Employes() {
  const URL = 'http://localhost:2000/admin/'
  const [id, setId] = useState([])
  const [key, setKey] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('');
  let [users, setUsers]= useState([]);
    axios.get(URL+'employe')
    .then((res)=>{
        setUsers(users = res.data.filterEmployer)
    })
    .catch((err)=>{
        console.log(err.msg)
    })
    // const handleMode = (mode)=>{
    //   setMode(mode)
    //   toggleModal();
    // }
  return (
    <>
    <div className='flex justify-end mb-10'>
    <button onClick={()=>{setMode('add');setIsOpen(true)}} className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
        Add
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
                Name
            </th>
            <th scope="col" className="px-6 py-3">
                Position
            </th>
            <th scope="col" className="px-6 py-3">
                Status
            </th>
            <th scope="col" className="px-6 py-3">
                Action
            </th>
        </tr>
    </thead>
    {users.map((user, i)=>(
    <tbody>
        <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="w-4 p-4">
                <div className="flex items-center">
                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div>
            </td>
            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <img className="w-10 h-10 rounded-full" src={`http://localhost:2000/images/${user.image}`} alt={user.image} />
                <div className="pl-3">
                    <div className="text-base font-semibold">{user.username}</div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{user.email}</div>
                </div>  
            </th>
            <td className="px-6 py-4">
            {user.organism}
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div> Active
                </div>
            </td>
            <td className="px-6 py-4">
                {user.role}
            </td>
            <td className="px-6 py-4">
              <button className='btn bg-blue-600 text-white px-2 py-1' onClick={()=>{setMode('update'); setIsOpen(true); setId(user); setKey(user._id)}}>
                edit
              </button>
            </td>
        </tr>

    </tbody>
    ))}
</table>
    {
      isOpen && (
        <Modal mode={mode} user={id} key={key} onClose={()=>setIsOpen(false)}/>
      )
    }
    
    
</>
  )
}
