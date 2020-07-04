import React, { useState, useEffect } from 'react'
import moment from 'moment'
import axios from 'axios'
import swal from 'sweetalert'

import HistoryTable from './components/tables/HistoryTable'

import './index.css'
import AddInformations from './components/forms/AddInformations'
import UpdateInformations from './components/forms/UpdateInformations'

const App = () => {

  const [informations, setInformations] = useState([])

  const loadHistory = async () => {
    const informationsData = await axios
    .get('https://ago-backend.herokuapp.com/daily')
    .then(response => {
       console.log(response)
       return response.data
    })
    .catch(error => {
      console.log(error)
      return []
    })

    setInformations(informationsData)
  }

  useEffect(() => {
    loadHistory()
  }, [])

  const deleteInformation = (id) => { 
    //setInformations(informations.filter( info => info._id != id))

    if (!id){
      swal('Oops', 'ID é inválido', 'error')
      return
    }

    swal({
      title: 'Tem certeza?',
      text: 'Uma vez deletado, você perderá esta informação.',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {

      if (willDelete) {

        axios.delete(`https://ago-backend.herokuapp.com/daily/${id}`).then(response => {

          console.log('response delete', response)

          loadHistory()

          swal('Deletado com sucesso!', {
            icon: "success",
          })

        })
       
      } else {
        swal('Cancelado')
      }
    })

  }

  const addInformation = async(information) => {

      const found = informations.find(i => {
        return i.data == information.data
      })

      if (found){
        return { status: false, message: 'Data já lançada'}
      }

        /*
          const infos = [...informations, information]

          const orded = infos.sort((a,b) => {
            return moment(b.data, 'DD/MM/YYYY').diff( moment(a.data, 'DD/MM/YYYY') )
          })

          setInformations(orded)*/

      const response = await axios
                  .post('https://ago-backend.herokuapp.com/daily', {...information})
                  .then(response => {
                        loadHistory()
                        return {status: true, message: 'Sucesso'}
                  })
                  .catch(error => {
                    const obj = {error}
                    return {status: false, message: obj.error.response.data}

                  })

      return response
  }

  const updateInformations =(id, newInformations) => {

    setEditing(false)
    setInformations(informations.map( (info) => {
        return (info.id === id ? newInformations : info )
    }))
  }

  const [editing, setEditing] = useState(false)
  const initialFormState = { data: '', fasting: '', afterBreakfast: '', beforeLunch: '', afterLunch: '', beforeLunch: '', beforeDinner: '', afterDinner: '' }
  const [currentInfo, setCurrentInfo] = useState(initialFormState)

  const editRow = (informations = {}, value) => {
    if (value){
      setEditing(true)
      setCurrentInfo({...informations})
    }else{
      setEditing(false)
      setCurrentInfo({ data: '', fasting: '', afterBreakfast: '', beforeLunch: '', afterLunch: '', beforeLunch: '', beforeDinner: '', afterDinner: '' })
    }
  }

  return (
    <div className="container">
      <h1>Acompanhamento Glicose Online - AGO</h1>
      <div className="flex-row">
          <div className="flex-buttons">
              <h4>{editing ? `Editando Informação: ${currentInfo.data}  ` : 'Registrar Nova Informação'}</h4>

              { editing ? 
                <UpdateInformations currentInfo={currentInfo} setEditing={setEditing} updateInformations={updateInformations} />
              :
                <AddInformations addInformation={addInformation} editing={editing} setEditing={setEditing}/>
              }

          </div>
          
       <div className="flex-large" >
          <h4>Histórico</h4>
          <HistoryTable informations={informations} deleteInformation={deleteInformation} editRow={editRow}/>
        </div>

      </div>
    
    </div>

  
  )
}

export default App