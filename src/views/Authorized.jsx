import { Navigate, Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const Authorized = () => {
  if (localStorage.getItem("flashes_token")) {
    return (
      <>
        <Navbar />
        <main className="flex items-center justify-center h-screen ml-[96px]">
          <Outlet />
        </main>
      </>
    );
  }
  return <Navigate to="/login" replace />;
};