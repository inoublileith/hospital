import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import OperationDataService from '../../services/operation.service'
const EditOperations = (props) => {
  let { id } = useParams()
  const initialOperationState = {
    id: null,
    nom: '',
    def: '',
    etat: 1,
  }
const navigate= useNavigate();
  const [currentOperation, setCurrentOperation] = useState(
    initialOperationState
  )
  const [message, setMessage] = useState('')

  const getOperation = (id) => {
    OperationDataService.get(id)
      .then((response) => {
        setCurrentOperation(response.data)
        console.log(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    getOperation(id)
  }, [id])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setCurrentOperation({ ...currentOperation, [name]: value })
  }

  const updatePublished = (status) => {
    var data = {
      id: currentOperation.id,
      nom: currentOperation.nom,
      def: currentOperation.def,

      etat: status,
    }
    OperationDataService.update(currentOperation.id, data)
      .then((response) => {
        setCurrentOperation({ ...currentOperation, etat: status })
        console.log(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  const updateOperation = () => {
    OperationDataService.update(currentOperation.id, currentOperation)
      .then((response) => {
        console.log(response.data)
        navigate('/operations')
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
                  <label className='form-label' htmlFor='departement' id='nom'>
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
                    value={currentOperation.nom}
                  />
                </div>
              </div>
              <div class='row'>
                <div class='mb-3 col-md-4'>
                  <label className='form-label' htmlFor='def' id='def'>
                    Définition
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='def'
                    required
                    value={currentOperation.def}
                    onChange={handleInputChange}
                    name='def'
                    aria-describedby='def'
                  />
                </div>
              </div>
              <div class='mb-1'></div>
              <button
                type='submit'
                className='btn btn-success w-sm'
                onClick={updateOperation}
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
export default EditOperations
