import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import DepartementDataService from '../../services/departement.service'
const AddDepartement = () => {
  const { user: currentUser } = useSelector((state) => state.auth)

  const navigate = useNavigate()
  const initialDepartementState = {
    id: null,
    matricule: '',
    nom: '',
    etat: 1,
  }
  const [departement, setDepartement] = useState(initialDepartementState)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setDepartement({ ...departement, [name]: value })
  }

  const saveDepartement = () => {
    var data = {
      matricule: departement.matricule,
      nom: departement.nom,
      etat: departement.etat,
    }
    DepartementDataService.create(data)
      .then((response) => {
        setDepartement({
          id: response.data.id,
          matricule: response.data.matricule,
          nom: response.data.nom,
          etat: response.data.etat,
        })
        setSubmitted(true)
        navigate('/departements')
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const newDepartement = () => {
    setDepartement(initialDepartementState)
    setSubmitted(false)
  }

  return (
    <>
      <div class='row'>
        <div class='col-xl-6 col-lg-12'>
          <div class='card'>
            <div class='card-header'>
              <h4 class='card-title'>Add Département</h4>
            </div>
            <div class='card-body'>
              <div class='basic-form'>
                <div class='row'>
                  <div class='mb-3 col-md-6'>
                    <label className='form-label' for='project-title-input'>
                      Matricule
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='matricule'
                      required
                      // value={this.state.titre}
                      value={departement.matricule}
                      // onChange={this.onChangeTitre}
                      onChange={handleInputChange}
                      name='matricule'
                      aria-describedby='matricule'
                      placeholder='Enter  matricule'
                    />
                  </div>
                </div>
                <div class='row'>
                  <div class='mb-3 col-md-4'>
                    <label className='form-label' for='project-title-input'>
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
                      value={departement.nom}
                      placeholder='Enter nom'
                    />
                  </div>
                </div>
                <div class='mb-1'></div>
                <button
                  type='submit'
                  onClick={saveDepartement}
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
export default AddDepartement
