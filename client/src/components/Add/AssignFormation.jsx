import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { useEffect } from 'react'


export default function Assigner() {
  const URL = "http://localhost:2000/admin/";
  const [data, setData] = useState({
    formation: "",
    user: "",
    debut: "",
    fin: "",
  });
  let [options, setOptions] = useState([]);
  let [employer, setEmployer] = useState([]);
  const navigate = useNavigate();
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const getEmploye = () => {
    axios
      .get(URL + "employe")
      .then((res) => {
        console.log(res.data);
        setEmployer((employer = res.data.filterEmployer));
      })
      .catch((err) => {
        console.log(err.msg);
      });
  };
  const getFormation = () => {
    axios
      .get(URL + "filtred-formation")
      .then((res) => {
        console.log(res.data);
        setOptions((options = res.data.formations));
      })
      .catch((err) => {
        console.log(err.msg);
      });
  };
  useEffect(() => {
    try {
      getEmploye();
      getFormation();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(URL + "historique", data).then((res) => {
      console.log(res.data);
      navigate("/dashboard/assigner");
    });

  };
  return (
    <div>
      <form className="my-4 text-lg leading-relaxed text-slate-500" onSubmit={handleSubmit}>
        <div className="flex flex-col">
        <div>
            <label htmlFor="email" className="mb-2">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Formateur</span>
            </label>
            <select
              className="block w-full py-2 pr-3 mb-5 bg-white border rounded-md shadow-sm border-slate-300 pl-9 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm hover:border-2 hover:border-cyan-500"
              name="user"
              value={data.employer}
              onChange={onChange}
            >
              {employer.map((em, i) => (
                <option key={em._id} value={em.username}>
                  {em.username}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="email" className="mb-2">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Formation</span>
            </label>
            <select
              className="block w-full py-2 pr-3 mb-5 bg-white border rounded-md shadow-sm border-slate-300 pl-9 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm hover:border-2 hover:border-cyan-500"
              name="formation"
              value={data.formation}
              onChange={onChange}
            >
              {options.map((option, i) => (
                <option key={option._id} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="name" className="mb-2">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Début</span>
            </label>
            <input
              type="date"
              value={data.debut}
              onChange={onChange}
              name="debut"
              id="name"
              placeholder="Inserer le prenom"
              className="block w-full py-2 pr-3 mb-5 bg-white border rounded-md shadow-sm border-slate-300 pl-9 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm hover:border-2 hover:border-cyan-500"
            />
          </div>
          <div>
            <label htmlFor="name" className="mb-2">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Fin</span>
            </label>
            <input
              type="date"
              value={data.fin}
              onChange={onChange}
              name="fin"
              id="name"
              placeholder="Inserer le prenom"
              className="block w-full py-2 pr-3 mb-5 bg-white border rounded-md shadow-sm border-slate-300 pl-9 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm hover:border-2 hover:border-cyan-500"
            />
          </div>
        </div>
        <div className="flex items-center justify-end p-6 rounded-b">
          <button
            className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
            type="button"
            onClick={() => {
              navigate('/dashboard/assigner')
            }}
          >
            Close
          </button>
          <button
            className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-blue-600 active:bg-blue-700 hover:shadow-lg focus:outline-none"
            type="submit"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
