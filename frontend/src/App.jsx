
import { Route, Routes } from 'react-router-dom';
import './App.css'
import NotFound from './Pages/NotFound';
import HomePage from './Pages/HomePage';
import AboutUs from './Pages/AboutUs';
import Signup from './Pages/Signup';
function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="*" element={<NotFound />}></Route>
        
      </Routes>
      
    </>
  )
}

export default App
