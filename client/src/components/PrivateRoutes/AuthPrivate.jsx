import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthPrivateRoutes = () => {
  let user = useSelector((state) => state.auth);

  const url = `/login`;

  if (user.isLoggedIn) {
    if (user.role === "admin") <Navigate to="/" />;
    else <Navigate to="/Employe" />;
  } else {
    console.log(user.message);
    // <Navigate />;
  }
};

export default AuthPrivateRoutes;
