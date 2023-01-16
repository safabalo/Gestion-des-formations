import axios from 'axios'
import React from 'react'
import { useState , useEffect } from 'react'
import { useNavigate } from 'react-router'

export default function AddFormation() {
    const URL='http://localhost:2000/admin/'
    const [data, setData] = useState({
        name: '',
        organism: '',
        image: ''
    })
    const navigate = useNavigate()
    const [options, setOptions] = useState([])
    useEffect(() => {
        axios.get(URL+'organism')
        .then(res => {
            setOptions(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    const onChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }
    const OnChangeFile = (e) => {
        setData({...data, [e.target.name]: e.target.files[0]})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('organism', data.organism)
        formData.append('image', data.image)
        console.log(data.name, data.organism, data.image)
        
        axios.post(URL+'formation', formData)
        .then(res => {
            console.log(res.data)
            navigate('/dashboard/formation')
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
          <label htmlFor="name" className="mb-2">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Name</span>
          </label>
          <input
            type="text"
            value={data.name}
            onChange={onChange}
            name="name"
            id="name"
            placeholder="Inserer le prenom"
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
      <div className="flex items-center justify-end p-6 rounded-b">
        <button
          className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
          type="button"
          onClick={() => navigate('/dashboard/employes')}
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
