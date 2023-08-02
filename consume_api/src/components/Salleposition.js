import React, { useState, useEffect, useMemo, useRef } from 'react'

import PositionDataService from '../services/position.service'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTable } from 'react-table'
const SallePosition = (props) => {
    let { id } = useParams()
  const { user: currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [positions, setPositions] = useState([])
  const [searchDate, setSearchDate] = useState('')
  const positionsRef = useRef()
  positionsRef.current = positions
  const navigate = useNavigate()

  useEffect(() => {
    retrievePositions()
  }, [])

  const onChangeSearchDate = (e) => {
    const searchDate = e.target.value
    setSearchDate(searchDate)
  }

  const retrievePositions = (id) => {
  
    PositionDataService.getByEtat(12)
      .then((response) => {
        setPositions(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const refreshList = () => {
    retrievePositions()
  }
  const autoriser = (rowIndex) => {
    const id = positionsRef.current[rowIndex].id
    const x = 1

    PositionDataService.updatee(id, x)
      .then((response) => {
        alert('authoriser ce utilisateur ')
        refreshList()
      })
      .catch((e) => {
        console.log(e)
      })
    // return alert('voulez vous accepter ce rendez-vous ')
  }
  const removeAllUsers = () => {
    PositionDataService.deleteAll()
      .then((response) => {
        console.log(response.data)
        refreshList()
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const open = () => {
    navigate('/register/')
  }
  const openFacture = (rowIndex) => {
    //    const id = facturesRef.current[rowIndex].id
    // navigate('/editFacture/' + id)
    return alert('voulez vous supprimer ce utlisiateur ')
  }
  const columns = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Heure',
        accessor: 'heure',
      },
      {
        Header: 'patient',
        accessor: 'matricule',
      },
      {
        Header: 'type opération ',
        accessor: 'opnom',
      },

      {
        Header: 'Staff',
        accessor: 'staff',
      },
      {
        Header: 'infirmier',
        accessor: 'infermier',
      },
      {
        Header: 'médecin',
        accessor: 'medecin',
      },
      {
        Header: 'salle',
        accessor: 'idsalle',
      },

      // {
      //   Header: 'Actions',
      //   accessor: 'actions',
      //   Cell: (props) => {
      //     const rowIdx = props.row.id
      //     return (
      //      <>
      //      </>
      //       // <div class='d-flex'>
      //       //   <a href='#' class='btn btn-primary shadow btn-xs sharp me-1'>
      //       //     <i class='fas fa-pencil-alt'></i>
      //       //   </a>
      //       //   <a href='#' class='btn btn-danger shadow btn-xs sharp'>
      //       //     <i class='fa fa-trash'></i>
      //       //   </a>
      //       // </div>
      //     )
      //   },
      // },
    ],
    []
  )
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: positions,
    })
  return (
    <>
      <div class='container-fluid'>
        <div class='row'>
          <div class='col-lg-12'>
            <div class='card'>
              <div class='card-header'>
                <h4 class='card-title'>Position in salle </h4>
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
                                  className='text-center'
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
    </>
  )
}
export default SallePosition
