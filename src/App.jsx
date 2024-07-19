import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Carne from "./pages/Prod.carne.jsx";
import Leche from "./pages/Prod.leche.jsx";
import Peso from "./pages/peso.animal.jsx";
import Produccion from "./pages/Prod.diaria.jsx";
import Lactansia from "./pages/Prod.lactansia.jsx";


function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Navigate to="/Login" />} /> 
        <Route path="/Login" element = {<Login/>}/>
        <Route path="/Register" element = {<Register/>}/>
        <Route path="/Home" element = {<Home/>}/>
        <Route path="/Carne" element = {<Carne/>}/>
        <Route path="/Leche" element = {<Leche/>}/>
        <Route path="/Peso" element = {<Peso/>}/>
        <Route path="/Produccion" element = {<Produccion/>}/>
        <Route path="/Lactansia" element = {<Lactansia/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
