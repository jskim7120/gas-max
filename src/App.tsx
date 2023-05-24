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
import { setUser } from "app/state/auth/authSlice";
import { store } from "app/store";

function App() {
  const token = localStorage.getItem("token");
  const areaCode = localStorage.getItem("areaCode");
  const username = localStorage.getItem("username");

  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    store.dispatch(getMenu());
    areaCode &&
      username &&
      store.dispatch(
        setUser({
          token: token,
          areaCode: areaCode,
          username: username,
        })
      );
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
