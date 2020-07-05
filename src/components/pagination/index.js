import React, { useState } from 'react'
import './styles.css'
import { max } from 'moment'

const click = (event) => {
    alert('')
}


const Pagination = (props) => {

    const maxPages = props.maxPages || 1
    const page = props.page
    const limit = 10

    const pages = []

    for (let i = 1; i <= maxPages; i++){

        if (i === 1){
            pages.push( <a href="#" className="active" onClick={click}>{i}</a> )    
        }

        pages.push( <a href="#"  onClick={click}>{i}</a> )    
    }
    
    return (

        <div className="pagination">

            <a href="#">&laquo;</a>

            {pages.map(p => p)}

            <a href="#">&raquo;</a>

        </div>
    )
}

export default Pagination