import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PatientDataService from '../../services/patient.service'
const EditPatients = (props) => {
  let { id } = useParams()
  const initialPatientState = {
    id: null,
    nom: '',
    prenom: '',
    numero: '',
    matricule: '',
    etat: 1,
  }
const navigate = useNavigate()
  const [currentPatient, setCurrentPatient] = useState(
    initialPatientState
  )
  const [message, setMessage] = useState('')

  const getPatient = (id) => {
    PatientDataService.get(id)
      .then((response) => {
        setCurrentPatient(response.data)
        console.log(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    getPatient(id)
  }, [id])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setCurrentPatient({ ...currentPatient, [name]: value })
  }

  const updatePublished = (status) => {
    var data = {
      id: currentPatient.id,
      nom: currentPatient.nom,
      prenom: currentPatient.prenom,
      numero: currentPatient.numero,
      nom: currentPatient.nom,

      etat: status,
    }
    PatientDataService.update(currentPatient.id, data)
      .then((response) => {
        setCurrentPatient({ ...currentPatient, etat: status })
        console.log(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  const updatePatient = () => {
    PatientDataService.update(currentPatient.id, currentPatient)
      .then((response) => {
        console.log(response.data)
        navigate('/patients')
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
                  <label className='form-label' htmlFor='nom' id='nom'>
                    Nom
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='nom'
                    required
                    onChange={handleInputChange}
                    name='nom'
                    aria-describedby='nom'
                    value={currentPatient.nom}
                  />
                </div>
              </div>
              <div class='row'>
                <div class='mb-3 col-md-6'>
                  <label className='form-label' htmlFor='prenom' id='prenom'>
                    Prénom
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='prenom'
                    required
                    value={currentPatient.prenom}
                    onChange={handleInputChange}
                    name='prenom'
                    aria-describedby='prenom'
                  />
                </div>
              </div>
              <div class='row'>
                <div class='mb-3 col-md-6'>
                  <label className='form-label' htmlFor='numero' id='numero'>
                    Numéro
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='numero'
                    required
                    value={currentPatient.numero}
                    onChange={handleInputChange}
                    name='numero'
                    aria-describedby='numero'
                  />
                </div>
              </div>
              <div class='row'>
                <div class='mb-3 col-md-4'>
                  <label
                    className='form-label'
                    htmlFor='matricule'
                    id='matricule'
                  >
                    Matricule
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='matricule'
                    required
                    value={currentPatient.matricule}
                    onChange={handleInputChange}
                    name='matricule'
                    aria-describedby='matricule'
                  />
                </div>
              </div>
              <div class='mb-1'></div>
              <button
                type='submit'
                className='btn btn-success w-sm'
                onClick={updatePatient}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class='col-xl-6 col-lg-12'>
        <div class='card'>
          <img src='assets/images/1.jpg' alt='' height='100%' width='100%' />
        </div>
      </div>
    </div>
  )
}
export default EditPatients
