import { Routes,Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Tables from "./Pages/Table/Tables";

export default function App(){
  return(
  <Routes>
  <Route
  path="/"
  element={<Home/>}/>,
  <Route
  path="/Table"
  element={<Tables/>}/>
  </Routes>
  
  
  )
}
