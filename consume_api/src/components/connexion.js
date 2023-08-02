import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import { processLogin } from '../actions/auth'

const required = (value) => {
  if (!value) {
    return (
      <div className='alert alert-danger' role='alert'>
        This field is required!
      </div>
    )
  }
}
const Connexion = (props) => {
  const navigate = useNavigate()
  const form = useRef()
  const checkBtn = useRef()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { isLoggedIn } = useSelector((state) => state.auth)
  const { message } = useSelector((state) => state.message)
  const dispatch = useDispatch()
  const onChangeLogin = (e) => {
    const login = e.target.value
    setLogin(login)
  }
  const onChangePassword = (e) => {
    const password = e.target.value
    setPassword(password)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    form.current.validateAll()
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(processLogin(login, password))
        .then(() => {
          navigate('/position')
          window.location.reload()
        })
        .catch(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }

  if (isLoggedIn) {
    return navigate('/position')
  }
  const openTraitement = () => {
    navigate('/register')
  }
  return (
    <>
      <div className=' background-image2 '>
        <div className='vh-100'>
          <div className='authincation h-100'>
            <div className='container h-100'>
              <div className='row justify-content-center h-100 align-items-center'>
                <div className='col-md-6'>
                  <div className='authincation-content'>
                    <div className='row no-gutters'>
                      <div className='col-xl-12'>
                        <div className='auth-form'>
                          <h4 className='text-center mb-4'>
                           
                            <img
                              src='assets/307e6906c251d91bb6202b3dd4736d7a.jpg'
                              alt='Logo'
                              className='logo'
                            />
                          </h4>
                          <Form onSubmit={handleLogin} ref={form}>
                            <div className='form-group'>
                              <label className='mb-1'>
                                <strong>Login</strong>
                              </label>
                              <Input
                                class='form-control'
                                placeholder='Enter your username'
                                type='text'
                                name='login'
                                value={login}
                                onChange={onChangeLogin}
                                validations={[required]}
                              />
                            </div>
                            <div className='form-group'>
                              <label className='mb-1'>
                                <strong>Password</strong>
                              </label>
                              <Input
                                class='form-control pe-5 password-input'
                                placeholder='Enter your password'
                                type='password'
                                value={password}
                                onChange={onChangePassword}
                                validations={[required]}
                              />
                            </div>
                            <div className='form-row d-flex flex-wrap justify-content-between mt-4 mb-2'>
                              <div className='form-group'>
                                <div className='form-check custom-checkbox ms-1'>
                                  <input
                                    type='checkbox'
                                    className='form-check-input'
                                    id='basic_checkbox_1'
                                  />
                                  <label
                                    className='form-check-label'
                                    for='basic_checkbox_1'
                                  >
                                    Remember my preference
                                  </label>
                                </div>
                              </div>
                              <div className='form-group ms-2'>
                                <a href='page-forgot-password.html'>
                                  Forgot Password?
                                </a>
                                <button
                                  className='btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon'
                                  type='button'
                                  id='password-addon'
                                  disabled={loading}
                                >
                                  {' '}
                                  {loading && (
                                    <span className='spinner-border spinner-border-sm'></span>
                                  )}
                                  <i className='ri-eye-fill align-middle'></i>
                                </button>
                              </div>
                            </div>
                            <div className='text-center'>
                              <button
                                type='submit'
                                className='btn btn-primary btn-block'
                              >
                                Sign Me In
                              </button>
                            </div>
                            {message && (
                              <div className='form-group'>
                                <div
                                  className='alert alert-danger'
                                  role='alert'
                                >
                                  {message}
                                </div>
                              </div>
                            )}
                            <CheckButton
                              style={{ display: 'none' }}
                              ref={checkBtn}
                            />
                          </Form>
                          {/* <div className='new-account mt-3'>
                            <p>
                              Don't have an account?{' '}
                              <a className='text-primary' href='/register'>
                                Sign up
                              </a>
                            </p>
                          </div> */}
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
    </>
  )
}
export default Connexion
