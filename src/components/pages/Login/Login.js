import React, { useState, useEffect } from 'react'
import swal from 'sweetalert'
import imgWave from './img/wave.png'
import imgBg from './img/bg.svg'
import imgAvatar from './img/avatar.svg'

//import './styles.css'

const Login = () => {

    return (

       <div>
            <img className="wave" src={imgWave}></img>

            <div className="container">

                    <div className="img">
                        <img src={imgBg}></img>
                    </div>

                    <div className="login-content">
                            <form>
                                <img src={imgAvatar}></img>
                                <h2 className="title">Bem-Vindo</h2>

                                <div className="input-div one" autoFocus={true}>
                                    <div className="i">
                                            <i className="fas fa-user"></i>
                                    </div>
                                    <div className="div" autoFocus={true}>
                                            <input type="number" className="input" placeholder="Informe seu CPF"></input>
                                    </div>
                                </div>

                                <input type="submit" className="btn" value="Acessar"></input>

                            </form>
                    </div>
            </div>

       </div>

    )
}

export default Login