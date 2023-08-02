import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import { isEmail } from 'validator'
import { register } from '../../actions/auth'
const required = (value) => {
  if (!value) {
    return (
      <div className='alert alert-danger' role='alert'>
        This field is required!
      </div>
    )
  }
}
const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className='alert alert-danger' role='alert'>
        This is not a valid email.
      </div>
    )
  }
}
const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className='alert alert-danger' role='alert'>
        The username must be between 3 and 20 characters.
      </div>
    )
  }
}

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className='alert alert-danger' role='alert'>
        The password must be between 6 and 40 characters.
      </div>
    )
  }
}
const Ajouter = () => {
  const navigate = useNavigate()
  const form = useRef()
  const checkBtn = useRef()
  const [login, setLogin] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [tel, setTel] = useState('')
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [profil, setProfil] = useState('')
  const [adresse, setAdresse] = useState('')
  const [successful, setSuccessful] = useState(false)
  const { message } = useSelector((state) => state.message)
  const dispatch = useDispatch()
  const onChangeLogin = (e) => {
    const login = e.target.value
    setLogin(login)
  }
  const onChangeEmail = (e) => {
    const email = e.target.value
    setEmail(email)
  }
  const onChangePassword = (e) => {
    const password = e.target.value
    setPassword(password)
  }
  const onChangeTel = (e) => {
    const tel = e.target.value
    setTel(tel)
  }
  const onChangeNom = (e) => {
    const nom = e.target.value
    setNom(nom)
  }
  const onChangePrenom = (e) => {
    const prenom = e.target.value
    setPrenom(prenom)
  }
  const onChangeAdresse = (e) => {
    const adresse = e.target.value
    setAdresse(adresse)
  }
    const onChangeProfil= (e) => {
      const profil = e.target.value
      setProfil(profil)
    }
  const handleRegister = (e) => {
    e.preventDefault()
    setSuccessful(false)
    form.current.validateAll()
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(
        register(nom, prenom, tel, email, adresse, login, password, profil)
      )
        .then(() => {
         // navigate('/users')
          window.location.reload()
        })
        .catch(() => {
          setSuccessful(false)
          
        })  
    } navigate('/users')
  }
  return (
    <div class='row'>
      <div class='col-xl-6 col-lg-12'>
        <div class='card'>
          <div class='card-header'>
            <h4 class='card-title'>Add salle</h4>
          </div>
          <div class='card-body'>
            <div class='basic-form'>
              <Form onSubmit={handleRegister} ref={form}>
                {!successful && (
                  <>
                    <div class='row'>
                      <div class='mb-3 col-md-6'>
                        <label className='form-label' htmlFor='nom'>
                          Nom
                        </label>
                        <Input
                          type='nom'
                          className='form-control'
                          name='nom'
                          value={nom}
                          onChange={onChangeNom}
                          placeholder='Enter votre nom'
                        />
                      </div>
                    </div>
                    <div class='row'>
                      <div class='mb-3 col-md-6'>
                        <label htmlFor='prenom'>prénom</label>
                        <Input
                          type='prenom'
                          className='form-control'
                          name='prenom'
                          value={prenom}
                          onChange={onChangePrenom}
                          placeholder='Enter votre prenom'
                        />
                      </div>
                    </div>
                    <div class='row'>
                      <div class='mb-3 col-md-6'>
                        <label htmlFor='tel'>telephone</label>
                        <Input
                          type='tel'
                          className='form-control'
                          name='tel'
                          value={tel}
                          onChange={onChangeTel}
                          placeholder='Enter votre telephone'
                        />
                      </div>
                    </div>
                    <div class='row'>
                      <div class='mb-3 col-md-4'>
                        <label htmlFor='email'>Email</label>
                        <Input
                          type='text'
                          className='form-control'
                          name='email'
                          value={email}
                          onChange={onChangeEmail}
                          validations={[required, validEmail]}
                          placeholder='Entrer votre Email'
                        />
                      </div>
                    </div>
                    <div class='row'>
                      <div class='mb-3 col-md-4'>
                        <label htmlFor='adresse'>Adresse</label>
                        <Input
                          type='adresse'
                          className='form-control'
                          name='adresse'
                          value={adresse}
                          onChange={onChangeAdresse}
                          placeholder='Enter votre adresse'
                        />
                      </div>
                    </div>
                    <div class='row'>
                      <div class='mb-3 col-md-4'>
                        <label htmlFor='username'>User Name</label>
                        <Input
                          type='text'
                          className='form-control'
                          name='login'
                          placeholder='User Name'
                          value={login}
                          onChange={onChangeLogin}
                          validations={[required, vusername]}
                        />
                      </div>
                    </div>
                    <div class='row'>
                      <div class='mb-3 col-md-4'>
                        <label for=''> Password</label>
                        <Input
                          className='form-control'
                          placeholder='Password'
                          type='password'
                          onChange={onChangePassword}
                          validations={[required, vpassword]}
                        />
                      </div>
                    </div>
                    <div class='row'>
                      <div class='mb-3 col-md-4'>
                        <label
                          for='choices-privacy-status-input'
                          class='form-label'
                        >
                          Profil
                        </label>
                        <select
                          class='form-select'
                          className='form-control'
                          name='profil'
                          value={profil}
                          onChange={onChangeProfil}
                        >
                          {' '}
                          <option value={null}>-- Select a Profil --</option>
                          <option value='2' selected>
                            Infirmer
                          </option>
                          <option value='3'>Anesthésite</option>
                          <option value='4'>Chirurgien</option>
                        </select>
                      </div>
                    </div>
                    <div class='mb-1'></div>
                    <button type='submit' class='btn btn-success w-sm'>
                      Register Now
                    </button>
                  </>
                )}
                {message && (
                  <div className='mb-3'>
                    <div
                      className={
                        successful
                          ? 'alert alert-success'
                          : 'alert alert-danger'
                      }
                      role='alert'
                    >
                      {message}
                    </div>
                  </div>
                )}
                <CheckButton style={{ display: 'none' }} ref={checkBtn} />
              </Form>
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
  )
}
export default Ajouter
