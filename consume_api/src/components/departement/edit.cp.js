import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DepartementDataService from '../../services/departement.service'
const EditDepartements = (props) => {
  let { id } = useParams()
  const initialDepartementState = {
    id: null,
    matricule: '',
    nom: '',
    etat: 1,
  }
const navigate = useNavigate()
  const [currentDepartement, setCurrentDepartement] = useState(
    initialDepartementState
  )
  const [message, setMessage] = useState('')

  const getDepartement = (id) => {
    DepartementDataService.get(id)
      .then((response) => {
        setCurrentDepartement(response.data)
        console.log(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    getDepartement(id)
  }, [id])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setCurrentDepartement({ ...currentDepartement, [name]: value })
  }

  const updatePublished = (status) => {
    var data = {
      id: currentDepartement.id,
      matricule: currentDepartement.matricule,
      nom: currentDepartement.nom,

      etat: status,
    }
    DepartementDataService.update(currentDepartement.id, data)
      .then((response) => {
        setCurrentDepartement({ ...currentDepartement, etat: status })
        console.log(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  const updateDepartement = () => {
    DepartementDataService.update(currentDepartement.id, currentDepartement)
      .then((response) => {
        console.log(response.data)
        navigate('/departements')
        
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
          {currentDepartement ? (
            <div class='card-body'>
              <div class='basic-form'>
                <div class='row'>
                  <div class='mb-3 col-md-6'>
                    <label
                      className='form-label'
                      htmlFor='departement'
                      id='departement'
                    >
                      Matricule
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='matricule'
                      required
                      onChange={handleInputChange}
                      name='matricule'
                      aria-describedby='matricule'
                      value={currentDepartement.matricule}
                    />
                  </div>
                </div>
                <div class='row'>
                  <div class='mb-3 col-md-4'>
                    <label className='form-label' htmlFor='date' id='date'>
                      Nom
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='nom'
                      required
                      value={currentDepartement.nom}
                      onChange={handleInputChange}
                      name='nom'
                      aria-describedby='nom'
                    />
                  </div>
                </div>
                <div class='mb-1'></div>
                <button
                  type='submit'
                  className='btn btn-success w-sm'
                  onClick={updateDepartement}
                >
                  Update
                </button>
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Tutorial...</p>
            </div>
          )}
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
  )
}
export default EditDepartements
