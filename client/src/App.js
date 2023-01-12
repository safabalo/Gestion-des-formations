import Login from './Pages/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './components/Admin/Dashboard';
import AuthPrivateRoutes from './components/PrivateRoutes/AuthPrivate';
import RolePrivateRoutes from './components/PrivateRoutes/RolePrivate';
import ErrorPage from './Pages/404';
import Employe from './Pages/Employe';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='*' element={<ErrorPage/>} />
        <Route element={<AuthPrivateRoutes />}>
          <Route element={<RolePrivateRoutes role="admin"/>} > 
              <Route path='/dashboard' element={<Dashboard/>} />
          </Route>
          <Route element={<RolePrivateRoutes role="admin"/>} > 
              <Route path='/dashboard' element={<Dashboard/>} />
          </Route>
          <Route element={<RolePrivateRoutes role="employe"/>} > 
              <Route path='/employe' element={<Employe/>} />
          </Route>
        </Route>
        
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
