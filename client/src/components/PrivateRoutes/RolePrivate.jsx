import { Navigate, Outlet } from "react-router-dom";

const RolePrivateRoutes = (props) => {
   let user = JSON.parse(localStorage.getItem("user"));
  if (user.role === props.role) {
    var role = true;
  }

  const url = `/${user.role}`;

  return role ? <Outlet /> : <Navigate to={url} />;
};

export default RolePrivateRoutes;