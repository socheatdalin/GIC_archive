import './App.css'
import Home from "./components/Home/Home"
import Thesis from './pages/Thesis';
import Studentthesis from './pages/Student/Thesisstudent.jsx'
import Teacherthesis from './pages/Teacher/ThesisTeacher'
import Class from './pages/Class';
import Upload from './pages/Uploadthesis';
import Detail from './pages/ThesisDetail';
import Register from './authentication/register/Register';
import Signin from './authentication/signin/Signin';
import Home1 from './view/app/index';
// import Admin from '../Admin/src/routes'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
        return (
                <div className="App">
                        <Router>
                                <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/thesis" element={<Thesis />} />
                                        <Route path="/student/thesis" element={< Studentthesis />} />
                                        <Route path="/teacher/thesis" element={< Teacherthesis />} />
                                        <Route path="/class" element={<Class />} />
                                        <Route path="/upload" element={<Upload />} />
                                        <Route path="/detail" element={<Detail />} />
                                        <Route path='/login' element={<Signin />} ></Route>
                                        <Route path='/register' element={<Register />} ></Route>
                                        <Route path="/home1" element={<Home1 />} />
                                        {/* <Route path="/admin" element={<Admin />} /> */}
                                </Routes>
                        </Router>

                </div>
        );
}

export default App;