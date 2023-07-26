import Home from "./Components/Home/Home";
import { Route, Routes } from "react-router-dom";
function App(){
  return(
    
    <Routes>
    <Route path="/" element={<Home />} />
    </Routes>
   
    
  )
}

export default App;