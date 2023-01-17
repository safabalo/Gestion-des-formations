import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { AiOutlineEdit } from "react-icons/ai";

export default function Formation() {
  const URL = "http://localhost:2000/admin/";
  const [showModal, setShowModal] = useState(false);
  const [options, setOptions] = useState([]);
  const [data, setData] = useState({
    name: "",
    organism: "",
    image: "",
  });
  let [formations, setFormation] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:2000/admin/formations`)
      .then((res) => {
        console.log(res.data);
        setFormation((formations = res.data));
      })
      .catch((err) => {
        console.log(err.msg);
      });
  }, []);
  useEffect(() => {
    axios
      .get(URL + "organism")
      .then((res) => {
        setOptions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const navigate = useNavigate();
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const OnChangeFile = (e) => {
    setData({ ...data, image: e.target.files[0] });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const input = new FormData();
    input.append("name", data.name);
    input.append("organism", data.organism);
    input.append("image", data.image);
    axios
      .put(URL + `formation/${data._id}`, input)
      .then((res) => {
        console.log(res.data);
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err.msg);
      });
  };

  return (
    <>
      <div className="flex justify-end mb-10">
        <button
          onClick={() => {
            navigate("/dashboard/addFormation");
          }}
          className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          type="button"
        >
          Add
        </button>
        {/* <!-- Dropdown menu --> */}
      </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Name & Organism
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        {formations.map((formation, i) => (
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-table-search-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <img className="w-10 h-10 rounded-full" src={`http://localhost:2000/images/${formation.image}`} alt={formation.image} />
                <div className="pl-3">
                  <div className="text-base font-semibold">{formation.name}</div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{formation.organism.name}</div>
                </div>
              </th>
              <td className="px-6 py-4">{formation.status.name}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => {
                    setShowModal(true);
                    setData(formation);
                  }}
                  className="bg-blue-600 rounded text-white px-4 flex justify-center gap-2 py-1"
                >
                  <AiOutlineEdit />
                  <span>edite</span>
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      {/* <!-- Edit user modal --> */}
      {showModal && (
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
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    <span className="block w-6 h-6 text-2xl text-gray-300 outline-none focus:outline-none">x</span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6">
                  <form className="my-4 text-lg leading-relaxed text-slate-500" onSubmit={handleSubmit}>
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
                          {options.map((option, i) => (
                            <option key={option._id} value={option.name}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center justify-end p-6 rounded-b">
                      <button
                        className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                        type="button"
                        onClick={() => {
                          setShowModal(false);
                        }}
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
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </div>
      )}
    </>
  );
}
