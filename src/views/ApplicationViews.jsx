import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authorized } from "./Authorized";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Landing } from "../pages/Landing"
import { Closet } from "../pages/Closet";
import { Create } from "../pages/Create";
import { Favs } from "../pages/Favs";
import { Edit } from "../pages/Edit";

export const ApplicationViews = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized />}>
          <Route path="/" element={<Landing />}/>
          <Route path="closet" element={<Closet />} />
          <Route path="create" element={<Create />} />
          <Route path="favs" element={<Favs />} />
          <Route path="edit/:shirtId" element={<Edit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
