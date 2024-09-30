import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashbord from './Pages/Dashbord';
import AddBook from './Pages/AddBook';
import Issuebook from './Pages/Issuebook';
import Login from './Pages/Login';
import Returnbook from './Pages/Returnbook';
import Signup from './Pages/Signup';
import Totalbook from './Pages/Totalbook';
import Totaluser from './Pages/Totaluser';
import Userheldbook from './Pages/Userheldbook';
import Login_Then_Issuebook from './Pages/Login_Then_Issuebook';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashbord />} />
        <Route path='/addBook' element={<AddBook />} />
        <Route path='/issuebook' element={<Issuebook />} />
        <Route path='/login' element={<Login />} />
        <Route path='/returnbook' element={<Returnbook />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/totalbook' element={<Totalbook />} />
        <Route path='/totaluser' element={<Totaluser />} />
        <Route path='/userheldbook' element={<Userheldbook />} />
        <Route path='/login_Then_Issuebook' element={<Login_Then_Issuebook />} />
      </Routes>
    </Router>
  )

}
export default App;

