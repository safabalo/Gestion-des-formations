import React from 'react'
import Cards from '../Cards/Cards';
import { useState } from 'react'
import axios from 'axios';
export default function Statistiques() {
  const URL = 'http://localhost:2000/admin/'
  let [organism, setOrgansim] = useState('')
  const [nameOrg, setNameOrg] = useState('organismes')
  let [formation, setFormation] = useState('')
  const [nameForm, setNameForm] = useState('formations')
  let [employe, setEmploye] = useState('')
  const [nameEmp, setNameEmp] = useState('employes')
  axios.get(URL+'statistiques')
    .then(res => {
      setOrgansim(res.data.organismes)
      setFormation(res.data.formations)
      setEmploye(res.data.employes)
    })
    .catch(err => {
      console.log(err.msg)
    })
  return (
    <div className='flex gap-7 items-center justify-center'>
      <Cards data={organism} name={nameOrg}/>
      <Cards data={formation} name={nameForm}/>
      <Cards data={employe} name={nameEmp}/>
    </div>
  )
}
