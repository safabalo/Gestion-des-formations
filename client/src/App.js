import Login from './components/Login/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Admin from './components/Admin/Admin';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/dashboard' element={<Admin/>} />
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
