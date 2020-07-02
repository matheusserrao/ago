import React, { useState } from 'react'
import moment from 'moment'
import HistoryTable from './components/tables/HistoryTable'

import './index.css'
import AddInformations from './components/forms/AddInformations'
import UpdateInformations from './components/forms/UpdateInformations'

const App = () => {

  const informationsData = [
     { id: 1, data: '20/06/2020', fasting: 80, afterBreakfast: 100, beforeLunch: 110, afterLunch: 120, beforeDinner: 80, afterDinner: 100 },
     { id: 2, data: '21/06/2020', fasting: 90, afterBreakfast: 95, beforeLunch: 110, afterLunch: 120, beforeDinner: 80, afterDinner: 100 },
     
  ]

  const [informations, setInformations] = useState(informationsData)

  const deleteInformation = (id) => { 
    setInformations(informations.filter( info => info.id != id))
  }

  const addInformation = (information) => {

      const found = informations.find(i => {
        return i.data == information.data
      })

      if (found){
        return { status: false, message: 'Data já lançada'}
      }

      try {
        
         information['id'] = informations.length + 1

          const infos = [...informations, information]

          const orded = infos.sort((a,b) => {
            return moment(b.data, 'DD/MM/YYYY').diff( moment(a.data, 'DD/MM/YYYY') )
          })

          setInformations(orded)
        
          return {status: true, message: 'Sucesso'}

      } catch (error) {
        console.log(error)
        return {status: false, message: error.message}
      }
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