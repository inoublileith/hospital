import React, { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
const Profile = () => {
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
  const { user: currentUser2 } = useSelector((state) => state.auth)
  const [currentUser, setcurrentUser] = useState(initialUserState)
  const navigate = useNavigate()
 

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
  //  useEffect(() => {
  //    getUser()
  //  }, [])
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setcurrentUser({ ...currentUser, [name]: value })
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
  // useEffect((currentUser2.id) => {
  //   getUser(currentUser2.id)
  // }, [currentUser2.id])
  // if (!currentUser) {
  //   return navigate('/login')
  // }
  return (
    <div class='container-fluid'>
      {/* <div class='page-titles'>
        <ol class='breadcrumb'>
          <li class='breadcrumb-item'>
            <a href='javascript:void(0)'>App</a>
          </li>
          <li class='breadcrumb-item active'>
            <a href='javascript:void(0)'>Profile</a>
          </li>
        </ol>
      </div> */}

      <div class='row'>
        <div class='col-lg-12'>
          <div class='profile card card-body px-3 pt-3 pb-0'>
            <div class='profile-head'>
              <div class='photo-content'>
                <div class='cover-photo rounded'></div>
              </div>
              <div class='profile-info'>
                <div class='profile-photo'>
                  <img
                    src='assets/images/profile/profile.png'
                    class='img-fluid rounded-circle'
                    alt=''
                  />
                </div>
                <div class='profile-details'>
                  <div class='profile-name px-3 pt-2'>
                    <h4 class='text-primary mb-0'>
                      {currentUser2.nom}&nbsp;
                      {currentUser2.prenom}
                    </h4>
                  </div>
                  <div class='profile-email px-2 pt-2'>
                    <h4 class='text-muted mb-0'> {currentUser2.email}</h4>
                    <p>Email</p>
                  </div>
                  <div class='dropdown ms-auto'>
                    <ul class='dropdown-menu dropdown-menu-end'>
                      <li class='dropdown-item'>
                        <i class='fa fa-user-circle text-primary me-2'></i> View
                        profile
                      </li>
                      <li class='dropdown-item'>
                        <i class='fa fa-users text-primary me-2'></i> Add to
                        btn-close friends
                      </li>
                      <li class='dropdown-item'>
                        <i class='fa fa-plus text-primary me-2'></i> Add to
                        group
                      </li>
                      <li class='dropdown-item'>
                        <i class='fa fa-ban text-primary me-2'></i> Block
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class='row'>
        <div class='col-xl-8'>
          <div class='card'>
            <div class='card-body'>
              <div class='profile-tab'>
                <div class='custom-tab-1'>
                  <ul class='nav nav-tabs'>
                    <li class='nav-item'></li>
                    <li class='nav-item'>
                      <a href='#about-me' data-bs-toggle='tab' class='nav-link'>
                        About Me
                      </a>
                    </li>
                    <li class='nav-item'>
                      <a
                        href='#profile-settings'
                        data-bs-toggle='tab'
                        class='nav-link'
                      >
                        Setting
                      </a>
                    </li>
                  </ul>
                  <div class='tab-content'>
                    <div id='my-posts' class='tab-pane fade active show'>
                      <div class='profile-about-me'>
                        <div class='pt-4 border-bottom-1 pb-3'>
                          <h4 class='text-primary'>About Me</h4>
                          <p class='mb-2'>
                            A wonderful serenity has taken possession of my
                            entire soul, like these sweet mornings of spring
                            which I enjoy with my whole heart. I am alone, and
                            feel the charm of existence was created for the
                            bliss of souls like mine.I am so happy, my dear
                            friend, so absorbed in the exquisite sense of mere
                            tranquil existence, that I neglect my talents.
                          </p>
                          <p>
                            A collection of textile samples lay spread out on
                            the table - Samsa was a travelling salesman - and
                            above it there hung a picture that he had recently
                            cut out of an illustrated magazine and housed in a
                            nice, gilded frame.
                          </p>
                        </div>
                      </div>

                      <div class='profile-personal-info'>
                        <h4 class='text-primary mb-4'>Personal Information</h4>
                        <div class='row mb-2'>
                          <div class='col-sm-3 col-5'>
                            <h5 class='f-w-500'>
                              Name <span class='pull-end'>:</span>
                            </h5>
                          </div>
                          <div class='col-sm-9 col-7'>
                            <span>{currentUser2.nom}</span>
                          </div>
                        </div>
                        <div class='row mb-2'>
                          <div class='col-sm-3 col-5'>
                            <h5 class='f-w-500'>
                              Email <span class='pull-end'>:</span>
                            </h5>
                          </div>
                          <div class='col-sm-9 col-7'>
                            <span>{currentUser2.email}</span>
                          </div>
                        </div>
                        <div class='row mb-2'>
                          <div class='col-sm-3 col-5'>
                            <h5 class='f-w-500'>
                              Login <span class='pull-end'>:</span>
                            </h5>
                          </div>
                          <div class='col-sm-9 col-7'>
                            <span>{currentUser2.login}</span>
                          </div>
                        </div>
                        <div class='row mb-2'>
                          <div class='col-sm-3 col-5'>
                            <h5 class='f-w-500'>
                              Téléphone <span class='pull-end'>:</span>
                            </h5>
                          </div>
                          <div class='col-sm-9 col-7'>
                            <span>{currentUser2.tel}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id='about-me' class='tab-pane fade'>
                      <div class='profile-about-me'>
                        <div class='pt-4 border-bottom-1 pb-3'>
                          <h4 class='text-primary'>About Me</h4>
                          <p class='mb-2'>
                            A wonderful serenity has taken possession of my
                            entire soul, like these sweet mornings of spring
                            which I enjoy with my whole heart. I am alone, and
                            feel the charm of existence was created for the
                            bliss of souls like mine.I am so happy, my dear
                            friend, so absorbed in the exquisite sense of mere
                            tranquil existence, that I neglect my talents.
                          </p>
                          <p>
                            A collection of textile samples lay spread out on
                            the table - Samsa was a travelling salesman - and
                            above it there hung a picture that he had recently
                            cut out of an illustrated magazine and housed in a
                            nice, gilded frame.
                          </p>
                        </div>
                      </div>

                      <div class='profile-personal-info'>
                        <h4 class='text-primary mb-4'>Personal Information</h4>
                        <div class='row mb-2'>
                          <div class='col-sm-3 col-5'>
                            <h5 class='f-w-500'>
                              Name <span class='pull-end'>:</span>
                            </h5>
                          </div>
                          <div class='col-sm-9 col-7'>
                            <span>{currentUser2.nom}</span>
                          </div>
                        </div>
                        <div class='row mb-2'>
                          <div class='col-sm-3 col-5'>
                            <h5 class='f-w-500'>
                              Email <span class='pull-end'>:</span>
                            </h5>
                          </div>
                          <div class='col-sm-9 col-7'>
                            <span>{currentUser2.email}</span>
                          </div>
                        </div>
                        <div class='row mb-2'>
                          <div class='col-sm-3 col-5'>
                            <h5 class='f-w-500'>
                              Login <span class='pull-end'>:</span>
                            </h5>
                          </div>
                          <div class='col-sm-9 col-7'>
                            <span>{currentUser2.login}</span>
                          </div>
                        </div>
                        <div class='row mb-2'>
                          <div class='col-sm-3 col-5'>
                            <h5 class='f-w-500'>
                              Téléphone <span class='pull-end'>:</span>
                            </h5>
                          </div>
                          <div class='col-sm-9 col-7'>
                            <span>{currentUser2.tel}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id='profile-settings' class='tab-pane fade'>
                      <div class='pt-3'>
                        <div class='settings-form'>
                          <h4 class='text-primary'>Account Setting</h4>
                          {currentUser ? (
                            <form>
                              <div class='row'>
                                <div class='mb-3 col-md-6'>
                                  <label
                                    className='form-label'
                                    htmlFor='nom'
                                    id='nom'
                                  >
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
                                <div class='mb-3 col-md-6'>
                                  <label
                                    className='form-label'
                                    htmlFor='prenom'
                                    id='prenom'
                                  >
                                    Prénom
                                  </label>
                                  <input
                                    type='text'
                                    className='form-control'
                                    id='prenom'
                                    required
                                    value={currentUser2.prenom}
                                    onChange={handleInputChange}
                                    name='prenom'
                                    aria-describedby='prenom'
                                  />
                                </div>
                              </div>
                              <div class='mb-3'>
                                <label
                                  className='form-label'
                                  htmlFor='tel'
                                  id='tel'
                                >
                                  Numéro
                                </label>
                                <input
                                  type='text'
                                  className='form-control'
                                  id='tel'
                                  required
                                  value={currentUser2.tel}
                                  onChange={handleInputChange}
                                  name='tel'
                                  aria-describedby='tel'
                                />
                              </div>
                              <div class='mb-3'>
                                <label
                                  className='form-label'
                                  htmlFor='email'
                                  id='email'
                                >
                                  Email
                                </label>
                                <input
                                  type='text'
                                  className='form-control'
                                  id='email'
                                  required
                                  value={currentUser2.email}
                                  onChange={handleInputChange}
                                  name='email'
                                  aria-describedby='email'
                                />
                              </div>
                              <div class='mb-3'>
                                <label
                                  className='form-label'
                                  htmlFor='login'
                                  id='login'
                                >
                                  Login
                                </label>
                                <input
                                  type='text'
                                  className='form-control'
                                  id='login'
                                  required
                                  value={currentUser2.login}
                                  onChange={handleInputChange}
                                  name='login'
                                  aria-describedby='login'
                                />
                              </div>
                              <div class='mb-3'>
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
                              {/* <div class='row'>
                                <div class='mb-3 col-md-6'>
                                  <label class='form-label'>City</label>
                                  <input type='text' class='form-control' />
                                </div>
                                <div class='mb-3 col-md-4'>
                                  <label class='form-label'>State</label>
                                  <select
                                    class='form-control default-select wide'
                                    id='inputState'
                                  >
                                    <option selected=''>Choose...</option>
                                    <option>Option 1</option>
                                    <option>Option 2</option>
                                    <option>Option 3</option>
                                  </select>
                                </div>
                                <div class='mb-3 col-md-2'>
                                  <label class='form-label'>Zip</label>
                                  <input type='text' class='form-control' />
                                </div>
                              </div> */}
                              <div class='mb-3'>
                                <div class='form-check custom-checkbox'>
                                  <input
                                    type='checkbox'
                                    class='form-check-input'
                                    id='gridCheck'
                                  />
                                  <label
                                    class='form-check-label form-label'
                                    for='gridCheck'
                                  >
                                    {' '}
                                    Check me out
                                  </label>
                                </div>
                              </div>
                              <button
                                class='btn btn-primary'
                                type='submit'
                                onClick={updateUser}
                              >
                                Sign in
                              </button>
                            </form>
                          ) : (
                            <div>
                              <br />
                              <p>Please click on a Tutorial...</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class='modal fade' id='replyModal'>
                  <div
                    class='modal-dialog modal-dialog-centered'
                    role='document'
                  >
                    <div class='modal-content'>
                      <div class='modal-header'>
                        <h5 class='modal-title'>Post Reply</h5>
                        <button
                          type='button'
                          class='btn-close'
                          data-bs-dismiss='modal'
                        ></button>
                      </div>
                      <div class='modal-body'>
                        <form>
                          <textarea class='form-control' rows='4'>
                            Message
                          </textarea>
                        </form>
                      </div>
                      <div class='modal-footer'>
                        <button
                          type='button'
                          class='btn btn-danger light'
                          data-bs-dismiss='modal'
                        >
                          btn-close
                        </button>
                        <button type='button' class='btn btn-primary'>
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Profile
