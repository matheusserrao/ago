import React, {useState, useEffect} from 'react'
import moment from 'moment'
import timezone from 'moment-timezone'

const UpdateInformations = (props) => {

    const [informations, setInformations] = useState(props.currentInfo)

    const originalInformations = {...props.currentInfo}

    const handleInputChange = (event) => {
        
        let { name, value } = event.target

        setInformations({...informations, [name]: value})
    }

    useEffect( () => {
        setInformations(props.currentInfo)
    },[props])

    return (

            <form

                onSubmit={(event) => {

                event.preventDefault()

                const currentDate = moment().tz('America/Manaus').format('HH:mm')

                    console.log(originalInformations)

                if (originalInformations.fasting != informations.fasting){
                    informations.updateFasting = currentDate
                }

                if (originalInformations.afterBreakfast != informations.afterBreakfast){
                    informations.updateAfterBreakfast = currentDate
                }

                if (originalInformations.beforeLunch != informations.beforeLunch){
                    informations.updateBeforeLunch = currentDate
                }

                if (originalInformations.afterLunch != informations.afterLunch){
                    informations.updateAfterLunch = currentDate
                }

                if (originalInformations.beforeDinner != informations.beforeDinner){
                    informations.updateBeforeDinner = currentDate
                }

                if (originalInformations.afterDinner != informations.afterDinner){
                    informations.updateAfterDinner = currentDate
                }

                informations.fasting = Number(informations.fasting ?? 0)
                informations.afterBreakfast = Number(informations.afterBreakfast ?? 0)
                informations.beforeLunch    = Number(informations.beforeLunch ?? 0)
                informations.afterLunch     = Number(informations.afterLunch ?? 0)
                informations.beforeDinner   = Number(informations.beforeDinner ?? 0)
                informations.afterDinner    = Number(informations.afterDinner ?? 0)

                props.updateInformations(informations.id, informations)
            }}
            >
        
            <label>Data</label>
            <input
                type="date" 
                name="data"
                value={ moment(informations.data, 'DD/MM/YYYY').format('YYYY-MM-DD') }
                disabled={true}
                onChange={handleInputChange}
            />
            
            <label>Jejum</label>
            <input
                type="number"
                name="fasting"
                value={ informations.fasting}
                onChange={handleInputChange}
            />
            
            <label>Depois do jejum</label>
            <input
                type="number"
                name="afterBreakfast"
                value={informations.afterBreakfast }
                onChange={handleInputChange}
            />

            <label>Antes do almoço</label>
            <input
                type="number"
                name="beforeLunch"
                value={ informations.beforeLunch }
                onChange={handleInputChange}
            />

            <label>Depois do almoço</label>
            <input
                type="number"
                name="afterLunch"
                value={ informations.afterLunch }
                onChange={handleInputChange}
            />

            <label>Antes do jantar</label>
            <input
                type="number"
                name="beforeDinner"
                value={informations.beforeDinner}
                onChange={handleInputChange}
            />

            <label>Depois do jantar</label>
            <input
                type="number"
                name="afterDinner"
                value={informations.afterDinner}
                onChange={handleInputChange}
            />

            <div className="">
                  <button className="btn">Salvar alterações</button>
                  <button
                    className="btn"
                    onClick={() => {
                        props.setEditing(false)
                    }}
                  >
                      Cancelar alterações
                  </button>
              </div>
        
        </form>
    )
}

export default UpdateInformations