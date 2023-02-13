import { useRoutes } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "realgrid/dist/realgrid-style.css";
import "style/font.css";
import "style/App.css";
import "style/realgrid.css";
import "style/datePicker.css";
import "react-toastify/dist/ReactToastify.css";
import Main from "container/mainLayout/main";
import Login from "container/login";
import ProtectedRoute from "routers/ProtectedRoute";
import API from "app/axios";
import { getMenu } from "app/state/menu/menuSlice";
import { setToken } from "app/state/auth/authSlice";
import { store } from "app/store";

function App() {
  const token = localStorage.getItem("token");

  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    store.dispatch(getMenu());
    store.dispatch(setToken({ token: token }));
  }

  const routes = [
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Main />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
  ];
  const mainRouters = useRoutes(routes);
  return <>{mainRouters}</>;
}

export default App;
