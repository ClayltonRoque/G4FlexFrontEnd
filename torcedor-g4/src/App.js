import {BrowserRouter ,Route, Routes} from 'react-router-dom';
import React from 'react';
import Login from './login/index';
import Torcida from './torcedores/index';

function App() {
 
  
  return(
   
  <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} /> 
                <Route path="/torcedores" element={<Torcida/>}/>
                <Route path="*" element={<Login/>} />
            </Routes>
  </BrowserRouter>
         
          )

}
export default App;