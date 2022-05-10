import React from "react";
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css'

function Login(){


const initialValueOne = {
  name: '',
  senha: '',
  cargo: '',  
}

const [values, setValues] = useState(initialValueOne); 

let navigate = useNavigate();
 
function onChangeOne(ev) {
    const { name, value } = ev.target;
    setValues({ ...values, [name]: value });
  }

function onSubmitOne(ev) {
    ev.preventDefault()
   loginFunction();
  }
  
async function loginFunction() {
  const { data: { token } } = await axios.post('http://localhost:3333/authenticate', values);
  localStorage.setItem('token', JSON.stringify(token));
  console.log(token)
  axios.defaults.headers.token = `${token}`;
 
  navigate('/torcedores')      
};



return( 
    <div id="login">
    <form onSubmit={onSubmitOne}>
       <div>
         <div id='LoginInputName'>
           <label className="labelLogin">Login:</label><br />
           <input
             type="text" id="name" name="name" required="name" onChange={onChangeOne}>
           </input>
         </div>
         <div id='LoginInputName'>
           <label className="labelLogin">Senha:</label><br />
           <input
              id="sexo" name="senha" type="password" required="senha"  onChange={onChangeOne}></input>
         </div>
       </div>
       <button className='buttonLogin'  onSubmit={ (event)=> {onSubmitOne(event)}} >Logar</button>
     </form>
   </div> 
);
}

export default Login;

  



 

 