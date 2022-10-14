import React from "react";
import { useRoutes } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "realgrid/dist/realgrid-style.css";
import "style/font.css";
import "style/App.css";
import Main from "container/mainLayout/main";
import Login from "container/login";
import ProtectedRoute from "routers/ProtectedRoute";

function App() {
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
