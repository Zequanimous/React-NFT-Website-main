import "./app.css";
import Layout from "./components/Layout/Layout";

import 'regenerator-runtime/runtime'
import { initContract, login, logout, clearContentBody, provokeLogin} from './near/utils'

import {useEffect} from "react";

function App() {

  useEffect(()=>{
    initContract() 
  },[])

  return(
    <Layout />
  );
}

export default App;
