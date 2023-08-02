import React, { useState, useEffect } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import UtilisateurDataService from '../../services/utilisateur.service'

const EditUsers = (props) => {
  let { id } = useParams()
  const initialUserState = {
    id: null,
    nom: '',
    prenom: '',
    tel: '',
    email: '',
    adresse: '',
    login: '',
    password: '',
  }
const navigate = useNavigate()
  const [currentUser, setcurrentUser] = useState(initialUserState)
  const [message, setMessage] = useState('')

  const getUser = (id) => {
    UtilisateurDataService.get(id)
      .then((response) => {
        setcurrentUser(response.data)
        console.log(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    getUser(id)
  }, [id])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setcurrentUser({ ...currentUser, [name]: value })
  }

  const updatePublished = (status) => {
    var data = {
      id: currentUser.id,
      nom: currentUser.nom,
      prenom: currentUser.prenom,
      tel: currentUser.tel,
      email: currentUser.email,
      tel: currentUser.tel,
      login: currentUser.login,
      password: currentUser.password,
      etat: status,
    }
    UtilisateurDataService.update(currentUser.id, data)
      .then((response) => {
        setcurrentUser({ ...currentUser, etat: status })
        console.log(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  const updateUser = () => {
    UtilisateurDataService.update(currentUser.id, currentUser)
      .then((response) => {
        console.log(response.data)
        navigate('/users')
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
            <h4 class='card-title'>Edit User</h4>
          </div>
          <div class='card-body'>
            {currentUser ? (
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
                      value={currentUser.nom}
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
                      value={currentUser.prenom}
                      onChange={handleInputChange}
                      name='prenom'
                      aria-describedby='prenom'
                    />
                  </div>
                </div>
                <div class='row'>
                  <div class='mb-3 col-md-6'>
                    <label className='form-label' htmlFor='tel' id='tel'>
                      Numéro
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='tel'
                      required
                      value={currentUser.tel}
                      onChange={handleInputChange}
                      name='tel'
                      aria-describedby='tel'
                    />
                  </div>
                </div>
                <div class='row'>
                  <div class='mb-3 col-md-4'>
                    <label className='form-label' htmlFor='email' id='email'>
                      Email
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='email'
                      required
                      value={currentUser.email}
                      onChange={handleInputChange}
                      name='email'
                      aria-describedby='email'
                    />
                  </div>
                </div>
                <div class='row'>
                  <div class='mb-3 col-md-4'>
                    <label className='form-label' htmlFor='login' id='login'>
                      Login
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='login'
                      required
                      value={currentUser.login}
                      onChange={handleInputChange}
                      name='login'
                      aria-describedby='login'
                    />
                  </div>
                </div>
                <div class='row'>
                  <div class='mb-3 col-md-4'>
                    <label
                      className='form-label'
                      htmlFor='password'
                      id='password'
                    >
                      Password{' '}
                    </label>
                    <input
                      type='password'
                      className='form-control'
                      id='password'
                      required
                      // value={currentUser.password}
                      onChange={handleInputChange}
                      name='password'
                      // aria-describedby='password'
                    />
                  </div>
                </div>
                <div class='mb-1'></div>
                <button
                  type='submit'
                  className='btn btn-success w-sm'
                  onClick={updateUser}
                >
                  Update
                </button>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Tutorial...</p>
              </div>
            )}
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
export default EditUsers
