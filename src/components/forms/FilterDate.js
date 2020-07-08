import React, { useState } from 'react'
import moment from 'moment'
import swal from 'sweetalert'
import axios from 'axios'

const FilterDate = (props) => {
    
    const initialDate = moment().format('YYYY-MM-DD')
    const [startDate, setStartDate] = useState(initialDate)
    const [endDate, setEndDate] = useState(initialDate)

    const handlerInputStartDate = (event) => {
        const { value } = event.target
        setStartDate(value)
    }

    const handlerInputEndDate = async (event) => {

        const { value } = event.target

        const rangeValid = moment(value, 'YYYY-MM-DD').isBefore(moment(startDate, 'YYYY-MM-DD'))

        if (rangeValid){
            swal('Oops', 'Informe um intervalo válido: Data inicial deve ser menor ou igual a data final', 'error')
            return
        }

        setEndDate(value)

        const informationsData = await axios
                                        .get(`https://ago-backend.herokuapp.com/daily`, {
                                            params: {
                                                startDate: moment(startDate, 'YYYY-MM-DD').format('DD/MM/YYYY'),
                                                endDate: moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY')
                                            }
                                        })
                                        .then(response => {
                                            return response.data
                                        })
                                        .catch(error => {
                                            console.log(error)
                                            return []
                                        })

        props.setInformations(informationsData)

    }

    return (

        <div style={{display: 'flex', float: 'right', width: '50%'}}>

        
            <div className="flex-large" style={{textAlign: 'center'}}>
                        
                        <label>Data Inicial</label>
                        <input
                            type="date" 
                            name="data"
                            value={startDate}
                            onChange={handlerInputStartDate}
                            style={{width: '100%', textAlign: 'center'}}
                        />
            </div>
        

            <div className="flex-large" style={{textAlign: 'center'}}>
                        
                        <label>Data Final</label>
                        <input
                            type="date" 
                            name="data"
                            value={endDate}
                            onChange={handlerInputEndDate}
                            style={{width: '100%', textAlign: 'center'}}
                        />
            </div>

            


        </div>   

    )
}

export default FilterDate