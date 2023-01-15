import axios from 'axios'
import React from 'react'
import { useState , useEffect } from 'react'
import { useNavigate } from 'react-router'

export default function AddOrganism() {
    const URL='http://localhost:2000/admin/'
    const [data, setData] = useState({
        username: '',
        adress: '',
        phone: ''
    })
    const navigate = useNavigate()
    const onChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(data.name, data.adress, data.phone)
        
        axios.post(URL+'organism', data)
        .then(res => {
            console.log(res.data)
            navigate('/dashboard/organism')
        })
        .catch(err => {
            console.log(err.msg)
        })
        
    }
  return (
    <div>
        <form className="my-4 text-lg leading-relaxed text-slate-500" 
    onSubmit={handleSubmit}
    >
      <div className="flex flex-col">
        <div>
          <label htmlFor="username" className="mb-2">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Name</span>
          </label>
          <input
            type="text"
            value={data.name}
            onChange={onChange}
            name="name"
            id="username"
            placeholder="Inserer le prenom"
            className="block w-full py-2 pr-3 mb-5 bg-white border rounded-md shadow-sm border-slate-300 pl-9 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm hover:border-2 hover:border-cyan-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Adresse</span>
          </label>
          <input
            type="text"
            value={data.adress}
            onChange={onChange}
            name="adress"
            placeholder="Inserez l'adresse"
            className="block w-full py-2 pr-3 mb-5 bg-white border rounded-md shadow-sm border-slate-300 pl-9 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm hover:border-2 hover:border-cyan-500" />
        </div>
        <div>
          <label htmlFor="email" className="mb-2">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Phone</span>
          </label>
          <input
            type="text"
            value={data.phone}
            onChange={onChange}
            name="phone"
            id="phone"
            placeholder="Inserer le téléphone"
            className="block w-full py-2 pr-3 mb-5 bg-white border rounded-md shadow-sm border-slate-300 pl-9 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm hover:border-2 hover:border-cyan-500"
          />
        </div>
      </div>
      <div className="flex items-center justify-end p-6 rounded-b">
        <button
          className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
          type="button"
          onClick={() => navigate('/dashboard/organism')}
        >
          Close
        </button>
        <button
          className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-blue-600 active:bg-blue-700 hover:shadow-lg focus:outline-none"
          type="submit"
        //   onClick={handleSubmit}
        // onClick={() => setShowModal(false)}
        >
          Save Changes
        </button>
      </div>
    </form>
    </div>
  )
}
