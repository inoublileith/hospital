import React, { useState, useEffect, useMemo, useRef } from 'react'
import DepartementDataService from '../../services/departement.service'
import { Link, useNavigate } from 'react-router-dom'
import { useTable } from 'react-table'
import { useDispatch, useSelector } from 'react-redux'
const ShowDepartements = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth)
  const [departements, setDepartements] = useState([])
  const [searchNom, setSearchNom] = useState('')
  const departementsRef = useRef()
  departementsRef.current = departements
  const navigate = useNavigate()

  useEffect(() => {
    retrieveDepartements()
  }, [])

  const onChangeSearchNom = (e) => {
    const searchNom = e.target.value
    setSearchNom(searchNom)
  }

  const retrieveDepartements = () => {
    DepartementDataService.getAll()
      .then((response) => {
        setDepartements(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const refreshList = () => {
    retrieveDepartements()
  }

  const removeAllDepartements = () => {
    DepartementDataService.deleteAll()
      .then((response) => {
        console.log(response.data)
        refreshList()
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const findByNom = () => {
    DepartementDataService.findByNom(searchNom)
      .then((response) => {
        setDepartements(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const deleteDepartement = (rowIndex) => {
    const id = departementsRef.current[rowIndex].id
    DepartementDataService.delete(id)
      .then((response) => {
        navigate('/departements')
        let newDepartements = [...departementsRef.current]
        newDepartements.splice(rowIndex, 1)
        setDepartements(newDepartements)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const openDepartement = (rowIndex) => {
    const id = departementsRef.current[rowIndex].id
    navigate('/editdepartement/' + id)
  }
  const columns = useMemo(
    () => [
      {
        Header: 'Matricule',
        accessor: 'matricule',
      },
      {
        Header: 'Nom',
        accessor: 'nom',
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
                onClick={() => openDepartement(rowIdx)}
                class='btn btn-primary shadow btn-xs sharp me-1'
              >
                <i class='fas fa-pencil-alt'></i>
              </buttonon>
              <button
                onClick={() => deleteDepartement(rowIdx)}
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
      data: departements,
    })
  return (
    <div class='container-fluid'>
      <ol class='breadcrumb'>
        <li class='breadcrumb-item active'>
          <a className='btn btn-success' href='/adddepartement'>
            Add
          </a>
        </li>
      </ol>

      <div class='row'>
        <div class='col-lg-12'>
          <div class='card'>
            <div class='card-header'>
              <h4 class='card-title'>Départements</h4>
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
export default ShowDepartements
