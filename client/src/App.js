import { Provider } from "react-redux";
import store from "./components/Redux/store";
import Login from "./Pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPrivateRoutes from "./components/PrivateRoutes/AuthPrivate";
import RolePrivateRoutes from "./components/PrivateRoutes/RolePrivate";
import ErrorPage from "./Pages/404";
import Employe from "./Pages/Employe";
import Organisme from "./components/Admin/Organism";
import Formation from "./components/Admin/Formation";
import Employes from "./components/Admin/Employes";
import Historique from "./components/Admin/Historique";
import Statistiques from "./components/Admin/Statistiques";
import Assign from "./components/Admin/Assign";
import Admin from "./Pages/Admin";
import AddEmployer from "./components/Add/AddEmployer";
import AddFormation from "./components/Add/AddFormation";
import AddOrganism from "./components/Add/AddOrganism";
import Assigner from "./components/Add/AssignFormation";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<AuthPrivateRoutes />}>
            <Route path="/" element={<Admin />}>
              <Route path="" element={<Statistiques />} />
              <Route path="organism" element={<Organisme />} />
              <Route path="formation" element={<Formation />} />
              <Route path="employes" element={<Employes />} />
              <Route path="historique" element={<Historique />} />
              <Route path="assigner" element={<Assign />} />
              <Route path="addOrganism" element={<AddOrganism />} />
              <Route path="addEmployer" element={<AddEmployer />} />
              <Route path="addFormation" element={<AddFormation />} />
              <Route path="add-assigner" element={<Assigner />} />
            </Route>
          </Route>
          {/* <Route element={<RolePrivateRoutes role="employe" />}> */}
          <Route path="/Employe" element={<Employe />} />
          {/* </Route> */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
