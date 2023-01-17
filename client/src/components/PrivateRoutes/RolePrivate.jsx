import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RolePrivateRoutes = (props) => {
  //  let user = useSelector((state) => state.auth);
  // if (user.role === props.role) {
  //   var role = true;
  // }
  // const url = `/${user.role}`;
  // return role ? <Outlet /> : <Navigate to={url} />;
};

export default RolePrivateRoutes;
