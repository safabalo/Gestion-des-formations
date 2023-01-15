import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
// import Modal from '../Modal/Modal'

export default function Employes() {
  const URL = 'http://localhost:2000/admin/'
  const [editData, setEditData] = useState({
    username: '',
    email: '',
    organism: '',
  })

  let [users, setUsers]= useState([]);
  useEffect(() => {
    axios.get(URL+'employe')
    .then((res)=>{
        setUsers(users = res.data.filterEmployer)
    })
    .catch((err)=>{
        console.log(err.msg)
    })
  },[])
  let [data, setData] = useState({
    username: '',
    email: '',
    organism: '',
  })
  let [options, setOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const onChange = (e) => {
    const value = e.target.value;
    setData({ ...data, [e.target.name]: value })
    
  }
  const OnChangeFile = (e) =>{
    const value = e.target.files[0];
    setData({ ...data, [e.target.name]: value })
  }
  const onChangeEdit = (e) => {
    const value = e.target.value;
    setEditData({ ...editData, [e.target.name]: value })
  }
  const OnChangeFileEdit = (e) =>{ 
    const value = e.target.files[0];
    setEditData({ ...editData, [e.target.name]: value })
  }

  axios.get(URL+'organism')
  .then((res)=>{
      setOptions(options = res.data)
  })
  .catch((err)=>{
      console.log(err.msg)
  })

  const addUser = (e)=>{
    e.preventDefault();
    const input = new FormData();
      input.append('username', data.username);
      input.append('email', data.email);
      input.append('image', data.image);
      input.append('organism', data.organism);
    axios.post(URL+'employe', input)
    .then((res)=>{
      console.log(res.data)
      console.log(data)
      setIsOpen(false)
      setTimeout(() => { window.location.reload(false) }, "1000")
    })
    .catch((err)=>{
      console.log(err.msg)
    })
  }
  const updateUser = (e)=>{
    e.preventDefault();
    const input = new FormData();
      input.append('username', editData.username);
      input.append('email', editData.email);
      input.append('image', editData.image);
      input.append('organism', editData.organism)
    axios.put(URL+'update/'+editData._id, input)
    .then((res)=>{
      setShowModal(false)
      setTimeout(() => { window.location.reload(false) }, "1000")
    })
    .catch((err)=>{
      console.log(err.msg)
    })
    
  }

  return (
    <div>
    <div className='flex justify-end mb-10'>
    <button onClick={()=>{setIsOpen(true); console.log(isOpen)}} className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
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
              <button className='btn bg-blue-600 text-white px-2 py-1' onClick={()=>{setEditData(user);setShowModal(true);console.log(user, showModal)}}>
                edit
              </button>
            </td>
        </tr>

    </tbody>
    ))}
</table>
    {isOpen ? (
        <div>
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-3xl mx-auto my-6">
            {/*content*/}
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200 ">
                <h3 className="text-3xl font-semibold">Ajouter un nouveau Livreur</h3>
                <button
                  className="float-right p-1 ml-8 text-3xl font-semibold leading-none text-gray-300 bg-transparent border-0 outline-none opacity-1 focus:outline-none"
                  onClick={setIsOpen(false)}
                >
                  <span className="block w-6 h-6 text-2xl text-gray-300 outline-none focus:outline-none">x</span>
                </button>
              </div>
              {/*body*/}
              <div className="relative flex-auto p-6">
                <form className="my-4 text-lg leading-relaxed text-slate-500" 
                onSubmit={addUser}
                >
                  <div className="flex flex-col">
                    <div>
                      <label htmlFor="username" className="mb-2">
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Username</span>
                      </label>
                      <input
                        type="text"
                        value={data.username}
                        onChange={onChange}
                        name="username"
                        id="username"
                        placeholder="Inserer le prenom"
                        className="block w-full py-2 pr-3 mb-5 bg-white border rounded-md shadow-sm border-slate-300 pl-9 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm hover:border-2 hover:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-2">
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Email</span>
                      </label>
                      <input
                        type="email"
                        value={data.email}
                        onChange={onChange}
                        name="email"
                        id="email"
                        placeholder="Inserer l'email"
                        className="block w-full py-2 pr-3 mb-5 bg-white border rounded-md shadow-sm border-slate-300 pl-9 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm hover:border-2 hover:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2">
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Image</span>
                      </label>
                      <input
                        type="file"
                        // value={email}
                        onChange={OnChangeFile}
                        name="image"
                        id="image"
                        accept=".png, .jpg, .jpeg"
                        placeholder="Inserer l'image"
                        className="block w-full py-2 pr-3 mb-5 bg-white border rounded-md shadow-sm border-slate-300 pl-9 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm hover:border-2 hover:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2">
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Organism</span>
                      </label>
                      <select
                        className="block w-full py-2 pr-3 mb-5 bg-white border rounded-md shadow-sm border-slate-300 pl-9 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm hover:border-2 hover:border-cyan-500"
                        name="organism"
                        value={data.organism}
                        onChange={onChange}
                      >
                        {options.map((option,i) =>(
                          <option key={option._id} value={option.name}>{option.name}</option>
                        ))
                        }
                        
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                    <button
                      className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                      type="button"
                      onClick={setIsOpen(false)}
                    >
                      Close
                    </button>
                    <button
                      className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-amber-500 active:bg-amber-600 hover:shadow-lg focus:outline-none"
                      type="submit"
                    // onClick={() => setShowModal(false)}
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
              {/*footer*/}
            </div>
          </div>
        </div>
        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
      </div>
      ):null }
       {
        showModal ? (
                    <div>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
              <div className="relative w-auto max-w-3xl mx-auto my-6">
                {/*content*/}
                <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200 ">
                    <h3 className="text-3xl font-semibold">Ajouter un nouveau Livreur</h3>
                    <button
                      className="float-right p-1 ml-8 text-3xl font-semibold leading-none text-gray-300 bg-transparent border-0 outline-none opacity-1 focus:outline-none"
                      onClick={setShowModal(false)}
                    >
                      <span className="block w-6 h-6 text-2xl text-gray-300 outline-none focus:outline-none">x</span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative flex-auto p-6">
                    <form className="my-4 text-lg leading-relaxed text-slate-500" 
                    onSubmit={updateUser}
                    >
                      <div className="flex flex-col">
                        <div>
                          <label htmlFor="username" className="mb-2">
                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Username</span>
                          </label>
                          <input
                            type="text"
                            value={editData.username}
                            onChange={onChangeEdit}
                            name="username"
                            id="username"
                            placeholder="Inserer le prenom"
                            className="block w-full py-2 pr-3 mb-5 bg-white border rounded-md shadow-sm border-slate-300 pl-9 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm hover:border-2 hover:border-cyan-500"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="mb-2">
                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Email</span>
                          </label>
                          <input
                            type="email"
                            value={editData.email}
                            onChange={onChangeEdit}
                            name="email"
                            id="email"
                            placeholder="Inserer l'email"
                            className="block w-full py-2 pr-3 mb-5 bg-white border rounded-md shadow-sm border-slate-300 pl-9 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm hover:border-2 hover:border-cyan-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="mb-2">
                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Image</span>
                          </label>
                          <input
                            type="file"
                            // value={email}
                            onChange={OnChangeFileEdit}
                            name="image"
                            id="image"
                            accept=".png, .jpg, .jpeg"
                            placeholder="Inserer l'image"
                            className="block w-full py-2 pr-3 mb-5 bg-white border rounded-md shadow-sm border-slate-300 pl-9 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm hover:border-2 hover:border-cyan-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="mb-2">
                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Organism</span>
                          </label>
                          <select
                            className="block w-full py-2 pr-3 mb-5 bg-white border rounded-md shadow-sm border-slate-300 pl-9 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm hover:border-2 hover:border-cyan-500"
                            name="organism"
                            value={editData.organism}
                            onChange={onChangeEdit}
                          >
                            {options.map((option,i) =>(
                              <option key={option._id} value={option.name}>{option.name}</option>
                            ))
                            }
                            
                          </select>
                        </div>
                      </div>
                      <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                        <button
                          className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                          type="button"
                          onClick={setShowModal(false)}
                        >
                          Close
                        </button>
                        <button
                          className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-amber-500 active:bg-amber-600 hover:shadow-lg focus:outline-none"
                          type="submit"
                        // onClick={() => setShowModal(false)}
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                  {/*footer*/}
                </div>
              </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
          </div>
        ): null
       }
    
    </div>
    )
}
