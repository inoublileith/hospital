import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import OperationDataService from '../../services/operation.service'
const AddOperation = () => {
  const { user: currentUser } = useSelector((state) => state.auth)

  const navigate = useNavigate()
  const initialOperationState = {
    id: null,
    nom: '',
    def: '',
    etat: 1,
  }
  const [operation, setOperation] = useState(initialOperationState)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setOperation({ ...operation, [name]: value })
  }

  const saveOperation = () => {
    var data = {
      nom: operation.nom,
      def: operation.def,
      etat: operation.etat,
    }
    OperationDataService.create(data)
      .then((response) => {
        setOperation({
          id: response.data.id,
          nom: response.data.nom,
          def: response.data.def,
          etat: response.data.etat,
        })
        setSubmitted(true)
        navigate('/operations')
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const newOperation = () => {
    setOperation(initialOperationState)
    setSubmitted(false)
  }

  return (
    <>
      <div class='row'>
        <div class='col-xl-6 col-lg-12'>
          <div class='card'>
            <div class='card-header'>
              <h4 class='card-title'>Add Opération</h4>
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
                      value={operation.nom}
                      // onChange={this.onChangeTitre}
                      onChange={handleInputChange}
                      name='nom'
                      aria-describedby='nom'
                      placeholder='Enter  nom'
                    />
                  </div>
                </div>
                <div class='row'>
                  <div class='mb-3 col-md-4'>
                    <label className='form-label' for='project-title-input'>
                      Définition
                    </label>
                    <input
                      type='textarea'
                      className='form-control'
                      id='def'
                      required
                      onChange={handleInputChange}
                      name='def'
                      aria-describedby='def'
                      value={operation.def}
                      placeholder='Enter definition'
                    />
                  </div>
                </div>
                <div class='mb-1'></div>
                <button
                  onClick={saveOperation}
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
export default AddOperation
