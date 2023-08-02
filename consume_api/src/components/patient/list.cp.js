import React, { useState, useEffect, useMemo, useRef } from 'react'
import PatientDataService from '../../services/patient.service'
import { Link, useNavigate } from 'react-router-dom'
import { useTable } from 'react-table'
import { useDispatch, useSelector } from 'react-redux'
// import { patient } from '../../../../app/models'
const ShowPatients = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth)
  const [patients, setPatients] = useState([])
  const [searchNom, setSearchNom] = useState('')
  const patientsRef = useRef()
  patientsRef.current = patients
  const navigate = useNavigate()

  useEffect(() => {
    retrievePatients()
  }, [])

  const onChangeSearchNom = (e) => {
    const searchNom = e.target.value
    setSearchNom(searchNom)
  }

  const retrievePatients = () => {
    PatientDataService.getAll()
      .then((response) => {
        setPatients(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const refreshList = () => {
    retrievePatients()
  }

  const removeAllPatients = () => {
    PatientDataService.deleteAll()
      .then((response) => {
        console.log(response.data)
        refreshList()
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const findByNom = () => {
    PatientDataService.findByNom(searchNom)
      .then((response) => {
        setPatients(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const deletePatient = (rowIndex) => {
    const id = patientsRef.current[rowIndex].id
    PatientDataService.delete(id)
      .then((response) => {
        navigate('/patients')
        let newPatients = [...patientsRef.current]
        newPatients.splice(rowIndex, 1)
        setPatients(newPatients)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const openPatient = (rowIndex) => {
    const id = patientsRef.current[rowIndex].id
    navigate('/editpatient/' + id)
  }
  const columns = useMemo(
    () => [
      {
        Header: 'Nom',
        accessor: 'nom',
      },
      {
        Header: 'Prénom',
        accessor: 'prenom',
      },
      {
        Header: 'Numéro',
        accessor: 'numero',
      },
      {
        Header: 'Matricule',
        accessor: 'matricule',
      },
      {
        Header: 'Etat',
        accessor: 'etat',
      },

      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: (props) => {
          const rowIdx = props.row.id
          return (
            <div class='d-flex'>
              <buttonon
                onClick={() => openPatient(rowIdx)}
                class='btn btn-primary shadow btn-xs sharp me-1'
              >
                <i class='fas fa-pencil-alt'></i>
              </buttonon>
              <button
                onClick={() => deletePatient(rowIdx)}
                class='btn btn-danger shadow btn-xs sharp'
              >
                <i class='fa fa-trash'></i>
              </button>
            </div>
          )
        },
      },
    ],
    []
  )
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: patients,
    })
  return (
    <div class='container-fluid'>
      <div>
        <ol class='breadcrumb'>
          <li class='breadcrumb-item active'>
            <a className='btn btn-success' href='/addpatient'>
              Add
            </a>
          </li>
        </ol>
      </div>
      <div class='row'>
        <div class='col-lg-12'>
          <div class='card'>
            <div class='card-header'>
              <h4 class='card-title'>Patients</h4>
            </div>
            <div class='card-body'>
              <div class='table-responsive'>
                <table class='table table-responsive-md' {...getTableProps()}>
                  <thead>
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th {...column.getHeaderProps()}>
                            {column.render('Header')}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                      prepareRow(row)
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => {
                            return (
                              <td
                                className='center'
                                {...cell.getCellProps()}
                              >
                                {cell.render('Cell')}
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ShowPatients
