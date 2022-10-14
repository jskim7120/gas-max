import React, { ReactNode, FC } from "react";
import { Navigate } from "react-router-dom";
import AppLayout from "container/mainLayout/appLayout";

interface IProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <AppLayout>{children}</AppLayout> : <Navigate to="/login" />;
};

export default ProtectedRoute;
