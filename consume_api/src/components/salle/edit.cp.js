import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import SalleDataService from '../../services/salle.service'
import DepartementDataService from '../../services/departement.service'
const EditSalles = (props) => {
  let { id } = useParams()
  const [departements, setDepartements] = useState([])

  const departementsRef = useRef()
  departementsRef.current = departements
  const navigate = useNavigate()
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
    departement: '',
    etat: 1,
    iddep:''
  }

  const [currentSalle, setCurrentSalle] = useState(initialSalleState)
  const [message, setMessage] = useState('')

  const getSalle = (id) => {
    SalleDataService.get(id)
      .then((response) => {
        setCurrentSalle(response.data)
        console.log(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    getSalle(id)
  }, [id])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setCurrentSalle({ ...currentSalle, [name]: value })
  }

  const updatePublished = (status) => {
    var data = {
      id: currentSalle.id,
      num: currentSalle.num,
      departement: currentSalle.departement,
      etat: status,
    }
    SalleDataService.update(currentSalle.id, data)
      .then((response) => {
        setCurrentSalle({ ...currentSalle, etat: status })
        console.log(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  const updateSalle = () => {
    SalleDataService.update(currentSalle.id, currentSalle)
      .then((response) => {
        console.log(response.data)
       navigate('/salles')
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <div class='row'>
      <div class='col-xl-6 col-lg-12'>
        <div class='card'>
          <div class='card-header'>
            <h4 class='card-title'>Edit salle</h4>
          </div>
          <div class='card-body'>
            <div class='basic-form'>
              <div class='row'>
                <div class='mb-3 col-md-6'>
                  <label className='form-label' htmlFor='date' id='date'>
                    numéro
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='num'
                    required
                    value={currentSalle.num}
                    onChange={handleInputChange}
                    name='num'
                    aria-describedby='num'
                  />
                </div>
              </div>
              <div class='row'>
                <div class='mb-3 col-md-4'>
                  <select
                    className='form-control'
                    name='iddep'
                    value={departements.id}
                    onChange={handleInputChange}
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
                onClick={updateSalle}
                type='submit'
                class='btn btn-primary'
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class='col-xl-6 col-lg-12'>
        <div class='card'>
          <img
            src='assets/images/1.jpg'
            alt=''
            height='100%'
            width='100%'
          />
        </div>
      </div>
    </div>
  )
}
export default EditSalles
