import React, { useState, useEffect, useMemo, useRef } from 'react'
import InfermierDataService from '../../services/infermier.service'
import { Link, useNavigate } from 'react-router-dom'
import { useTable } from 'react-table'
import { useDispatch, useSelector } from 'react-redux'
const ShowInfermiers = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth)
  const [infermiers, setInfermiers] = useState([])
  const [searchNom, setSearchNom] = useState('')
  const infermierRef = useRef()
  infermierRef.current = infermiers
  const navigate = useNavigate()

  useEffect(() => {
    retrieveInfermiers()
  }, [])

  // const onChangeSearchNom = (e) => {
  //   const searchNom = e.target.value
  //   setSearchNom(searchNom)
  // }

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
    retrieveInfermiers()
  }

  // const removeAllDepartements = () => {
  //   MedecinDataService.deleteAll()
  //     .then((response) => {
  //       console.log(response.data)
  //       refreshList()
  //     })
  //     .catch((e) => {
  //       console.log(e)
  //     })
  // }

  // const findByNom = () => {
  //   MedecinDataService.findByNom(searchNom)
  //     .then((response) => {
  //       setMedecins(response.data)
  //     })
  //     .catch((e) => {
  //       console.log(e)
  //     })
  // }

  
  // const deleteInfermier = (rowIndex) => {
  //   const id = infermiersRef.current[rowIndex].id
  //   MedecinDataService.delete(id)
  //     .then((response) => {
  //       navigate('/infermiers')
  //       let newInfermiers = [...infermiersRef.current]
  //       newInfermiers.splice(rowIndex, 1)
  //       setMedecins(newInfermiers)
  //     })
  //     .catch((e) => {
  //       console.log(e)
  //     })
  // }

  // const openDepartement = (rowIndex) => {
  //   const id = departementsRef.current[rowIndex].id
  //   navigate('/editdepartement/' + id)
  // }
  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'Nom',
        accessor: 'nom',
      },

      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: (props) => {
          const rowIdx = props.row.id
          return (
            <div className='row-actions'>
              <button
                // onClick={() => openDepartement(rowIdx)}
                className='m-3 btn btn-sm btn-success'
              >
                Modifier
              </button>

              <button
                // onClick={() => deleteDepartement(rowIdx)}
                className='m-3 btn btn-sm btn-danger'
              >
                Supprimer
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
      data: infermiers,
    })
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-12'>
          <div className='page-title-box d-sm-flex align-items-center justify-content-between'>
            <h4 className='mb-sm-0'>les utilisateurs</h4>

            <div className='page-title-right'>
              <ol className='breadcrumb m-0'>
                <li className='breadcrumb-item'>
                  <a href='javascript: void(0);'>Tables</a>
                </li>
                <li className='breadcrumb-item active'>Datatables</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div>
          <a href='/adddepartement' className='btn btn-success'>
            <i className='ri-add-line align-bottom me-1'></i> Add New
          </a>
        </div>
      </div>
      <br></br>

      <div className='row'>
        <div className='col-lg-12'>
          <div className='card'>
            <div className='card-header'>
              <h5 className='card-title mb-0'>Basic Datatables</h5>
            </div>
            <div className='card-body'>
              <table
                id='example'
                className='table table-bordered dt-responsive nowrap table-striped align-middle'
                {...getTableProps()}
              >
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          className='text-center'
                          {...column.getHeaderProps()}
                        >
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
  )
}
export default ShowInfermiers
