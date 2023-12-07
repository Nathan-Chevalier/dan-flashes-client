import { Navigate, Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const Authorized = () => {
  if (localStorage.getItem("flashes_token")) {
    return (
      <>
        <Navbar />
        <main className="flex items-center justify-center">
          <Outlet />
        </main>
      </>
    );
  }
  return <Navigate to="/login" replace />;
};