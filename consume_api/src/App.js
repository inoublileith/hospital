import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Login from './components/login'
import Register from './components/register'
import Profile from './components/profile'
import BoardUser from './components/boardUser'
import BoardAnalyste from './components/boardAnalyste'
import BoardAdmin from './components/boardAdmin'
import BoardPrestataire from './components/bordPrestataire'
import { logout } from './actions/auth'
import { clearMessage } from './actions/message'
import { history } from './helpers/history'
//components
import Position from './components/position'
import SallePosition from './components/Salleposition'
import Today from './components/today'
import Home from './components/home.cp'
import ShowInfermiers from './components/infermier/list.cp'
import ShowPositions from './components/position/list.cp'
import AddPositions from './components/position/add.cp'
import ShowSalles from './components/salle/list.cp'
import AddSalles from './components/salle/add.cp'
import EditSalles from './components/salle/edit.cp'

import ShowDepartements from './components/departement/list.cp'
import AddDepartements from './components/departement/add.cp'
import EditDepartements from './components/departement/edit.cp'

import ShowOperations from './components/operation/list.cp'
import AddOperations from './components/operation/add.cp'
import EditOperations from './components/operation/edit.cp'

import ShowPatients from './components/patient/list.cp'
import AddPatients from './components/patient/add.cp'
import EditPatients from './components/patient/edit.cp'
import EditUsers from './components/utilisateur/edit.cp'
import ShowUsers from './components/utilisateur/list.cp'
import Ajouter from './components/utilisateur/add.cp'
// import AddProduit from './components/produit/add.cp'
// import EditProduit from './components/produit/edit.cp'
// import ShowProduits from './components/produit/list.cp'
const App = () => {
  const navigate = useNavigate()
  const [showPrestataireBoard, setShowPrestataireBoard] = useState(false)
  const [showAnalysteBoard, setShowAnalysteBoard] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const { user: currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()) // clear message when changing location
    })
  }, [dispatch])
  useEffect(() => {
    if (currentUser) {
      setShowAnalysteBoard(currentUser.roles.includes('ROLE_INFERMIER'))
      setShowAdminBoard(currentUser.roles.includes('ROLE_ADMIN'))
    }
  }, [currentUser])
  //   if (currentUser.profil !=2){
  //      dispatch(logout())
  //  }
  const logOut = () => {
    dispatch(logout()).then(() => {
      navigate('/')
    })
  }
  return (
    <>
      <div id='preloader'>
        <div class='sk-three-bounce'>
          <div class='sk-child sk-bounce1'></div>
          <div class='sk-child sk-bounce2'></div>
          <div class='sk-child sk-bounce3'></div>
        </div>
      </div>

      <div id='main-wrapper'>
        <div class='nav-header'>
          <a href='index.html' class='brand-logo'>
            <img class='logo-abbr' src='assets/images/logo.png' alt='' />
            <img
              class='logo-compact'
              src='assets/images/logo-text.png'
              alt=''
            />
            <img class='brand-title' src='assets/images/logo-text.png' alt='' />
          </a>

          <div class='nav-control'>
            <div class='hamburger'>
              <span class='line'></span>
              <span class='line'></span>
              <span class='line'></span>
            </div>
          </div>
        </div>

        <div class='chatbox'>
          <div class='chatbox-close'></div>
          <div class='custom-tab-1'>
            <ul class='nav nav-tabs'>
              <li class='nav-item'>
                <a class='nav-link' data-bs-toggle='tab' href='#notes'>
                  Notes
                </a>
              </li>
              <li class='nav-item'>
                <a class='nav-link' data-bs-toggle='tab' href='#alerts'>
                  Alerts
                </a>
              </li>
              <li class='nav-item'>
                <a class='nav-link active' data-bs-toggle='tab' href='#chat'>
                  Chat
                </a>
              </li>
            </ul>
            <div class='tab-content'>
              <div class='tab-pane fade active show' id='chat' role='tabpanel'>
                <div class='card mb-sm-3 mb-md-0 contacts_card dz-chat-user-box'>
                  <div class='card-header chat-list-header text-center'>
                    <a href='javascript:void(0);'>
                      <svg
                        width='18px'
                        height='18px'
                        viewBox='0 0 24 24'
                        version='1.1'
                      >
                        <g
                          stroke='none'
                          stroke-width='1'
                          fill='none'
                          fill-rule='evenodd'
                        >
                          <rect
                            fill='#000000'
                            x='4'
                            y='11'
                            width='16'
                            height='2'
                            rx='1'
                          />
                          <rect
                            fill='#000000'
                            opacity='0.3'
                            transform='translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) '
                            x='4'
                            y='11'
                            width='16'
                            height='2'
                            rx='1'
                          />
                        </g>
                      </svg>
                    </a>
                    <div>
                      <h6 class='mb-1'>Chat List</h6>
                      <p class='mb-0'>Show All</p>
                    </div>
                    <a href='javascript:void(0);'>
                      <svg
                        width='18px'
                        height='18px'
                        viewBox='0 0 24 24'
                        version='1.1'
                      >
                        <g
                          stroke='none'
                          stroke-width='1'
                          fill='none'
                          fill-rule='evenodd'
                        >
                          <rect x='0' y='0' width='24' height='24' />
                          <circle fill='#000000' cx='5' cy='12' r='2' />
                          <circle fill='#000000' cx='12' cy='12' r='2' />
                          <circle fill='#000000' cx='19' cy='12' r='2' />
                        </g>
                      </svg>
                    </a>
                  </div>
                  <div
                    class='card-body contacts_body p-0 dz-scroll  '
                    id='DZ_W_Contacts_Body'
                  >
                    <ul class='contacts'>
                      <li class='name-first-letter'>A</li>
                      <li class='active dz-chat-user'>
                        <div class='d-flex bd-highlight'>
                          <div class='img_cont'>
                            <img
                              src='assets/images/avatar/1.jpg'
                              class='rounded-circle user_img'
                              alt=''
                            />
                            <span class='online_icon'></span>
                          </div>
                          <div class='user_info'>
                            <span>Archie Parker</span>
                            <p>Kalid is online</p>
                          </div>
                        </div>
                      </li>
                      <li class='dz-chat-user'>
                        <div class='d-flex bd-highlight'>
                          <div class='img_cont'>
                            <img
                              src='assets/images/avatar/2.jpg'
                              class='rounded-circle user_img'
                              alt=''
                            />
                            <span class='online_icon offline'></span>
                          </div>
                          <div class='user_info'>
                            <span>Alfie Mason</span>
                            <p>Taherah left 7 mins ago</p>
                          </div>
                        </div>
                      </li>
                      <li class='dz-chat-user'>
                        <div class='d-flex bd-highlight'>
                          <div class='img_cont'>
                            <img
                              src='assets/images/avatar/3.jpg'
                              class='rounded-circle user_img'
                              alt=''
                            />
                            <span class='online_icon'></span>
                          </div>
                          <div class='user_info'>
                            <span>AharlieKane</span>
                            <p>Sami is online</p>
                          </div>
                        </div>
                      </li>
                      <li class='dz-chat-user'>
                        <div class='d-flex bd-highlight'>
                          <div class='img_cont'>
                            <img
                              src='assets/images/avatar/4.jpg'
                              class='rounded-circle user_img'
                              alt=''
                            />
                            <span class='online_icon offline'></span>
                          </div>
                          <div class='user_info'>
                            <span>Athan Jacoby</span>
                            <p>Nargis left 30 mins ago</p>
                          </div>
                        </div>
                      </li>
                      <li class='name-first-letter'>B</li>
                      <li class='dz-chat-user'>
                        <div class='d-flex bd-highlight'>
                          <div class='img_cont'>
                            <img
                              src='assets/images/avatar/5.jpg'
                              class='rounded-circle user_img'
                              alt=''
                            />
                            <span class='online_icon offline'></span>
                          </div>
                          <div class='user_info'>
                            <span>Bashid Samim</span>
                            <p>Rashid left 50 mins ago</p>
                          </div>
                        </div>
                      </li>
                      <li class='dz-chat-user'>
                        <div class='d-flex bd-highlight'>
                          <div class='img_cont'>
                            <img
                              src='assets/images/avatar/1.jpg'
                              class='rounded-circle user_img'
                              alt=''
                            />
                            <span class='online_icon'></span>
                          </div>
                          <div class='user_info'>
                            <span>Breddie Ronan</span>
                            <p>Kalid is online</p>
                          </div>
                        </div>
                      </li>
                      <li class='dz-chat-user'>
                        <div class='d-flex bd-highlight'>
                          <div class='img_cont'>
                            <img
                              src='assets/images/avatar/2.jpg'
                              class='rounded-circle user_img'
                              alt=''
                            />
                            <span class='online_icon offline'></span>
                          </div>
                          <div class='user_info'>
                            <span>Ceorge Carson</span>
                            <p>Taherah left 7 mins ago</p>
                          </div>
                        </div>
                      </li>
                      <li class='name-first-letter'>D</li>
                      <li class='dz-chat-user'>
                        <div class='d-flex bd-highlight'>
                          <div class='img_cont'>
                            <img
                              src='assets/images/avatar/3.jpg'
                              class='rounded-circle user_img'
                              alt=''
                            />
                            <span class='online_icon'></span>
                          </div>
                          <div class='user_info'>
                            <span>Darry Parker</span>
                            <p>Sami is online</p>
                          </div>
                        </div>
                      </li>
                      <li class='dz-chat-user'>
                        <div class='d-flex bd-highlight'>
                          <div class='img_cont'>
                            <img
                              src='assets/images/avatar/4.jpg'
                              class='rounded-circle user_img'
                              alt=''
                            />
                            <span class='online_icon offline'></span>
                          </div>
                          <div class='user_info'>
                            <span>Denry Hunter</span>
                            <p>Nargis left 30 mins ago</p>
                          </div>
                        </div>
                      </li>
                      <li class='name-first-letter'>J</li>
                      <li class='dz-chat-user'>
                        <div class='d-flex bd-highlight'>
                          <div class='img_cont'>
                            <img
                              src='assets/images/avatar/5.jpg'
                              class='rounded-circle user_img'
                              alt=''
                            />
                            <span class='online_icon offline'></span>
                          </div>
                          <div class='user_info'>
                            <span>Jack Ronan</span>
                            <p>Rashid left 50 mins ago</p>
                          </div>
                        </div>
                      </li>
                      <li class='dz-chat-user'>
                        <div class='d-flex bd-highlight'>
                          <div class='img_cont'>
                            <img
                              src='assets/images/avatar/1.jpg'
                              class='rounded-circle user_img'
                              alt=''
                            />
                            <span class='online_icon'></span>
                          </div>
                          <div class='user_info'>
                            <span>Jacob Tucker</span>
                            <p>Kalid is online</p>
                          </div>
                        </div>
                      </li>
                      <li class='dz-chat-user'>
                        <div class='d-flex bd-highlight'>
                          <div class='img_cont'>
                            <img
                              src='assets/images/avatar/2.jpg'
                              class='rounded-circle user_img'
                              alt=''
                            />
                            <span class='online_icon offline'></span>
                          </div>
                          <div class='user_info'>
                            <span>James Logan</span>
                            <p>Taherah left 7 mins ago</p>
                          </div>
                        </div>
                      </li>
                      <li class='dz-chat-user'>
                        <div class='d-flex bd-highlight'>
                          <div class='img_cont'>
                            <img
                              src='assets/images/avatar/3.jpg'
                              class='rounded-circle user_img'
                              alt=''
                            />
                            <span class='online_icon'></span>
                          </div>
                          <div class='user_info'>
                            <span>Joshua Weston</span>
                            <p>Sami is online</p>
                          </div>
                        </div>
                      </li>
                      <li class='name-first-letter'>O</li>
                      <li class='dz-chat-user'>
                        <div class='d-flex bd-highlight'>
                          <div class='img_cont'>
                            <img
                              src='assets/images/avatar/4.jpg'
                              class='rounded-circle user_img'
                              alt=''
                            />
                            <span class='online_icon offline'></span>
                          </div>
                          <div class='user_info'>
                            <span>Oliver Acker</span>
                            <p>Nargis left 30 mins ago</p>
                          </div>
                        </div>
                      </li>
                      <li class='dz-chat-user'>
                        <div class='d-flex bd-highlight'>
                          <div class='img_cont'>
                            <img
                              src='assets/images/avatar/5.jpg'
                              class='rounded-circle user_img'
                              alt=''
                            />
                            <span class='online_icon offline'></span>
                          </div>
                          <div class='user_info'>
                            <span>Oscar Weston</span>
                            <p>Rashid left 50 mins ago</p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class='card chat dz-chat-history-box d-none'>
                  <div class='card-header chat-list-header text-center'>
                    <a href='javascript:void(0);' class='dz-chat-history-back'>
                      <svg
                        width='18px'
                        height='18px'
                        viewBox='0 0 24 24'
                        version='1.1'
                      >
                        <g
                          stroke='none'
                          stroke-width='1'
                          fill='none'
                          fill-rule='evenodd'
                        >
                          <polygon points='0 0 24 0 24 24 0 24' />
                          <rect
                            fill='#000000'
                            opacity='0.3'
                            transform='translate(15.000000, 12.000000) scale(-1, 1) rotate(-90.000000) translate(-15.000000, -12.000000) '
                            x='14'
                            y='7'
                            width='2'
                            height='10'
                            rx='1'
                          />
                          <path
                            d='M3.7071045,15.7071045 C3.3165802,16.0976288 2.68341522,16.0976288 2.29289093,15.7071045 C1.90236664,15.3165802 1.90236664,14.6834152 2.29289093,14.2928909 L8.29289093,8.29289093 C8.67146987,7.914312 9.28105631,7.90106637 9.67572234,8.26284357 L15.6757223,13.7628436 C16.0828413,14.136036 16.1103443,14.7686034 15.7371519,15.1757223 C15.3639594,15.5828413 14.7313921,15.6103443 14.3242731,15.2371519 L9.03007346,10.3841355 L3.7071045,15.7071045 Z'
                            fill='#000000'
                            fill-rule='nonzero'
                            transform='translate(9.000001, 11.999997) scale(-1, -1) rotate(90.000000) translate(-9.000001, -11.999997) '
                          />
                        </g>
                      </svg>
                    </a>
                    <div>
                      <h6 class='mb-1'>Chat with Khelesh</h6>
                      <p class='mb-0 text-success'>Online</p>
                    </div>
                    <div class='dropdown'>
                      <a
                        href='javascript:void(0);'
                        data-bs-toggle='dropdown'
                        aria-expanded='false'
                      >
                        <svg
                          width='18px'
                          height='18px'
                          viewBox='0 0 24 24'
                          version='1.1'
                        >
                          <g
                            stroke='none'
                            stroke-width='1'
                            fill='none'
                            fill-rule='evenodd'
                          >
                            <rect x='0' y='0' width='24' height='24' />
                            <circle fill='#000000' cx='5' cy='12' r='2' />
                            <circle fill='#000000' cx='12' cy='12' r='2' />
                            <circle fill='#000000' cx='19' cy='12' r='2' />
                          </g>
                        </svg>
                      </a>
                      <ul class='dropdown-menu dropdown-menu-end'>
                        <li class='dropdown-item'>
                          <i class='fa fa-user-circle text-primary me-2'></i>{' '}
                          View profile
                        </li>
                        <li class='dropdown-item'>
                          <i class='fa fa-users text-primary me-2'></i> Add to
                          close friends
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
                  <div
                    class='card-body msg_card_body dz-scroll'
                    id='DZ_W_Contacts_Body3'
                  >
                    <div class='d-flex justify-content-start mb-4'>
                      <div class='img_cont_msg'>
                        <img
                          src='assets/images/avatar/1.jpg'
                          class='rounded-circle user_img_msg'
                          alt=''
                        />
                      </div>
                      <div class='msg_cotainer'>
                        Hi, how are you samim?
                        <span class='msg_time'>8:40 AM, Today</span>
                      </div>
                    </div>
                    <div class='d-flex justify-content-end mb-4'>
                      <div class='msg_cotainer_send'>
                        Hi Khalid i am good tnx how about you?
                        <span class='msg_time_send'>8:55 AM, Today</span>
                      </div>
                      <div class='img_cont_msg'>
                        <img
                          src='assets/images/avatar/2.jpg'
                          class='rounded-circle user_img_msg'
                          alt=''
                        />
                      </div>
                    </div>
                    <div class='d-flex justify-content-start mb-4'>
                      <div class='img_cont_msg'>
                        <img
                          src='assets/images/avatar/1.jpg'
                          class='rounded-circle user_img_msg'
                          alt=''
                        />
                      </div>
                      <div class='msg_cotainer'>
                        I am good too, thank you for your chat template
                        <span class='msg_time'>9:00 AM, Today</span>
                      </div>
                    </div>
                    <div class='d-flex justify-content-end mb-4'>
                      <div class='msg_cotainer_send'>
                        You are welcome
                        <span class='msg_time_send'>9:05 AM, Today</span>
                      </div>
                      <div class='img_cont_msg'>
                        <img
                          src='assets/images/avatar/2.jpg'
                          class='rounded-circle user_img_msg'
                          alt=''
                        />
                      </div>
                    </div>
                    <div class='d-flex justify-content-start mb-4'>
                      <div class='img_cont_msg'>
                        <img
                          src='assets/images/avatar/1.jpg'
                          class='rounded-circle user_img_msg'
                          alt=''
                        />
                      </div>
                      <div class='msg_cotainer'>
                        I am looking for your next templates
                        <span class='msg_time'>9:07 AM, Today</span>
                      </div>
                    </div>
                    <div class='d-flex justify-content-end mb-4'>
                      <div class='msg_cotainer_send'>
                        Ok, thank you have a good day
                        <span class='msg_time_send'>9:10 AM, Today</span>
                      </div>
                      <div class='img_cont_msg'>
                        <img
                          src='assets/images/avatar/2.jpg'
                          class='rounded-circle user_img_msg'
                          alt=''
                        />
                      </div>
                    </div>
                    <div class='d-flex justify-content-start mb-4'>
                      <div class='img_cont_msg'>
                        <img
                          src='assets/images/avatar/1.jpg'
                          class='rounded-circle user_img_msg'
                          alt=''
                        />
                      </div>
                      <div class='msg_cotainer'>
                        Bye, see you
                        <span class='msg_time'>9:12 AM, Today</span>
                      </div>
                    </div>
                    <div class='d-flex justify-content-start mb-4'>
                      <div class='img_cont_msg'>
                        <img
                          src='assets/images/avatar/1.jpg'
                          class='rounded-circle user_img_msg'
                          alt=''
                        />
                      </div>
                      <div class='msg_cotainer'>
                        Hi, how are you samim?
                        <span class='msg_time'>8:40 AM, Today</span>
                      </div>
                    </div>
                    <div class='d-flex justify-content-end mb-4'>
                      <div class='msg_cotainer_send'>
                        Hi Khalid i am good tnx how about you?
                        <span class='msg_time_send'>8:55 AM, Today</span>
                      </div>
                      <div class='img_cont_msg'>
                        <img
                          src='assets/images/avatar/2.jpg'
                          class='rounded-circle user_img_msg'
                          alt=''
                        />
                      </div>
                    </div>
                    <div class='d-flex justify-content-start mb-4'>
                      <div class='img_cont_msg'>
                        <img
                          src='assets/images/avatar/1.jpg'
                          class='rounded-circle user_img_msg'
                          alt=''
                        />
                      </div>
                      <div class='msg_cotainer'>
                        I am good too, thank you for your chat template
                        <span class='msg_time'>9:00 AM, Today</span>
                      </div>
                    </div>
                    <div class='d-flex justify-content-end mb-4'>
                      <div class='msg_cotainer_send'>
                        You are welcome
                        <span class='msg_time_send'>9:05 AM, Today</span>
                      </div>
                      <div class='img_cont_msg'>
                        <img
                          src='assets/images/avatar/2.jpg'
                          class='rounded-circle user_img_msg'
                          alt=''
                        />
                      </div>
                    </div>
                    <div class='d-flex justify-content-start mb-4'>
                      <div class='img_cont_msg'>
                        <img
                          src='assets/images/avatar/1.jpg'
                          class='rounded-circle user_img_msg'
                          alt=''
                        />
                      </div>
                      <div class='msg_cotainer'>
                        I am looking for your next templates
                        <span class='msg_time'>9:07 AM, Today</span>
                      </div>
                    </div>
                    <div class='d-flex justify-content-end mb-4'>
                      <div class='msg_cotainer_send'>
                        Ok, thank you have a good day
                        <span class='msg_time_send'>9:10 AM, Today</span>
                      </div>
                      <div class='img_cont_msg'>
                        <img
                          src='assets/images/avatar/2.jpg'
                          class='rounded-circle user_img_msg'
                          alt=''
                        />
                      </div>
                    </div>
                    <div class='d-flex justify-content-start mb-4'>
                      <div class='img_cont_msg'>
                        <img
                          src='assets/images/avatar/1.jpg'
                          class='rounded-circle user_img_msg'
                          alt=''
                        />
                      </div>
                      <div class='msg_cotainer'>
                        Bye, see you
                        <span class='msg_time'>9:12 AM, Today</span>
                      </div>
                    </div>
                  </div>
                  <div class='card-footer type_msg'>
                    <div class='input-group'>
                      <textarea
                        class='form-control'
                        placeholder='Type your message...'
                      ></textarea>
                      <div class='input-group-append'>
                        <button type='button' class='btn btn-primary'>
                          <i class='fa fa-location-arrow'></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class='tab-pane fade' id='alerts' role='tabpanel'>
                <div class='card mb-sm-3 mb-md-0 contacts_card'>
                  <div class='card-header chat-list-header text-center'>
                    <a href='javascript:void(0);'>
                      <svg
                        width='18px'
                        height='18px'
                        viewBox='0 0 24 24'
                        version='1.1'
                      >
                        <g
                          stroke='none'
                          stroke-width='1'
                          fill='none'
                          fill-rule='evenodd'
                        >
                          <rect x='0' y='0' width='24' height='24' />
                          <circle fill='#000000' cx='5' cy='12' r='2' />
                          <circle fill='#000000' cx='12' cy='12' r='2' />
                          <circle fill='#000000' cx='19' cy='12' r='2' />
                        </g>
                      </svg>
                    </a>
                    <div>
                      <h6 class='mb-1'>Notications</h6>
                      <p class='mb-0'>Show All</p>
                    </div>
                    <a href='javascript:void(0);'>
                      <svg
                        width='18px'
                        height='18px'
                        viewBox='0 0 24 24'
                        version='1.1'
                      >
                        <g
                          stroke='none'
                          stroke-width='1'
                          fill='none'
                          fill-rule='evenodd'
                        >
                          <rect x='0' y='0' width='24' height='24' />
                          <path
                            d='M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z'
                            fill='#000000'
                            fill-rule='nonzero'
                            opacity='0.3'
                          />
                          <path
                            d='M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z'
                            fill='#000000'
                            fill-rule='nonzero'
                          />
                        </g>
                      </svg>
                    </a>
                  </div>
                  <div
                    class='card-body contacts_body p-0 dz-scroll'
                    id='DZ_W_Contacts_Body1'
                  >
                    <ul class='contacts'>
                      <li class='name-first-letter'>SEVER STATUS</li>
                      <li class='active'>
                        <div class='d-flex bd-highlight'>
                          <div class='img_cont primary'>KK</div>
                          <div class='user_info'>
                            <span>David Nester Birthday</span>
                            <p class='text-primary'>Today</p>
                          </div>
                        </div>
                      </li>
                      <li class='name-first-letter'>SOCIAL</li>
                      <li>
                        <div class='d-flex bd-highlight'>
                          <div class='img_cont success'>
                            RU<i class='icon fa-birthday-cake'></i>
                          </div>
                          <div class='user_info'>
                            <span>Perfection Simplified</span>
                            <p>Jame Smith commented on your status</p>
                          </div>
                        </div>
                      </li>
                      <li class='name-first-letter'>SEVER STATUS</li>
                      <li>
                        <div class='d-flex bd-highlight'>
                          <div class='img_cont primary'>
                            AU<i class='icon fa fa-user-plus'></i>
                          </div>
                          <div class='user_info'>
                            <span>AharlieKane</span>
                            <p>Sami is online</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class='d-flex bd-highlight'>
                          <div class='img_cont info'>
                            MO<i class='icon fa fa-user-plus'></i>
                          </div>
                          <div class='user_info'>
                            <span>Athan Jacoby</span>
                            <p>Nargis left 30 mins ago</p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class='card-footer'></div>
                </div>
              </div>
              <div class='tab-pane fade' id='notes'>
                <div class='card mb-sm-3 mb-md-0 note_card'>
                  <div class='card-header chat-list-header text-center'>
                    <a href='javascript:void(0);'>
                      <svg
                        width='18px'
                        height='18px'
                        viewBox='0 0 24 24'
                        version='1.1'
                      >
                        <g
                          stroke='none'
                          stroke-width='1'
                          fill='none'
                          fill-rule='evenodd'
                        >
                          <rect
                            fill='#000000'
                            x='4'
                            y='11'
                            width='16'
                            height='2'
                            rx='1'
                          />
                          <rect
                            fill='#000000'
                            opacity='0.3'
                            transform='translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) '
                            x='4'
                            y='11'
                            width='16'
                            height='2'
                            rx='1'
                          />
                        </g>
                      </svg>
                    </a>
                    <div>
                      <h6 class='mb-1'>Notes</h6>
                      <p class='mb-0'>Add New Nots</p>
                    </div>
                    <a href='javascript:void(0);'>
                      <svg
                        width='18px'
                        height='18px'
                        viewBox='0 0 24 24'
                        version='1.1'
                      >
                        <g
                          stroke='none'
                          stroke-width='1'
                          fill='none'
                          fill-rule='evenodd'
                        >
                          <rect x='0' y='0' width='24' height='24' />
                          <path
                            d='M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z'
                            fill='#000000'
                            fill-rule='nonzero'
                            opacity='0.3'
                          />
                          <path
                            d='M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z'
                            fill='#000000'
                            fill-rule='nonzero'
                          />
                        </g>
                      </svg>
                    </a>
                  </div>
                  <div
                    class='card-body contacts_body p-0 dz-scroll'
                    id='DZ_W_Contacts_Body2'
                  >
                    <ul class='contacts'>
                      <li class='active'>
                        <div class='d-flex bd-highlight'>
                          <div class='user_info'>
                            <span>New order placed..</span>
                            <p>10 Aug 2021</p>
                          </div>
                          <div class='ms-auto'>
                            <a
                              href='javascript:void(0);'
                              class='btn btn-primary btn-xs sharp me-1'
                            >
                              <i class='fas fa-pencil-alt'></i>
                            </a>
                            <a
                              href='javascript:void(0);'
                              class='btn btn-danger btn-xs sharp'
                            >
                              <i class='fas fa-trash-alt'></i>
                            </a>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class='d-flex bd-highlight'>
                          <div class='user_info'>
                            <span>Youtube, a video-sharing website..</span>
                            <p>10 Aug 2021</p>
                          </div>
                          <div class='ms-auto'>
                            <a
                              href='javascript:void(0);'
                              class='btn btn-primary btn-xs sharp me-1'
                            >
                              <i class='fas fa-pencil-alt'></i>
                            </a>
                            <a
                              href='javascript:void(0);'
                              class='btn btn-danger btn-xs sharp'
                            >
                              <i class='fas fa-trash-alt'></i>
                            </a>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class='d-flex bd-highlight'>
                          <div class='user_info'>
                            <span>john just buy your product..</span>
                            <p>10 Aug 2021</p>
                          </div>
                          <div class='ms-auto'>
                            <a
                              href='javascript:void(0);'
                              class='btn btn-primary btn-xs sharp me-1'
                            >
                              <i class='fas fa-pencil-alt'></i>
                            </a>
                            <a
                              href='javascript:void(0);'
                              class='btn btn-danger btn-xs sharp'
                            >
                              <i class='fas fa-trash-alt'></i>
                            </a>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class='d-flex bd-highlight'>
                          <div class='user_info'>
                            <span>Athan Jacoby</span>
                            <p>10 Aug 2021</p>
                          </div>
                          <div class='ms-auto'>
                            <a
                              href='javascript:void(0);'
                              class='btn btn-primary btn-xs sharp me-1'
                            >
                              <i class='fas fa-pencil-alt'></i>
                            </a>
                            <a
                              href='javascript:void(0);'
                              class='btn btn-danger btn-xs sharp'
                            >
                              <i class='fas fa-trash-alt'></i>
                            </a>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class='header'>
          <div class='header-content'>
            <nav class='navbar navbar-expand'>
              <div class='collapse navbar-collapse justify-content-between'>
                <div class='header-left'>
                  <div class='dashboard_bar'>Dashboard</div>
                </div>

                <ul class='navbar-nav header-right'>
                  <li class='nav-item dropdown notification_dropdown'>
                    <a
                      class='nav-link dz-fullscreen'
                      href='javascript:void(0);'
                    >
                      <svg
                        id='icon-full'
                        viewBox='0 0 24 24'
                        width='26'
                        height='26'
                        stroke='currentColor'
                        stroke-width='2'
                        fill='none'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        class='css-i6dzq1'
                      >
                        <path d='M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3'></path>
                      </svg>
                      <svg
                        id='icon-minimize'
                        width='26'
                        height='26'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        class='feather feather-minimize'
                      >
                        <path d='M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3'></path>
                      </svg>
                    </a>
                  </li>

                  <li class='nav-item dropdown notification_dropdown'></li>
                  <li class='nav-item dropdown header-profile'>
                    <a
                      class='nav-link'
                      href='javascript:void(0);'
                      role='button'
                      data-bs-toggle='dropdown'
                    >
                      <div class='header-info'>
                        <span>{currentUser.login}</span>
                        <small>{currentUser.profil}</small>
                      </div>
                      <img
                        src='assets/images/avatar/1.png'
                        width='20'
                        alt=''
                      />
                    </a>
                    <div class='dropdown-menu dropdown-menu-end'>
                      <a href='/profile' class='dropdown-item ai-icon'>
                        <svg
                          id='icon-user1'
                          class='text-primary'
                          width='18'
                          height='18'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          stroke-width='2'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        >
                          <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path>
                          <circle cx='12' cy='7' r='4'></circle>
                        </svg>
                        <span class='ms-2'>Profile </span>
                      </a>

                      <Link to={'/'} onClick={logOut}>
                        <a class='dropdown-item ai-icon'>
                          <svg
                            id='icon-logout'
                            class='text-danger'
                            width='18'
                            height='18'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            stroke-width='2'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                          >
                            <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'></path>
                            <polyline points='16 17 21 12 16 7'></polyline>
                            <line x1='21' y1='12' x2='9' y2='12'></line>
                          </svg>
                          <span class='ms-2'>Logout </span>
                        </a>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>

        <div class='deznav'>
          <div class='deznav-scroll'>
            <ul class='metismenu' id='menu'>
              {showAdminBoard && (
                <li>
                  <a href='/' class='has-arrow ai-icon' aria-expanded='false'>
                    <i class='flaticon-381-networking'></i>
                    <span class='nav-text'>Dashboard</span>
                  </a>
                </li>
              )}
              {showAdminBoard && (
                <li>
                  <a
                    href='/positions'
                    class='has-arrow ai-icon'
                    aria-expanded='false'
                  >
                    <i class='flaticon-381-television'></i>
                    <span class='nav-text'>Positions</span>
                  </a>
                </li>
              )}
              {showAdminBoard && (
                <li>
                  <a
                    href='salles'
                    class='has-arrow ai-icon'
                    aria-expanded='false'
                  >
                    <i class='flaticon-381-controls-3'></i>
                    <span class='nav-text'>Salles</span>
                  </a>
                </li>
              )}{' '}
              {showAdminBoard && (
                <li>
                  <a
                    href='/departements'
                    class='has-arrow ai-icon'
                    aria-expanded='false'
                  >
                    <i class='flaticon-381-internet'></i>
                    <span class='nav-text'>Départements</span>
                  </a>
                </li>
              )}{' '}
              {showAdminBoard && (
                <li>
                  <a
                    href='/patients'
                    class='has-arrow ai-icon'
                    aria-expanded='false'
                  >
                    <i class='flaticon-381-heart'></i>
                    <span class='nav-text'>Patients</span>
                  </a>
                </li>
              )}
              {showAdminBoard && (
                <li>
                  <a
                    href='/operations'
                    class='has-arrow ai-icon'
                    aria-expanded='false'
                  >
                    <i class='flaticon-381-notepad'></i>
                    <span class='nav-text'>Opérations</span>
                  </a>
                </li>
              )}{' '}
              {showAdminBoard && (
                <li>
                  <a
                    href='/users'
                    class='has-arrow ai-icon'
                    aria-expanded='false'
                  >
                    <i class='flaticon-381-network'></i>
                    <span class='nav-text'>Users</span>
                  </a>
                </li>
              )}
              {showAnalysteBoard && (
                <li>
                  <a
                    href='/position'
                    class='has-arrow ai-icon'
                    aria-expanded='false'
                  >
                    <i class='flaticon-381-network'></i>
                    <span class='nav-text'>Votre positions </span>
                  </a>
                </li>
              )}
              {showAnalysteBoard && (
                <li>
                  <a
                    href='/today'
                    class='has-arrow ai-icon'
                    aria-expanded='false'
                  >
                    <i class='flaticon-381-network'></i>
                    <span class='nav-text'>Today positions </span>
                  </a>
                </li>
              )}
            </ul>

            <div class='plus-box'>
              <p>Create new appointment</p>
            </div>
            <div class='copyright'>
              <p>
                <strong>Jendouba Hospital Admin Dashboard</strong> © 2021 All
                Rights Reserved
              </p>
              {/* <p>
                Made with <span class='heart'></span> by DexignZone
              </p> */}
            </div>
          </div>
        </div>

        <div class='content-body'>
          <div class='container-fluid'>
            <div class='form-head d-flex mb-3 mb-md-5 align-items-start flex-wrap justify-content-between'>
              <div class='me-auto d-lg-block'>
                <h3 class='text-primary font-w600'>Welcome to Mediqu!</h3>
                <p class='mb-0'>Hospital Admin Dashboard Template</p>
              </div>

              <div class='input-group search-area ms-auto d-inline-flex'></div>
            </div>
            <Routes>
              <Route exact path='/today' element={<Today />} />
              <Route exact path='/position' element={<Position />} />
              <Route
                exact
                path='/salleposition/:id'
                element={<SallePosition />}
              />
              <Route exact path='/' element={<Home />} />
              <Route exact path='/' element={<Home />} />
              <Route exact path='/infermiers' element={<ShowInfermiers />} />
              <Route exact path='/users' element={<ShowUsers />} />
              <Route exact path='/addusers' element={<Ajouter />} />
              <Route exact path='/edituser/:id' element={<EditUsers />} />
              <Route exact path='/positions' element={<ShowPositions />} />
              <Route
                exact
                path='/addpositions/:ids'
                element={<AddPositions />}
              />
              <Route exact path='/salles' element={<ShowSalles />} />
              <Route exact path='/addsalle' element={<AddSalles />} />
              <Route exact path='/editsalle/:id' element={<EditSalles />} />
              <Route exact path='/patients' element={<ShowPatients />} />
              <Route exact path='/addpatient' element={<AddPatients />} />
              <Route exact path='/editpatient/:id' element={<EditPatients />} />
              <Route
                exact
                path='/departements'
                element={<ShowDepartements />}
              />
              <Route
                exact
                path='/adddepartement'
                element={<AddDepartements />}
              />
              <Route
                exact
                path='/editdepartement/:id'
                element={<EditDepartements />}
              />

              <Route exact path='/operations' element={<ShowOperations />} />
              <Route exact path='/addoperation' element={<AddOperations />} />
              <Route
                exact
                path='/editoperation/:id'
                element={<EditOperations />}
              />
              <Route exact path='/register' element={<Register />} />
              <Route exact path='/profile' element={<Profile />} />

              <Route path='/user' element={<BoardUser />} />
            </Routes>
          </div>
        </div>

        <div class='footer'>
          <div class='copyright'>
            <p>
              Copyright © Designed &amp; Developed by{' '}
              <a href='http://dexignzone.com/' target='_blank'>
                DexignZone
              </a>{' '}
              2022
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
export default App
