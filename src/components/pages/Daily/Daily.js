import React, { useState, useEffect } from 'react'
import './home.css'

import moment from 'moment'
import axios from 'axios'
import swal from 'sweetalert'

import HistoryTable from '../../tables/HistoryTable'
import AddInformations from '../../forms/AddInformations'
import UpdateInformations from '../../forms/UpdateInformations'
import FilterDate from '../../forms/FilterDate'

const Daily = () => {

  const [informations, setInformations] = useState([])

  const loadHistory = async () => {

    const today = moment()

    const startDate = today.clone().subtract('days', 10).format('DD/MM/YYYY')
    const endDate = today.format('DD/MM/YYYY')
    
    //https://ago-backend.herokuapp.com/daily
    const informationsData = await axios
                                    .get(`https://ago-backend.herokuapp.com/daily`, {
                                      params: {
                                        startDate,
                                        endDate
                                      }
                                    })
                                    .then(response => {
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

  const updateInformations = async (id, newInformations) => {

    await axios
            .patch(`https://ago-backend.herokuapp.com/daily/${id}`, newInformations)
            .then(response => {
              swal('Sucesso', 'Alterações salvas com sucesso', 'success')
              setEditing(false)
              loadHistory()
            })
            .catch(error => {
              console.log(error)
              swal('Oops', 'Ocorreu um error ao atualizar', 'error')

            })
    
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
          
       <div className="flex-large">
          <h3 style={{textAlign: 'center', marginTop: 0}}>Histórico</h3>
          <FilterDate setInformations={setInformations}/>
          <HistoryTable informations={informations} deleteInformation={deleteInformation} editRow={editRow}/>
          
        </div>

      </div>
    
    </div>

  
  )
}

export default Daily