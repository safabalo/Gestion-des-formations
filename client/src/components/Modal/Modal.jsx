import axios from 'axios';
import React, { useState } from 'react';
// import { useEffect } from 'react';

function Modal({ mode, onClose, data, setData, id }) {
  
  let [options, setOptions] = useState([]);
  const URL = "http://localhost:2000/admin/"
  const onChange = (e) => {
    const value = e.target.value;
    setData({ ...data, [e.target.name]: value })
  }
  const OnChangeFile = (e) =>{
    const value = e.target.files[0];
    setData({ ...data, [e.target.name]: value })
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
    console.log(data)
    const input = new FormData();
      input.append('username', data.username);
      input.append('email', data.email);
      input.append('image', data.image);
      input.append('organism', data.organism);
    axios.post(URL+'employe', input)
    .then((res)=>{
      console.log(res.data)
      console.log(data)
    })
    .catch((err)=>{
      console.log(err.msg)
    })
  }
  const updateUser = (e)=>{
    e.preventDefault();
    const input = new FormData();
      input.append('username', data.username);
      input.append('email', data.email);
      input.append('image', data.image);
      input.append('organism', data.organism)
    axios.put(URL+'update/'+id, input)
    .then((res)=>{
      console.log(res.data)
      onClose()
    })
    
  }
  console.log(mode)
  const handleSubmit= (m)=>{
    m = mode
    if(m === 'add'){
      addUser();
    }else{
      updateUser();
    }
  }

  return (
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
                      onClick={onClose}
                    >
                      <span className="block w-6 h-6 text-2xl text-gray-300 outline-none focus:outline-none">x</span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative flex-auto p-6">
                    <form className="my-4 text-lg leading-relaxed text-slate-500" 
                    // onSubmit={handleSubmit}
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
                          onClick={onClose}
                        >
                          Close
                        </button>
                        <button
                          className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-amber-500 active:bg-amber-600 hover:shadow-lg focus:outline-none"
                          type="submit"
                          onClick={handleSubmit}
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
  )}

export default Modal;





