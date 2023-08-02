import React, { useState, useEffect, useRef } from 'react'
import UserService from '../services/user.service'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MedecinDataService from '../services/medecin.service'
const Home = () => {
  const { user: currentUser } = useSelector((state) => state.auth)
  // if (!currentUser) {
  //   return navigate('/login')
  // }
   const [count, setCount] = useState(0)
  const [medecin, setMedecin] = useState(0)
  const [staff, setStaff] = useState(0)
  const [infermier, setInfermier] = useState(0)
  const [operation, setOperation] = useState(0)
  const [year, setYear] = useState(0)
  const [month, setMonth] = useState(0)
  const [date, setDate] = useState(0)
  const [content, setContent] = useState('en chargement!!')
  useEffect(() => {
    MedecinDataService.getCountAllYear()
      .then((res) => {
        const totalCount = res.data
        setYear(totalCount)
      })
      .catch((err) => console.error(err))
  }, [])
  useEffect(() => {
    MedecinDataService.getCountAllDate()
      .then((res) => {
        const totalCount = res.data
        setDate(totalCount)
      })
      .catch((err) => console.error(err))
  }, [])
  useEffect(() => {
    MedecinDataService.getCountAllMonth()
      .then((res) => {
        const totalCount = res.data
        setMonth(totalCount)
      })
      .catch((err) => console.error(err))
  }, [])
  useEffect(() => {
    MedecinDataService.getCountAllOperation()
      .then((res) => {
        const totalCount = res.data
        setOperation(totalCount)
      })
      .catch((err) => console.error(err))
  }, [])
  useEffect(() => {
    MedecinDataService.getCountAllInfermier()
      .then((res) => {
        const totalCount = res.data
        setInfermier(totalCount)
      })
      .catch((err) => console.error(err))
  }, [])
  useEffect(() => {
    MedecinDataService.getCountAllStaff()
      .then((res) => {
        const totalCount = res.data
        setStaff(totalCount)
      })
      .catch((err) => console.error(err))
  }, [])
  useEffect(() => {
    MedecinDataService.getCountAllMedecin()
      .then((res) => {
        const totalCount = res.data
        setMedecin(totalCount)
      })
      .catch((err) => console.error(err))
  }, [])
  useEffect(() => {
    MedecinDataService.getCountAll()
      .then((res) => {
        const totalCount = res.data
        setCount(totalCount)
      })
      .catch((err) => console.error(err))
  }, [])
  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data)
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString()
        setContent(_content)
      }
    )
  }, [])
  return (
    <div class='row'>
      <div class='col-xl-6 col-xxl-6'>
        <div class='row'>
          <div class='col-xl-10 col-xxl-10 col-lg-10 col-md-10'>
            <div class='card'>
              <div class='card-header border-0 pb-0'>
                <h4 class='card-title'>Total opérations</h4>
                <div class='dropdown ms-auto'>
                  <div class='btn-link' data-bs-toggle='dropdown'></div>
                  <div class='dropdown-menu dropdown-menu-end'></div>
                </div>
              </div>
              <div class='card-body pb-0'>
                <div class='recovered-chart-deta d-flex flex-wrap'>
                  <div class='col mb-4'>
                    <span class='bg-danger'></span>
                    <div>
                      <p>ALL</p>
                      <h5>{operation}</h5>
                    </div>
                  </div>
                  <div class='col mb-4'>
                    <span class='bg-danger'></span>
                    <div>
                      <p> YEAR</p>
                      <h5>{year}</h5>
                    </div>
                  </div>
                  <div class='col mb-4'>
                    <span class='bg-success'></span>
                    <div>
                      <p> MONTH</p>
                      <h5>{month}</h5>
                    </div>
                  </div>
                  <div class='col mb-4'>
                    <span class='bg-success'></span>
                    <div>
                      <p>TODAY</p>
                      <h5>{date}</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div class='card-body pt-0 px-3 pb-3'>
               
              </div>
            </div>
          </div>
          <div class='col-xl-6 col-xxl-6 col-lg-6 col-md-6'></div>
          <div class='col-xl-12 col-xxl-12 col-lg-12 col-md-12'>
            <div class='card'>
              <div class='card-header border-0 pb-0'>
                <h4 class='card-title'>Patients (%)</h4>
             <></>
              </div>
              <div class='card-body pt-2'>
                <h4 class='text-dark font-w400'>Total Patient</h4>
                <h3 class='text-primary font-w600'>562,084 People</h3>
                <div class='row mx-0 align-items-center'>
                  <div class='col-sm-8 col-md-7  px-0 col-xxl-12'>
                    <div id='chartCircle'></div>
                  </div>
                  <div class='col-sm-4 col-md-5 px-0 col-xxl-12'>
                    <div class='patients-chart-deta'>
                      <div class='col px-0'>
                        <span class='bg-danger'></span>
                        <div>
                          <p>New</p>
                          <h3>64%</h3>
                        </div>
                      </div>
                      <div class='col px-0'>
                        <span class='bg-success'></span>
                        <div>
                          <p>Recovered</p>
                          <h3>73%</h3>
                        </div>
                      </div>
                      <div class='col px-0'>
                        <span class='bg-warning'></span>
                        <div>
                          <p>Treatment</p>
                          <h3>48%</h3>
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
      <div class='col-xl-6 col-xxl-6'>
        <div class='row'>
          <div class='col-xl-6 col-lg-3 col-sm-6'>
            <div class='app-stat card bg-danger'>
              <div class='card-body  p-4'>
                <div class='media flex-wrap'>
                  <span class='me-3'>
                    <i class='flaticon-381-user-7'></i>
                  </span>
                  <div class='media-body text-white text-end'>
                    <p class='mb-1'> les anesthésistes</p>
                    <h3 class='text-white'> {staff}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class='col-xl-6 col-lg-3 col-sm-6'>
            <div class='app-stat card bg-success'>
              <div class='card-body p-4'>
                <div class='media flex-wrap'>
                  <span class='me-3'>
                    <i class='flaticon-381-user-7'></i>
                  </span>
                  <div class='media-body text-white text-end'>
                    <p class='mb-1 text-nowrap'>les chirurgiens</p>
                    <h3 class='text-white'> {medecin}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class='col-xl-6 col-lg-3 col-sm-6'>
            <div class='app-stat card bg-info'>
              <div class='card-body p-4'>
                <div class='media flex-wrap'>
                  <span class='me-3'>
                    <i class='flaticon-381-user-7'></i>
                  </span>
                  <div class='media-body text-white text-end'>
                    <p class='mb-1 text-nowrap'> les Infermiers</p>
                    <h3 class='text-white'> {infermier}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class='col-xl-6 col-lg-3 col-sm-6'>
            <div class='app-stat card bg-primary'>
              <div class='card-body p-4'>
                <div class='media flex-wrap'>
                  <span class='me-3'>
                    <i class='flaticon-381-user-7'></i>
                  </span>
                  <div class='media-body text-white text-end'>
                    <p class='mb-1'> Staffes médical</p>
                    <h3 class='text-white'> {count}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class='row'>
          <div class='col-xl-12 col-xxl-12 col-lg-12 col-md-12'>
            <div class='card'>
              <div class='card-header border-0 pb-0'>
                <h4 class='card-title'>Revenue</h4>
                <select
                  class='default-select style-1'
                  aria-label='Default select example'
                >
                  <option selected>2022</option>
                  <option value='1'>2023</option>
                  <option value='2'>2024</option>
                </select>
              </div>
              <div class='card-body pt-2'>
                <h3 class='text-primary font-w600'>
                  $41,512k <small class='text-dark ms-2'>$25,612k</small>
                </h3>
                <div id='chartBar'></div>
              </div>
            </div>
          </div>
          <div class='col-12'>
          
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home
