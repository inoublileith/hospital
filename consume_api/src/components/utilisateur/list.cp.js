import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
 
} from 'react'

import UtilisateurDataService from '../../services/utilisateur.service'
import { Link, useNavigate } from 'react-router-dom'
import { useTable } from 'react-table'
const ShowUsers = (props) => {
  const [users, setUsers] = useState([])
  const [searchDate, setSearchDate] = useState('')
  const usersRef = useRef()
  usersRef.current = users
  const navigate = useNavigate()

  useEffect(() => {
    retrieveUsers()
  }, [])

  const onChangeSearchDate = (e) => {
    const searchDate = e.target.value
    setSearchDate(searchDate)
  }

  const retrieveUsers = () => {
    UtilisateurDataService.getAll()
      .then((response) => {
        setUsers(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const refreshList = () => {
    retrieveUsers()
  }
  const autoriser = (rowIndex) => {
    const id = usersRef.current[rowIndex].id
    const x = 1

    UtilisateurDataService.updatee(id, x)
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
    UtilisateurDataService.deleteAll()
      .then((response) => {
        console.log(response.data)
        refreshList()
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const openUser = (rowIndex) => {
    const id = usersRef.current[rowIndex].id
    navigate('/edituser/' + id)
  }
  const deleteUser = (id) => {
    UtilisateurDataService.delete(id)
      .then((response) => {
        // navigate('/users')
        window.location.reload()
        let newUsers = [...usersRef.current]
        newUsers.splice(id, 1)
        setUsers(newUsers)
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
        Header: 'Nom',
        accessor: 'nom',
      },
      {
        Header: 'Prénom',
        accessor: 'prenom',
      },
      {
        Header: 'Téléphone',
        accessor: 'tel',
      },
      {
        Header: 'Email ',
        accessor: 'email',
      },

      {
        Header: 'profil',
        accessor: 'profil',
      },
      {
        Header: 'adresse',
        accessor: 'adresse',
      },

      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: (props) => {
          const rowIdx = props.row.id
          return (
            <div class='d-flex'>
              <button
                onClick={() => openUser(rowIdx)}
                class='btn btn-primary shadow btn-xs sharp me-1'
              >
                <i class='fas fa-pencil-alt'></i>
              </button>
              <button
                onClick={() => deleteUser(rowIdx)}
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
      data: users,
    })
  return (
    <div class='container-fluid'>
      <div>
        <ol class='breadcrumb'>
          <li class='breadcrumb-item active'>
            <a className='btn btn-success' href='/addusers'>
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
                              <td className='center' {...cell.getCellProps()}>
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
export default ShowUsers

