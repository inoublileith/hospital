import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PatientDataService from '../../services/patient.service'
const AddPatient = () => {
  const { user: currentUser } = useSelector((state) => state.auth)

  const navigate = useNavigate()
  const initialPatientState = {
    id: null,
    nom: '',
    prenom: '',
    numero: '',
    matricule: '',
    etat: 1,
  }
  const [patient, setPatient] = useState(initialPatientState)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setPatient({ ...patient, [name]: value })
  }

  const savePatient = () => {
    var data = {
      nom: patient.nom,
      prenom: patient.prenom,
      numero: patient.numero,
      matricule: patient.matricule,
      etat: patient.etat,
    }
    PatientDataService.create(data)
      .then((response) => {
        setPatient({
          id: response.data.id,
          nom: response.data.nom,
          prenom: response.data.prenom,
          numero: response.data.numero,
          matricule: response.data.matricule,
          etat: response.data.etat,
        })
        setSubmitted(true)
        navigate('/patients')
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const newPatient = () => {
    setPatient(initialPatientState)
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
                    <label className='form-label' for='project-title-input'>
                      Nom
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='nom'
                      required
                      // value={this.state.titre}
                      value={patient.nom}
                      // onChange={this.onChangeTitre}
                      onChange={handleInputChange}
                      name='nom'
                      aria-describedby='nom'
                      placeholder='Enter  nom'
                    />
                  </div>
                </div>
                <div class='row'>
                  <div class='mb-3 col-md-6'>
                    <label className='form-label' for='project-title-input'>
                      Prenom
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='prenom'
                      required
                      onChange={handleInputChange}
                      name='prenom'
                      aria-describedby='prenom'
                      value={patient.prenom}
                      placeholder='Enter prenom'
                    />
                  </div>
                </div>
                <div class='row'>
                  <div class='mb-3 col-md-6'>
                    <label className='form-label' for='project-title-input'>
                      Numéro
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='numero'
                      required
                      onChange={handleInputChange}
                      name='numero'
                      aria-describedby='numero'
                      value={patient.numero}
                      placeholder='Enter numero'
                    />
                  </div>
                </div>
                <div class='row'>
                  <div class='mb-3 col-md-4'>
                    <label className='form-label' for='project-title-input'>
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
                      value={patient.matricule}
                      placeholder='Enter matricule'
                    />
                  </div>
                </div>
                <div class='mb-1'></div>
                <button
                  type='submit'
                  onClick={savePatient}
                  className='btn btn-success w-sm'
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
export default AddPatient
