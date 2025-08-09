import { Routes,Route } from "react-router-dom";
import Sidebar from "./Component/Sidebar/Sidebar";
import Home from "./Pages/Home/Home";

export default function App(){
  return(
  <Routes>
  <Route
  path="/S"
  element={<Sidebar/>}/>,
  <Route
  path="/"
  element={<Home/>}/>
  </Routes>
  )
}
