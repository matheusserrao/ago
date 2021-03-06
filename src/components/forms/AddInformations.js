import React, {useState, useEffect} from 'react'
import moment from 'moment'
import timezone from 'moment-timezone'
import swal from 'sweetalert'

const AddInformations = (props) => {

    const initialFormState = { 
                                data: '', 
                                fasting: '', 
                                updateFasting: '',
                                afterBreakfast: '', 
                                updateAfterBreakfast: '',
                                beforeLunch: '', 
                                updateBeforeLunch: '',
                                afterLunch: '', 
                                updateAfterLunch: '',
                                beforeDinner: '', 
                                updateBeforeDinner: '',
                                afterDinner: '',
                                updateAfterDinner: '',
                                
                            }

    const [ disabledBtnAdd, setDisabledBtnAdd ] = useState(false)

    const [informations, setInformations] = useState(initialFormState)

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setInformations({...informations, [name]: value})
    }

    return (

            <form

                onSubmit={ (event) => {

                event.preventDefault()

                if (!informations.data) {
                    swal('Informe uma data')
                    return
                }

                const dataUTC = moment(new Date(`${informations.data}`), 'aaaa-mm-dd').utc().format('DD/MM/YYYY')

                if (dataUTC === 'Invalid date'){
                    swal('Oops','Data inválida', 'error')
                    return
                }

                setDisabledBtnAdd(true)

                try{
                    
                    informations.fasting        = Number(informations.fasting ?? 0)
                    informations.afterBreakfast = Number(informations.afterBreakfast ?? 0)
                    informations.beforeLunch    = Number(informations.beforeLunch ?? 0)
                    informations.afterLunch     = Number(informations.afterLunch ?? 0)
                    informations.beforeDinner   = Number(informations.beforeDinner ?? 0)
                    informations.afterDinner    = Number(informations.afterDinner ?? 0)
    
                    const currentDate = moment().tz('America/Manaus').format('HH:mm')
    
                    informations.updateFasting = currentDate
                    informations.updateAfterBreakfast = currentDate
                    informations.updateBeforeLunch = currentDate
                    informations.updateAfterLunch = currentDate
                    informations.updateBeforeDinner = currentDate
                    informations.updateAfterDinner = currentDate
    
                    informations.data = dataUTC
    
                    props.addInformation(informations)
                        .then(response => {
    
                        const { status, message } = response
    
                        if (status){
                            swal('Sucesso!', message, 'success')
                            setInformations(initialFormState)
                        }else{
                            swal('Oops!', message, 'error')
                        }

                        setDisabledBtnAdd(false)
                    })

                }catch(error){
                    setInformations(initialFormState)

                    setDisabledBtnAdd(false)
                }
            }}
            >
        
            <label>Data</label>
            <input
                type="date" 
                name="data"
                value={informations.data}
                onChange={handleInputChange}
            />
            
            <label>Jejum</label>
            <input
                type="number"
                name="fasting"
                min="0"
                max="1500"
                value={informations.fasting}
                onChange={handleInputChange}
            />
            
            <label>Depois do jejum</label>
            <input
                type="number"
                name="afterBreakfast"
                min="0"
                max="1500"
                value={informations.afterBreakfast}
                onChange={handleInputChange}
            />

            <label>Antes do almoço</label>
            <input
                type="number"
                name="beforeLunch"
                min="0"
                max="1500"
                value={informations.beforeLunch}
                onChange={handleInputChange}
            />

            <label>Depois do almoço</label>
            <input
                type="number"
                name="afterLunch"
                min="0"
                max="1500"
                value={informations.afterLunch}
                onChange={handleInputChange}
            />

            <label>Antes do jantar</label>
            <input
                type="number"
                name="beforeDinner"
                min="0"
                max="1500"
                value={informations.beforeDinner}
                onChange={handleInputChange}
            />

            <label>Depois do jantar</label>
            <input
                type="number"
                name="afterDinner"
                min="0"
                max="1500"
                value={informations.afterDinner}
                onChange={handleInputChange}
            />

            <button className="btn" disabled={disabledBtnAdd}>Adicionar</button>
        
        </form>
    )
}

export default AddInformations