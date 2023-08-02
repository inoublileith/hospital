import React, { useState, useEffect, useMemo, useRef } from 'react'

import SalleDataService from '../../services/salle.service'
import { Link, useNavigate } from 'react-router-dom'
import { useTable } from 'react-table'


// afficher les salles 
const ShowSalles = (props) => {
  const [salles, setSalles] = useState([])
  const [searchDate, setSearchDate] = useState('')
  const sallesRef = useRef()
  sallesRef.current = salles
  const navigate = useNavigate()

  useEffect(() => {
    
    retrieveSalles()
  }, [])

  const onChangeSearchDate = (e) => {
    const searchDate = e.target.value
    setSearchDate(searchDate)
  }

  const retrieveSalles = () => {
    SalleDataService.getAll()
      .then((response) => {
        setSalles(response.data)
       
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const refreshList = () => {
     window.location.reload()
    retrieveSalles()
  }
 

  // delete all salles
  const removeAllSalles = () => {
    SalleDataService.deleteAll()
      .then((response) => {
        console.log(response.data)
        refreshList()
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const openposition = (id) => {
  const ids = id
    navigate('/addpositions/' + ids)
  }
    const openpositionsalle = (id) => {
      const ids = id
      navigate('/salleposition/' + ids)
    }
  const opensalle = (id) => {
    navigate('/editsalle/' + id)
  }
const deleteSalle = (id) => {

  SalleDataService.delete(id)
    .then((response) => {
      navigate('/salles')
       window.location.reload()
      let newSalles = [...sallesRef.current]
      newSalles.splice(id, 1)
      setSalles(newSalles)
    })
    .catch((e) => {
      console.log(e)
    })
 
}
  console.log(salles);

const SalleCard = ({ id, num, departement ,etat,nom}) => {
  return (
    <>
      {' '}
      <div class='col-xl-4'>
        <div class='card'>
          <img
            class='card-img-top img-fluid'
            src='assets/images/14fa09c0669ce6170911c39bb8709337-1303220651.jpg'
            alt='Card image cap'
          />
          <div class='card-header'>
            <h5 class='card-title'>Salle Num : {id}</h5>
          </div>
          <div class='card-body'>
            <p class='card-text'>
              {etat ? (
                <div></div>
              ) : (
                <p className='text-muted mb-0 me-2'>Team :</p>
              )}
            </p>
            <p>
              status :{' '}
              {etat ? (
                <div class='lampgreen'></div>
              ) : (
                <div class='lampred'></div>
              )}
            </p>
            <p>
              departement : <div class=''>{nom}</div>
              <div class=''></div>
            </p>
          </div>
          <div class='card-footer'>
            {etat ? (
              <div>
                <button
                  onClick={() => openposition(id)}
                  className='btn btn-success'
                >
                  ADD
                </button>{' '}
                <button
                  onClick={() => opensalle(id)}
                  className='btn btn-warning'
                >
                  Edit
                </button>{' '}
                <button
                  onClick={() => deleteSalle(id)}
                  className='btn btn-danger'
                >
                  Supprimer
                </button>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => openpositionsalle(id)}
                  className='btn btn-success'
                >
                  position
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
  return (
    <div class='container-fluid'>
      <div>
       
          <ol class='breadcrumb'>
            <li class='breadcrumb-item active'>
              <a className='btn btn-success' href='/addsalle'>
                Add 
              </a>
            </li>
          </ol>
        
      </div>
      <div class='row'>
        {[...salles].reverse().map((salle, i) => (
          <SalleCard key={i} {...salle} />
        ))}
      </div>
    </div>
  )
}
export default ShowSalles
