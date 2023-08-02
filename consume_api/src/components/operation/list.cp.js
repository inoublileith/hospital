import React, { useState, useEffect, useMemo, useRef } from 'react'
import OperationDataService from '../../services/operation.service'
import { Link, useNavigate } from 'react-router-dom'
import { useTable } from 'react-table'
import { useDispatch, useSelector } from 'react-redux'
const ShowOperations = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth)
  const [operations, setOperations] = useState([])
  const [searchNom, setSearchNom] = useState('')
  const operationsRef = useRef()
  operationsRef.current = operations
  const navigate = useNavigate()

  useEffect(() => {
    retrieveOperations()
  }, [])

  const onChangeSearchNom = (e) => {
    const searchNom = e.target.value
    setSearchNom(searchNom)
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

  const refreshList = () => {
    retrieveOperations()
  }

  const removeAllOperations = () => {
    OperationDataService.deleteAll()
      .then((response) => {
        console.log(response.data)
        refreshList()
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const findByNom = () => {
    OperationDataService.findByNom(searchNom)
      .then((response) => {
        setOperations(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const deleteOperation = (rowIndex) => {
    const id = operationsRef.current[rowIndex].id
    OperationDataService.delete(id)
      .then((response) => {
        navigate('/operations')
        let newOperations = [...operationsRef.current]
        newOperations.splice(rowIndex, 1)
        setOperations(newOperations)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const openOperation = (rowIndex) => {
    const id = operationsRef.current[rowIndex].id
    navigate('/editoperation/' + id)
  }
  const columns = useMemo(
    () => [
      {
        Header: 'Nom',
        accessor: 'nom',
      },
      {
        Header: 'Definition',
        accessor: 'def',
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
                onClick={() => openOperation(rowIdx)}
                class='btn btn-primary shadow btn-xs sharp me-1'
              >
                <i class='fas fa-pencil-alt'></i>
              </buttonon>
              <button
                onClick={() => deleteOperation(rowIdx)}
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
      data: operations,
    })
  return (
    <div class='container-fluid'>
      <div>
        <ol class='breadcrumb'>
          <li class='breadcrumb-item active'>
            <a className='btn btn-success' href='/addoperation'>
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
export default ShowOperations
