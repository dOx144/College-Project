import { BrowserRouter, Routes ,Route} from "react-router-dom"
import Welcome from "./Pages/Welcome"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Home from "./Pages/Home"
import Credits from "./Pages/Credits"
import Mockup from "./Components/Mockup"
import Prac from "./Components/prac"
import NoPage from "./Pages/NoPage"

function App() {

  return (

    <BrowserRouter>

      <Routes>
      <Route index='/' element={<Welcome/>} />
      <Route  path='/' element={<Welcome/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/credits" element={<Credits/>} />
        <Route path="*" element={<NoPage/>}/>
        {/* <Route path="/mockup" element={<Mockup/>} /> */}
        {/* <Route path="/prac" element={<Prac/>} /> */}
      </Routes>
    
    </BrowserRouter>

  )
}

export default App
