import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PositionDataService from '../../services/position.service'
import PatientDataService from '../../services/patient.service'
import OperationDataService from '../../services/operation.service'
import SalleDataService from '../../services/salle.service'
import MedecinDataService from '../../services/medecin.service'
import StaffDataService from '../../services/staff.service'
import InfermierDataService from '../../services/infermier.service'
const AddPosition = () => {
  let { ids } = useParams()
  const { user: currentUser } = useSelector((state) => state.auth)

  //afficher les patients
  const [patients, setPatients] = useState([])
  const patientsRef = useRef()
  patientsRef.current = patients
  const [selectedPatient, setSelectedPatient] = useState(null)
  //afficher les operations
  const [operations, setOperations] = useState([])
  const operationsRef = useRef()
  operationsRef.current = operations
  const [selectedOperation, setSelectedOpertaion] = useState(null)
  //afficher les medecinss
  const [medecins, setMedecins] = useState([])
  const medecinRef = useRef()
  medecinRef.current = medecins
  const [selectedMedecin, setSelectedMedecin] = useState(null)
  //afficher les staffes
  const [staffes, setStaffes] = useState([])
  const staffeRef = useRef()
  staffeRef.current = staffes
  const [selectedStaffe, setSelectedStaffe] = useState(null)
  //afficher les infermiers
  const [infermiers, setInfermiers] = useState([])
  const infermierRef = useRef()
  infermierRef.current = infermiers
  const [selectedInfermier, setSelectedInfermier] = useState(null)

  const navigate = useNavigate()
  useEffect(() => {
    retrievePatients()
  }, [])
  useEffect(() => {
    retrieveOperations()
  }, [])

  useEffect(() => {
    retrieveMedecins()
  }, [])
  useEffect(() => {
    retrieveStaffes()
  }, [])
  useEffect(() => {
    retrieveInfermiers()
  }, [])
  const retrievePatients = () => {
    PatientDataService.getAll()
      .then((response) => {
        setPatients(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const retrieveOperations = () => {
    OperationDataService.getAll()
      .then((response) => {
        setOperations(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const retrieveMedecins = () => {
    MedecinDataService.getAll()
      .then((response) => {
        setMedecins(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  const retrieveStaffes = () => {
    StaffDataService.getAll()
      .then((response) => {
        setStaffes(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  const retrieveInfermiers = () => {
    InfermierDataService.getAll()
      .then((response) => {
        setInfermiers(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const refreshList = () => {
    retrieveOperations()
    retrievePatients()

    retrieveMedecins()
    retrieveStaffes()
    retrieveInfermiers()
  }
  const initialPositionState = {
    id: null,
    date: '',
    heure: '',
    etat: 0,
    idsalle: ids,
    idstaff: '',
    idinfermier: '',
    idmedecin: '',
    idpatient: '',
    idope: '',
  }
  const [position, setPosition] = useState(initialPositionState)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setPosition({ ...position, [name]: value })
  }
  const autoriser = (ids) => {
    const id = ids
    const x = 0
    SalleDataService.modifier(id, x)
  }
  const savePosition = () => {
    var data = {
      date: position.date,
      heure: position.heure,
      etat: position.etat,
      idsalle: position.idsalle,
      idstaff: selectedStaffe,
      idinfermier: selectedInfermier,
      idmedecin: selectedMedecin,
      idpatient: selectedPatient,
      idope: selectedOperation,
    }
    PositionDataService.create(data)
      .then((response) => {
        setPosition({
          id: response.data.id,
          date: response.data.date,
          heure: response.data.heure,
          etat: response.data.etat,
          idsalle: response.data.idsalle,
          idstaff: response.data.idstaff,
          idinfermier: response.data.idinfermier,
          idmedecin: response.data.idmedecin,
          idpatient: response.data.idpatient,
          idope: response.data.idope,
        })
        setSubmitted(true)
        autoriser(ids)
        navigate('/positions')
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const newPosition = () => {
    setPosition(initialPositionState)
    setSubmitted(false)
  }

  return (
    <>
      <div class='row'>
        <div class='col-xl-6 col-lg-12'>
          <div class='card'>
            <div class='card-header'>
              <h4 class='card-title'>Add Position</h4>
            </div>
            <div class='card-body'>
              <div class='basic-form'>
                <div class='row'>
                  <div class='mb-3 col-md-6'>
                    <label className='form-label' for='project-title-input'>
                      date
                    </label>
                    <input
                      type='date'
                      className='form-control'
                      id='date'
                      required
                      // value={this.state.titre}
                      value={position.date}
                      // onChange={this.onChangeTitre}
                      onChange={handleInputChange}
                      name='date'
                      aria-describedby='date'
                      placeholder='Enter position date'
                    />
                  </div>
                </div>
                <div class='row'>
                  <div class='mb-3 col-md-4'>
                    <label className='form-label' for='project-title-input'>
                      heure
                    </label>
                    <input
                      type='time'
                      className='form-control'
                      id='heure'
                      required
                      onChange={handleInputChange}
                      name='heure'
                      aria-describedby='heure'
                      value={position.heure}
                      placeholder='Enter position heure'
                    />
                  </div>
                </div>
                <div class='row'>
                  <div class='mb-3 col-md-4'>
                    <label htmlFor='idstaff'> staffes </label>
                    <select
                      className='form-control'
                      name='idstaff'
                      value={selectedStaffe}
                      onChange={(e) => setSelectedStaffe(e.target.value)}
                    >
                      <option value={null}>-- Select a staffe --</option>
                      {staffes.map((row, i) => {
                        return <option value={row.id}>{row.nom}</option>
                      })}
                    </select>
                  </div>
                </div>
                <div class='row'>
                  <div class='mb-3 col-md-4'>
                    <label htmlFor='idinfermier'> infermiers </label>
                    <select
                      className='form-control'
                      name='idinfermier'
                      onChange={(e) => setSelectedInfermier(e.target.value)}
                    >
                      <option value={null}>-- Select infermier --</option>
                      {infermiers.map((row, i) => {
                        return <option value={row.id}>{row.nom}</option>
                      })}
                    </select>
                  </div>
                </div>
                <div class='row'>
                  <div class='mb-3 col-md-4'>
                    <label htmlFor='idmedecin'> medecins </label>
                    <select
                      className='form-control'
                      name='idmedecin'
                      onChange={(e) => setSelectedMedecin(e.target.value)}
                    >
                      <option value={null}>-- Select medecin --</option>
                      {medecins.map((row, i) => {
                        return <option value={row.id}>{row.nom}</option>
                      })}
                    </select>
                  </div>
                </div>
                <div class='row'>
                  <div class='mb-3 col-md-4'>
                    <label htmlFor='idpatient'> patient </label>
                    <select
                      className='default-select form-control wide'
                      name='idpatient'
                      onChange={(e) => setSelectedPatient(e.target.value)}
                    >
                      <option value={null}>-- Select patient --</option>
                      {patients.map((row, i) => {
                        return <option value={row.id}>{row.nom}</option>
                      })}
                    </select>
                  </div>
                </div>
                <div class='row'>
                  <div class='mb-3 col-md-4'>
                    <label htmlFor='idpatient'> operation </label>
                    <select
                      className='default-select form-control wide'
                      name='idope'
                      onChange={(e) => setSelectedOpertaion(e.target.value)}
                    >
                      <option value={null}>-- Select operation --</option>
                      {operations.map((row, i) => {
                        return <option value={row.id}>{row.nom}</option>
                      })}
                    </select>
                  </div>
                </div>

                <div class='mb-1'></div>
                <button
                  type='submit'
                  onClick={savePosition}
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
export default AddPosition
