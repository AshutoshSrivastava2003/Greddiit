import logo from './logo.svg';
import React, { useState } from "react";
import './App.css';
import { Login } from "./login.js"
import { Register } from "./register.js"
import { Routes,Route } from 'react-router-dom';
import {Home} from './home.js'
// import { ProtectedRoute } from './ProtectedRoute.js';
import Protected from './Protected.js';
import { ModSubgreddiits } from './modSubgreddiits';
import {PostSubgreddiits } from './postSubgreddiits';
function App() {
  const [form, setForm] = useState('login');
  
  const SwitchForms=(formName)=>{
    setForm(formName);
  }
  return (

    <div className="App">
      {/* {form === 'login' ? <Login SwitchForm={SwitchForms} /> : <Register SwitchForm={SwitchForms}/>} */}
      <Routes>
        <Route path='/auth' element={form === 'login' ? <Login SwitchForm={SwitchForms} /> : <Register SwitchForm={SwitchForms}/>}/>
        <Route path='/home' element={<Protected children={<Home />}></Protected>}/>
        <Route path='/mod/subgreddiit/:name' element={<ModSubgreddiits></ModSubgreddiits> }></Route>
        <Route path='/subgreddiit/:name' element={<PostSubgreddiits></PostSubgreddiits> }></Route>
      </Routes>
    </div>
  );
}

export default App;
