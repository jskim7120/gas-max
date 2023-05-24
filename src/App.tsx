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
import { getMenu } from "app/state/menu/menuSlice";
import { setUser } from "app/state/auth/authSlice";
import { store } from "app/store";

function App() {
  const token = localStorage.getItem("token");
  const areaCode = localStorage.getItem("areaCode");
  const username = localStorage.getItem("username");
  const loginCo = localStorage.getItem("loginCo");
  const email = localStorage.getItem("email");

  if (token) {
    store.dispatch(
      setUser({
        token: token,
        areaCode: areaCode ? areaCode : "",
        username: username ? username : "",
        loginCo: loginCo ? loginCo : "",
        email: email ? email : "",
      })
    );
    store.dispatch(getMenu());
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
