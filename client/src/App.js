import Login from './Pages/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './components/Admin/Dashboard';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
