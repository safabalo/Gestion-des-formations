import { Navigate, Outlet } from 'react-router-dom'

const AuthPrivateRoutes = () => {
    let user = localStorage.getItem('user');
  if(user.token) {var token = true}
  if(user.email) {var email = true}
  if(user.username) {var username = true}
  if(user.role) {var role = true}

  const url = `/`

  return (
    (token && email && role && username) ? <Outlet/> : <Navigate to={url}/>
  )
}

export default AuthPrivateRoutes;