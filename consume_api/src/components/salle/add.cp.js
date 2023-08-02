import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SalleDataService from '../../services/salle.service'
import DepartementDataService from '../../services/departement.service'
const AddSalle = () => {
   const { user: currentUser } = useSelector((state) => state.auth)

   const navigate = useNavigate()
   const [departements, setDepartements] = useState([])
   const [selectedDepartement, setSelectedDepartement] = useState(null)
   const departementsRef = useRef()
   departementsRef.current = departements
   useEffect(() => {
     retrieveDepartements()
   }, [])
   const retrieveDepartements = () => {
     DepartementDataService.getAll()
       .then((response) => {
         setDepartements(response.data)
       })
       .catch((e) => {
         console.log(e)
       })
   }

   const refreshList = () => {
     retrieveDepartements()
   }
   const initialSalleState = {
     id: null,
     num: '',
     etat: 1,
     iddep: '',
   }

   const [salle, setSalle] = useState(initialSalleState)
   const [submitted, setSubmitted] = useState(false)

   const handleInputChange = (event) => {
     const { name, value } = event.target
     setSalle({ ...salle, [name]: value })
   }

   const saveSalle = () => {
     var data = {
       num: salle.num,
       etat: salle.etat,
       iddep: selectedDepartement,
     }
     SalleDataService.create(data)
       .then((response) => {
         setSalle({
           id: response.data.id,
           num: response.data.num,
           etat: response.data.etat,
           iddep: response.data.iddep,
         })
         setSubmitted(true)
         navigate('/salles')
       })
       .catch((e) => {
         console.log(e)
       })
   }

   const newSalle = () => {
     setSalle(initialSalleState)
     setSubmitted(false)
   }

  return (
    <>
      <div class='row'>
        <div class='col-xl-6 col-lg-12'>
          <div class='card'>
            <div class='card-header'>
              <h4 class='card-title'>Add salle</h4>
            </div>
            <div class='card-body'>
              <div class='basic-form'>
                <div class='row'>
                  <div class='mb-3 col-md-6'>
                    <label class='form-label'>Salle Numéro</label>
                    <input
                      id='num'
                      value={salle.num}
                      onChange={handleInputChange}
                      name='num'
                      type='text'
                      class='form-control'
                      placeholder='Numéro de salle '
                    />
                  </div>
                </div>
                <div class='row'>
                  <div class='mb-3 col-md-4'>
                    <label class='form-label'>departement</label>
                    <select
                      className='form-control'
                      name='iddep'
                      value={selectedDepartement}
                      onChange={(e) => setSelectedDepartement(e.target.value)}
                    >
                      <option value={null}>-- Select a departement --</option>
                      {departements.map((row, i) => {
                        return <option value={row.id}>{row.nom}</option>
                      })}
                    </select>
                  </div>
                </div>
                <div class='mb-1'></div>
                <button
                  onClick={saveSalle}
                  type='submit'
                  class='btn btn-primary'
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class='col-xl-6 col-lg-12'>
          <div class='card'>
            <img
              src='assets/salle hybride.jpg'
              alt=''
              height='100%'
              width='100%'
            />
          </div>
        </div>
      </div>
    </>
  )
}
export default AddSalle
