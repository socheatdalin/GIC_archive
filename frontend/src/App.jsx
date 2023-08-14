import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login  from './view/signin/login'
import Home from './view/home'
import Register from './view/register/register'
function App() {
      return(
            <BrowserRouter>
                  <Routes>
                        <Route path='/home' element={<Home />} ></Route>
                        <Route path='/' element={<Login />} ></Route>
                        <Route path='/register' element={<Register />} ></Route>
                  </Routes>
            </BrowserRouter>
      )
}

export default App;