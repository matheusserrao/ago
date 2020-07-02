import React, { useState, useEffect } from 'react'
import SweetAlert from 'react-bootstrap-sweetalert';
import moment from 'moment'

const HistoryTable = (props) => {

    const [alertRemove, setAlertRemove] = useState(false)
    const [idSelected, setIdSelected] = useState(-1)

    return ((

        <table>
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Jejum</th>
                    <th>2h depois</th>
                    <th>Antes do almoço</th>
                    <th>2h depois</th>
                    <th>Antes da janta</th>
                    <th>2h depois</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>

               
    
                {props.informations.length ? (
                   props.informations.map((info) => (
                    
                    <tr key={info.id} className={

                        (moment(info.data, 'DD/MM/YYYY').isSame(new Date, 'day')) ? 
                        
                        "tr-today"
                        :
                        ""
                     }>
                        <td>{info.data}</td>
                      
                        <td><a href="#" title={info.updateFasting || '-'} className={"a-value " + (info.fasting <= 110 ? "td-good" : (info.fasting >= 111 && info.fasting <= 200) ? "td-attention": "td-danger")}>{info.fasting}</a></td>
                        <td><a href="#" title={info.updateAfterBreakfast || '-'} className={"a-value " + (info.afterBreakfast <= 110 ? "td-good" : (info.afterBreakfast >= 111 && info.afterBreakfast <= 200) ? "td-attention": "td-danger")}>{info.afterBreakfast}</a></td>
                        <td><a href="#" title={info.updateBeforeLunch || '-'} className={"a-value " + (info.beforeLunch <= 110 ? "td-good" : (info.beforeLunch >= 111 && info.beforeLunch <= 200) ? "td-attention": "td-danger")}>{info.beforeLunch}</a></td>
                        <td><a href="#" title={info.updateAfterLunch || '-'} className={"a-value " + (info.afterLunch <= 110 ? "td-good" : (info.afterLunch >= 111 && info.afterLunch <= 200) ? "td-attention": "td-danger")}>{info.afterLunch}</a></td>
                        <td><a href="#" title={info.updateBeforeDinner || '-'} className={"a-value " + (info.beforeDinner <= 110 ? "td-good" : (info.beforeDinner >= 111 && info.beforeDinner <= 200) ? "td-attention": "td-danger")}>{info.beforeDinner}</a></td>
                        <td><a href="#" title={info.updateAfterDinner || '-'}  className={"a-value " + (info.afterDinner <= 110 ? "td-good" : (info.afterDinner >= 111 && info.afterDinner <= 200) ? "td-attention": "td-danger")}>{info.afterDinner}</a></td>

                        <td>
                            <button
                            
                                className="button muted-button"
                                onClick={() => props.editRow(info, true)}
                                >
                                Editar
                            </button>
                            <button
                                 onClick={() => {
                                    setIdSelected(info.id)
                                    setAlertRemove(true)
                                    props.deleteInformation(info.id)
                                 }}
                                 className="button muted-button"
                             >            
                             X        
                             </button>
                        </td>
                    </tr>
          
                   ))
                ): (
                    <tr>
                        <td colSpan={3}> Nenhuma informação</td>
                    </tr>
                )
                }
            </tbody>
            <tfoot>
                <tr>
                    <th>
                        MÉDIAS
                    </th>
                     <th>
                        {
                            
                            Number(props.informations.reduce((counter, current) => counter + current.fasting, 0) / props.informations.reduce((counter, current) => {
                                if (current.fasting >= 0)
                                   return counter + 1
                            }, 0)).toFixed(2)
                            
                        }
                    </th>
                    <th>
                        {
                            Number(props.informations.reduce((counter, current) => counter + current.afterBreakfast, 0) / (props.informations.reduce((counter, current) => {
                                if (current.afterBreakfast >= 0)
                                   return counter + 1
                            }, 0)).toFixed(2) )
                        }
                    </th>
                    <th>
                        {
                            Number(props.informations.reduce((counter, current) => counter + current.beforeLunch, 0)  / props.informations.reduce((counter, current) => {
                                if (current.beforeLunch >= 0)
                                   return counter + 1
                            }, 0)).toFixed(2)
                        }
                    </th>
                    <th>
                        {
                            Number(props.informations.reduce((counter, current) => counter + current.afterLunch, 0)  / props.informations.reduce((counter, current) => {
                                if (current.afterLunch >= 0)
                                   return counter + 1
                            }, 0)).toFixed(2)
                        }
                    </th>
                    <th>
                        {
                            Number(props.informations.reduce((counter, current) => counter + current.beforeDinner, 0)  / props.informations.reduce((counter, current) => {
                                if (current.beforeDinner >= 0)
                                   return counter + 1
                            }, 0)).toFixed(2)
                        }
                    </th>
                    <th>
                        {
                            Number(props.informations.reduce((counter, current) => counter + current.afterDinner, 0)  / props.informations.reduce((counter, current) => {
                                if (current.afterDinner >= 0)
                                   return counter + 1
                            }, 0)).toFixed(2)
                        }
                    </th> 
                     
                  
                </tr>
            </tfoot>
        </table>
    )
    )
}
export default HistoryTable